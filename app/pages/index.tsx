import Head from "next/head";
import { useState } from "react";
import {
  RecentUrls,
  SubmitUrlForm as ShortenUrlForm,
  SuccessMessage,
} from "../components";

interface HomePageProps {
  recentUrls: string[];
}

export const getServerSideProps = async (): Promise<{
  props: HomePageProps;
}> => ({
  props: {
    recentUrls: await fetchRecentUrls(
      `http://url-shortener-api:3001/urls/recent`
    ), //TODO env var
  },
});

const fetchRecentUrls = async (url: string) => {
  let recentUrls: Array<string> = [];
  try {
    const res = await fetch(url);
    const recentUrlsData = await res.json();
    recentUrls = recentUrlsData.urls;
  } catch (exception) {
    console.error("failed to get recent urls", exception);
  }
  return recentUrls;
};

export default function Home({ recentUrls: _recentUrls }: HomePageProps) {
  const [successMessage, setSuccessMessage] = useState<string>();
  const [recentUrls, setRecentUrls] = useState<string[]>(_recentUrls);

  const onSubmit = async (data: object) => {
    console.log(data);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/urls`, {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        //set success page state, clear input field
        const responseJson = await response.json();
        setSuccessMessage(responseJson.shortenedUrl);
        let updatedRecentUrls = [
          responseJson.shortenedUrl,
          ...recentUrls,
        ].slice(0, 20);
        setRecentUrls(updatedRecentUrls);
        return;
      }
      throw new Error(`non 200 (${response.status}) status code`);
    } catch (exception) {
      alert("failed"); //TODO we could better handle this for the user
    }
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
      {recentUrls.length > 0 && <RecentUrls urls={recentUrls} />}
    </>
  );
}
