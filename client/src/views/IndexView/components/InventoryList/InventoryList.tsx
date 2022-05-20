import { useEffect, useState, useRef } from "react";
import theme from "theme";
import { useNavigate } from "react-router-dom";

/** Interfaces/types */

/** components */
import { DataGrid, GridState } from "@mui/x-data-grid";
import { deleteItem, deleteItems, getItems } from "api/inv";
import { Button, Card, Toolbar } from "@mui/material";
import { ItemId, MinItem } from "interfaces/item";
import { Tag } from "interfaces/tag";
import { AddButton, Spacer, TrashButton } from "components";
import { itemDetailsRoute, newItemRoute } from "Router/routes/client";
import { replaceWildcards } from "Router/routes";

interface IInventoryListProps {}

type RowItem = Omit<MinItem, "itemId"> & { id: ItemId };

const InventoryList = ({}: IInventoryListProps) => {
  const [rows, setRows] = useState<RowItem[]>([]);

  const [selectionModel, setSelectionModel] = useState<ItemId[]>([]);
  const [__refresh, __setRefresh] = useState<boolean>(false);

  const toggleRefresh = () => __setRefresh(!__refresh);

  const handleSelectionModelChange = (newSelectionModel: any[]) => {
    setSelectionModel(newSelectionModel);
    console.log(newSelectionModel);
    // setSelected(s.selection as ItemId[]);
  };

  useEffect(() => {
    (async () => {
      setRows((await getItems()).map((i) => itemToRow(i)));
    })();
  }, [__refresh]);

  const renderToolbar = () => {
    const handleDelete = () => {
      deleteItems(selectionModel);
      setSelectionModel([]);
      toggleRefresh();
    };

    if (selectionModel.length > 0) {
      return (
        <Toolbar sx={{ background: theme.palette.background.highlight }}>
          <ToolbarContentSelected
            handleDelete={handleDelete}
            selected={selectionModel}
          />
        </Toolbar>
      );
    }
    return (
      <Toolbar>
        <ToolbarContentDefault />
      </Toolbar>
    );
  };

  return (
    <Card
      variant="outlined"
      style={{ width: "100%" }}
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      {renderToolbar()}
      <DataGrid
        onSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectionModel}
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

const ToolbarContentDefault = () => {
  const navigate = useNavigate();
  return (
    <>
      <Spacer />
      <AddButton
        variant="contained"
        onClick={() => navigate(newItemRoute.path)}
      />
    </>
  );
};

const ToolbarContentSelected = ({
  handleDelete,
  selected,
}: {
  handleDelete: (selected: ItemId[]) => void;
  selected: ItemId[];
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Spacer />
      {selected.length === 1 && (
        <Button
          onClick={() =>
            navigate(replaceWildcards(itemDetailsRoute, [selected[0]]))
          }
        >
          View
        </Button>
      )}
      <TrashButton onClick={handleDelete} />
    </>
  );
};

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
