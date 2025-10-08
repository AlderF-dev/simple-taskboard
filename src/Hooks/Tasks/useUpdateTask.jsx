import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseFetch } from "../../Helpers/BaseFetch";
import { useDispatchToast } from "../useDispatchToast";
import { useAuth } from "../../contexts/AuthContext";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const dispatchToast = useDispatchToast();
  const { fetchWithToken } = useAuth();

  const updateTask = (data) => {
    return fetchWithToken(`/tasks/${data.id}`, {
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
