import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseFetch } from "../../Helpers/BaseFetch";

export const useGetTask = () => {
  const getTasks = () => BaseFetch("/tasks", { method: "GET" });

  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
