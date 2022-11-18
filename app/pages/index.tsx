import { useState } from "react";
import {
  fetchRecentUrlsInternal,
  RecentUrlsUrlSuccessResponse,
} from "../clients/url-client";
import { RecentUrls, ShortenUrlForm, SuccessMessage } from "../components";
import { useFetchUrlsQuery, usePostUrlMutation } from "../hooks";

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

export const Home = ({ recentUrls }: HomePageProps) => {
  const [successMessage, setSuccessMessage] = useState<string>();
  const fetchUrlsQuery = useFetchUrlsQuery(recentUrls);
  const postUrlMutation = usePostUrlMutation((data) =>
    setSuccessMessage(data.shortenedUrl)
  );

  return (
    <>
      <ShortenUrlForm onSubmit={postUrlMutation.mutate} />
      {successMessage && <SuccessMessage shortenedUrl={successMessage} />}
      {fetchUrlsQuery.data?.urls && fetchUrlsQuery.data?.urls.length > 0 && (
        <RecentUrls urls={fetchUrlsQuery.data.urls} />
      )}
    </>
  );
};

export default Home;
