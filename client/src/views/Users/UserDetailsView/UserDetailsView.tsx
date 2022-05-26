/** Interfaces/types */

import { Avatar, Typography } from "@mui/material";
import { getUser } from "api/users";
import { ChipList } from "components";
import { User } from "interfaces/user";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editUserRoute } from "Router/routes/client";
import DetailsView from "views/DetailsView";
import styles from "./UserDetailsView.module.css";

/** components */

const UserDetailsView = () => {
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

  const item = {
    userId: user.userId,
    name: user.username,
  };

  return (
    <DetailsView editRoute={editUserRoute} idKey="userId" item={item}>
      <Typography variant="caption">Name</Typography>
      <Typography>
        {user.firstName} {user.lastName}
      </Typography>
      <br />

      <Typography variant="caption">Email</Typography>
      <Typography>{user.email}</Typography>
      <br />
      <Typography variant="caption">Roles</Typography>
      <ChipList
        items={user.roles}
        chipProps={{
          variant: "outlined",
          color: "secondary",
        }}
        noneText="No roles"
      />
      <br />
      <Typography variant="caption">Profile Source URL</Typography>
      <div className={styles["profile-container"]}>
        <Avatar src={user.profileSrc} />
        <Typography>{user.profileSrc}</Typography>
      </div>
      <br />
    </DetailsView>
  );
};

export default UserDetailsView;
