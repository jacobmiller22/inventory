import fieldsTemplate from "./fields";
import schema from "./schema";
import { createLocation, getLocation } from "api/inv";
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

  useEffect(() => {
    if (Object.keys(params).length === 0) {
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
    if (!params.locationId) return;

    (async () => {
      setLocation(await getLocation(params.locationId!));
    })();
  }, [params]);

  const handleSubmit = async (
    values: Omit<Location, "locationId">
  ): Promise<boolean> => {
    console.log("Submit!", values);
    const success: boolean = await __createLocation(values);
    return success;
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

const __createLocation = async (values: Omit<Location, "locationId">) => {
  const { name, description } = values;

  const newLocation: Omit<Location, "locationId"> = {
    name,
    description,
    items: [], // Likely going to be removing items from the location schema
  };

  const locationId: LocationId | null = await createLocation(newLocation);

  return Boolean(locationId);
};

const populateFields = (location: Location) => {
  return fieldsTemplate.map((field) => {
    //@ts-expect-error
    return { ...field, initialValue: location[field.name] };
  });
};
