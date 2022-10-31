import { Request, Response } from "express";
import { saveAsShortenedUrl } from "../services";
import * as yup from "yup";

export const getRecentUrls = async (req: Request, res: Response) => {
  //   const urls = await ''.find().sort({ createdAt: -1 }).limit(10);
  //   res.json(urls);
  throw new Error("Not implemented");
};

//TODO: Ideally this would live in a shared package, will accept the duplication for now
const postUrlSchema = yup
  .object({
    url: yup.string().url("Please enter a valid url").required(),
  })
  .required();

export const postUrl = async (req: Request, res: Response) => {
  try {
    await postUrlSchema.validate(req.body); //TODO: consider move data validation to service layer
  } catch (exception) {
    return res.status(400).json({
      message: `Invalid request`,
    });
  }
  try {
    const result = await saveAsShortenedUrl(req.body.url);
    return res.status(200).json({
      url: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
