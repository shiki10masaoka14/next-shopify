import { NextPage } from "next";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { GetAllTodosQuery } from "../graphql/generated";
import { allTodosState } from "../recoil/recoilAllTodos";

const test: NextPage = memo(() => {
  const testObj =
    useRecoilValue<GetAllTodosQuery>(allTodosState);
  const testVal = testObj.allTodos.data.filter(
    (test) => test._id === "322390135223091794",
  );
  console.log(testVal);

  return <>test</>;
});
test.displayName = "test";

export default test;
