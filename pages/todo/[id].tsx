import {
  Button,
  Center,
  Checkbox,
  HStack,
  Input,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { ChangeEvent, memo, useState } from "react";
import {
  graphQLClient,
} from "../../utils/fetcher";
import {
  FindTodoByIdQuery,
  getSdk,
} from "../../utils/generated";

// ここまで「import」
//
//
//
// ここから

const Task: NextPage<FindTodoByIdQuery> = memo(
  ({ findTodoByID }) => {
    const [task, setTask] = useState(findTodoByID.task);
    const sdk = getSdk(graphQLClient);

    const onChangeCompleted = async (
      e: ChangeEvent<HTMLInputElement>,
    ) => {
      const completed = e.currentTarget.checked;
      await sdk.UpdateTodo({
        data: {
          completed,
        },
        id: findTodoByID._id,
      });
    };

    const onChangeTask = (
      e: ChangeEvent<HTMLInputElement>,
    ) => {
      setTask(e.currentTarget.value);
    };

    const onClickSave = async () => {
      await sdk.UpdateTodo({
        data: {
          task,
        },
        id: findTodoByID._id,
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
    const { findTodoByID } = await sdk.FindTodoById({ id });
    return { props: { findTodoByID } };
  };

export default Task;
