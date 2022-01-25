import { memo, VFC } from "react";

const home: VFC = memo(() => {
  return <>home page</>;
});
home.displayName = "home";

export default home;
