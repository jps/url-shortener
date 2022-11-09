import { getMockReq, getMockRes } from "@jest-mock/express";
import { postUrl } from "../urls-controller";
import { saveAsShortenedUrl } from "../../services";
import {
  SaveAsShortenedUrlFailureResponse,
  SaveAsShortenedUrlSuccessResponse,
} from "../../services/url-shortener-service";

jest.mock("../../services");

describe("urlsController", () => {
  describe("postUrl", () => {
    const { res } = getMockRes();
    const getPostUrlRequest = () =>
      getMockReq({
        body: {
          url: "https://www.google.com",
        },
      });

    const mockedSaveAsShortenedUrl = jest.mocked(saveAsShortenedUrl);

    const scenarios = [
      [
        { status: "Success", shortenedUrl: "http://jspenc.com/abcdefgh" },
        200,
        {
          shortenedUrl: "http://jspenc.com/abcdefgh",
        },
      ],
      [
        { status: "FailedToSave", message: "Server error" },
        500,
        {
          message: "Failed to save url",
        },
      ],
    ];

    scenarios.forEach((scenario) => {
      const [mockedServiceResponse, expectedStatusCode, expectedResult] =
        scenario;
      test(`should return statusCode:${expectedStatusCode} when service returns status:${mockedServiceResponse}`, async () => {
        const req = getPostUrlRequest();

        mockedSaveAsShortenedUrl.mockResolvedValue(
          mockedServiceResponse as
            | SaveAsShortenedUrlSuccessResponse
            | SaveAsShortenedUrlFailureResponse
        );

        await postUrl(req, res);

        expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(res.json).toHaveBeenCalledWith(expectedResult);
        expect(mockedSaveAsShortenedUrl).toHaveBeenCalledWith(req.body);
        expect(mockedSaveAsShortenedUrl).toHaveBeenCalledTimes(1);
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
