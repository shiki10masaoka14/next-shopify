import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
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
        {products.edges.map(({ node }) => (
          <Image
            key={node.id}
            src={node.media.edges[0].node.previewImage.src}
            alt={node.title}
            width={300}
            height={300}
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
  const { products } = await sdk.FindProducts({
    first: 8,
  });

  return {
    props: { products },
  };
};
