import { useEffect, useState } from "react";
import fieldsTemplate from "../fields";
import fieldsSchema from "../schema";
import { getLocations, getTags, createItem } from "api/inv";

/** Components */
import { BasicForm } from "components";
import { Tag, TagId } from "interfaces/tag";
import { MinLocation } from "interfaces/location";
import { FormType } from "interfaces/form";
import { Item, ItemId, MinItem } from "interfaces/item";
import FormView from "views/FormView";

const NewItemView = () => {
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [locations, setLocations] = useState<MinLocation[] | null>(null);
  const [fields, setFields] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      setLocations(await getLocations());
    })();
    (async () => {
      setTags(await getTags());
    })();
  }, []);

  useEffect(() => {
    // This will set our fields with our choices
    if (!locations || !tags) return;

    const map = { tags, location: locations };
    const newFields = populateFields(fieldsTemplate, map);

    setFields(newFields);
  }, [tags, locations]);

  const handleSubmit = async (
    values: Omit<
      MinItem & Item & { tagIds: TagId[] },
      "itemId" | "location" | "tags"
    >
  ): Promise<boolean> => {
    console.log("Submit!", values);
    await __createItem(values);
    return true;
  };

  if (!tags || !locations || !fields) {
    return <div>loading</div>;
  }

  return (
    <FormView fields={fields} onSubmit={handleSubmit} schema={fieldsSchema} />
  );
};

export default NewItemView;

const populateFields = (fieldsTemplate: any[], map: any) => {
  return fieldsTemplate.map((field) => {
    if (field.type !== FormType.SELECT) {
      return field;
    }

    const options = map[field.name].map((item: Tag | MinLocation) => {
      return {
        //@ts-expect-error
        id: item[field.name === "tags" ? "tagId" : "locationId"],
        label: item.name,
      };
    });
    return {
      ...field,
      options,
    };
  });
};

const __createItem = async (
  values: Omit<
    MinItem & Item & { tagIds: TagId[] },
    "itemId" | "location" | "tags"
  >
) => {
  const { name, description, quantity, unit, locationId, tagIds } = values;

  const newItem: Omit<MinItem & Item, "itemId" | "location" | "tags"> & {
    tags: TagId[];
  } = {
    name,
    description,
    quantity,
    unit,
    locationId,
    ///@ts-expect-error
    tags: tagIds ? [tagIds] : [],
  };

  const itemId: ItemId | null = await createItem(newItem);

  return Boolean(itemId);
};
