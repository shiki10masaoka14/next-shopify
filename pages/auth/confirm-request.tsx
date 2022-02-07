import {
  Container,
  Link,
  Heading,
  Center,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { graphQLClient } from "../../utils/fetcher";
import { getSdk } from "../../utils/generated";

// ここまで「import」
//
//
//
// ここから

const ConfirmRequest: NextPage = memo(() => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  if (!loading && !session) {
    router.push("/auth/signin");
  }

  return (
    <>
      <Container>
        {loading ? (
          <Heading>Loading...</Heading>
        ) : !session ? (
          <Heading>Redirecting...</Heading>
        ) : (
          <>
            <Center minH={"100vh"}>
              <NextLink href="/" passHref>
                <Link fontSize={24} fontWeight={"bold"}>
                  go to Home
                </Link>
              </NextLink>
            </Center>
          </>
        )}
      </Container>
    </>
  );
});
ConfirmRequest.displayName = "ConfirmRequest";

export default ConfirmRequest;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const sdk = getSdk(graphQLClient);

  try {
    await sdk.CreateUser({
      data: {
        email: session.user.email,
      },
    });
  } catch (error) {
    console.error(error.message);
  }

  return {
    props: {
      session,
    },
  };
};
