import type { Request, Response } from "express";
import locationsService from "@/services/locations";
import { DataController } from "@/controllers/index";
import {
  IInventoryLocation,
  IInventoryLocationMap,
  TLocationID,
} from "@/types/Inventory";
import { Location, LocationId } from "@/types/location";
import { HttpStatus } from "@/types/http";

const getLocations = async (req: Request, res: Response) => {
  /** Get all locations */

  const locations = await locationsService.getLocations();

  return res.status(HttpStatus.OK).json(locations);
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

const updateLocation = async (req: Request, res: Response) => {};

const deleteLocation = async (req: Request, res: Response) => {
  /** Delete a location */
  const locationId: LocationId = req.params.locationId;

  const success = await locationsService.deleteLocation(locationId);

  if (!success) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }

  return res.status(HttpStatus.OK).end();
};

export default { getLocations, createLocation, updateLocation, deleteLocation };
