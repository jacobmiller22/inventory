import { useEffect, useState } from "react";
import fieldsTemplate from "./fields";
import fieldsSchema from "./schema";
import { getLocations, getTags, createItem } from "api/inv";

/** Components */
import { BasicForm } from "components";
import { Tag } from "interfaces/tag";
import { MinLocation } from "interfaces/location";
import { FormType } from "interfaces/form";
import { Item, MinItem } from "interfaces/item";

const NewItemView = () => {
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [locations, setLocations] = useState<MinLocation[] | null>(null);
  const [fields, setFields] = useState(null);

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

    //@ts-ignore
    setFields(newFields);
  }, [tags, locations]);

  const handleSubmit = async (values: any): Promise<boolean> => {
    console.log("Submit!", values);
    await __createItem(values);
    return true;
  };

  return (
    <div>
      {tags && locations && fields && (
        <BasicForm
          fields={fields}
          handleSubmit={handleSubmit}
          schema={fieldsSchema}
        />
      )}
    </div>
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

const __createItem = async (values: any) => {
  const { name, description, quantity, unit, location, tags } = values;

  const newItem: Omit<MinItem & Item, "itemId" | "location"> = {
    name,
    description,
    quantity,
    unit,
    locationId: location,
    tags: tags ? [tags] : [],
  };

  await createItem(newItem);
};
