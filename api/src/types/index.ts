import type { Request, Response, NextFunction } from "express";
import { HttpStatus } from "./http";

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type ServiceResponse = {
  success: boolean;
  status: HttpStatus;
  message?: string;
};
