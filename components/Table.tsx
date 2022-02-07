import {
  Button,
  Checkbox,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { memo, VFC, MouseEvent, ChangeEvent } from "react";

type PROPS = {
  data;
  onChangeComplete: (
    e: ChangeEvent<HTMLInputElement>,
  ) => void;
  onClickDetail: (e: MouseEvent<HTMLInputElement>) => void;
  onClickDelete: (e: MouseEvent<HTMLInputElement>) => void;
};

export const TableComponent: VFC<PROPS> = memo(
  ({
    data,
    onChangeComplete,
    onClickDetail,
    onClickDelete,
  }) => {
    return (
      <>
        <Table>
          <Thead>
            <Tr>
              <Th>task</Th>
              <Th isNumeric>button</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((todo) => (
              <Tr key={todo._id}>
                <Td>
                  <Checkbox
                    onChange={onChangeComplete}
                    defaultIsChecked={todo.completed}
                    value={todo.task}
                    id={todo._id}
                  >
                    {todo.task}
                  </Checkbox>
                </Td>
                <Td>
                  <HStack justify={"flex-end"}>
                    <Button
                      onClick={onClickDetail}
                      id={todo._id}
                    >
                      edit
                    </Button>
                    <Button
                      onClick={onClickDelete}
                      id={todo._id}
                    >
                      delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    );
  },
);
TableComponent.displayName = "TableComponent";
