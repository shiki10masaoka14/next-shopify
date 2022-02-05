import { Link } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import { memo } from "react";

// ここまで「import」
//
//
//
// ここから

const home: NextPage = memo(() => {
  return (
    <>
      <NextLink href="/todo" passHref>
        <Link>go to todo page</Link>
      </NextLink>
    </>
  );
});
home.displayName = "home";

export default home;
