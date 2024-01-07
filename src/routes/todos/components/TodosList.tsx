import { Checkbox, Stack } from '@chakra-ui/react';

import { Todo } from '../Main';

type TodosListProps = {
  todos: Todo[] | [];
  handleChange: (id: Todo['id']) => void;
};

export default function TodosList(props: TodosListProps) {
  return (
    <Stack mt={1} spacing={1}>
      {props.todos.map((item) => (
        <Checkbox
          key={item.id}
          isChecked={item.done}
          onChange={() => props.handleChange(item.id)}
        >
          {item.text}
        </Checkbox>
      ))}
    </Stack>
  );
}
