import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>Url Shortener</title>
        <meta name="description" content="shorten any url for easy sharing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <header>
            <h1>Link shortener</h1>
          </header>
          <main className="content">
            <Component {...pageProps} />
          </main>
          <footer className="footer">James Spencer</footer>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
