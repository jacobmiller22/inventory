export type TInventoryID = string;
export type TLocationID = string;
export type TItemType = string;

export interface IInventoryItem {
  name: string;
  inventory_id: TInventoryID;
  location_id: TLocationID;
  quantity: number;
  note: string;
  type: TItemType;
}

export interface IInventoryItemMap {
  [inventory_id: TInventoryID]: IInventoryItem;
}

export interface IInventoryLocation {
  location_id: TLocationID;
  name: string;
  description: string;
  items: TInventoryID[];
}

export interface IInventoryLocationMap {
  [location_id: TLocationID]: IInventoryLocation;
}

/** User Defined Type Guards */

export const isInventoryItem = (arg: any): arg is IInventoryItem => {
  const name = arg.name && typeof arg.name === 'string';
  const inventory_id = arg.inventory_id && typeof arg.inventory_id === 'string';
  const location_id = arg.location_id && typeof arg.location_id === 'string';
  const quantity = arg.quantity && typeof arg.quantity === 'number';
  const note = arg.note && typeof arg.note === 'string';
  const type = arg.type && typeof arg.type === 'string';

  return arg && name && inventory_id && location_id && quantity && note && type;
};

export const isInventoryLocation = (arg: any): arg is IInventoryLocation => {
  const location_id = arg.location_id && typeof arg.location_id === 'string';
  const name = arg.name && typeof arg.name === 'string';
  const description = arg.description && typeof arg.description === 'string';
  const items =
    arg.items && typeof arg.items === 'object' && Array.isArray(arg.items) && typeof arg.items[0] === 'string';
  return arg && location_id && name && description && items;
};

export const isType = (arg: any): arg is TItemType => {
  return arg && typeof arg === 'string';
};
