/**
 *
 * The entry point to the route: 'server/v1/inventory/types/
 *
 */
import express from "express";
import invLocationsController from "@/controllers/inv/locations";
import { verifyExistence } from "@/middleware/existence";
import { requireAuth } from "@/middleware/auth";

const router = express();

router.get("/", requireAuth(), invLocationsController.getLocations);

router.get("/:locationId", invLocationsController.getLocation);

router.post(
  "/",
  verifyExistence(["name", "description"]),
  invLocationsController.createLocation
);

router.put("/:locationId", invLocationsController.updateLocation);

router.delete("/:locationId", invLocationsController.deleteLocation);

export default router;
