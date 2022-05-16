/**
 * Route: `/users/<path>`
 */

import express from "express";
const router = express();

import userController from "@/controllers/users";
import { hasRole, hasRoleOrIsSubject } from "@/middleware/auth";
import { Role } from "@/interfaces/user";
import { verifyExistence } from "@/middleware/existence";

/**
 * Get a list of all users and their public information (This includes the user's won auctions)
 */
router.get("/", userController.getMinUsers);

/**
 * Information about user with the given id
 */
router.get("/:id", hasRoleOrIsSubject([Role.ADMIN]), userController.getUser);

router.post("/", hasRole([Role.ADMIN]), userController.createUsers);

router.put(
  "/:id/email",
  hasRoleOrIsSubject([Role.ADMIN]),
  verifyExistence(["email"]),
  userController.updateUserEmail
);

router.put(
  "/:id/picture",
  hasRoleOrIsSubject([Role.ADMIN]),
  verifyExistence(["src"]),
  userController.updateUserPicture
);

router.delete(
  "/:id",
  hasRoleOrIsSubject([Role.ADMIN]),
  userController.deleteUser
);

// module.exports = router;
export default router;
