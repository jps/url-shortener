import { render, screen, waitFor } from "@testing-library/react";
import { ShortenUrlForm } from "../shorten-url-form";
import userEvent from "@testing-library/user-event";

describe("ShortenUrlForm should", () => {
  it("render as expected", () => {
    const { asFragment } = render(<ShortenUrlForm onSubmit={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("submit form for valid url", async () => {
    const onSubmit = jest.fn();
    userEvent.setup();

    render(<ShortenUrlForm onSubmit={onSubmit} />);

    const textInput = screen.getByLabelText<HTMLInputElement>("Url");
    const submitButton = screen.getByText("Shorten");
    const validUrl = "https://example.com";

    await userEvent.type(textInput, validUrl);
    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ url: validUrl });
    expect(textInput.value).toBe("");
  });

  it("show error for invalid url", async () => {
    const onSubmit = jest.fn();
    userEvent.setup();

    render(<ShortenUrlForm onSubmit={onSubmit} />);

    const textInput = screen.getByLabelText("Url");
    const submitButton = screen.getByText("Shorten");

    await userEvent.type(textInput, "0123456789");
    await userEvent.click(submitButton);

    await waitFor(() => screen.getByText("Please enter a valid url"));

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
