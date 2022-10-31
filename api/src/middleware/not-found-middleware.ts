import { NextFunction, Request, Response } from "express";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.info(
    `Not Found - requestTime:${Date.now()}, method:${req.method}, url:${req.url}`
  );

  res.status(404).send({ status: 404, message: "Not found" });
};
