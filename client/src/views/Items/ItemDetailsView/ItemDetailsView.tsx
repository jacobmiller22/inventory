import { useEffect, useState } from "react";
import { getItem } from "api/inv";
import { useParams } from "react-router-dom";

/** Components */
import { Tag } from "interfaces/tag";
import { Item } from "interfaces/item";
import { ImageList, ImageListItem, Typography } from "@mui/material";
import styles from "./ItemDetailsView.module.css";
import { editItemRoute } from "Router/routes/client";
import { DetailsView } from "views";
import { ChipList } from "components";

const ItemDetailsView = () => {
  const [item, setItem] = useState<Item | null | undefined>(undefined);

  const query = useParams();

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
              <img src={src} alt="" />
            </ImageListItem>
          );
        })}
      </ImageList>
    );
  };

  return (
    <DetailsView editRoute={editItemRoute} idKey="itemId" item={item}>
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
      <ChipList
        items={item.tags.map((tag: Tag) => tag.name)}
        chipProps={{
          variant: "outlined",
          color: "secondary",
        }}
        noneText="No tags"
      />
      <br />
      <Typography variant="h6">Images</Typography>

      <div className={styles["imagelist-container"]}>
        {renderImages([
          "https://semantic-ui.com/images/wireframe/image.png",
          "https://semantic-ui.com/images/wireframe/image.png",
        ])}
      </div>
    </DetailsView>
  );
};

export default ItemDetailsView;
