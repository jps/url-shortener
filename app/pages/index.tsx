import {
  fetchRecentUrlsInternal,
  RecentUrlsUrlSuccessResponse,
} from "../clients/url-client";
import { RecentUrls, ShortenUrlForm, SuccessMessage } from "../components";
import { useFetchUrlsQuery, usePostUrlMutation, useSavedUrl } from "../hooks";

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
  const fetchUrlsQuery = useFetchUrlsQuery(recentUrls);
  const postUrlMutation = usePostUrlMutation();
  const savedUrlQuery = useSavedUrl();

  return (
    <>
      <ShortenUrlForm onSubmit={postUrlMutation.mutate} />
      {savedUrlQuery.isFetched && (
        <SuccessMessage
          shortenedUrl={savedUrlQuery.data?.shortenedUrl as string}
        />
      )}
      {fetchUrlsQuery.data?.urls && fetchUrlsQuery.data?.urls.length > 0 && (
        <RecentUrls urls={fetchUrlsQuery.data.urls} />
      )}
    </>
  );
};

export default Home;
