import { useEffect, useState } from "react";
import { getTag } from "api/inv";
import { useNavigate, useParams } from "react-router-dom";

/** Components */
import { BackButton, EditButton, Spacer } from "components";

import { Typography } from "@mui/material";
import styles from "./TagDetailsView.module.css";
import { replaceWildcards } from "Router/routes";
import { editTagRoute } from "Router/routes/client";
import { Tag } from "interfaces/tag";

const LocationDetailsView = () => {
  const [tag, setTag] = useState<Tag | null | undefined>(undefined);

  const query = useParams();

  const navigate = useNavigate();

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

  const handleEdit = () => {
    navigate(replaceWildcards(editTagRoute, [tag.tagId]));
  };

  return (
    <div>
      <br />
      <div className={styles["title-container"]}>
        <Typography variant="h6" className={styles["title"]}>
          {tag.name}
        </Typography>
        <Spacer />
        <EditButton onClick={handleEdit} color="primary" />
        <BackButton variant="text" />
      </div>
      <br />
    </div>
  );
};

export default LocationDetailsView;
