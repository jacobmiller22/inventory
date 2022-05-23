import fieldsTemplate from "./fields";
import schema from "./schema";
import {
  createTag as __createTag,
  getTag,
  updateTag as __updateTag,
} from "api/inv";
import { useParams, useNavigate } from "react-router-dom";

/** Components */
import { FormView } from "views";
import { useEffect, useState } from "react";
import { TagId, Tag } from "interfaces/tag";

type Params = {
  tagId?: TagId;
};

interface TagFormViewProps {}

const TagFormView = ({}: TagFormViewProps) => {
  const params: Params = useParams();

  const [fields, setFields] = useState<any[] | null>(null);
  const [tag, setTag] = useState<Tag | null>(null);

  const isEdit = Boolean(params.tagId);

  useEffect(() => {
    if (!isEdit) {
      // No route params.. This is the new location route
      setFields(fieldsTemplate);
      return;
    }

    // Route params.. this is the edit location route
    if (!tag) return; // Populate fields once we have a location

    const newFields: any[] = populateFields(tag);
    setFields(newFields);
  }, [params, tag]);

  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      setTag(await getTag(params.tagId!));
    })();
  }, [params]);

  const handleSubmit = async (values: Omit<Tag, "tagId">): Promise<boolean> => {
    console.log("Submit!", values);
    // Create the tag if we are on the new tag route, otherwise update the tag

    if (isEdit) {
      // This is an existing tag
      return await updateTag(params.tagId!, values);
    }

    // This is a new tag
    return await createTag(values);
  };

  return (
    <FormView
      schema={schema}
      fields={fields}
      onSubmit={handleSubmit}
      resetOnSuccess={!Boolean(params.tagId)}
    />
  );
};

export default TagFormView;

const createTag = async (values: Omit<Tag, "tagId">) => {
  const { name } = values;

  const newTag: Omit<Tag, "tagId"> = {
    name,
  };

  const tagId: TagId | null = await __createTag(newTag);

  return Boolean(tagId);
};

const updateTag = async (
  tagId: TagId,
  values: Omit<Tag, "tagId">
): Promise<boolean> => {
  const { name } = values;

  const newTag: Omit<Tag, "tagId"> = {
    name,
  };

  const success: boolean = await __updateTag(tagId, newTag);

  return success;
};

const populateFields = (tag: Tag) => {
  return fieldsTemplate.map((field: any) => {
    //@ts-expect-error
    return { ...field, initialValue: tag[field.name] };
  });
};
