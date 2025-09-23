import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseFetch } from "../../Helpers/BaseFetch";
import { useDispatchToast } from "../useDispatchToast";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const dispatchToast = useDispatchToast();

  const updateTask = (task) => {
    return BaseFetch("/tasks", {
      method: "PUT",
      body: JSON.stringify(task),
    });
  };

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      dispatchToast("success", "Task updated!");
    },
    onError: () => {
      dispatchToast("error", "Something went wrong! Try again!");
    },
  });
};
