import Head from "next/head";
import { RecentUrls } from "../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const test_urls = Array.from({ length: 20 }, (_, i) => i).map(
  () => "https://jspenc.io/f3x2ab1a"
);

interface formData {
  url: string;
}

/*
Note - there is some potential complexity here... the default yup rule will do a good enough job but the UX could be 
improved as lot of users will potentially enter a protocoless url like: something.com in this scenario we could 
either feedback to the user as we do currently or a default protocol could be added.
*/
const schema = yup
  .object({
    url: yup.string().url("Please enter a valid url").max(4096).required(),
  })
  .required();

const onSubmit = (data: object) => console.log(data);

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <Head>
        <title>Url Shortener</title>
        <meta name="description" content="shorten any url for easy sharing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form className="shorten-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="shorten-form__title">Shorten URL</h2>
        <label className="visually-hidden" htmlFor="url">
          Url
        </label>
        {errors.url && (
          <div
            role="alert"
            className="shorten-form__validation form-validation-message"
          >
            {errors.url.message}
          </div>
        )}
        <input
          className={
            errors.url
              ? "shorten-form__input form-text-input form-text-input--invalid"
              : "shorten-form__input form-text-input"
          }
          {...register("url")}
          placeholder="Shorten your link e.g. https://example.com"
          required
        />
        <input
          className="shorten-form__save form-submit"
          type="submit"
          value="Shorten"
        />
      </form>
      <RecentUrls urls={test_urls} />
    </>
  );
}
