export type Route = {
  path: string;
  name: string;
  wildcards?: string[];
};

/** Pages  */

/** Items */

export const itemsRoute: Route = {
  path: "/",
  name: "Items",
};

export const newItemRoute: Route = {
  path: "/items/new",
  name: "New Item",
};

export const itemDetailsRoute: Route = {
  path: "/items/*",
  name: "Item Details",
  wildcards: ["itemId"],
};

export const editItemRoute: Route = {
  path: "/items/*/edit",
  name: "Edit Item",
  wildcards: ["itemId"],
};

/** Tags */

export const tagsRoute: Route = {
  path: "/tags",
  name: "Tags",
};

export const newTagRoute: Route = {
  path: "/tags/new",
  name: "New Tag",
};

export const tagDetailsRoute: Route = {
  path: "/tags/*",
  name: "Tag Details",
  wildcards: ["tagId"],
};

export const editTagRoute: Route = {
  path: "/tags/*/edit",
  name: "Tag Details",
  wildcards: ["tagId"],
};

/**  Locations  */
export const locationsRoute: Route = {
  path: "/locations",
  name: "Locations",
};

export const newLocationRoute: Route = {
  path: "/locations/new",
  name: "New Location",
};

export const locationDetailsRoute: Route = {
  path: "/locations/*",
  name: "Location Details",
  wildcards: ["locationId"],
};

export const editLocationRoute: Route = {
  path: "/locations/*/edit",
  name: "Location Details",
  wildcards: ["locationId"],
};

/** Auth Routes */

export const loginRoute: Route = {
  path: "/auth/login",
  name: "Login",
};

export const signupRoute: Route = {
  path: "/auth/signup",
  name: "Signup",
};

/** Other */

export const indexRoute: Route = itemsRoute;

export const RC_START = "routeChangeStart";

export const RC_END = "routeChangeComplete";
