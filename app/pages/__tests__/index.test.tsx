import { render, screen } from "@testing-library/react";
import React from "react";
import Home, { getServerSideProps } from "..";

let testUrls = ["https://jspenc.com/abcdefg", "https://jspenc.com/123456"];

const mockUseFetchUrlsQuery = jest.fn(() => ({
  data: { urls: [] as Array<string> },
}));

const mockUsePostUrlMutation = jest.fn(() => {
  return { mutate: jest.fn() };
});

const mockUseSavedUrl = jest.fn(() => ({
  isFetched: false,
}));

jest.mock("../../hooks", () => ({
  useFetchUrlsQuery: () => mockUseFetchUrlsQuery(),
  usePostUrlMutation: () => mockUsePostUrlMutation(),
  useSavedUrl: () => mockUseSavedUrl(),
}));

jest.mock("../../clients/url-client", () => ({
  fetchRecentUrlsInternal: async () => ({
    urls: testUrls,
  }),
}));

describe("index should", () => {
  describe("should render as expected", () => {
    const RendersAsExpected = () => {
      const { asFragment } = render(
        <Home
          recentUrls={{
            urls: [],
            status: "Success",
          }}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    };

    it("when no recent urls", () => {
      RendersAsExpected();
    });

    it("when recent urls", () => {
      mockUseFetchUrlsQuery.mockImplementationOnce(() => ({
        data: {
          urls: testUrls,
        },
      }));
      RendersAsExpected();
      screen.getByText("https://jspenc.com/abcdefg");
    });

    it("when success message", () => {
      mockUseSavedUrl.mockImplementationOnce(() => ({
        isFetched: true,
        data: {
          shortenedUrl: "https://jspenc.com/87654321",
          status: "Success",
        },
      }));

      RendersAsExpected();
      screen.getByText("https://jspenc.com/87654321");
    });
  });

  it("should get data for SSR", async () => {
    const result = await getServerSideProps();

    expect(result).toEqual({ props: { recentUrls: { urls: testUrls } } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
