/** Interfaces/types */

import { Avatar } from "@mui/material";
import { getUsers as __getUsers, deleteUsers } from "api/users";
import { DataTable, ChipList } from "components";
import { MinUser, UserId } from "interfaces/user";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { replaceWildcards } from "Router/routes";
import { newUserRoute, userDetailsRoute } from "Router/routes/client";
import { useSnackbar } from "notistack";

/** components */

const UsersView = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<MinUser[] | null | undefined>(undefined);

  const { enqueueSnackbar } = useSnackbar();

  const getUsers = async () => {
    const __users = await __getUsers();
    if (__users === null) {
      enqueueSnackbar("Error getting users", { variant: "error" });
    }
    setUsers(__users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleCellDoubleClick = (cell: { id: UserId }) => {
    navigate(replaceWildcards(userDetailsRoute, [cell.id]));
  };

  const handleDelete = async (userIds: UserId[]): Promise<boolean> =>
    await deleteUsers(userIds);

  const dataTableProps = {
    idKey: "userId",
    items: users,
    columns,
    onCellDoubleClick: handleCellDoubleClick,
    title: "Tags",
    addLink: newUserRoute.path,
    onDelete: handleDelete,
    deleteFailText: "Error while deleting user(s).",
    onRefreshRequest: () => getUsers(),
  };

  return (
    <div>
      <br />
      <DataTable {...dataTableProps} />
    </div>
  );
};

export default UsersView;

const columns: any[] = [
  {
    field: "profileSrc",
    headerName: "Pic",
    width: 60,
    editable: false,
    renderCell: (params: any) => <Avatar src={params.row.profileSrc} />,
  },
  {
    field: "username",
    headerName: "username",
    width: 250,
    editable: false,
  },
  {
    field: "roles",
    headerName: "Roles",
    width: 200,
    editable: false,
    renderCell: (params: any) => (
      <ChipList
        items={params.row.roles.map((role: string) => _.capitalize(role))}
        chipProps={{
          variant: "outlined",
          color: "secondary",
        }}
      />
    ),
  },
];
