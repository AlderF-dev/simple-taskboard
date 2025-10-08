import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseFetch } from "../../Helpers/BaseFetch";
import { useAuth } from "../../contexts/AuthContext";

export const useGetTask = () => {
  const { fetchWithToken, user } = useAuth();
  const getTasks = () => fetchWithToken("/tasks", { method: "GET" });

  return useQuery({
    queryKey: ["tasks", user?.id],
    queryFn: getTasks,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    enabled: !!user?.id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
