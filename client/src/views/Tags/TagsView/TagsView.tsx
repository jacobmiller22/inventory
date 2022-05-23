import { useState, useEffect } from "react";

import { DataTable } from "components";
import { getTags as __getTags } from "api/inv";
import { Tag, TagId } from "interfaces/tag";
import { useNavigate } from "react-router-dom";
import { replaceWildcards } from "Router/routes";
import { newTagRoute, tagDetailsRoute } from "Router/routes/client";

const TagsView = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[] | null>(null);

  const getTags = async () => {
    setTags(await __getTags());
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleCellDoubleClick = (cell: { id: TagId }) => {
    navigate(replaceWildcards(tagDetailsRoute, [cell.id]));
  };

  const handleDelete = async (tagIds: TagId[]): Promise<boolean> => {
    return true;
  };

  const dataTableProps = {
    idKey: "tagId",
    items: tags,
    columns,
    onCellDoubleClick: handleCellDoubleClick,
    title: "Tags",
    addLink: newTagRoute.path,
    onDelete: handleDelete,
    onRefreshRequest: () => getTags(),
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
