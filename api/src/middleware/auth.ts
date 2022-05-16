import { expressjwt } from "express-jwt";
import usersService from "@/services/users";
import config from "@/config.json";
import type { Request, Response, NextFunction } from "express";
import { Role, User } from "@/interfaces/user";
import { HttpStatus } from "@/interfaces/http";

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

export const requireAuth = () => {
  const secret = config.secret;

  return [
    //@ts-ignore
    new expressjwt({ secret, isRevoked, algorithms: ["HS256"] }),
    (err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status).json(err);
    },
  ];
};

const isRevoked = async (
  req: Request,
  payload: any,
  done: (err?: any, revoked?: boolean) => void
): Promise<void> => {
  const user = await usersService.getUser(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    done(null, true);
    return;
  }
  done();
};

export const hasRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-expect-error
    const { roles: userRoles } = req.user;
    if (userRoles.some((role: Role) => roles.includes(role))) {
      next();
    }
  };
};

export const isSubject = () => {
  return (req: Request, res: Response, next: NextFunction) => {
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
};

export const hasRoleOrIsSubject = (roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
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
};
