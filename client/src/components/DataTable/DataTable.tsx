import { useEffect, useState } from "react";
import theme from "theme";
import { useNavigate } from "react-router-dom";

/** Interfaces/types */

/** components */
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Card, Toolbar, Typography } from "@mui/material";
import { AddButton, Spacer, TrashButton } from "components";
import { itemDetailsRoute } from "Router/routes/client";
import { replaceWildcards } from "Router/routes";

interface DataTableProps<T, E> {
  idKey: string;
  items: T[] | null | undefined;
  columns: any[];
  onCellDoubleClick?: (cell: any) => void;
  addLink: string;
  onDelete: (id: E[]) => Promise<boolean>;
  title?: string;
  onRefreshRequest?: () => void;
  deleteFailText?: string;
}

const DataTable = <Item extends object, Id extends string>({
  idKey,
  items,
  columns,
  onCellDoubleClick,
  addLink,
  onDelete,
  onRefreshRequest,
  title,
  deleteFailText = "Error while deleting item.",
}: DataTableProps<Item, Id>) => {
  type RowItem = Omit<Item, "itemId"> & { id: Id };
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState<RowItem[]>([]);

  const [selectionModel, setSelectionModel] = useState<Id[]>([]);
  const [__refresh, __setRefresh] = useState<boolean>(false);

  const toggleRefresh = () => {
    if (!onRefreshRequest) return;

    onRefreshRequest();
    // __setRefresh(!__refresh);
  };

  const handleSelectionModelChange = (newSelectionModel: any[]) =>
    setSelectionModel(newSelectionModel);

  // useEffect(() => {
  //   // Tell the grid to refresh
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [__refresh]);

  useEffect(() => {
    setRows((items ?? []).map((i) => itemToRow(i, idKey)));
  }, [items, idKey]);

  const renderToolbar = () => {
    const handleDelete = async () => {
      const success: boolean = await onDelete(selectionModel);

      if (success) {
        setSelectionModel([]);
        toggleRefresh();
      } else {
        enqueueSnackbar(deleteFailText, { variant: "error" });
      }
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
        <ToolbarContentDefault title={title} addLink={addLink} />
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
        checkboxSelection
        disableSelectionOnClick
        loading={Boolean(items === undefined)}
        autoHeight
        onCellDoubleClick={onCellDoubleClick}
        error={items === null ? Boolean(true) : undefined}
      />
    </Card>
  );
};

export default DataTable;

interface ToolbarContentDefaultProps {
  title?: string;
  addLink: string;
}

const ToolbarContentDefault = ({
  title,
  addLink,
}: ToolbarContentDefaultProps) => {
  const navigate = useNavigate();
  return (
    <>
      {title && <Typography variant="h6">{title}</Typography>}
      <Spacer />
      <AddButton variant="contained" onClick={() => navigate(addLink)} />
    </>
  );
};

interface ToolbarContentSelectedProps<T> {
  handleDelete: (selected: T[]) => void;
  selected: T[];
}

const ToolbarContentSelected = <Id extends string>({
  handleDelete,
  selected,
}: ToolbarContentSelectedProps<Id>) => {
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

const itemToRow = (item: any, idKey: string): any => {
  return {
    //@ts-ignore
    id: item[idKey],
    ...item,
  };
};
