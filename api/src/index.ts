import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";
import {
  errorMiddleware,
  requestLoggerMiddleware,
  notFoundMiddleware,
  validatePostUrl,
} from "./middleware";
import { getRecentUrls, postUrl } from "./controllers";
import { connectToDb } from "./data";

dotenv.config();

const port = process.env.SERVER_PORT || 3001;
const corsOptions = { origin: process.env.APP_URL };
const app = express();

app.use(requestLoggerMiddleware);
app.use(express.json());

connectToDb();

app.options("/urls", cors(corsOptions));
app.post(
  "/urls",
  cors(corsOptions),
  validatePostUrl,
  async (req: Request, res: Response) => await postUrl(req, res)
);

app.get(
  "/urls/recent",
  async (req: Request, res: Response) => await getRecentUrls(req, res)
);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
