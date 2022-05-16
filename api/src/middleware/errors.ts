import { ErrorMiddleware } from "@/interfaces";
import { HttpStatus } from "@/interfaces/http";

const errorHandler: ErrorMiddleware = (err, req, res, next) => {
  if (typeof err === "string") {
    // custom application error
    return res.status(HttpStatus.BAD_REQUEST).json({ message: err });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
  }

  //If trying to access without a valid JWT token the middleware will throw an 'UnauthorizedError' error which will be caught in here:
  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    console.log("error middleware:");
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Invalid authorization token" });
  }

  // default to 500 server error
  console.error("Error:", err);
  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
};

export default errorHandler;
