export const initialData = [
  {
    stage: 0,
    header: "Foundation",
    isStageDisabled: false,
    todos: [
      {
        id: 1,
        label: "Setup virtual office",
        isDone: false,
      },
      { id: 2, label: "Set mission & vision", isDone: false },
      { id: 3, label: "Select business name", isDone: false },
      { id: 4, label: "Buy domain", isDone: false },
    ],
  },
  {
    stage: 1,
    header: "Discovery",
    isStageDisabled: true,

    todos: [
      { id: 5, label: "Create roadmap", isDone: false },
      { id: 6, label: "Competitor analysis", isDone: false },
    ],
  },
  {
    stage: 2,
    header: "Delivery",
    isStageDisabled: true,

    todos: [
      { id: 5, label: "Release marketing website", isDone: false },
      { id: 6, label: "Release", isDone: false },
    ],
  },
];
