import { encode } from "../utilities";
import { saveUrl, UrlRecord, getNextInSequence } from "../data";

const baseUrl = process.env.SHORTENED_BASE_URL;

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
    /*
    Potential future enhancement getting an id at a time isn't ideal as will put
    extra load on the db, we could optimise here by getting a batch of ids at a
    time e.g. get 1k and then popping out of a queue. This would reduce the
    number of db calls significantly.
    */
    const id = await getNextInSequence("urlsId");
    const urlRecord: UrlRecord = {
      _id: id,
      url: request.url,
      encodedId: encode(id),
      createdAt: new Date(),
    };

    await saveUrl(urlRecord);

    return {
      status: "Success",
      shortenedUrl: `${baseUrl}/${urlRecord.encodedId}`,
    };
  } catch (exception) {
    console.error(`Failed to save url ${request.url}`, exception);
    return {
      status: "FailedToSave",
      message: "Failed to save url",
    };
  }
};
