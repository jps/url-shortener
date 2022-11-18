import { useState } from "react";
import { RecentUrls, ShortenUrlForm, SuccessMessage } from "../components";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRecentUrlsExternal } from "../clients";
import {
  fetchRecentUrlsInternal,
  postUrl,
  RecentUrlsUrlSuccessResponse,
} from "../clients/url-client";

interface HomePageProps {
  recentUrls: RecentUrlsUrlSuccessResponse | undefined;
}

export const getServerSideProps = async (): Promise<{
  props: HomePageProps;
}> => ({
  props: {
    recentUrls: await fetchRecentUrlsInternal(),
  },
});

export default function Home({ recentUrls }: HomePageProps) {
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState<string>();

  const fetchUrlsQuery = useQuery({
    queryKey: ["recentUrls"],
    queryFn: fetchRecentUrlsExternal,
    initialData: recentUrls,
    refetchOnWindowFocus: false,
    staleTime: 1000,
  });

  const postUrlMutation = useMutation({
    mutationFn: postUrl,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["recentUrls"] });
      setSuccessMessage(data.shortenedUrl);
    },
  });

  return (
    <>
      <ShortenUrlForm onSubmit={postUrlMutation.mutate} />
      {successMessage && <SuccessMessage shortenedUrl={successMessage} />}
      {fetchUrlsQuery.data?.urls && fetchUrlsQuery.data?.urls.length > 0 && (
        <RecentUrls urls={fetchUrlsQuery.data.urls} />
      )}
    </>
  );
}
