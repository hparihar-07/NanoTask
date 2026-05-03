import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";

  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found / Invalid ID format";
  }
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
