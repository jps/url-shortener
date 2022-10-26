import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <header>
        <h1>Link shortener</h1>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer className="footer">James Spencer</footer>
    </div>
  );
}
