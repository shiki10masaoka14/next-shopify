import { Link, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import NextLink from "next/link";
import { memo } from "react";

// ここまで「import」
//
//
//
// ここから

const home: NextPage = memo(() => {
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
    </>
  );
});
home.displayName = "home";

export default home;

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};
