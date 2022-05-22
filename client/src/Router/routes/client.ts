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
  name: "Edit Tag",
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
  name: "Edit Location",
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

/** User Routes */

export const usersRoute: Route = {
  path: "/users",
  name: "Users",
};

export const newUserRoute: Route = {
  path: "/users/new",
  name: "New User",
};

export const newUsersRoute: Route = {
  path: "/users/new/batch",
  name: "New Batch Users",
};

export const userDetailsRoute: Route = {
  path: "/users/*",
  name: "User Details",
  wildcards: ["userId"],
};

export const editUserRoute: Route = {
  path: "/users/*/edit",
  name: "Edit User",
  wildcards: ["userId"],
};

/** Other */

export const indexRoute: Route = itemsRoute;

export const RC_START = "routeChangeStart";

export const RC_END = "routeChangeComplete";
