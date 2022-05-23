import fieldsTemplate from "./fields";
import schema from "./schema";
import {
  createItem as __createItem,
  getItem,
  getLocations,
  getTags,
  updateItem as __updateItem,
} from "api/inv";
import { useParams } from "react-router-dom";

/** Components */
import { MinLocation } from "interfaces/location";
import { FormView } from "views";
import { useEffect, useState } from "react";
import { Item, ItemId, MinItem } from "interfaces/item";
import { Tag, TagId } from "interfaces/tag";
import { FormType } from "interfaces/form";

type Params = {
  itemId?: ItemId;
};

interface ItemFormViewProps {}

const ItemFormView = ({}: ItemFormViewProps) => {
  const params: Params = useParams();

  const [tags, setTags] = useState<Tag[] | null>(null);
  const [locations, setLocations] = useState<MinLocation[] | null>(null);
  const [fields, setFields] = useState<any[] | null>(null);
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    if (!locations || !tags) return;

    const map = { tagIds: tags, locationId: locations };

    if (Object.keys(params).length === 0) {
      // No route params.. This is the new item route

      // This will set our fields with our choices
      const newFields = populateFields(map, null);
      setFields(newFields);
      return;
    }
    if (!item) return;

    // This will set our fields with our choices
    const newFields = populateFields(map, item!);
    console.log("newFields", newFields);

    setFields(newFields);
  }, [params, tags, locations, item]);

  useEffect(() => {
    if (!params.itemId) return;

    (async () => {
      setItem(await getItem(params.itemId!));
    })();
  }, [params]);

  useEffect(() => {
    (async () => {
      setLocations(await getLocations());
    })();
    (async () => {
      setTags(await getTags());
    })();
  }, []);

  const handleSubmit = async (
    values: Omit<
      MinItem & Item & { tagIds: TagId[] },
      "itemId" | "location" | "tags"
    >
  ): Promise<boolean> => {
    console.log("Submit!", values);
    // Create the item if we are on the new item route, otherwise update the item

    if (params.itemId) {
      // This is an existing item
      return await updateItem(params.itemId, values);
    }

    // This is a new item
    return await createItem(values);
  };

  return (
    <FormView
      schema={schema}
      fields={fields}
      onSubmit={handleSubmit}
      resetOnSuccess={!Boolean(params.itemId)}
    />
  );
};

export default ItemFormView;

const createItem = async (
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
    tags: tagIds,
  };

  const itemId: ItemId | null = await __createItem(newItem);

  return Boolean(itemId);
};

const updateItem = async (
  id: ItemId,
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
    tags: tagIds,
  };

  console.log("Update Item!", newItem);

  const success: boolean = await __updateItem(id, newItem);

  return success;
};

const populateFields = (map: any, item: Item | null) => {
  return fieldsTemplate.map((field) => {
    let newField = {
      ...field,

      initialValue: item
        ? field.name === "locationId"
          ? item.location
            ? item.location.locationId
            : ""
          : field.name === "tagIds"
          ? item.tags.map((tag) => tag.tagId)
          : //@ts-expect-error
            item[field.name]
        : field.initialValue,
    };

    if (newField.type !== FormType.SELECT) {
      return newField;
    }

    const options = map[newField.name].map((item: Tag | MinLocation) => {
      return {
        //@ts-expect-error
        id: item[newField.name === "tagIds" ? "tagId" : "locationId"],
        label: item.name,
      };
    });

    return {
      ...newField,
      options,
      initialValue: newField.initialValue,
    };
  });
};
