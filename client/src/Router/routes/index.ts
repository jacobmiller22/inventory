import { Route as ClientRT } from "./client";
import { Route as ServerRT } from "lib/http";

export const replaceWildcards = (
  route: ClientRT | ServerRT,
  values: string[]
) => {
  let path = route.path;
  for (let i = 0; i < (route.wildcards ?? []).length; i++) {
    path = path.replace(`*`, values[i]);
  }
  return path;
};
