import {
  Button,
  Center,
  Checkbox,
  HStack,
  Input,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { ChangeEvent, memo, useState } from "react";
import { fetcher, graphQLClient } from "../utils/fetcher";
import {
  GetFindTodoByIdQuery,
  getSdk,
  PartialUpdateTodoDocument,
} from "../utils/generated";

// ここまで「import」
//
//
//
// ここから

const Task: NextPage<GetFindTodoByIdQuery> = memo(
  ({ findTodoByID }) => {
    const [task, setTask] = useState(findTodoByID.task);

    const onChangeCompleted = async (
      e: ChangeEvent<HTMLInputElement>,
    ) => {
      const completed = e.currentTarget.checked;
      await fetcher(PartialUpdateTodoDocument, {
        id: findTodoByID._id,
        data: { completed },
      });
    };

    const onChangeTask = (
      e: ChangeEvent<HTMLInputElement>,
    ) => {
      setTask(e.currentTarget.value);
    };

    const onClickSave = async () => {
      await fetcher(PartialUpdateTodoDocument, {
        id: findTodoByID._id,
        data: { task },
      });
    };

    return (
      <Center minH={"100vh"}>
        <HStack>
          <Checkbox
            defaultChecked={findTodoByID.completed}
            onChange={onChangeCompleted}
          />
          <Input
            value={task}
            onChange={onChangeTask}
            w={"300px"}
          />
          <Button onClick={onClickSave}>save</Button>
        </HStack>
      </Center>
    );
  },
);
Task.displayName = "Task";

export const getServerSideProps: GetServerSideProps =
  async ({ params }) => {
    const id = String(params.id);
    const sdk = getSdk(graphQLClient);
    const { findTodoByID } = await sdk.getFindTodoByID({
      id,
    });
    return { props: { findTodoByID } };
  };

export default Task;
