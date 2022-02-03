import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Long: any;
  Time: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  createUser: User;
  deleteTodo?: Maybe<Todo>;
  deleteUser?: Maybe<User>;
  partialUpdateTodo?: Maybe<Todo>;
  partialUpdateUser?: Maybe<User>;
  updateTodo?: Maybe<Todo>;
  updateUser?: Maybe<User>;
};


export type MutationCreateTodoArgs = {
  data: TodoInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationPartialUpdateTodoArgs = {
  data: PartialUpdateTodoInput;
  id: Scalars['ID'];
};


export type MutationPartialUpdateUserArgs = {
  data: PartialUpdateUserInput;
  id: Scalars['ID'];
};


export type MutationUpdateTodoArgs = {
  data: TodoInput;
  id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars['ID'];
};

export type PartialUpdateTodoInput = {
  completed?: InputMaybe<Scalars['Boolean']>;
  owner?: InputMaybe<TodoOwnerRelation>;
  task?: InputMaybe<Scalars['String']>;
};

export type PartialUpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  todos?: InputMaybe<UserTodosRelation>;
};

export type Query = {
  __typename?: 'Query';
  allTodos: TodoPage;
  findTodoByID?: Maybe<Todo>;
  findUserByID?: Maybe<User>;
};


export type QueryAllTodosArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
};


export type QueryFindTodoByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['ID'];
};

export type Todo = {
  __typename?: 'Todo';
  _id: Scalars['ID'];
  _ts: Scalars['Long'];
  completed: Scalars['Boolean'];
  owner: User;
  task: Scalars['String'];
};

export type TodoInput = {
  completed: Scalars['Boolean'];
  owner?: InputMaybe<TodoOwnerRelation>;
  task: Scalars['String'];
};

export type TodoOwnerRelation = {
  connect?: InputMaybe<Scalars['ID']>;
  create?: InputMaybe<UserInput>;
};

export type TodoPage = {
  __typename?: 'TodoPage';
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  data: Array<Maybe<Todo>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  _ts: Scalars['Long'];
  email: Scalars['String'];
  todos: TodoPage;
};


export type UserTodosArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
};

export type UserInput = {
  email: Scalars['String'];
  todos?: InputMaybe<UserTodosRelation>;
};

export type UserTodosRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  create?: InputMaybe<Array<InputMaybe<TodoInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type CreateTodoMutationVariables = Exact<{
  task: Scalars['String'];
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', _id: string, task: string, completed: boolean } };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo?: { __typename?: 'Todo', _id: string, task: string, completed: boolean } | null | undefined };

export type PartialUpdateTodoMutationVariables = Exact<{
  id: Scalars['ID'];
  data: PartialUpdateTodoInput;
}>;


export type PartialUpdateTodoMutation = { __typename?: 'Mutation', partialUpdateTodo?: { __typename?: 'Todo', _id: string, task: string, completed: boolean } | null | undefined };

export type GetAllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTodosQuery = { __typename?: 'Query', allTodos: { __typename?: 'TodoPage', data: Array<{ __typename?: 'Todo', _id: string, task: string, completed: boolean } | null | undefined> } };

export type GetFindTodoByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetFindTodoByIdQuery = { __typename?: 'Query', findTodoByID?: { __typename?: 'Todo', _id: string, task: string, completed: boolean } | null | undefined };


export const CreateTodoDocument = gql`
    mutation CreateTodo($task: String!) {
  createTodo(data: {task: $task, completed: false}) {
    _id
    task
    completed
  }
}
    `;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: ID!) {
  deleteTodo(id: $id) {
    _id
    task
    completed
  }
}
    `;
export const PartialUpdateTodoDocument = gql`
    mutation PartialUpdateTodo($id: ID!, $data: PartialUpdateTodoInput!) {
  partialUpdateTodo(id: $id, data: $data) {
    _id
    task
    completed
  }
}
    `;
export const GetAllTodosDocument = gql`
    query getAllTodos {
  allTodos {
    data {
      _id
      task
      completed
    }
  }
}
    `;
export const GetFindTodoByIdDocument = gql`
    query getFindTodoByID($id: ID!) {
  findTodoByID(id: $id) {
    _id
    task
    completed
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateTodo(variables: CreateTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTodoMutation>(CreateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateTodo');
    },
    DeleteTodo(variables: DeleteTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTodoMutation>(DeleteTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteTodo');
    },
    PartialUpdateTodo(variables: PartialUpdateTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PartialUpdateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PartialUpdateTodoMutation>(PartialUpdateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PartialUpdateTodo');
    },
    getAllTodos(variables?: GetAllTodosQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllTodosQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllTodosQuery>(GetAllTodosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllTodos');
    },
    getFindTodoByID(variables: GetFindTodoByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetFindTodoByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFindTodoByIdQuery>(GetFindTodoByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFindTodoByID');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;