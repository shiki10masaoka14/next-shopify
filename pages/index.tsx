import { Image } from "@chakra-ui/react";
import { NextPage, GetStaticProps } from "next";
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
        {products.edges.map((item) => (
          <Image
            key={item.node.id}
            src={
              item.node.media.edges[0].node.previewImage.src
            }
            alt={"商品画像"}
          />
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

export const getStaticProps: GetStaticProps = async () => {
  const sdk = getSdk(graphQLClient);
  // const { products } = await sdk.FindProducts({
  //   first: 8,
  // });
  const { products } = await sdk.FindProducts({
    first: 8,
  });

  return {
    props: { products },
  };
};
