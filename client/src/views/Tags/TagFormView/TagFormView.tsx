import fieldsTemplate from "../fields";
import schema from "../schema";
import { createTag, getTag } from "api/inv";
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

  useEffect(() => {
    if (Object.keys(params).length === 0) {
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
    if (!params.tagId) return;

    (async () => {
      setTag(await getTag(params.tagId!));
    })();
  }, [params]);

  const handleSubmit = async (values: Omit<Tag, "tagId">): Promise<boolean> => {
    console.log("Submit!", values);
    const success: boolean = await __createTag(values);
    return success;
  };

  return <FormView schema={schema} fields={fields} onSubmit={handleSubmit} />;
};

export default TagFormView;

const __createTag = async (values: Omit<Tag, "tagId">) => {
  const { name } = values;

  const newTag: Omit<Tag, "tagId"> = {
    name,
  };

  const locationId: TagId | null = await createTag(newTag);

  return Boolean(locationId);
};

const populateFields = (tag: Tag) => {
  return fieldsTemplate.map((field: any) => {
    //@ts-expect-error
    return { ...field, initialValue: tag[field.name] };
  });
};
