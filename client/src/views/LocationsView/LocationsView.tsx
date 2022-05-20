import { useState, useEffect } from "react";

import { DataTable } from "components";
import { getLocations } from "api/inv";

import { LocationId, MinLocation } from "interfaces/location";
import { locationDetailsRoute } from "Router/routes/client";
import { replaceWildcards } from "Router/routes";
import { useNavigate } from "react-router-dom";

const LocationsView = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<MinLocation[] | null>(null);

  useEffect(() => {
    (async () => {
      setLocations(await getLocations());
    })();
  }, []);

  const onCellDoubleClick = (cell: { id: LocationId }) =>
    navigate(replaceWildcards(locationDetailsRoute, [cell.id]));

  const dataTableProps = {
    idKey: "locationId",
    items: locations,
    columns,
    onCellDoubleClick,
    title: "Locations",
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
