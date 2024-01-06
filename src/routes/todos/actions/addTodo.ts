import { Draft } from 'immer';
import { nanoid } from 'nanoid';

import { Todo } from '../Todos';

export default function addTodo(draft: Draft<Todo>[], text: Todo['text']) {
  if (!text) {
    return;
  }
  draft.push({
    id: nanoid(),
    text: text,
    done: false,
  });
}
