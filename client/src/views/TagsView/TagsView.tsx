import { useState, useEffect } from "react";

import { DataTable } from "components";
import { getTags } from "api/inv";
import { Tag, TagId } from "interfaces/tag";
import { useNavigate } from "react-router-dom";
import { replaceWildcards } from "Router/routes";
import { tagDetailsRoute } from "Router/routes/client";

const TagsView = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[] | null>(null);

  useEffect(() => {
    (async () => {
      setTags(await getTags());
    })();
  }, []);

  const onCellDoubleClick = (cell: { id: TagId }) => {
    navigate(replaceWildcards(tagDetailsRoute, [cell.id]));
  };

  const dataTableProps = {
    idKey: "tagId",
    items: tags,
    columns,
    onCellDoubleClick,
    title: "Tags",
  };

  return (
    <div>
      <br />
      <DataTable {...dataTableProps} />
    </div>
  );
};

export default TagsView;

const columns: any[] = [
  {
    field: "name",
    headerName: "Name",
    width: 250,
    editable: false,
  },
];
