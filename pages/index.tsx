import { Text } from "@chakra-ui/react";
import { NextPage, GetServerSideProps } from "next";
import { memo } from "react";
import {
  FindProductsQuery,
  getSdk,
} from "../utils/generated";
import { graphQLClient } from "../utils/shopifyClient";

// ここまで「import」
//
//
//
// ここから「実装」

const home: NextPage<FindProductsQuery> = memo(
  ({ products }) => {
    // ここまで「関数」
    //
    //
    //
    // ここから「tsx」

    return (
      <>
        {products.edges.map((product) => (
          <Text key={product.node.title}>
            {product.node.title}
          </Text>
        ))}
      </>
    );
  },
);
home.displayName = " home ";

export default home;

// ここまで「実装」
//
//
//
// ここから「ssr」

export const getServerSideProps: GetServerSideProps =
  async () => {
    const sdk = getSdk(graphQLClient);
    const { products } = await sdk.FindProducts({
      first: 10,
    });

    return {
      props: { products },
    };
  };
