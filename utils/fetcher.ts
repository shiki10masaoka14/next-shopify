import { GraphQLClient } from "graphql-request";
import { CreateTodoMutationVariables } from "./generated";

const endpoint = "https://graphql.fauna.com/graphql";

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Schema-Preview": "partial-update-mutation",
    authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_SECRET}`,
  },
});

export const fetcher = async (
  query,
  variables?: CreateTodoMutationVariables,
) => await graphQLClient.request(query, variables);
