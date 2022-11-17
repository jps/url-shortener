export interface SaveAsShortenedUrlSuccessResponse {
  status: "Success";
  shortenedUrl: string;
}

export interface RecentUrlsUrlSuccessResponse {
  status: "Success";
  urls: string[];
}

const fetchRecentUrls = async (
  url: string
): Promise<RecentUrlsUrlSuccessResponse | undefined> => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
};

export const fetchRecentUrlsInternal = (): Promise<
  RecentUrlsUrlSuccessResponse | undefined
> => fetchRecentUrls(`${process.env.INTERNAL_API_URL}/urls/recent`);

export const fetchRecentUrlsExternal = async (): Promise<
  RecentUrlsUrlSuccessResponse | undefined
> => {
  return await fetchRecentUrls(
    `${process.env.NEXT_PUBLIC_API_URL}/urls/recent`
  );
};

export const postUrl = async (
  data: object
): Promise<SaveAsShortenedUrlSuccessResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/urls`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Failed to save");
};
