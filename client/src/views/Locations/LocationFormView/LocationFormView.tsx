import fieldsTemplate from "./fields";
import schema from "./schema";
import {
  createLocation as __createLocation,
  getLocation,
  updateLocation as __updateLocation,
} from "api/inv";
import { useParams, useNavigate } from "react-router-dom";

/** Components */
import { Location, LocationId } from "interfaces/location";
import { FormView } from "views";
import { useEffect, useState } from "react";

type Params = {
  locationId?: LocationId;
};

interface LocationFormViewProps {}

const LocationFormView = ({}: LocationFormViewProps) => {
  const params: Params = useParams();

  const [fields, setFields] = useState<any[] | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  const isEdit = Boolean(params.locationId);

  useEffect(() => {
    if (!isEdit) {
      // No route params.. This is the new location route
      setFields(fieldsTemplate);
      return;
    }

    // Route params.. this is the edit location route
    if (!location) return; // Populate fields once we have a location

    const newFields: any[] = populateFields(location);
    setFields(newFields);
  }, [params, location]);

  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      setLocation(await getLocation(params.locationId!));
    })();
  }, [params]);

  const handleSubmit = async (
    values: Omit<Location, "locationId">
  ): Promise<boolean> => {
    console.log("Submit!", values);
    // Create the tag if we are on the new tag route, otherwise update the tag

    if (isEdit) {
      // This is an existing tag
      return await updateLocation(params.locationId!, values);
    }

    // This is a new tag
    return await createLocation(values);
  };

  return (
    <FormView
      schema={schema}
      fields={fields}
      onSubmit={handleSubmit}
      resetOnSuccess={!Boolean(params.locationId)}
    />
  );
};

export default LocationFormView;

const createLocation = async (values: Omit<Location, "locationId">) => {
  const { name, description } = values;

  const newLocation: Omit<Location, "locationId"> = {
    name,
    description,
    items: [], // Likely going to be removing items from the location schema
  };

  const locationId: LocationId | null = await __createLocation(newLocation);

  return Boolean(locationId);
};

const updateLocation = async (
  locationId: LocationId,
  values: Omit<Location, "locationId" | "items">
): Promise<boolean> => {
  const { name, description } = values;

  const newLocation: Omit<Location, "locationId" | "items"> = {
    name,
    description,
  };

  const success: boolean = await __updateLocation(locationId, newLocation);

  return success;
};

const populateFields = (location: Location) => {
  return fieldsTemplate.map((field) => {
    //@ts-expect-error
    return { ...field, initialValue: location[field.name] };
  });
};
