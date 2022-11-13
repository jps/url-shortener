import { Request, Response } from "express";
import { saveAsShortenedUrl, recentUrls } from "../services";

export const getRecentUrls = async (req: Request, res: Response) => {
  const result = await recentUrls();
  switch (result.status) {
    case "Success":
      return res.status(200).json({
        urls: result.shortenedUrls,
      });
    case "FailedToGet":
      return res.status(500).json({
        message: "Failed to get recent urls",
      });
  }
};

export const postUrl = async (req: Request, res: Response) => {
  const result = await saveAsShortenedUrl(req.body);
  switch (result.status) {
    case "Success":
      return res.status(200).json({
        shortenedUrl: result.shortenedUrl,
      });
    case "FailedToSave":
      return res.status(500).json({
        message: "Failed to save url",
      });
  }
};
