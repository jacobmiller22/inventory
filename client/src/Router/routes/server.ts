import { HttpMethod, Route } from "lib/http";
export const UF_API_ENDPOINT = "https://api.userfront.com";

/** Local */

export const MEMBER_RT: Route = {
  method: HttpMethod.GET,
  basePath: "",
  path: "/api/v1/member/*",
  wildcards: ["username"],
};
export const MEMBER_META_RT: Route = {
  method: HttpMethod.GET,
  basePath: "",
  path: "/api/v1/member/*/meta",
  wildcards: ["username"],
};

export const MEMBER_RECIPES_RT: Route = {
  method: HttpMethod.GET,
  basePath: "",
  path: "/api/v1/recipes/*",
  wildcards: ["username"],
};

export const ACCOUNT_DETAILS_RT: Route = {
  method: HttpMethod.GET,
  basePath: "",
  path: "/api/v1/account/u/*",
  wildcards: ["userId"],
};

export const ACCOUNT_USERNAME_RT: Route = {
  method: HttpMethod.GET,
  basePath: "",
  path: "/api/v1/account/u/*/username",
  wildcards: ["userId"],
};

/** 3rd party */

/** Userfront */
export const UF_SEARCH_USERS_RT: Route = {
  method: HttpMethod.POST,
  basePath: UF_API_ENDPOINT,
  path: "/v0/users/find",
};

export const UF_READ_USER_RT: Route = {
  method: HttpMethod.GET,
  basePath: UF_API_ENDPOINT,
  path: "/v0/users/*",
  wildcards: ["userId"],
  // Note: wildcard exists at end of path
};

export const UF_UPDATE_USER_RT: Route = {
  method: HttpMethod.PUT,
  basePath: UF_API_ENDPOINT,
  path: "/v0/users/*",
  wildcards: ["userId"],
};
