/**
 * Location routes for inventory v1 API
 *
 * @requires - verification middleware to ensure that the user is authenticated from upstream routes.
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
