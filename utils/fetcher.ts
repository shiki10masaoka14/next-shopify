import { graphQLClient } from "./shopifyClient";

export const fetcher = async (query, variables?) =>
  await graphQLClient.request(query, variables);
