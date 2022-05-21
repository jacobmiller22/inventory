import { useEffect, useState } from "react";
import fieldsTemplate from "../fields";
import fieldsSchema from "../schema";
import { getLocations, getTags, createItem, getItem } from "api/inv";

/** Components */
import { BasicForm } from "components";
import { Tag, TagId } from "interfaces/tag";
import { MinLocation } from "interfaces/location";
import { FormType } from "interfaces/form";
import { Item, ItemId, MinItem } from "interfaces/item";
import { useParams, useNavigate } from "react-router-dom";
import { FormView } from "views";

const EditItemView = () => {
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [locations, setLocations] = useState<MinLocation[] | null>(null);
  const [fields, setFields] = useState(null);
  const [item, setItem] = useState<Item | null | undefined>(undefined);

  const query = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!query.itemId) return;

    (async () => {
      setItem(await getItem(query.itemId!));
    })();
  }, [query]);

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
    if (!locations || !tags || !item) return;

    const map = { tags, location: locations };
    const newFields = populateFields(fieldsTemplate, map, item!);

    //@ts-ignore
    setFields(newFields);
  }, [tags, locations, item]);

  const handleSubmit = async (values: any): Promise<boolean> => {
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

export default EditItemView;

const populateFields = (fieldsTemplate: any[], map: any, item: Item) => {
  return fieldsTemplate.map((field) => {
    //@ts-expect-error
    let newField = { ...field, initialValue: item[field.name] };
    if (newField.type !== FormType.SELECT) {
      return newField;
    }

    const options = map[newField.name].map((item: Tag | MinLocation) => {
      return {
        //@ts-expect-error
        id: item[newField.name === "tags" ? "tagId" : "locationId"],
        label: item.name,
      };
    });

    return {
      ...newField,
      options,
      //@ts-expect-error
      initialValue: item[newField.name === "tags" ? "tagId" : "locationId"],
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
