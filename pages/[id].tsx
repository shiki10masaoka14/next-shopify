import {
  Button,
  Center,
  Checkbox,
  HStack,
  Input,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { ChangeEvent, memo, useState } from "react";
import { useRecoilValue } from "recoil";
import { fetcher } from "../graphql/fetcher";
import {
  GetAllTodosQuery,
  GetFindTodoByIdQuery,
  PartialUpdateTodoDocument,
} from "../graphql/generated";
import { recoilAllTodos } from "../recoil/recoilAllTodos";

// ここまで「import」
//
//
//
// ここから

const Task: NextPage<
  GetFindTodoByIdQuery & { id: string }
> = memo(({ id }) => {
  const testObj =
    useRecoilValue<GetAllTodosQuery>(recoilAllTodos);
  const testVal = testObj.allTodos.data.filter(
    (test) => test._id === id,
  )[0];

  const [task, setTask] = useState(testVal.task);

  const onChangeCompleted = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const completed = e.currentTarget.checked;
    await fetcher(PartialUpdateTodoDocument, {
      id,
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
      id,
      data: { task },
    });
  };

  return (
    <Center minH={"100vh"}>
      <HStack>
        <Checkbox
          defaultChecked={testVal.completed}
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
});
Task.displayName = "Task";

export const getServerSideProps: GetServerSideProps =
  async ({ params }) => {
    const id = String(params.id);
    return { props: { id } };
  };

export default Task;
