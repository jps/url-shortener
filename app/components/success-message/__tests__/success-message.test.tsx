import { render } from "@testing-library/react";
import { SuccessMessage } from "../";

describe("SuccessMessage should", () => {
  it("render as expected", () => {
    const { asFragment } = render(
      <SuccessMessage shortenedUrl="https://example.com" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
