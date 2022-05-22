/**
 * Item Service
 */

import { ItemId, Item, ItemDocument, MinItem } from "@/types/item";
import { Item as ItemModel } from "@/models";
import { v4 as uuid } from "uuid";
import { LocationDocument, LocationId, MinLocation } from "@/types/location";
import { Tag, TagDocument, TagId } from "@/types/tag";
import tagsService from "@/services/tags";
import locationsService from "@/services/locations";

const getItems = async (): Promise<any[]> => {
  const items: (ItemDocument<LocationId, TagDocument> & {
    toObject: () => ItemDocument<LocationId, TagDocument>;
  })[] = await ItemModel.find().populate("_tags");

  return items.map(
    (
      item: ItemDocument<LocationId, TagDocument> & {
        toObject: () => ItemDocument<LocationId, TagDocument>;
      }
    ) => itemDoc2MinItem(item.toObject())
  );
};

const getItem = async (id: ItemId): Promise<Item | null> => {
  const item:
    | (ItemDocument<LocationDocument | null, TagDocument> & {
        toObject: () => ItemDocument<LocationDocument | null, TagDocument>;
      })
    | null = await ItemModel.findById(id)
    .populate(["_tags", "_location"])
    .select([
      "_id",
      "name",
      "description",
      "quantity",
      "unit",
      "_tags",
      "_location",
      "imgSrcs",
      "__v",
    ]);

  if (!item) {
    return null;
  }

  return itemDoc2Item(item.toObject());
};

const createItem = async (
  item: Omit<MinItem, "itemId" | "tags"> & {
    tags: TagId[];
    description: string;
    imgSrcs: string[];
  }
) => {
  const itemId = `i_${uuid()}`;
  let newItem: any = { ...item, _id: itemId };

  // Replace locationId with reference to _location

  newItem._location = newItem.locationId;
  newItem._tags = newItem.tags;
  delete newItem["locationId"];
  delete newItem["tags"];

  try {
    await ItemModel.create(newItem);
    return itemId;
  } catch (err) {
    console.error("Error creating item", err);
    return null;
  }
};

const updateItem = async (id: ItemId, item: Omit<Partial<Item>, "itemId">) => {
  let newItem: any = { ...item, _id: id };

  // Replace locationId with reference to _location

  newItem._location = newItem.locationId;
  newItem._tags = newItem.tags;
  delete newItem["locationId"];
  delete newItem["tags"];

  try {
    await ItemModel.findByIdAndUpdate(id, newItem);
    return true;
  } catch (err) {
    return false;
  }
};

const deleteItem = async (id: ItemId) => {
  try {
    await ItemModel.findByIdAndDelete(id);
    return true;
  } catch (err) {
    return false;
  }
};

const itemDoc2MinItem = (
  item: ItemDocument<LocationId, TagDocument>
): MinItem => {
  const { _id, _location, name, quantity, unit, _tags } = item;

  const tags = _tags.map((tag: TagDocument) => tagsService.tagDoc2Tag(tag));

  return {
    itemId: _id,
    locationId: _location,
    name,
    quantity,
    unit,
    tags,
  };
};

const itemDoc2Item = (
  item: ItemDocument<LocationDocument | null, TagDocument>
): Item => {
  const minItem: MinItem = itemDoc2MinItem({
    ...item,
    _location: item._location?._id ?? "",
  });

  const { description, imgSrcs } = item;
  const location = item._location
    ? locationsService.locDoc2MinLoc(item._location)
    : null;
  let workingItem: Item & { locationId?: LocationId } = {
    ...minItem,
    description,
    imgSrcs,
    location,
  };
  // Remove the locationId from the MinItem
  delete workingItem["locationId"];

  return workingItem as Item;
};

export default {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  itemDoc2MinItem,
  itemDoc2Item,
};
