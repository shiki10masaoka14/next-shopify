import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Router from "next/router";
import {
  ChangeEvent,
  memo,
  MouseEvent,
  useState,
} from "react";
import useSWR from "swr";
import {
  CreateTodoDocument,
  getSdk,
  UserDocument,
  UserQuery,
} from "../../utils/generated";
import {
  fetcher,
  graphQLClient,
} from "../../utils/fetcher";
import { TableComponent } from "../../components/Table";
import { getSession, useSession } from "next-auth/react";

// ここまで「import」
//
//
//
// ここから

const todo: NextPage<UserQuery> = memo(({ user }) => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(user.todos.data);
  const [filtering, setFiltering] = useState(false);
  const [complete, setComplete] = useState<boolean>(false);
  const { data: session } = useSession();

  const { data, error } = useSWR(UserDocument, fetcher, {
    fallbackData: user,
  });

  if (!data) {
    return (
      <Center minH={"100vh"} color={"gray.500"}>
        <Spinner size="xl" mr={"2"} />
        <Heading>Loading...</Heading>
      </Center>
    );
  }
  if (error) {
    <Center minH={"100vh"} color={"gray.500"}>
      <Heading>{error.message}</Heading>
    </Center>;
  }

  const onChangeTask = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setTask(e.currentTarget.value);
  };

  const onClickAdd = async () => {
    setTodos([
      ...todos,
      {
        data: {
          _id: "",
          task,
          completed: false,
          user: {
            email: session.user.email,
          },
        },
      },
    ]);
    setTask("");
    await fetcher(CreateTodoDocument, {
      task,
      email: session.user.email,
    });
    const sdk = getSdk(graphQLClient);
    const { allTodos } = await sdk.GetAllTodos();
    setTodos(allTodos.data);
  };

  // const onClickDetail = (
  //   e: MouseEvent<HTMLInputElement>,
  // ) => {
  //   const id = e.currentTarget.id;
  //   Router.push("/todo/[id]", `/todo/${id}`);
  // };

  // const onClickDelete = async (
  //   e: MouseEvent<HTMLInputElement>,
  // ) => {
  //   const id = e.currentTarget.id;
  //   setTodos(todos.filter((todo) => todo._id !== id));
  //   await fetcher(DeleteTodoDocument, {
  //     id,
  //   });
  // };

  // const onChangeComplete = async (
  //   e: ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const id = e.currentTarget.id;
  //   const completed = e.currentTarget.checked;
  //   setTodos(
  //     todos.map((todo) =>
  //       todo._id === id ? { ...todo, completed } : todo,
  //     ),
  //   );
  //   await fetcher(UpdateTodoDocument, {
  //     id,
  //     data: { completed },
  //   });
  // };

  // const onClickAll = () => {
  //   setFiltering(false);
  // };

  // const onClickIncomplete = () => {
  //   setFiltering(true);
  //   setComplete(false);
  // };

  // const onClickComplete = () => {
  //   setFiltering(true);
  //   setComplete(true);
  // };

  return (
    <></>
    // <Container pt={10}>
    //   <HStack mb={4}>
    //     <Input value={task} onChange={onChangeTask} />
    //     <Button onClick={onClickAdd}>add</Button>
    //   </HStack>
    //   <HStack mb={10} justify={"center"}>
    //     <Button onClick={onClickAll}>show all</Button>
    //     <Button onClick={onClickIncomplete}>
    //       incomplete
    //     </Button>
    //     <Button onClick={onClickComplete}>complete</Button>
    //   </HStack>
    //   <TableComponent
    //     data={
    //       !filtering
    //         ? todos
    //         : complete
    //         ? todos.filter(
    //             (todo) => todo.completed === true,
    //           )
    //         : todos.filter(
    //             (todo) => todo.completed === false,
    //           )
    //     }
    //     onClickDetail={onClickDetail}
    //     onClickDelete={onClickDelete}
    //     onChangeComplete={onChangeComplete}
    //   />
    // </Container>
  );
});
todo.displayName = "todo";

export default todo;

export const getServerSideProps: GetServerSideProps<
  UserQuery
> = async (context) => {
  const session = await getSession(context);
  const sdk = getSdk(graphQLClient);

  try {
    await sdk.CreateUser({
      data: {
        email: session.user.email,
      },
    });
  } catch (error) {
    const { user } = await sdk.User({
      email: session.user.email,
    });
    return { props: { user } };
  }

  return {
    props: {
      session,
    },
  };
};
