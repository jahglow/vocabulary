export const ROOT_ROUTE =
  process.env.NODE_ENV === "production" ? "/vocabulary" : "";

alert(ROOT_ROUTE);
export const makeRoute = (route: string) => ROOT_ROUTE + route;
