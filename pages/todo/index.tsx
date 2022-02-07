import {
  Heading,
  Container,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import {
  ChangeEvent,
  MouseEvent,
  memo,
  useState,
} from "react";
import { getSdk, UserQuery } from "../../utils/generated";
import { graphQLClient } from "../../utils/fetcher";
import { getSession, useSession } from "next-auth/react";
import { TableComponent } from "../../components/Table";
import Router from "next/router";

// ここまで「import」
//
//
//
// ここから「関数」

const todo: NextPage<UserQuery> = memo(({ user }) => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(user.todos.data);
  const [filtering, setFiltering] = useState(false);
  const [complete, setComplete] = useState(false);
  const { data: session } = useSession();
  const sdk = getSdk(graphQLClient);

  const onChangeTask = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setTask(e.target.value);
  };

  const onClickAdd = async () => {
    setTodos([
      ...todos,
      {
        _id: "",
        task,
        completed: false,
      },
    ]);

    setTask("");

    await sdk.CreateTodo({
      data: {
        task: task,
        completed: false,
        user: {
          connect: user._id,
        },
      },
    });

    const { user: newUser } = await sdk.User({
      email: session.user.email,
    });
    setTodos(newUser.todos.data);
  };

  const onChangeComplete = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const id = e.currentTarget.id;
    const completed = e.currentTarget.checked;
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, completed } : todo,
      ),
    );
    await sdk.UpdateTodo({
      id,
      data: {
        completed,
      },
    });
  };

  const onClickDetail = (
    e: MouseEvent<HTMLInputElement>,
  ) => {
    const id = e.currentTarget.id;
    Router.push("/todo/[id]", `/todo/${id}`);
  };

  const onClickDelete = async (
    e: MouseEvent<HTMLInputElement>,
  ) => {
    const id = e.currentTarget.id;
    setTodos(todos.filter((todo) => todo._id !== id));
    await sdk.DeleteTodo({
      id: id,
    });
  };

  const onClickAll = () => {
    setFiltering(false);
  };
  const onClickIncomplete = () => {
    setFiltering(true);
    setComplete(false);
  };
  const onClickComplete = () => {
    setFiltering(true);
    setComplete(true);
  };

  // ここまで「関数」
  //
  //
  //
  // ここから「tsx」

  return (
    <Container>
      <Heading textAlign={"center"} my={6}>
        {session.user.email}
      </Heading>
      <HStack mb={6}>
        <Input value={task} onChange={onChangeTask} />
        <Button onClick={onClickAdd}>add</Button>
      </HStack>
      <HStack justify={"center"}>
        <Button onClick={onClickAll}>show all</Button>
        <Button onClick={onClickIncomplete}>
          incomplete
        </Button>
        <Button onClick={onClickComplete}>complete</Button>
      </HStack>
      <TableComponent
        data={
          !filtering
            ? todos
            : complete
            ? todos.filter(
                (todo) => todo.completed === true,
              )
            : todos.filter(
                (todo) => todo.completed === false,
              )
        }
        onChangeComplete={onChangeComplete}
        onClickDetail={onClickDetail}
        onClickDelete={onClickDelete}
      />
    </Container>
  );
});
todo.displayName = "todo";

export default todo;

// ここまで「tsx」
//
//
//
// ここから「ssr」

export const getServerSideProps: GetServerSideProps<
  UserQuery
> = async (context) => {
  const session = await getSession(context);
  const sdk = getSdk(graphQLClient);
  const { user } = await sdk.User({
    email: session?.user?.email,
  });

  return {
    props: {
      session,
      user,
    },
  };
};
