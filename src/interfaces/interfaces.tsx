export interface ListItem {
  stage: number;
  header: string;
  isStageDisabled: boolean;
  todos: Todo[];
}

export interface Todo {
  id: number;
  label: string;
  isDone: boolean;
}

export interface TodoComponentProps {
  handleCheckboxChecked: (
    e: any,
    listItem: ListItem,
    index: number,
    todoId: number
  ) => void;
  isDisabled: boolean;
  listItem: ListItem;
  index: number;
}
