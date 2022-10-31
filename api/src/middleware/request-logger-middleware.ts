import { NextFunction, Request, Response } from "express";

export const requestLoggerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.info(
    `Request Logger: requestTime:${Date.now()}, method:${req.method}, url:${
      req.url
    }`
  );
  next();
};
