import { Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { memo } from "react";
import { graphQLClient } from "../utils/fetcher";
import { getSdk, UserQuery } from "../utils/generated";

// ここまで「import」
//
//
//
// ここから

const gqlTest: NextPage<UserQuery> = memo(({ user }) => {
  const { data: session } = useSession();

  return (
    <>
      <Text>{session.user.email}</Text>
      {user.todos.data.map((todo) => (
        <Text key={todo._id}>{todo.task}</Text>
      ))}
    </>
  );
});
gqlTest.displayName = "gqlTest";

export default gqlTest;

export const getServerSideProps: GetServerSideProps<
  UserQuery
> = async (context) => {
  const session = await getSession(context);
  const sdk = getSdk(graphQLClient);

  try {
    await sdk.CreateUser({
      data: {
        email: session.user.email,
      },
    });
  } catch (error) {
    const { user } = await sdk.User({
      email: session.user.email,
    });
    return { props: { user } };
  }

  return {
    props: {
      session,
    },
  };
};
