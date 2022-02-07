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
  task?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<TodoUserRelation>;
};

export type PartialUpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  todos?: InputMaybe<UserTodosRelation>;
};

export type Query = {
  __typename?: 'Query';
  findTodoByID?: Maybe<Todo>;
  findUserByID?: Maybe<User>;
  user?: Maybe<User>;
  users: UserPage;
};


export type QueryFindTodoByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  email: Scalars['String'];
};


export type QueryUsersArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
};

export type Todo = {
  __typename?: 'Todo';
  _id: Scalars['ID'];
  _ts: Scalars['Long'];
  completed: Scalars['Boolean'];
  task: Scalars['String'];
  user: User;
};

export type TodoInput = {
  completed: Scalars['Boolean'];
  task: Scalars['String'];
  user?: InputMaybe<TodoUserRelation>;
};

export type TodoPage = {
  __typename?: 'TodoPage';
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  data: Array<Maybe<Todo>>;
};

export type TodoUserRelation = {
  connect?: InputMaybe<Scalars['ID']>;
  create?: InputMaybe<UserInput>;
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

export type UserPage = {
  __typename?: 'UserPage';
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  data: Array<Maybe<User>>;
};

export type UserTodosRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  create?: InputMaybe<Array<InputMaybe<TodoInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type CreateTodoMutationVariables = Exact<{
  data: TodoInput;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', _id: string, completed: boolean, task: string, user: { __typename?: 'User', email: string } } };

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string } };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo?: { __typename?: 'Todo', _id: string, task: string, completed: boolean } | null | undefined };

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['ID'];
  data: PartialUpdateTodoInput;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', partialUpdateTodo?: { __typename?: 'Todo', _id: string, task: string, completed: boolean } | null | undefined };

export type UserQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, email: string, todos: { __typename?: 'TodoPage', data: Array<{ __typename?: 'Todo', _id: string, completed: boolean, task: string } | null | undefined> } } | null | undefined };

export type FindTodoByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindTodoByIdQuery = { __typename?: 'Query', findTodoByID?: { __typename?: 'Todo', _id: string, completed: boolean, task: string } | null | undefined };


export const CreateTodoDocument = gql`
    mutation CreateTodo($data: TodoInput!) {
  createTodo(data: $data) {
    _id
    completed
    task
    user {
      email
    }
  }
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    email
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
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($id: ID!, $data: PartialUpdateTodoInput!) {
  partialUpdateTodo(id: $id, data: $data) {
    _id
    task
    completed
  }
}
    `;
export const UserDocument = gql`
    query User($email: String!) {
  user(email: $email) {
    _id
    email
    todos {
      data {
        _id
        completed
        task
      }
    }
  }
}
    `;
export const FindTodoByIdDocument = gql`
    query FindTodoById($id: ID!) {
  findTodoByID(id: $id) {
    _id
    completed
    task
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
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser');
    },
    DeleteTodo(variables: DeleteTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTodoMutation>(DeleteTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteTodo');
    },
    UpdateTodo(variables: UpdateTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTodoMutation>(UpdateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateTodo');
    },
    User(variables: UserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserQuery>(UserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'User');
    },
    FindTodoById(variables: FindTodoByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindTodoByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindTodoByIdQuery>(FindTodoByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FindTodoById');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;