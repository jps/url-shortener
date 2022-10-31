import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import {
  errorMiddleware,
  requestLoggerMiddleware,
  notFoundMiddleware,
} from "./middleware";
import { getRecentUrls, postUrl } from "./controllers";

dotenv.config();

const port = process.env.SERVER_PORT || 3001;
const app = express();

app.use(requestLoggerMiddleware);

app.post("/urls", async (req: Request, res: Response) => await getRecentUrls(req, res));
app.get("/urls/recent", async (req: Request, res: Response) => await postUrl(req, res));

app.use(errorMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
