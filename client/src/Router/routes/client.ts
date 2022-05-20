export type Route = {
  path: string;
  name: string;
  wildcards?: string[];
};

/** Pages  */

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

export const loginRoute: Route = {
  path: "/auth/login",
  name: "Login",
};

export const myRecipesRoute: Route = {
  path: "/u/*/recipes/",
  name: "My Recipes",
  wildcards: ["userId"],
};

export const recipesRoute: Route = {
  path: "/u/*/recipes/",
  name: "My Recipes",
  wildcards: ["userId"],
};

export const memberRecipeRoute: Route = {
  path: "/u/*/recipes/*",
  name: "Recipe",
  wildcards: ["userId", "recipeId"],
};

export const profileRoute: Route = {
  path: "/u/*/",
  name: "Profile",
  wildcards: ["userId"],
};

export const myProfileRoute: Route = {
  path: "/account",
  name: "My Profile",
};

export const publicRoutes: Route[] = [loginRoute, profileRoute];

export const RC_START = "routeChangeStart";

export const RC_END = "routeChangeComplete";
