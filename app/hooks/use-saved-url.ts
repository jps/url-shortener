import { useQuery } from "@tanstack/react-query";

export interface SavedUrlSuccessResponse {
  status: "Success";
  shortenedUrl: string;
}

export const useSavedUrl = () =>
  useQuery<SavedUrlSuccessResponse>({
    queryKey: ["savedUrl"],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: false,
  });
