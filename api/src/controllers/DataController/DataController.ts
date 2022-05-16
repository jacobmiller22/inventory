import { readFile, writeFile } from 'fs/promises';
import {
  TLocationID,
  TInventoryID,
  TItemType,
  IInventoryItem,
  IInventoryLocation,
  IInventoryLocationMap,
  IInventoryItemMap,
  isType,
  isInventoryLocation,
  isInventoryItem,
} from '../../interfaces/Inventory';
import { DB_PATH, ALL_FILE, LOCATIONS_FILE, TYPES_FILE } from '../../consts';
//@ts-ignore
import { v4 as uuid } from 'uuid';

interface IDataController {
  // Inventory
  getInventory: () => Promise<IInventoryItemMap>;
  getInventoryItem: (inventory_id: TInventoryID) => Promise<IInventoryItem | null>;
  createInventoryItem: (newItem: IInventoryItem) => Promise<TInventoryID | null>;
  updateInventoryItem: (i_id: TInventoryID, newItem: IInventoryItem) => Promise<TInventoryID | null>;
  searchInventoryItem: (field: string, value: string | number | TInventoryID | TLocationID) => Promise<any>;
  // Locations
  getLocations: () => Promise<IInventoryLocationMap>;
  getLocation: (location_id: TLocationID) => Promise<IInventoryLocation | null>;
  getInventoryLocation: (location_id: TLocationID) => Promise<IInventoryItem[]>;
  createInventoryLocation: (location: IInventoryLocation) => Promise<TLocationID | null>;
  updateInventoryLocation: (location_id: TLocationID, newLocation: IInventoryLocation) => Promise<TLocationID | null>;
  searchInventoryItemByLocation: () => Promise<any>;
  addItemToLocation: (location_id: TLocationID, item_id: TInventoryID) => Promise<TLocationID | null>;
  deleteItemFromLocation: (location_id: TLocationID, item_id: TInventoryID) => Promise<TLocationID | null>;

  // Types
  getTypes: () => Promise<TItemType[]>;
  createType: (type: TItemType) => Promise<Boolean>;
  deleteType: (type: TItemType) => Promise<Boolean>;
}

const DataController = (): IDataController => {
  /** Inventory Items */

  /**
   *
   * Gets the entire inventory from the database
   *
   * @returns A Promise that resolves to a map of all inventory items.
   */
  const getInventory = async (): Promise<IInventoryItemMap> => {
    const all_string = await readFile(`${DB_PATH}/${ALL_FILE}`, 'utf8');
    const all: IInventoryItemMap = JSON.parse(all_string);
    return all;
  };

  const getInventoryItem = async (inventory_id: TInventoryID): Promise<IInventoryItem | null> => {
    const inventory = await getInventory();

    const item = inventory[inventory_id];

    if (!item) {
      return null;
    }

    return item;
  };

  /**
   *
   * @param newItem The new item to be added to the inventory
   * @returns A promise that resolves to the new item's inventory_id, null if the item already exists, or if an error occurred.
   */
  const createInventoryItem = async (newItem: IInventoryItem): Promise<TInventoryID | null> => {
    if (!isInventoryItem(newItem)) {
      // Fails validation
      return null;
    }

    const inventory_id = `i_${uuid()}`; // Create a uuid for the new item's inventory_id

    const all: IInventoryItemMap = await getInventory();

    if (all[inventory_id]) {
      // Item already exists.. Update should be called
      return null;
    }

    const newAll = { ...all, [inventory_id]: { ...newItem, inventory_id: inventory_id } };

    writeFile(`${DB_PATH}/${ALL_FILE}`, JSON.stringify(newAll));

    const id_verification = await addItemToLocation(newItem.location_id, inventory_id);

    return id_verification;
  };

  /**
   *
   * @param i_id The inventory_id of the item to be updated
   * @param newItem The new item to be added to the inventory
   * @returns A promise that resolves to the updated item's inventory_id, null if the item doesn't exist, or if an error occurred.
   */
  const updateInventoryItem = async (
    inventory_id: TInventoryID,
    newItem: IInventoryItem
  ): Promise<TInventoryID | null> => {
    const all: IInventoryItemMap = await getInventory();

    if (!all[inventory_id]) {
      // Item already exists.. Create should be called
      return null;
    }

    if (newItem.inventory_id !== inventory_id) {
      // This is an error if the new item has a different inventory_id than the one specified
      return null;
    }

    const newAll = { ...all, [inventory_id]: newItem };

    writeFile(`${DB_PATH}/${LOCATIONS_FILE}`, JSON.stringify(newAll));

    return inventory_id;
  };

  const searchInventoryItem = async (
    field: string,
    value: string | number | TInventoryID | TLocationID
  ): Promise<any> => {
    return null;
  };

  /** Inventory Locations */

  /**
   *
   * Retrive all locations from the database
   *
   * @returns A Promise that resolves to a map of all inventory locations.
   */
  const getLocations = async (): Promise<IInventoryLocationMap> => {
    const locations_string: string = await readFile(`${DB_PATH}/${LOCATIONS_FILE}`, 'utf8');
    const locations: IInventoryLocationMap = JSON.parse(locations_string);
    return locations;
  };

  /**
   *
   * @param location_id The id of the desired location
   * @returns A promise containing a location that was requested, or null if the location doesn't exist
   */
  const getLocation = async (location_id: TInventoryID): Promise<IInventoryLocation | null> => {
    const locations_string: string = await readFile(`${DB_PATH}/${LOCATIONS_FILE}`, 'utf8');
    const locations: IInventoryLocationMap = JSON.parse(locations_string);

    if (!locations[location_id]) {
      // Location doesn't exist
      return null;
    }

    return locations[location_id];
  };

  /**
   *
   * Retrieve all items in a location
   *
   * @param location_id The id of the location to be retrieved
   * @returns An array containing of the InventoryItems in the location
   */
  const getInventoryLocation = async (location_id: TLocationID): Promise<IInventoryItem[]> => {
    const locations: IInventoryLocationMap = await getLocations();

    const location = locations[location_id];

    const items = await getInventory();

    const inventory_items: IInventoryItem[] = location.items.map((i_id: TInventoryID) => {
      return items[i_id];
    });

    return inventory_items;
  };

  /**
   *
   * Create a new location in the database
   *
   * @param location The location to be added to the database
   * @returns A promise that resolves to the location's location_id, null if the location already exists, or if an error occurred.
   */
  const createInventoryLocation = async (location: IInventoryLocation): Promise<TLocationID | null> => {
    if (!isInventoryLocation(location)) {
      // Fails validation
      return null;
    }

    const locations: IInventoryLocationMap = await getLocations();

    if (locations[location.location_id]) {
      // Location already exists.. Update should be called
      return null;
    }

    const newLocations = { ...locations, [location.location_id]: location };

    writeFile(`${DB_PATH}/${LOCATIONS_FILE}`, JSON.stringify(newLocations));

    return location.location_id;
  };

  /**
   *
   * @param location_id The id of the location to be updated
   * @param newLocation The new location to be added to the database
   * @returns A promise that resolves to the location's location_id, null if the location doesn't exist, or if an error occurred.
   */
  const updateInventoryLocation = async (
    location_id: TLocationID,
    newLocation: IInventoryLocation
  ): Promise<TLocationID | null> => {
    const locations: IInventoryLocationMap = await getLocations();

    if (!locations[location_id]) {
      // Location doesn't exist.. Create should be called
      return null;
    }

    if (newLocation.location_id !== location_id) {
      // This is an error if the new location has a different location_id than the one specified
      return null;
    }

    const newLocations = { ...locations, [location_id]: newLocation };

    writeFile(`${DB_PATH}/${LOCATIONS_FILE}`, JSON.stringify(newLocations));

    return location_id;
  };

  const searchInventoryItemByLocation = async (): Promise<any> => {
    return null;
  };

  /**
   *
   * Adds an item to a new location
   *
   * @param location_id The id of the location for the item to be added
   * @param item_id The id of the item to be added
   * @returns Returns a promise that resolves to the new location_id, null if the item exists at the new location already, or if an error occurred.
   */
  const addItemToLocation = async (location_id: TLocationID, item_id: TInventoryID): Promise<TLocationID | null> => {
    const locations: IInventoryLocationMap = await getLocations();

    if (locations[location_id].items.includes(item_id)) {
      // The item already exists in this location.. Nothing to add
      return null;
    }

    const newLocations = {
      ...locations,
      [location_id]: { ...locations[location_id], items: [...locations[location_id].items, item_id] },
    };

    writeFile(`${DB_PATH}/${LOCATIONS_FILE}`, JSON.stringify(newLocations));

    return location_id;
  };

  /**
   *
   * Deletes an item from a location
   *
   * @param location_id The id of the location for which the item should be removed
   * @param item_id The id of the item to be removed
   * @returns Returns a promise that resolves to the new location_id, null if the item doesn't exist in the location, or if an error occurred.
   */
  const deleteItemFromLocation = async (
    location_id: TLocationID,
    item_id: TInventoryID
  ): Promise<TLocationID | null> => {
    const locations: IInventoryLocationMap = await getLocations();

    const itemIndex = locations[location_id].items.indexOf(item_id);

    if (itemIndex === -1) {
      // The item does not exist at this location.. Nothing to delete
      return null;
    }

    const newItems = locations[location_id].items.filter((i_id: TInventoryID) => i_id !== item_id);

    const newLocations = {
      ...locations,
      [location_id]: { ...locations[location_id], items: newItems },
    };

    writeFile(`${DB_PATH}/${LOCATIONS_FILE}`, JSON.stringify(newLocations));

    return location_id;
  };

  /**
   *
   * Retrieve all types in the database
   *
   * @returns A promise that resolves to a list of all the types of items in the database
   */
  const getTypes = async (): Promise<TItemType[]> => {
    const types_string: string = await readFile(`${DB_PATH}/${TYPES_FILE}`, 'utf8');
    const types: string[] = JSON.parse(types_string);
    return types;
  };

  /**
   *
   * Creates a type in the database
   *
   * @param type The type to be added
   * @returns A boolean value indicating whether the type was successfully created or not
   */
  const createType = async (type: TItemType): Promise<Boolean> => {
    if (!isType(type)) {
      return false;
    }

    const types: TItemType[] = await getTypes();

    if (types.includes(type)) {
      // Type already exists
      return false;
    }

    const newTypes: TItemType[] = [...types, type];

    writeFile(`${DB_PATH}/${TYPES_FILE}`, JSON.stringify(newTypes));

    return true;
  };

  /**
   *
   * Deletes a type from the database, all items of that type will be changed to the default type
   *
   * @param type the type to be deleted
   * @returns A boolean value indicating whether the type was successfully deleted or not
   */
  const deleteType = async (type: TItemType): Promise<Boolean> => {
    const types: TItemType[] = await getTypes();

    if (!types.includes(type)) {
      // Type doesn't exist
      return false;
    }

    const newTypes: TItemType[] = types.filter((t: TItemType) => t !== type);

    writeFile(`${DB_PATH}/${TYPES_FILE}`, JSON.stringify(newTypes));

    return true;
  };

  return {
    // Inventory
    getInventory,
    getInventoryItem,
    createInventoryItem,
    updateInventoryItem,
    searchInventoryItem,
    // Locations
    getLocations,
    getLocation,
    getInventoryLocation,
    createInventoryLocation,
    updateInventoryLocation,
    searchInventoryItemByLocation,
    addItemToLocation,
    deleteItemFromLocation,
    //Types
    getTypes,
    createType,
    deleteType,
  };
};

export default DataController;
