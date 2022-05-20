import { useEffect, useState } from "react";
import { getLocation } from "api/inv";
import { useNavigate, useParams } from "react-router-dom";

/** Components */
import { BackButton, EditButton, Spacer } from "components";
import { Location } from "interfaces/location";
import { Typography } from "@mui/material";
import styles from "./LocationDetailsView.module.css";
import { replaceWildcards } from "Router/routes";
import { editItemRoute } from "Router/routes/client";

const LocationDetailsView = () => {
  const [location, setLocation] = useState<Location | null | undefined>(
    undefined
  );

  const query = useParams();

  const navigate = useNavigate();

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
    return <div>404 item not found</div>;
  }

  const handleEdit = () => {
    navigate(replaceWildcards(editItemRoute, [location.locationId]));
  };

  return (
    <div>
      <br />
      <div className={styles["title-container"]}>
        <Typography variant="h6" className={styles["title"]}>
          {location.name}
        </Typography>
        <Spacer />
        <EditButton onClick={handleEdit} color="primary" />
        <BackButton variant="text" />
      </div>

      <br />
      <Typography variant="caption">Description</Typography>
      <Typography variant="body1">{location.description}</Typography>
      <br />
    </div>
  );
};

export default LocationDetailsView;
