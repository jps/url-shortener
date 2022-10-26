import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Url Shortener</title>
        <meta name="description" content="shorten any url for easy sharing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Shorten URL</h2>
      <form className="shorten-form" tabIndex={0}>
        <label className="visually-hidden" htmlFor="url">
          Url
        </label>
        <input
          className="form-text-input"
          id="url"
          name="url"
          type="url"
          placeholder="Shorten your link e.g. https://example.com"
          required
        />
        <input className="form-submit" type="submit" value="Shorten" />
      </form>
      <div className="recent-urls">
        <h2>Recent URLs</h2>
        <ul className="recent-urls__list">
          {Array.from({ length: 20 }, (_, i) => i).map((i) => (
            <li key={i}>
              <a href="https://jspenc.io/f3x2ab1a">https://jspenc.io/f3x2ab1a</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
