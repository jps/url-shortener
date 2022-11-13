import Head from "next/head";
import { RecentUrls, SubmitUrl } from "../components";

interface HomePageProps {
  recentUrls: string[];
}

export const getServerSideProps = async (): Promise<{
  props: HomePageProps;
}> => {
  let recentUrls = [];
  try {
    const res = await fetch(`http://url-shortener-api:3001/urls/recent`);
    const recentUrlsData = await res.json();
    recentUrls = recentUrlsData.urls;
  } catch (exception) {
    console.error("failed to get recent urls", exception);
  }
  return {
    props: { recentUrls: recentUrls },
  };
};

const onSubmit = (data: object) => console.log(data);

export default function Home({ recentUrls }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Url Shortener</title>
        <meta name="description" content="shorten any url for easy sharing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SubmitUrl onSubmit={onSubmit} />
      {recentUrls.length > 0 && <RecentUrls urls={recentUrls} />}
    </>
  );
}
