import { getMockReq, getMockRes } from "@jest-mock/express";
import { validatePostUrl } from "../";

describe("urlValidator", () => {
  describe("postUrl", () => {
    const { res, next } = getMockRes();

    const instantiateBodyUrl = (url: unknown) => ({
      body: {
        url: url,
      },
    });

    const validRequests = [
      { ...instantiateBodyUrl("https://www.google.com") },
      { ...instantiateBodyUrl("https://jspenc.com") },
      { ...instantiateBodyUrl("http://jspenc.com") },
      { ...instantiateBodyUrl("//jspenc.com") },
    ];

    validRequests.forEach((request) =>
      test("should call next when valid request", async () => {
        const req = getMockReq(request);
        await validatePostUrl(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      })
    );

    const invalidRequests = [
      { ...instantiateBodyUrl("invalidurl") },
      { ...instantiateBodyUrl("http://invalidurl") },
      { ...instantiateBodyUrl("ftp://invalidurl") },
      { ...instantiateBodyUrl("1111") },
      { ...instantiateBodyUrl(1) },
      { ...instantiateBodyUrl({} as string) },
      { ...instantiateBodyUrl(undefined as string) },
      {},
      [],
    ];

    invalidRequests.forEach((request) =>
      test("should return status code 400 when invalid request", async () => {
        const req = getMockReq(request);
        await validatePostUrl(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(next).not.toHaveBeenCalled();
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
