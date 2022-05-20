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

const NewLocationView = () => {
  // const [tags, setTags] = useState<Tag[] | null>(null);
  // const [locations, setLocations] = useState<MinLocation[] | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     setLocations(await getLocations());
  //   })();
  //   (async () => {
  //     setTags(await getTags());
  //   })();
  // }, []);

  const handleSubmit = async (values: any): Promise<boolean> => {
    console.log("Submit!", values);
    // await __createItem(values);
    return true;
  };

  return (
    <div>
      <br />
      <BasicForm
        fields={fieldsTemplate}
        handleSubmit={handleSubmit}
        schema={fieldsSchema}
      />
    </div>
  );
};

export default NewLocationView;

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
