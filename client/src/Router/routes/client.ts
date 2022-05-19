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
