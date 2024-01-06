import { Container } from '@chakra-ui/react';

import AddTodo from './components/AddTodo';
import TodosList from './components/TodosList';
import useTodosReducer from './hooks/useTodosReducer';

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function Todos() {
  const { todos, handleAdd, handleToggle } = useTodosReducer();

  return (
    <Container>
      <AddTodo handleSubmit={handleAdd} />
      <TodosList todos={todos} handleChange={handleToggle} />
    </Container>
  );
}
