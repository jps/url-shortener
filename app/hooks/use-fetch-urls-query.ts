import { useQuery } from "@tanstack/react-query";
import { fetchRecentUrlsExternal } from "../clients";
import { RecentUrlsUrlSuccessResponse } from "../clients/url-client";

export const useFetchUrlsQuery = (
  initialRecentUrls: RecentUrlsUrlSuccessResponse | undefined
) =>
  useQuery({
    queryKey: ["recentUrls"],
    queryFn: fetchRecentUrlsExternal,
    initialData: initialRecentUrls,
    refetchOnWindowFocus: false,
    staleTime: 1000,
  });
