import { mocked } from "jest-mock";
import { getRecentUrls, UrlRecord } from "../../data";
import {
  recentUrls,
  RecentUrlsFailureResponse,
  RecentUrlsUrlSuccessResponse,
} from "../recent-url-service";

jest.mock("../../data");

describe("recentUrlService", () => {
  describe("recentUrls", () => {
    test("should return recent urls when saved successfully", async () => {
      const mockResponse: Array<UrlRecord> = [
        {
          _id: 1,
          url: "http://jspenc.com/abcdefgh",
          createdAt: new Date(),
          encodedId: "abcdefgh",
        },
        {
          _id: 2,
          url: "http://jspenc.com/1bcdefgh",
          createdAt: new Date(),
          encodedId: "1bcdefgh",
        },
      ];

      mocked(getRecentUrls).mockResolvedValueOnce(mockResponse);

      const response = (await recentUrls()) as RecentUrlsUrlSuccessResponse;

      expect(response.status).toBe("Success");
      expect(response.urls).toStrictEqual([
        "http://jspenc.com/abcdefgh",
        "http://jspenc.com/1bcdefgh",
      ]);
    });

    test("should return an error when failed to retrieve", async () => {
      mocked(getRecentUrls).mockRejectedValue(new Error("Failed to save url"));

      const response = (await recentUrls()) as RecentUrlsFailureResponse;

      expect(response.status).toBe("FailedToGet");
      expect(response.message).toBe("Failed to get recent urls");
    });

    afterEach(() => {
      jest.clearAllMocks();
      jest.resetModules();
    });
  });
});
