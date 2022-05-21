import fieldsTemplate from "./fields";
import schema from "./schema";
import {
  createItem,
  createLocation,
  getItem,
  getLocation,
  getLocations,
  getTags,
} from "api/inv";
import { useParams, useNavigate } from "react-router-dom";

/** Components */
import { Location, LocationId, MinLocation } from "interfaces/location";
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

  // useEffect(() => {
  // if (Object.keys(params).length === 0) {
  //   // No route params.. This is the new location route
  //   setFields(fieldsTemplate);
  //   return;
  // }

  //   // Route params.. this is the edit location route
  //   if (!location) return; // Populate fields once we have a location

  //   const newFields: any[] = populateFields(item);
  //   setFields(newFields);
  // }, [params, location]);

  // useEffect(() => {
  //   if (!params.locationId) return;

  //   (async () => {
  //     setLocation(await getLocation(params.locationId!));
  //   })();
  // }, [params]);

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

    //@ts-ignore
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
    const success: boolean = await __createItem(values);
    return success;
  };

  return <FormView schema={schema} fields={fields} onSubmit={handleSubmit} />;
};

export default ItemFormView;

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

const populateFields = (map: any, item: Item | null) => {
  return fieldsTemplate.map((field) => {
    let newField = {
      ...field,
      //@ts-expect-error
      initialValue: item ? item[field.name] : field.initialValue,
    };
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
      initialValue: item
        ? //@ts-expect-error
          item[newField.name === "tags" ? "tagId" : "locationId"]
        : newField.initialValue,
    };
  });
};
