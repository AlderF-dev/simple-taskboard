import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseFetch } from "../../Helpers/BaseFetch";
import { useAuth } from "../../contexts/AuthContext";

export const useGetTags = () => {
  const queryClient = useQueryClient();
  const { fetchWithToken } = useAuth();

  const fetchTags = async () => {
    const res = await fetchWithToken("/tags", { method: "GET" });
    // Transform the API response into the format rsuite expects
    return res.data.map((tag: any) => ({
      label: tag.label,
      value: tag.label,
    }));
  };

  const query = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5, // optional: 5 minutes
  });

  // Optional: Helper to optimistically add a tag to cache
  const addTempTag = (label: string) => {
    queryClient.setQueryData<string[]>(["tags"], (old: any = []) => {
      // prevent duplicates (case-insensitive)

      const exists = old.some(
        (t) => t.label && t.label.toLowerCase() === label.toLowerCase()
      );
      if (exists) return old;

      return [...old, { label, value: label }];
    });
  };

  return {
    ...query,
    addTempTag,
  };
};
