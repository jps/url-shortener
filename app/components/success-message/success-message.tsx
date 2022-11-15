export interface SuccessMessageProps {
  shortenedUrl: string;
}

export const SuccessMessage = ({ shortenedUrl }: SuccessMessageProps) => {
  return (
    <div className="success-message">
      <h2 className="success-message__title">Your URL has been shortened</h2>
      <p className="success-message__text">
        <a href={shortenedUrl}>{shortenedUrl}</a>
      </p>
    </div>
  );
};
