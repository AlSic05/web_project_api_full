import { errorLogger } from "./logger.js";

export const errorHandler = (err, req, res, next) => {
  errorLogger.error({
    message: err.message,
    statusCode: err.statusCode || 500,
    stack: err.stack,
    date: new Date().toISOString(),
  });

  const statusCode = err.statusCode || 500;

  res.status(statusCode).send({
    message:
      statusCode === 500
        ? "Se ha producido un error en el servidor"
        : err.message,
  });
};
