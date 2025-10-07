import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseFetch } from "../../Helpers/BaseFetch";
import { useDispatchToast } from "../useDispatchToast";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const dispatchToast = useDispatchToast();

  const createTask = (task) => {
    return BaseFetch("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
  };

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      dispatchToast("success", "Task created!");
    },
    onError: () => {
      dispatchToast("error", "Something went wrong! Try again!");
    },
  });
};
