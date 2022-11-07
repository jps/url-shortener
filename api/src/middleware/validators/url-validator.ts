import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
//TODO: Ideally this would live in a shared package, will accept the duplication for now
const postUrlSchema = yup
  .object({
    url: yup.string().url("Please enter a valid url").max(4096).required(),
  })
  .required();

export const validatePostUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await postUrlSchema.validate(req.body);
    return next();
  } catch (error) {
    if (error) {
      return res.status(400).json({
        name: error.name,
        message: error.message,
      });
    }
  }
};
