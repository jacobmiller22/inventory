import { useEffect, useState } from "react";
import { getItem } from "api/inv";
import { useNavigate, useParams } from "react-router-dom";

/** Components */
import { BackButton, EditButton, Spacer } from "components";
import { Tag } from "interfaces/tag";
import { Item } from "interfaces/item";
import { Chip, ImageList, ImageListItem, Typography } from "@mui/material";
import styles from "./ItemDetailsView.module.css";
import { replaceWildcards } from "Router/routes";
import { editItemRoute } from "Router/routes/client";

const ItemDetailsView = () => {
  const [item, setItem] = useState<Item | null | undefined>(undefined);

  const query = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!query.itemId) return;

    (async () => {
      setItem(await getItem(query.itemId!));
    })();
  }, [query]);

  if (item === undefined) {
    return <div>loading</div>;
  }

  if (item === null) {
    return <div>404 item not found</div>;
  }

  const renderTags = (tags: Tag[]) => {
    if (tags.length === 0) {
      return <Typography>No tags</Typography>;
    }
    return (
      <div className={styles["chip-container"]}>
        {tags.map((tag: Tag, i: number) => (
          <Chip label={tag.name} key={`chip-${i}`} />
        ))}
      </div>
    );
  };

  const renderImages = (imgSrcs: string[]) => {
    if (imgSrcs.length === 0) {
      return <Typography>No Images</Typography>;
    }
    return (
      <ImageList
        cols={2}
        gap={8}
        sx={{ width: "100%", maxWidth: "100%" }}
        rowHeight="auto"
        className={styles["imagelist"]}
      >
        {imgSrcs.map((src: string, i: number) => {
          return (
            <ImageListItem key={`img-${i}`}>
              <img src={src} />
            </ImageListItem>
          );
        })}
      </ImageList>
    );
  };

  const handleEdit = () => {
    navigate(replaceWildcards(editItemRoute, [item.itemId]));
  };

  return (
    <div>
      <br />
      <div className={styles["title-container"]}>
        <Typography variant="h6" className={styles["title"]}>
          {item.name}
        </Typography>
        <Spacer />
        <EditButton onClick={handleEdit} color="primary" />
        <BackButton variant="text" />
      </div>

      <br />
      <Typography variant="caption">Description</Typography>
      <Typography variant="body1">{item.description}</Typography>
      <br />
      <Typography variant="caption">Quantity</Typography>
      <Typography>
        {item.quantity} {item.unit}
      </Typography>
      <br />

      <Typography variant="caption">Location</Typography>
      <Typography>{item.location?.name ?? "Invalid location"}</Typography>
      <br />
      <Typography variant="caption">Tags</Typography>
      {renderTags(item.tags)}
      <br />
      <Typography variant="h6">Images</Typography>

      <div className={styles["imagelist-container"]}>
        {renderImages([
          "https://semantic-ui.com/images/wireframe/image.png",
          "https://semantic-ui.com/images/wireframe/image.png",
        ])}
      </div>
    </div>
  );
};

export default ItemDetailsView;
