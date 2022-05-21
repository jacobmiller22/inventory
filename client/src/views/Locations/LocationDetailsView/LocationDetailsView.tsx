import { useEffect, useState } from "react";
import { getLocation } from "api/inv";
import { useParams } from "react-router-dom";

/** Components */
import { Location } from "interfaces/location";
import { Typography } from "@mui/material";
import styles from "./LocationDetailsView.module.css";
import { editLocationRoute } from "Router/routes/client";
import { DetailsView } from "views";

const LocationDetailsView = () => {
  const [location, setLocation] = useState<Location | null | undefined>(
    undefined
  );

  const query = useParams();

  useEffect(() => {
    if (!query.locationId) return;

    (async () => {
      setLocation(await getLocation(query.locationId!));
    })();
  }, [query]);

  if (location === undefined) {
    return <div>loading</div>;
  }

  if (location === null) {
    return <div>404 location not found</div>;
  }

  return (
    <DetailsView
      editRoute={editLocationRoute}
      idKey="locationId"
      item={location}
    >
      <Typography variant="caption">Description</Typography>
      <Typography variant="body1">{location.description}</Typography>
      <br />
    </DetailsView>
  );
};

export default LocationDetailsView;
