import { BAD_REQUEST } from "http-status";
import { ZodError, ZodIssue } from "zod";

const zod_error = (err: ZodError) => {
  const message = "Validation error";
  const statusCode = BAD_REQUEST;
  const errorMessages = err?.issues?.map((issue: ZodIssue) => {
    return {
      path: issue?.path?.[issue?.path?.length - 1],
      message: issue?.message,
    };
  });
  return {
    message,
    statusCode,
    errorMessages,
  };
};

export default zod_error;
