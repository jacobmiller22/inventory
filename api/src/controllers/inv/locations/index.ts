import type { Request, Response } from "express";
import locationsService from "@/services/locations";

import {
  isValidLocationId,
  Location,
  LocationId,
  LocationList,
} from "@/types/location";
import { HttpStatus } from "@/types/http";
import { removeUndefined } from "@/lib/validators";

const getLocations = async (req: Request, res: Response) => {
  /** Get all locations */

  const locations: LocationList = await locationsService.getLocations();

  return res.status(HttpStatus.OK).json(locations);
};

const getLocation = async (req: Request, res: Response) => {
  /** Get information about a location */
  const locationId: any = req.params.locationId;

  if (!isValidLocationId(locationId)) {
    return res.status(HttpStatus.BAD_REQUEST).end("Invalid locationId");
  }

  const location: Location | null = await locationsService.getLocation(
    locationId
  );

  if (!location) {
    return res.status(HttpStatus.NOT_FOUND).end();
  }

  return res.status(HttpStatus.OK).json(location);
};

const createLocation = async (req: Request, res: Response) => {
  /** Add a new location */

  const location: Omit<Location, "locationId"> = {
    name: req.body.name,
    description: req.body.description,
    items: [],
  };

  const locationId: LocationId | null = await locationsService.createLocation(
    location
  );

  if (locationId === null) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }

  return res.status(200).json(locationId);
};

const updateLocation = async (req: Request, res: Response) => {
  const locationId: LocationId | any = req.params.locationId;

  if (!isValidLocationId(locationId)) {
    return res.status(HttpStatus.BAD_REQUEST).end("Invalid locationId");
  }

  let newLocation: Omit<Location, "locationId" | "items"> = {
    name: req.body.name,
    description: req.body.description,
  };

  if (newLocation.name && typeof newLocation.name !== "string") {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("Location name must be a string");
  }

  if (newLocation.description && typeof newLocation.description !== "string") {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("Location description must be a string");
  }

  /** Remove undefined values from newLocation object */
  newLocation = removeUndefined(newLocation);

  if (Object.keys(newLocation).length === 0) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("None of the given fields are valid");
  }

  const success = await locationsService.updateLocation(
    locationId,
    newLocation
  );

  if (!success) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }

  return res.status(HttpStatus.OK).end();
};

const deleteLocation = async (req: Request, res: Response) => {
  /** Delete a location */
  const locationId: LocationId = req.params.locationId;

  if (!isValidLocationId(locationId)) {
    return res.status(HttpStatus.BAD_REQUEST).end("Invalid locationId");
  }

  const success = await locationsService.deleteLocation(locationId);

  if (!success) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }

  return res.status(HttpStatus.OK).end();
};

export default {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
