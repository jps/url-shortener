import { Request, Response } from "express";
import { saveAsShortenedUrl } from "../services";

export const getRecentUrls = async (req: Request, res: Response) => {
  //   const urls = await ''.find().sort({ createdAt: -1 }).limit(10);
  //   res.json(urls);
  throw new Error("Not implemented");
};

export const postUrl = async (req: Request, res: Response) => {
  const result = await saveAsShortenedUrl(req.body);
  switch (result.status) {
    case "Success":
      return res.status(200).json({
        shortenedUrl: result.shortenedUrl,
      });
    case "ValidationFailed":
      return res.status(400).json({
        message: "Invalid request",
      });
    case "FailedToSave":
      return res.status(500).json({
        message: "Failed to save url",
      });
  }
};
