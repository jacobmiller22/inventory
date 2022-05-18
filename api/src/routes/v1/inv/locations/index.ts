/**
 *
 * The entry point to the route: 'server/v1/inventory/types/
 *
 */
import express from "express";
import invLocationsController from "@/controllers/inv/locations";
import { verifyExistence } from "@/middleware/existence";

const router = express();

router.get("/", invLocationsController.getLocations);

router.get("/:locationId", invLocationsController.getLocation);

router.post(
  "/",
  verifyExistence(["name", "description"]),
  invLocationsController.createLocation
);

router.put("/:locationId", invLocationsController.updateLocation);

router.delete("/:locationId", invLocationsController.deleteLocation);

export default router;
