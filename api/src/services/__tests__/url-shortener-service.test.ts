import {
  saveAsShortenedUrl,
  SaveAsShortenedUrlFailureResponse,
  SaveAsShortenedUrlSuccessResponse,
} from "../url-shortener-service";
import { mocked } from "jest-mock";
import { getNextUrlId, saveUrl } from "../../data";

jest.mock("../../data");
jest.mock("../../utilities", () => ({ encode: jest.fn(() => "abcdefgh") }));

const mockedGetNextUrlId = jest.mocked(getNextUrlId).mockResolvedValue(4687);

describe("urlShortenerService", () => {
  describe("saveAsShortenedUrl", () => {
    const request = {
      url: "https://www.google.com",
    };

    test("should return a shortened url when saved successfully", async () => {
      const response = (await saveAsShortenedUrl(
        request
      )) as SaveAsShortenedUrlSuccessResponse;

      expect(response.status).toBe("Success");
      expect(response.shortenedUrl).toBe("http://jspenc.com/abcdefgh");
    });

    test("should return an error when save failed", async () => {
      mocked(saveUrl).mockRejectedValue(new Error("Failed to save url"));

      const response = (await saveAsShortenedUrl(
        request
      )) as SaveAsShortenedUrlFailureResponse;

      expect(response.status).toBe("FailedToSave");
      expect(response.message).toBe("Failed to save url");
    });

    test("should return an error when fetch id failed", async () => {
      mocked(mockedGetNextUrlId).mockRejectedValue(
        new Error("Failed to get next id")
      );

      const response = (await saveAsShortenedUrl(
        request
      )) as SaveAsShortenedUrlFailureResponse;

      expect(response.status).toBe("FailedToSave");
      expect(response.message).toBe("Failed to save url");
    });

    afterEach(() => {
      jest.clearAllMocks();
      jest.resetModules();
    });
  });
});
