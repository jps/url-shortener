import { render } from "@testing-library/react";
import { RecentUrls } from "../";

describe("RecentUrls should", () => {
  it("render as expected", () => {
    const { asFragment } = render(
        <RecentUrls urls={["https://jspenc.com/238748", "https://jspenc.com/rzo87mwn"]}  />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
