/**
 * Route: `/users/<path>`
 */

import express from "express";
const router = express();

import userController from "@/controllers/users";
import { hasRole, hasRoleOrIsSubject } from "@/middleware/auth";
import { Role } from "@/types/user";
import { verifyExistence } from "@/middleware/existence";

/**
 * Get a list of all users and their public information (This includes the user's won auctions)
 */
router.get("/", userController.getMinUsers);

/**
 * Information about user with the given id
 */
router.get(
  "/:userId",
  hasRoleOrIsSubject([Role.USER, Role.ADMIN]),
  userController.getUser
);

router.post("/", hasRole([Role.ADMIN]), userController.createUsers);

router.put(
  "/:userId/email",
  hasRoleOrIsSubject([Role.ADMIN]),
  verifyExistence(["email"]),
  userController.updateUserEmail
);

router.put(
  "/:userId/picture",
  hasRoleOrIsSubject([Role.ADMIN]),
  verifyExistence(["src"]),
  userController.updateUserPicture
);

export default router;
