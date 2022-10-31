import { NextFunction, Request, Response } from "express";
import HttpException from "../types/http-exception";

export const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  console.error(
    JSON.stringify({
      requestTime: Date.now(),
      method: request.method,
      url: request.url,
      params: request.params,
      status: status,
      message: message,
    })
  );

  if (response.headersSent) {
    return next(error)
  }

  response.status(status).send({
    status,
    message,
  });
};