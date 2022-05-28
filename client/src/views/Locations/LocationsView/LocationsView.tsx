import { useState, useEffect } from "react";

import { DataTable } from "components";
import { deleteLocations, getLocations as __getLocations } from "api/inv";

import { LocationId, MinLocation } from "interfaces/location";
import { locationDetailsRoute, newLocationRoute } from "Router/routes/client";
import { replaceWildcards } from "Router/routes";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const LocationsView = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<MinLocation[] | null | undefined>(
    undefined
  );

  const { enqueueSnackbar } = useSnackbar();

  const getLocations = async () => {
    const __locations = await __getLocations();
    if (__locations === null) {
      enqueueSnackbar("Error getting locations", { variant: "error" });
    }
    setLocations(__locations);
  };

  useEffect(() => {
    getLocations();
  }, []);

  const handleCellDoubleClick = (cell: { id: LocationId }) =>
    navigate(replaceWildcards(locationDetailsRoute, [cell.id]));

  const handleDelete = async (locationIds: LocationId[]): Promise<boolean> =>
    await deleteLocations(locationIds);

  const dataTableProps = {
    idKey: "locationId",
    items: locations,
    columns,
    onCellDoubleClick: handleCellDoubleClick,
    title: "Locations",
    addLink: newLocationRoute.path,
    onDelete: handleDelete,
    onRefreshRequest: () => getLocations(),
  };

  return (
    <div>
      <br />
      <DataTable {...dataTableProps} />
    </div>
  );
};

export default LocationsView;

const columns: any[] = [
  {
    field: "name",
    headerName: "Name",
    width: 250,
    editable: false,
  },
  {
    field: "description",
    headerName: "Description",
    editable: false,
    width: 700,
  },
];
