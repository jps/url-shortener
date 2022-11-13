import { getRecentUrls } from "../data";

export interface RecentUrlsFailureResponse {
  status: "FailedToGet";
  message: string;
}

export interface RecentUrlsUrlSuccessResponse {
  status: "Success";
  shortenedUrls: string[];
}

export const recentUrls = async (): Promise<
  RecentUrlsFailureResponse | RecentUrlsUrlSuccessResponse
> => {
  try {
    const baseUrl = process.env.BASE_URL;
    const recentUrls = await getRecentUrls();
    const urlsWithBasePrepended = recentUrls.map(
      (url) => `${baseUrl}/${url.encodedId}`
    );

    return {
      status: "Success",
      shortenedUrls: urlsWithBasePrepended,
    };
  } catch (exception) {
    console.error(`Failed to get recent urls`, exception);
    return {
      status: "FailedToGet",
      message: "Failed to get recent urls",
    };
  }
};
