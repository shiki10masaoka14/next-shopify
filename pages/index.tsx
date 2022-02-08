import { NextPage, GetServerSideProps } from "next";
import { memo } from "react";

// ここまで「import」
//
//
//
// ここから「実装」

const home: NextPage = memo(() => {
  // ここまで「関数」
  //
  //
  //
  // ここから「tsx」

  return <>test</>;
});
home.displayName = " home ";

export default home;

// ここまで「実装」
//
//
//
// ここから「ssr」

export const getServerSideProps: GetServerSideProps =
  async () => {
    return {
      props: {},
    };
  };
