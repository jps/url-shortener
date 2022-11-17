import Head from "next/head";
import { useState } from "react";
import {
  RecentUrls,
  SubmitUrlForm as ShortenUrlForm,
  SuccessMessage,
} from "../components";

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

export default function Home({ recentUrls: _recentUrls }: HomePageProps) {
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState<string>();

  const fetchUrlsQuery = useQuery({
    queryKey: ["recentUrls"],
    queryFn: fetchRecentUrlsExternal,
    initialData: _recentUrls,
  });

  const postUrlMutation = useMutation({
    mutationFn: postUrl,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["recentUrls"] });
      setSuccessMessage(data.shortenedUrl);
    },
  });

  const onSubmit = async (data: object) => {
    postUrlMutation.mutate(data);
  };

  return (
    <>
      <Head>
        <title>Url Shortener</title>
        <meta name="description" content="shorten any url for easy sharing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ShortenUrlForm onSubmit={onSubmit} />
      {successMessage && <SuccessMessage shortenedUrl={successMessage} />}
      {fetchUrlsQuery.data?.urls && fetchUrlsQuery.data?.urls.length > 0 && (
        <RecentUrls urls={fetchUrlsQuery.data.urls} />
      )}
    </>
  );
}
