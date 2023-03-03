import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../db/models/custom-error.model";

function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customErrorNew = err;

  if (!(err instanceof CustomError)) {
    customErrorNew = new CustomError(
      "Error - Check Request",
      407,
      "Custom error handler called"
    );
  }

  // next not used to prevent default error-handler from triggering... or next(new Error())
  res.status((customErrorNew as CustomError).status).send(customErrorNew);
}

export default handleError;
