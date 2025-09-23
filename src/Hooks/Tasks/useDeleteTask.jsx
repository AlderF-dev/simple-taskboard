import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseFetch } from "../../Helpers/BaseFetch";
import { useDispatchToast } from "../useDispatchToast";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const dispatchToast = useDispatchToast();

  const deleteTask = (taskId) => {
    return BaseFetch(`/tasks/${taskId}`, {
      method: "DELETE",
    });
  };

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      dispatchToast("success", "Task deleted!");
    },
    onError: () => {
      dispatchToast("error", "Something went wrong! Try again!");
    },
  });
};
