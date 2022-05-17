/**
 * Location Service
 *
 *
 */

import { LocationId, Location } from "@/types/location";
import { Location as LocationModel } from "@/models";
import { v4 as uuid } from "uuid";

const getLocations = async (): Promise<Location[]> => {
  const locations = await LocationModel.find();
  return locations;
};

const getLocation = async (id: LocationId): Promise<Location> => {
  const location = await LocationModel.findById(id);
  return location;
};

const createLocation = async (
  location: Omit<Location, "locationId">
): Promise<LocationId | null> => {
  const locationId = `l_${uuid()}`;
  const newLocation = { ...location, _id: locationId };

  try {
    await LocationModel.create(newLocation);
    return locationId;
  } catch (err) {
    console.error("Error creating location", err);
    return null;
  }
};

const updateLocation = async (
  id: LocationId,
  location: Omit<Partial<Location>, "locationId">
): Promise<boolean> => {
  return false;
};

const deleteLocation = async (id: LocationId): Promise<boolean> => {
  try {
    await LocationModel.findByIdAndDelete(id);
    return true;
  } catch (err) {
    return false;
  }
};

export default {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
