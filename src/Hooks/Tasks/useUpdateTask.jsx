import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseFetch } from "../../Helpers/BaseFetch";
import { useDispatchToast } from "../useDispatchToast";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const dispatchToast = useDispatchToast();

  const updateTask = (data) => {
    return BaseFetch(`/tasks/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data.task),
    });
  };

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      dispatchToast("success", "Task updated!");
    },
    onError: () => {
      dispatchToast("error", "Something went wrong! Try again!");
    },
  });
};
