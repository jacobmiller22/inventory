import { useEffect, useState } from "react";
import theme from "theme";
/** Interfaces/types */

/** components */
import { DataGrid } from "@mui/x-data-grid";
import { getItems } from "api/inv";
import { Card, Toolbar, Button } from "@mui/material";

interface IInventoryListProps {}

const InventoryList = ({}: IInventoryListProps) => {
  const [rows, setRows] = useState<any[]>([]);

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
        <Button>Add</Button>
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
    field: "description",
    headerName: "Description",
    width: 400,
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
    field: "location",
    headerName: "Location",
    width: 200,
    editable: false,
  },
];

const itemToRow = (item: any) => {
  return {
    id: item._id,
    location: item._location,
    name: item.name,
    description: item.description,
    quantity: item.quantity,
    unit: item.unit,
  };
};
