import { useState, useEffect } from "react";

import { DataTable } from "components";
import { deleteTags, getTags as __getTags } from "api/inv";
import { Tag, TagId } from "interfaces/tag";
import { useNavigate } from "react-router-dom";
import { replaceWildcards } from "Router/routes";
import { newTagRoute, tagDetailsRoute } from "Router/routes/client";
import { useSnackbar } from "notistack";

const TagsView = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[] | null | undefined>(undefined);

  const { enqueueSnackbar } = useSnackbar();

  const getTags = async () => {
    setTags(await __getTags());
    const __tags = await __getTags();
    if (__tags === null) {
      enqueueSnackbar("Error getting tags", { variant: "error" });
    }
    setTags(__tags);
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleCellDoubleClick = (cell: { id: TagId }) => {
    navigate(replaceWildcards(tagDetailsRoute, [cell.id]));
  };

  const handleDelete = async (tagIds: TagId[]): Promise<boolean> =>
    await deleteTags(tagIds);

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
