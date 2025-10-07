import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { useDispatchToast } from "../Hooks/useDispatchToast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseFetch } from "../Helpers/BaseFetch";

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

const tasksReducer = (tasks: Array<TaskData>, action: Object) => {
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
  const [value, setValue] = useLocalStorage("task-context-key", []);

  const [state, dispatch] = useReducer(tasksReducer, value);
  const dispatchToast = useDispatchToast();

  useEffect(() => {
    setValue(state);
  }, [state]);

  const getTasks = () => {};

  const handleAddTask = (task: {
    name: string;
    description: string;
    tags: Array<string>;
  }) => {
    dispatch({
      type: "CREATE",
      id: uuidv4(),
      task: task,
    });
  };

  const useCreateTask = (task) => {
    return BaseFetch("api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
  };

  const handleChangeTask = (task: TaskData) => {
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

  const handleDeleteTask = (taskId: string) => {
    try {
      dispatch({
        type: "DELETE",
        id: taskId,
      });

      dispatchToast("success", "Task deleted!");
    } catch {
      dispatchToast("error", "Failed to delete Task.");
    }
  };

  const context = {
    tasks: state,
    useCreateTask: useCreateTask,
    handleChangeTask: handleChangeTask,
    handleDeleteTask: handleDeleteTask,
  };

  return (
    <TaskContext.Provider value={context}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
