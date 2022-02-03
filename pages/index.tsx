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
  DeleteTodoDocument,
  GetAllTodosDocument,
  GetAllTodosQuery,
  getSdk,
  PartialUpdateTodoDocument,
} from "../graphql/generated";
import { fetcher, graphQLClient } from "../graphql/fetcher";
import { TableComponent } from "../components/Table";
import { useSetRecoilState } from "recoil";
import { recoilAllTodos } from "../recoil/recoilAllTodos";

const home: NextPage<GetAllTodosQuery> = memo(
  ({ allTodos }) => {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState(allTodos.data);
    const [filtering, setFiltering] = useState(false);
    const [complete, setComplete] =
      useState<boolean>(false);
    const setTest = useSetRecoilState(recoilAllTodos);

    const { data, error } = useSWR(
      GetAllTodosDocument,
      fetcher,
      {
        fallbackData: allTodos,
      },
    );

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
          _id: "",
          task,
          completed: false,
        },
      ]);
      setTask("");
      await fetcher(CreateTodoDocument, {
        task,
      });
      const sdk = getSdk(graphQLClient);
      const { allTodos } = await sdk.getAllTodos();
      setTodos(allTodos.data);
    };

    const onClickDetail = (
      e: MouseEvent<HTMLInputElement>,
    ) => {
      const id = e.currentTarget.id;
      setTest(data);
      Router.push("/[id]", `/${id}`);
    };

    const onClickDelete = async (
      e: MouseEvent<HTMLInputElement>,
    ) => {
      const id = e.currentTarget.id;
      setTodos(todos.filter((todo) => todo._id !== id));
      await fetcher(DeleteTodoDocument, {
        id,
      });
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
      await fetcher(PartialUpdateTodoDocument, {
        id,
        data: { completed },
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

    return (
      <Container pt={10}>
        <HStack mb={4}>
          <Input value={task} onChange={onChangeTask} />
          <Button onClick={onClickAdd}>add</Button>
        </HStack>
        <HStack mb={10} justify={"center"}>
          <Button onClick={onClickAll}>show all</Button>
          <Button onClick={onClickIncomplete}>
            incomplete
          </Button>
          <Button onClick={onClickComplete}>
            complete
          </Button>
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
          onClickDetail={onClickDetail}
          onClickDelete={onClickDelete}
          onChangeComplete={onChangeComplete}
        />
      </Container>
    );
  },
);
home.displayName = "home";

export default home;

export const getServerSideProps: GetServerSideProps = async () => {
  const sdk = getSdk(graphQLClient);
  const { allTodos } = await sdk.getAllTodos();
  return { props: { allTodos } };
};
