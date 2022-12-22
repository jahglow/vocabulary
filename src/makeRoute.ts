export const ROOT_ROUTE =
  process.env.NODE_ENV === "production" ? "/vocabulary" : "";

export const makeRoute = (route: string) => ROOT_ROUTE + route;
