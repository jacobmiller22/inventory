import { expressjwt } from "express-jwt";
import usersService from "@/services/users";
import config from "@/config.json";
import type { Request, Response, NextFunction } from "express";
import { Role, User } from "@/types/user";
import { HttpStatus } from "@/types/http";
import { Middleware } from "@/types";

// const STATIC_ROUTES: RegExp[] = [/^.*\.ico/, /^.*\.js*/, /^.*\.css/];

// const PUBLIC_ROUTES: RegExp[] = [
//   ...STATIC_ROUTES,
//   /^\/$/d,
//   /^\/auth\/login\/?$/d,
//   /^\/auth\/signup\/?$/d,
//   /^\/auctions\/?$/d,
//   /^\/auctions\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/?$/d,
//   /^\/users\/?$/d,
// ];

export const requireAuth = (): Middleware[] => {
  const secret = config.secret;

  return [
    //@ts-ignore
    new expressjwt({ secret, isRevoked, algorithms: ["HS256"] }),
    async (err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status).json(err);
      return;
    },
  ];
};
type DecodedToken = {
  header: { alg: "HS256"; typ: "JWT" };
  payload: { sub: string; roles: Role[]; iat: number; exp: number };
  signature: string;
};

const isRevoked = async (
  req: Request,
  decodedTok: DecodedToken
): Promise<boolean> => {
  if (!decodedTok?.payload) {
    return true;
  }

  const user = await usersService.getUser(decodedTok.payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return true;
  }

  return false;
};

/**
 * Wraps the given middleware by ensuring the jwt middleware is run beforehand, this is to ensure
 * the use of wrapped middleware verifies the jwt token without needing to also specify it for every route.
 * @param middleware a middleware function that will run after the auth middleware
 * @returns
 */
const claimsWrapper = (middleware: Middleware): Middleware[] => {
  return [...requireAuth(), middleware];
};

export const hasRole = (roles: Role[]) => {
  const middleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //@ts-expect-error
    if (!req?.auth) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
      return;
    }

    //@ts-expect-error
    const { roles: userRoles } = req.auth;

    if (
      userRoles.some((role: Role) => roles.includes(role.toLowerCase() as Role))
    ) {
      next();
      return;
    }
    res.status(HttpStatus.FORBIDDEN).end();
    return;
  };

  return claimsWrapper(middleware);
};

export const isSubject = () => {
  const middleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //@ts-expect-error
    if (!req?.user) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }
    //@ts-expect-error
    const { sub }: { sub: string } = req?.user;

    if (sub !== req.params.id) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }
    next();
    return;
  };

  return claimsWrapper(middleware);
};

/**
 *
 * Ensures that the jwt token is valid
 *
 * @param roles
 * @returns
 */
export const hasRoleOrIsSubject = (roles: Role[]) => {
  const middleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //@ts-expect-error
    if (!req?.user) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }
    //@ts-expect-error
    const { sub }: { sub: string } = req?.user;

    if (sub === req.params.id) {
      next();
      return;
    }
    const user: User | null = await usersService.getUser(sub);
    if (user?.roles.some((role: Role) => roles.includes(role))) {
      // Check if the user has the required role
      next();
      return;
    }
    res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
    return;
  };

  return claimsWrapper(middleware);
};
