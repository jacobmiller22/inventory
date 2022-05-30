import { useEffect, useState } from "react";
import { getLocation } from "api/inv";
import { useParams } from "react-router-dom";

/** Components */
import { Location } from "interfaces/location";
import { Typography } from "@mui/material";
import { editLocationRoute } from "Router/routes/client";
import { DetailsView } from "views";
import { FourOFour, Loader } from "components";

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
    return <Loader />;
  }

  if (location === null) {
    return <FourOFour article={`Location, ${query.locationId}`} />;
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
