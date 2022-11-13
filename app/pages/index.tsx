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

const onSubmit = async (data: object) => {
  console.log(data);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/urls`, {
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    if(response.status === 200) {
      //set success page state, clear input field
      alert('success');
      return; 
    }
    throw new Error(`non 200 (${response.status}) status code`)
  } catch (exception) {
      alert('failed');
  }
};

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
