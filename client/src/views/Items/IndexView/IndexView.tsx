import { useState, useEffect } from "react";
import styles from "./IndexView.module.css";
import { DataTable } from "components";
import { getItems } from "api/inv";
import { ItemId, MinItem } from "interfaces/item";
import { Tag } from "interfaces/tag";
import { itemDetailsRoute, newItemRoute } from "Router/routes/client";
import { replaceWildcards } from "Router/routes";
import { useNavigate } from "react-router-dom";

const IndexView = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MinItem[] | null>(null);

  useEffect(() => {
    (async () => {
      setItems(await getItems());
    })();
  }, []);

  const handleCellDoubleClick = (cell: { id: ItemId }) => {
    navigate(replaceWildcards(itemDetailsRoute, [cell.id]));
  };

  const handleDelete = async (itemIds: ItemId[]): Promise<boolean> => {
    return true;
  };

  const dataTableProps = {
    idKey: "itemId",
    items,
    columns,
    onCellDoubleClick: handleCellDoubleClick,
    title: "Items",
    addLink: newItemRoute.path,
    onDelete: handleDelete,
  };

  return (
    <div>
      <br />
      <DataTable {...dataTableProps} />
    </div>
  );
};

export default IndexView;

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 250,
    editable: false,
  },

  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "unit",
    headerName: "Unit",
    width: 110,
    editable: false,
  },
  {
    field: "locationId",
    headerName: "Location",
    width: 200,
    editable: false,
  },
  {
    field: "tags",
    headerName: "Tags",
    description: "This column has a value getter and is not sortable.",
    sortable: false,

    valueGetter: (params: any) => params.row.tags.map((tag: Tag) => tag.name),
  },
];
