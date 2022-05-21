import { useEffect, useState, useRef } from "react";
import theme from "theme";
import { useNavigate } from "react-router-dom";

/** Interfaces/types */

/** components */
import { DataGrid } from "@mui/x-data-grid";
import { deleteItems, getItems } from "api/inv";
import { Button, Card, Toolbar, Typography } from "@mui/material";
import { AddButton, Spacer, TrashButton } from "components";
import { itemDetailsRoute, newItemRoute } from "Router/routes/client";
import { replaceWildcards } from "Router/routes";

interface DataTableProps<T, E> {
  idKey: string;
  items: T[] | null;
  columns: any[];
  onCellDoubleClick?: (cell: any) => void;
  addLink: string;
  onDelete: (id: E[]) => Promise<boolean>;
  title?: string;
}

const DataTable = <Item extends object, Id extends string>({
  idKey,
  items,
  columns,
  onCellDoubleClick,
  addLink,
  onDelete,
  title,
}: DataTableProps<Item, Id>) => {
  type RowItem = Omit<Item, "itemId"> & { id: Id };

  const [rows, setRows] = useState<RowItem[]>([]);

  const [selectionModel, setSelectionModel] = useState<Id[]>([]);
  const [__refresh, __setRefresh] = useState<boolean>(false);

  const toggleRefresh = () => __setRefresh(!__refresh);

  const handleSelectionModelChange = (newSelectionModel: any[]) =>
    setSelectionModel(newSelectionModel);

  useEffect(() => {
    console.log("Refresh");
    if (!items) return;
    setRows(items.map((i) => itemToRow(i, idKey)));
  }, [__refresh, items]);

  const itemToRow = (item: Item, idKey: string): RowItem => {
    return {
      //@ts-ignore
      id: item[idKey],
      ...item,
    };
  };

  const renderToolbar = () => {
    const handleDelete = async () => {
      await onDelete(selectionModel);
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
        loading={!Boolean(rows)}
        autoHeight
        onCellDoubleClick={onCellDoubleClick}
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
