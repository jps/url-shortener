import { encode } from "../utilities";
import { saveUrl, UrlRecord, getNextUrlId } from "../data";

export interface SaveAsShortenedUrlRequest {
  url: string;
}
export interface SaveAsShortenedUrlFailureResponse {
  status: "FailedToSave";
  message: string;
}

export interface SaveAsShortenedUrlSuccessResponse {
  status: "Success";
  shortenedUrl?: string;
}

export const saveAsShortenedUrl = async (
  request: SaveAsShortenedUrlRequest
): Promise<
  SaveAsShortenedUrlSuccessResponse | SaveAsShortenedUrlFailureResponse
> => {
  try {
    const id = await getNextUrlId();
    const urlRecord: UrlRecord = {
      _id: id,
      url: request.url,
      encodedId: encode(id),
      createdAt: new Date(),
    };

    await saveUrl(urlRecord);

    //TODO: get base url from env variable
    return {
      status: "Success",
      shortenedUrl: `http://jspenc.com/${urlRecord.encodedId}`,
    };
  } catch (exception) {
    //console.error(`Failed to save url ${request.url}`, exception);
    return {
      status: "FailedToSave",
      message: "Failed to save url",
    };
  }
};
