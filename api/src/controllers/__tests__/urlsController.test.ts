import { getMockReq, getMockRes } from "@jest-mock/express";
import { postUrl } from "../urls-controller";
import { saveAsShortenedUrl } from "../../services";

jest.mock("../../services");

describe("urlsController", () => {
  describe("postUrl", () => {
    const { res } = getMockRes();
    const getPostUrlRequest = (url: string) =>
      getMockReq({
        body: {
          url: url,
        },
      });

    const mockedSaveAsShortenedUrl = jest.mocked(saveAsShortenedUrl);

    const validUrls = [
      "https://jspenc.com",
      "http://jspenc.com",
      "//jspenc.com",
    ];

    const invalidUrls = [
      "invalidurl",
      "http://invalidurl",
      "ftp://invalidurl",
      "1111",
      {} as string,
      undefined as string,
    ];

    test.each(validUrls)(
      "should return a 200 if the provided url (%s) is valid and saved",
      async (input) => {
        const req = getPostUrlRequest(input);

        mockedSaveAsShortenedUrl.mockResolvedValue(
          "http://jspenc.com/abcdefgh"
        );

        await postUrl(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
          expect.objectContaining({
            url: "http://jspenc.com/abcdefgh",
          })
        );
        expect(mockedSaveAsShortenedUrl).toHaveBeenCalledWith(input);
        expect(mockedSaveAsShortenedUrl).toHaveBeenCalledTimes(1);
      }
    );

    test.each(invalidUrls)(
      "should return a 400 if the provided url (%s) is invalid",
      async (input) => {
        const req = getPostUrlRequest(input);

        await postUrl(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
          expect.objectContaining({
            message: "Invalid request",
          })
        );
        expect(mockedSaveAsShortenedUrl).not.toHaveBeenCalled();
      }
    );

    test("should return a 500 if saveAsShortenedUrl throws an error", async () => {
      const req = getPostUrlRequest(validUrls[0]);
      mockedSaveAsShortenedUrl.mockImplementation(() => {
        throw new Error("Server Error");
      });

      await postUrl(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Something went wrong",
        })
      );
      expect(mockedSaveAsShortenedUrl).toHaveBeenCalledWith(validUrls[0]);
      expect(mockedSaveAsShortenedUrl).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
