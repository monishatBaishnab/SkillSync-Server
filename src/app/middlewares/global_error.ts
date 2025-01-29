import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import http_error from "../errors/http_error";
import sanitize_prisma_error from "../errors/prisma_error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import zod_error from "../errors/zod_error";

const global_error = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const success: boolean = false;
  let status: number = err?.statusCode || httpStatus.BAD_REQUEST;
  let message: string = err?.name || "Something want wrong.";
  let errorMessages;
  

  if (err instanceof ZodError) {
    const simplifiedError = zod_error(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err instanceof PrismaClientKnownRequestError) {
    const prismaError = sanitize_prisma_error(err);
    message = prismaError.message;
    status = prismaError.statusCode;
  } else if (err instanceof http_error) {
    status = err.statusCode;
    message = err.message;
  }

  res.status(status).send({
    success,
    status,
    message,
    errorMessages,
  });
};

export default global_error;
