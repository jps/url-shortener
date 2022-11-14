import { getMockReq, getMockRes } from "@jest-mock/express";
import { getRecentUrls, postUrl } from "../urls-controller";
import {
  RecentUrlsFailureResponse,
  RecentUrlsUrlSuccessResponse,
  saveAsShortenedUrl,
  recentUrls,
} from "../../services";
import {
  SaveAsShortenedUrlFailureResponse,
  SaveAsShortenedUrlSuccessResponse,
} from "../../services/url-shortener-service";

jest.mock("../../services");

describe("urlsController", () => {
  describe("getRecentUrls", () => {
    const mockedGetRecentUrls = jest.mocked(recentUrls);
    const { res } = getMockRes();

    test(`should return statusCode:200 when service returns status:Success'`, async () => {
      await testGetRecentUrls(
        {
          status: "Success",
          urls: ["http://jspenc.com/abcdefgh", "http://jspenc.com/abcdefgi"],
        },
        200,
        { urls: ["http://jspenc.com/abcdefgh", "http://jspenc.com/abcdefgi"] }
      );
    });

    test(`should return statusCode:500 when service returns status:FailedToGet'`, async () => {
      await testGetRecentUrls(
        {
          status: "FailedToGet",
          message: "Server error",
        },
        500,
        {
          message: "Failed to get recent urls",
        }
      );
    });

    const testGetRecentUrls = async (
      mockedServiceResponse:
        | RecentUrlsUrlSuccessResponse
        | RecentUrlsFailureResponse,
      expectedStatusCode: number,
      expectedResult: object
    ) => {
      mockedGetRecentUrls.mockResolvedValue(mockedServiceResponse);

      await getRecentUrls(getMockReq(), res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
      expect(mockedGetRecentUrls).toHaveBeenCalledTimes(1);
    };
  });

  describe("postUrl", () => {
    const { res } = getMockRes();
    const getPostUrlRequest = () =>
      getMockReq({
        body: {
          url: "https://www.google.com",
        },
      });

    const mockedSaveAsShortenedUrl = jest.mocked(saveAsShortenedUrl);

    test(`should return statusCode:200 when service returns status:Success`, async () => {
      await testPostUrl(
        { status: "Success", shortenedUrl: "http://jspenc.com/abcdefgh" },
        200,
        {
          shortenedUrl: "http://jspenc.com/abcdefgh",
        }
      );
    });

    test(`should return statusCode:500 when service returns status:FailedToSave`, async () => {
      await testPostUrl(
        { status: "FailedToSave", message: "Server error" },
        500,
        {
          message: "Failed to save url",
        }
      );
    });

    const testPostUrl = async (
      mockedServiceResponse:
        | SaveAsShortenedUrlFailureResponse
        | SaveAsShortenedUrlSuccessResponse,
      expectedStatusCode: number,
      expectedResult: object
    ) => {
      const req = getPostUrlRequest();

      mockedSaveAsShortenedUrl.mockResolvedValue(mockedServiceResponse);

      await postUrl(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
      expect(mockedSaveAsShortenedUrl).toHaveBeenCalledWith(req.body);
      expect(mockedSaveAsShortenedUrl).toHaveBeenCalledTimes(1);
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
