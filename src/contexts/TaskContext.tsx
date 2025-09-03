import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { useDispatchToast } from "../Hooks/useDispatchToast";

interface TaskContextType {
  tasks: Record<string, any>; // or a more specific type
  handleAddTask: (task: object) => void;
  handleChangeTask: (task: object) => void;
  handleDeleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  handleAddTask: (task: object) => {},
  handleChangeTask: (task: object) => {},
  handleDeleteTask: (taskId: string) => {},
});

const tasksReducer = (tasks, action) => {
  if (action.type === "CREATE") {
    const dateNow = new Date().toLocaleString();

    return [
      ...tasks,
      {
        id: action.id,
        ...action.task,
        completed: false,
        created_at: dateNow,
      },
    ];
  } else if (action.type === "UPDATE") {
    return tasks.map((t) => {
      if (t.id === action.task.id) {
        return action.task;
      } else {
        return t;
      }
    });
  } else if (action.type === "DELETE") {
    return tasks.filter((t) => t.id !== action.id);
  } else {
    throw Error("Unknown action: " + action.type);
  }
};

export const TaskProvider = ({ children }) => {
  const [value, setValue, removeValue] = useLocalStorage(
    "task-context-key",
    []
  );

  const [state, dispatch] = useReducer(tasksReducer, value);
  const dispatchToast = useDispatchToast();

  useEffect(() => {
    setValue(state);
  }, [state]);

  const handleAddTask = (task) => {
    dispatch({
      type: "CREATE",
      id: uuidv4(),
      task: task,
    });
  };

  const handleChangeTask = (task) => {
    try {
      dispatch({
        type: "UPDATE",
        task: task,
      });

      dispatchToast("info", "Updated Task!", "topEnd", 2000);
    } catch {
      dispatchToast("error", "Failed to updated Task!", "topEnd", 2000);
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch({
      type: "DELETE",
      id: taskId,
    });
  };

  const context = {
    tasks: state,
    handleAddTask: handleAddTask,
    handleChangeTask: handleChangeTask,
    handleDeleteTask: handleDeleteTask,
  };

  return (
    <TaskContext.Provider value={context}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
