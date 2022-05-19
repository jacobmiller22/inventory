export type LocationId = string;

export interface MinLocation {
  locationId: LocationId;
  name: string;
  description: string;
}

export interface Location extends MinLocation {
  items: any[];
}
