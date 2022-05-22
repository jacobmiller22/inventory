import { useState, useEffect } from "react";
import styles from "./IndexView.module.css";
import { ChipList, DataTable } from "components";
import {
  deleteItems,
  getItems as __getItems,
  getLocations as __getLocations,
} from "api/inv";
import { ItemId, MinItem } from "interfaces/item";
import { Tag } from "interfaces/tag";
import { itemDetailsRoute, newItemRoute } from "Router/routes/client";
import { replaceWildcards } from "Router/routes";
import { useNavigate } from "react-router-dom";
import { LocationId, MinLocation } from "interfaces/location";

type Map<V> = { [key: string]: V };

const ItemsView = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MinItem[] | null>(null);
  const [locationMap, setLocationMap] = useState<Map<string> | null>(null);

  const getItems = async () => {
    setItems(await __getItems());
  };

  const getLocationMap = async () => {
    const locations = (await __getLocations()) ?? [];
    let _locationMap: Map<string> = {};
    locations.forEach(
      (location: MinLocation) =>
        (_locationMap[location.locationId] = location.name)
    );

    setLocationMap(_locationMap);
  };

  useEffect(() => {
    getItems();
    getLocationMap();
  }, []);

  const handleCellDoubleClick = (cell: { id: ItemId }) => {
    navigate(replaceWildcards(itemDetailsRoute, [cell.id]));
  };

  const handleDelete = async (itemIds: ItemId[]): Promise<boolean> =>
    await deleteItems(itemIds);

  const mappedItems = items?.map(
    (item: Omit<MinItem, "locationId"> & { locationId?: LocationId }) => {
      const newItem = {
        ...item,
        location: locationMap?.[item.locationId!] as string,
      };
      delete newItem.locationId;
      return newItem;
    }
  );

  const dataTableProps = {
    idKey: "itemId",
    items: mappedItems,
    columns,
    onCellDoubleClick: handleCellDoubleClick,
    title: "Items",
    addLink: newItemRoute.path,
    onDelete: handleDelete,
    onRefreshRequest: () => getItems(),
  };

  return (
    <div>
      <br />
      {/* @ts-expect-error */}
      <DataTable {...dataTableProps} />
    </div>
  );
};

export default ItemsView;

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
    field: "location",
    headerName: "Location",
    width: 200,
    editable: false,
  },
  {
    field: "tags",
    headerName: "Tags",
    description: "This column has a value getter and is not sortable.",
    sortable: false,

    renderCell: (params: any) => (
      <ChipList
        items={params.row.tags.map((tag: Tag) => tag.name)}
        chipProps={{
          variant: "outlined",
          color: "secondary",
        }}
      />
    ),
  },
];
