import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

type AddTodoProps = {
  handleSubmit: (text: string) => void;
};
export default function AddTodo(props: AddTodoProps) {
  const [addTodoText, setAddTodoText] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setAddTodoText('');
      props.handleSubmit(addTodoText);
    },
    [addTodoText, props],
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup size="md">
        <Input
          placeholder="Mám něco udělat?"
          autoFocus
          onChange={(e) => setAddTodoText(e.target.value)}
          value={addTodoText}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" type="submit">
            Přidat
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
}
