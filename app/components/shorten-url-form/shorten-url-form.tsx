import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface ShortenFormData {
  url: string;
}

export interface ShortenUrlFormProps {
  onSubmit: (data: ShortenFormData) => void;
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

export const ShortenUrlForm = ({ onSubmit }: ShortenUrlFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShortenFormData>({
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (data: ShortenFormData) => {
    try {
      setIsSubmitting(true);
      onSubmit(data);
      reset();
    } catch (exception) {
      //TODO: feedback to user if there is a server error
    }
    setIsSubmitting(false);
  };

  return (
    <form className="shorten-form" onSubmit={handleSubmit(onSubmitHandler)}>
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
        id="url"
        className={`shorten-form__input form-text-input${
          errors.url ? " form-text-input--invalid" : ""
        }`}
        {...register("url")}
        placeholder="Shorten your link e.g. https://example.com"
        required
      />
      <input
        className="shorten-form__save form-submit"
        type="submit"
        value="Shorten"
        disabled={isSubmitting}
      />
    </form>
  );
};
