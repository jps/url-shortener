import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUrl } from "../clients/url-client";

export const usePostUrlMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUrl,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["recentUrls"] });
      queryClient.setQueryData(["savedUrl"], data);
    },
  });
};
