/** Interfaces/types */

import { getUsers } from "api/users";
import { DataTable } from "components";
import { MinUser, User, UserId } from "interfaces/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { replaceWildcards } from "Router/routes";
import { newUserRoute, userDetailsRoute } from "Router/routes/client";

/** components */

interface IUsersViewProps {}

const UsersView = ({}: IUsersViewProps) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<MinUser[] | null>(null);

  useEffect(() => {
    (async () => {
      setUsers(await getUsers());
    })();
  }, []);

  const handleCellDoubleClick = (cell: { id: UserId }) => {
    navigate(replaceWildcards(userDetailsRoute, [cell.id]));
  };

  const handleDelete = async (userIds: UserId[]): Promise<boolean> => {
    return true;
  };
  const dataTableProps = {
    idKey: "_id",
    items: users,
    columns,
    onCellDoubleClick: handleCellDoubleClick,
    title: "Tags",
    addLink: newUserRoute.path,
    onDelete: handleDelete,
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
    field: "username",
    headerName: "username",
    width: 250,
    editable: false,
  },
];
