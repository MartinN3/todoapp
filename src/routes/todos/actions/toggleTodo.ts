import { Draft } from 'immer';

import { Todo } from '../Main';

export default function (draft: Draft<Todo>[], id: Todo['id']) {
  const todo = draft.find((todo) => todo.id === id);
  if (todo) todo.done = !todo.done;
}
