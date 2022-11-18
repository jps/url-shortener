import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SaveAsShortenedUrlSuccessResponse } from "../clients/url-client";
import { postUrl } from "../clients/url-client";

export const usePostUrlMutation = (
  onSuccess: (data: SaveAsShortenedUrlSuccessResponse) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUrl,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["recentUrls"] });
      onSuccess(data);
    },
  });
};
