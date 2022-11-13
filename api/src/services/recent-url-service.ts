import { getRecentUrls } from "../data";

const baseUrl = process.env.SHORTENED_BASE_URL;

export interface RecentUrlsFailureResponse {
  status: "FailedToGet";
  message: string;
}

export interface RecentUrlsUrlSuccessResponse {
  status: "Success";
  urls: string[];
}

export const recentUrls = async (): Promise<
  RecentUrlsFailureResponse | RecentUrlsUrlSuccessResponse
> => {
  try {
    const recentUrls = await getRecentUrls();
    const urlsWithBasePrepended = recentUrls.map(
      (url) => `${baseUrl}/${url.encodedId}`
    );

    return {
      status: "Success",
      urls: urlsWithBasePrepended,
    };
  } catch (exception) {
    console.error(`Failed to get recent urls`, exception);
    return {
      status: "FailedToGet",
      message: "Failed to get recent urls",
    };
  }
};
