export interface RecentUrlsProps {
  urls: string[];
}

export const RecentUrls = ({ urls }: RecentUrlsProps) => (
  <div className="recent-urls">
    <h2>Recent URLs</h2>
    <ul className="recent-urls__list">
      {urls.map((url, i) => (
        <li key={i} className="recent-urls__list-item">
          <a href={url}>{url}</a>
        </li>
      ))}
    </ul>
  </div>
);
