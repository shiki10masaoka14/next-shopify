import {
  Container,
  Link,
  Heading,
  Center,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

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
