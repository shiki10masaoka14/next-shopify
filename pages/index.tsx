import { Link, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import NextLink from "next/link";
import { memo } from "react";
import { graphQLClient } from "../utils/fetcher";
import {
  FindTodoByIdQuery,
  getSdk,
} from "../utils/generated";

// ここまで「import」
//
//
//
// ここから

const home: NextPage<FindTodoByIdQuery> = memo(
  ({ findTodoByID }) => {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    return (
      <>
        <NextLink href="/auth/signin" passHref>
          <Link>go to sign in page</Link>
        </NextLink>
        {loading ? (
          <Text>Loading...</Text>
        ) : !session ? (
          <Text>Log in</Text>
        ) : (
          <>
            <Text>{session?.user?.email}</Text>
            <NextLink href="/todo" passHref>
              <Link>go to todo page</Link>
            </NextLink>
            <br />
          </>
        )}
        <Text>{findTodoByID?.task}</Text>
      </>
    );
  },
);
home.displayName = "home";

export default home;

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const sdk = getSdk(graphQLClient);
  const { findTodoByID } = await sdk.FindTodoById({
    id: "322845040814588499",
  });

  return {
    props: {
      session: await getSession(context),
      findTodoByID,
    },
  };
};
