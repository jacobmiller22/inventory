import { useEffect, useState } from "react";
import { getTag } from "api/inv";
import { useParams } from "react-router-dom";

/** Components */
import { Typography } from "@mui/material";
import styles from "./TagDetailsView.module.css";
import { editTagRoute } from "Router/routes/client";
import { Tag } from "interfaces/tag";
import { DetailsView } from "views";

const LocationDetailsView = () => {
  const [tag, setTag] = useState<Tag | null | undefined>(undefined);

  const query = useParams();

  useEffect(() => {
    if (!query.tagId) return;

    (async () => {
      setTag(await getTag(query.tagId!));
    })();
  }, [query]);

  if (tag === undefined) {
    return <div>loading</div>;
  }

  if (tag === null) {
    return <div>404 tag not found</div>;
  }

  return (
    <DetailsView editRoute={editTagRoute} key="tagId" item={tag}></DetailsView>
  );
};

export default LocationDetailsView;
