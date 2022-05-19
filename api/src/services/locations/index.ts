/**
 * Location Service
 *
 *
 */

import {
  LocationId,
  Location,
  MinLocation,
  LocationDocument,
} from "@/types/location";
import { Location as LocationModel } from "@/models";
import { v4 as uuid } from "uuid";

const getLocations = async (): Promise<MinLocation[]> => {
  const locations: LocationDocument[] = await LocationModel.find();
  return locations.map((loc: LocationDocument) => locDoc2MinLoc(loc));
};

const getLocation = async (id: LocationId): Promise<Location | null> => {
  const location: LocationDocument | null = await LocationModel.findById(id);

  if (!location) {
    return null;
  }

  return locDoc2Loc(location);
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
  try {
    await LocationModel.findByIdAndUpdate(id, location);
    return true;
  } catch (err) {
    return false;
  }
};

const deleteLocation = async (id: LocationId): Promise<boolean> => {
  try {
    await LocationModel.findByIdAndDelete(id);
    return true;
  } catch (err) {
    return false;
  }
};

const locDoc2MinLoc = (loc: LocationDocument): MinLocation => {
  if (!loc) {
    throw "A nonnull LocationDocument must be passed to locRecord";
  }

  const { _id, name, description } = loc ?? {};

  return {
    locationId: _id,
    name,
    description,
  };
};

const locDoc2Loc = (loc: LocationDocument): Location => {
  if (!loc) {
    throw "A nonnull LocationDocument must be passed to locRecord";
  }

  const { _id, name, description, items } = loc ?? {};

  return {
    locationId: _id,
    name,
    description,
    items,
  };
};

export default {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
  locDoc2MinLoc,
};
