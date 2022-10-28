export const RecentUrls = (props: { urls: string[] }) => (
  <div className="recent-urls">
    <h2>Recent URLs</h2>
    <ul className="recent-urls__list">
      {props.urls.map((url, i) => (
        <li key={i}>
          <a href={url}>{url}</a>
        </li>
      ))}
    </ul>
  </div>
);
