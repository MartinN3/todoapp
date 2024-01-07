import { useCallback } from 'react';
import { useImmerReducer } from 'use-immer';

import { Todo } from '../Main';
import addTodo from '../actions/addTodo';
import removeTodo from '../actions/removeTodo';
import toggleTodo from '../actions/toggleTodo';

type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: string }
  | { type: 'REMOVE_TODO'; id: string };

const INITIAL_TODOS: Todo[] = [];

export default function useTodosReducer() {
  const [todos, dispatch] = useImmerReducer<Todo[], Action>((draft, action) => {
    switch (action.type) {
      case 'TOGGLE_TODO':
        return toggleTodo(draft, action.id);
      case 'ADD_TODO':
        return addTodo(draft, action.text);
      case 'REMOVE_TODO':
        return removeTodo(draft, action.id);
      default:
        break;
    }
  }, INITIAL_TODOS);

  const handleAdd = useCallback(
    (text: Todo['text']) =>
      dispatch({
        text,
        type: 'ADD_TODO',
      }),
    [dispatch],
  );

  const handleToggle = useCallback(
    (id: Todo['id']) =>
      dispatch({
        id,
        type: 'TOGGLE_TODO',
      }),
    [dispatch],
  );

  const handleRemove = useCallback(
    (id: Todo['id']) =>
      dispatch({
        id,
        type: 'REMOVE_TODO',
      }),
    [dispatch],
  );

  return {
    todos,
    handleAdd,
    handleToggle,
    handleRemove,
  };
}
