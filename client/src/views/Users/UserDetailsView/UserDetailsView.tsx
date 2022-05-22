/** Interfaces/types */

import { Typography } from "@mui/material";
import { getUser } from "api/users";
import { ChipList } from "components";
import { Role, User } from "interfaces/user";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editUserRoute } from "Router/routes/client";
import DetailsView from "views/DetailsView";
import styles from "./UserDetailsView.module.css";

/** components */

interface UserDetailsViewProps {}

const UserDetailsView = ({}: UserDetailsViewProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const query = useParams();

  useEffect(() => {
    if (!query.userId) return;

    (async () => {
      setUser(await getUser(query.userId!));
    })();
  }, [query]);

  if (user === undefined) {
    return <div>loading</div>;
  }

  if (user === null) {
    return <div>404 item not found</div>;
  }

  // const renderImages = (imgSrcs: string[]) => {
  //   if (imgSrcs.length === 0) {
  //     return <Typography>No Images</Typography>;
  //   }
  //   return (
  //     <ImageList
  //       cols={2}
  //       gap={8}
  //       sx={{ width: "100%", maxWidth: "100%" }}
  //       rowHeight="auto"
  //       className={styles["imagelist"]}
  //     >
  //       {imgSrcs.map((src: string, i: number) => {
  //         return (
  //           <ImageListItem key={`img-${i}`}>
  //             <img src={src} />
  //           </ImageListItem>
  //         );
  //       })}
  //     </ImageList>
  //   );
  // };

  const item = {
    userId: user.userId,
    name: user.username,
  };

  return (
    <DetailsView editRoute={editUserRoute} idKey="userId" item={item}>
      {/* <Typography variant="caption">Description</Typography>
      <Typography variant="body1">{item.description}</Typography>
      <br />
      <Typography variant="caption">Quantity</Typography>
      <Typography>
        {item.quantity} {item.unit}
      </Typography>
      <br />

      <Typography variant="caption">Location</Typography>
      <Typography>{item.location?.name ?? "Invalid location"}</Typography>
      <br /> */}
      <Typography variant="caption">Tags</Typography>

      <ChipList items={user.roles} />
      <br />
    </DetailsView>
  );
};

export default UserDetailsView;
