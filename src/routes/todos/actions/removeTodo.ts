import { Draft } from 'immer';

import { Todo } from '../Todos';

export default function removeTodo(draft: Draft<Todo>[], id: Todo['id']) {
  const todoIndex = draft.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) draft.splice(todoIndex, 1);
}
