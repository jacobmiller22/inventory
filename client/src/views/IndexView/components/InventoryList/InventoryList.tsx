import { useEffect, useState } from "react";
import theme from "theme";
import { useNavigate } from "react-router-dom";
/** Interfaces/types */

/** components */
import { DataGrid } from "@mui/x-data-grid";
import { getItems } from "api/inv";
import { Card, Toolbar, Button } from "@mui/material";
import { Item, ItemId, MinItem } from "interfaces/item";
import { Tag } from "interfaces/tag";
import { AddButton, Spacer } from "components";
import { newItemRoute } from "Router/routes/client";

interface IInventoryListProps {}

type RowItem = Omit<MinItem, "itemId"> & { id: ItemId };

const InventoryList = ({}: IInventoryListProps) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<RowItem[]>([]);

  useEffect(() => {
    (async () => {
      setRows((await getItems()).map((i) => itemToRow(i)));
    })();
  }, []);

  return (
    <Card
      variant="outlined"
      style={{ width: "100%" }}
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Toolbar>
        <Spacer />
        <AddButton
          variant="contained"
          onClick={() => navigate(newItemRoute.path)}
        />
      </Toolbar>
      <DataGrid
        sx={{ borderRadius: 0, borderInline: "none", borderBottom: "none" }}
        rows={rows}
        columns={columns}
        // rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        loading={rows.length === 0}
        autoHeight
        // autoPageSize
      />
    </Card>
  );
};

export default InventoryList;

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
    width: 160,
    valueGetter: (params: any) => params.row.tags.map((tag: Tag) => tag.name),
  },
];

const itemToRow = (item: MinItem): RowItem => {
  return {
    id: item.itemId,
    locationId: item.locationId,
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    tags: item.tags,
  };
};
