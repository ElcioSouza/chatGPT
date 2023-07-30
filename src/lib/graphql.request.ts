import { getItem, setItem } from "./storage";

import { GraphQLClient } from "graphql-request";

function middleware(response: any) {
  if (response) {
    const token = response.headers.get("vendure-auth-token");

    if (token) {
      setItem("vendure-auth-token", token);
    }
  }
}

const graphqlRequestClient = new GraphQLClient(
  "https://cesconetto.globalsys.com.br:6333/shop-api",
  {
    responseMiddleware: middleware,
    headers() {
      return {
        "vendure-token": getItem("channel-token") || "i7unl14ub4gn4f1i30e",
        Authorization: `Bearer ${getItem("vendure-auth-token")}`,
      };
    },
  }
);

export default graphqlRequestClient;
