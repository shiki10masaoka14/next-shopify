import { GraphQLClient } from "graphql-request";
import {
  CreateTodoMutationVariables,
  DeleteTodoMutationVariables,
  PartialUpdateTodoMutationVariables,
} from "./generated";

console.log(process.env.FAUNA_ADMIN_KEY);

const endpoint = "https://graphql.fauna.com/graphql";

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Schema-Preview": "partial-update-mutation",
    authorization: `Bearer ${process.env.FAUNA_ADMIN_KEY}`,
  },
});

export const fetcher = async (
  query,
  variables?:
    | CreateTodoMutationVariables
    | DeleteTodoMutationVariables
    | PartialUpdateTodoMutationVariables,
) => await graphQLClient.request(query, variables);
