/**
 * Tools for verifying existence of objects and fields particularly on request objects.
 *
 */
import { Middleware, ServiceResponse } from "@/interfaces";
import { HttpStatus } from "@/interfaces/http";

/**
 *
 * @param {any | string[]} fields the fields to check for existence aka not undefined
 *
 */
export const verifyExistence = (fields: string[]): Middleware => {
  if (!Array.isArray(fields)) {
    throw new Error("verifyExistence requires an array of fields as input");
  }

  return ((req, res, next) => {
    if (req.body === undefined) {
      res.status(HttpStatus.BAD_REQUEST).send("Request body is undefined");
      return;
    }
    const verification = __verifyExistence(fields, req.body);
    if (!verification.success) {
      res.status(HttpStatus.BAD_REQUEST).send(verification.message);
      return;
    }
    next();
  }) as Middleware;
};

export const __verifyExistence = (
  fields: string[],
  body: any
): ServiceResponse => {
  if (!Array.isArray(fields)) {
    throw new Error("verifyExistence requires an array of fields as input");
  }

  if (body === undefined) {
    return {
      success: false,
      status: HttpStatus.BAD_REQUEST,
      message: "body is undefined",
    };
  }

  // Check for missing fields, fields with a '.' are nested objects and need to be checked recursively
  const missingFields = fields.filter((field) => {
    if (field.includes(".")) {
      const nestedObject = field
        .split(".")
        .reduce((obj, field) => obj[field], body);
      return nestedObject === undefined;
    }
    return body[field] === undefined;
  });

  if (missingFields.length > 0) {
    return {
      success: false,
      status: HttpStatus.BAD_REQUEST,
      message: `Missing required field(s): ${missingFields}`,
    };
  }
  // for (let field of fields) {
  //   if (typeof body[field] === "undefined" || body[field] === undefined) {
  //     return {
  //       success: false,
  //       status: BAD_REQUEST,
  //       message: `Missing required field: ${field}`,
  //     };
  //   }
  // }
  return {
    success: true,
    status: HttpStatus.OK,
  };
};
