import { Grid, Card, CardContent, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TodoComponentProps, Todo, ListItem } from "interfaces";
import React, { useState } from "react";
import "./App.css";
import { LabeledCheckbox } from "./components";
import DoneIcon from "@mui/icons-material/Done";
import { initialData } from "initialData";
import axios from "axios";

const useStyles = makeStyles(() => ({
  cardStyle: {
    marginTop: "20px",
    marginBottom: "20px",
    flexDirection: "column",
    overflow: "auto",
    padding: "20px",
  },
}));

//generate checboxes
const TodoComponent: React.FC<TodoComponentProps> = React.memo<any>(
  ({ listItem, index, handleCheckboxChecked, isDisabled }) => {
    return listItem.todos.map((todo: Todo, index) => {
      return (
        <Grid item xs={12}>
          <LabeledCheckbox
            checked={todo.isDone}
            label={todo.label}
            disabled={isDisabled || false}
            onChange={(e) => {
              handleCheckboxChecked(e, listItem, index, todo.id);
            }}
            key={`tdky${todo.id}${index}`}
          />
        </Grid>
      );
    });
  }
);

function App() {
  const classes = useStyles();

  const [list, setList] = useState<ListItem[]>(initialData);

  //handle checkbox
  const handleCheckboxChecked = (
    e: any,
    listItem: ListItem,
    stageIndex: number,
    todoId: number
  ) => {
    const newList = [...list];
    const newTodos = listItem.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.isDone = e.target.checked;
      }
      return todo;
    });
    newList[stageIndex].todos = newTodos;
    if (checkIsAllTodosDoneForStage(stageIndex)) {
      handleStageUnlock();
    }
    localStorage.setItem("listData", JSON.stringify(newList));
    setList(newList);
  };

  const getRandomFactAndShow = async () => {
    try {
      const response = await axios.get(
        "https://uselessfacts.jsph.pl//random.json?language=en"
      );
      alert(
        `Congrats! You deserve a random fact! 
        ${response.data.text} 
      `
      );
      if (response) return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  //check all todos isdone before next stage unlock
  const handleStageUnlock = () => {
    const completedStageIndexes: any = [];

    const localStorageList: any = JSON.parse(
      localStorage.getItem("listData") || ""
    );

    console.log("localStorageList", localStorageList);

    for (let index = 0; index <= list.length - 1; index++) {
      if (checkIsAllTodosDoneForStage(index)) completedStageIndexes.push(index);
    }
    const biggestIndex = Math.max(...completedStageIndexes);

    if (
      completedStageIndexes.length - 1 === biggestIndex &&
      biggestIndex !== list.length - 1
    ) {
      const newList = [...list];
      newList[biggestIndex + 1].isStageDisabled = false;
      setList(newList);
    } else if (
      completedStageIndexes.length - 1 === biggestIndex &&
      biggestIndex === list.length - 1
    ) {
      getRandomFactAndShow();
    }
  };

  const checkIsAllTodosDoneForStage = (stageIndex) => {
    const newList = [...list];
    return newList[stageIndex].todos.every((el, index) => el.isDone === true);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ backgroundColor: "#cecece" }}
    >
      <Grid item xs={12} md={6}>
        <Card className={classes.cardStyle}>
          <CardContent>
            {list.map((listItem: ListItem, index: any) => {
              return (
                <React.Fragment>
                  <span className="Stage"> {index + 1} </span> &nbsp;
                  <b>
                    {listItem.header}
                    {checkIsAllTodosDoneForStage(index) ? (
                      <DoneIcon fontSize="large" color="success" />
                    ) : (
                      ""
                    )}
                  </b>
                  &nbsp;
                  <TodoComponent
                    listItem={listItem}
                    index={index}
                    isDisabled={listItem.isStageDisabled || false}
                    handleCheckboxChecked={handleCheckboxChecked}
                  />
                </React.Fragment>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;
