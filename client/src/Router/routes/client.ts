export type Route = {
  path: string;
  name: string;
  wildcards?: string[];
};

/** Pages  */

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

export const newTagRoute: Route = {
  path: "/tags/new",
  name: "New Tag",
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
