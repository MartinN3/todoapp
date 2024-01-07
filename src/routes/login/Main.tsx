import { Button, Container, Select } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import useAuthDispatch from '../../hooks/useAuthDispatch';
import { Product } from '../../model';
import { User } from '../../model/user';
import { AXIOS_INSTANCE } from '../../utils/customAxiosInstance';

const users = [
  {
    username: 'atuny0',
    password: '9uQFF1Lh',
  },
  {
    username: 'hbingley1',
    password: 'CQutx25i8r',
  },
  {
    username: 'rshawe2',
    password: 'OWsTbMUgFc',
  },
];

/**
 * @summary create a new product
 */
const postLogin = (
  login: {
    username: string;
    password: string;
  },
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<User>> => {
  return AXIOS_INSTANCE.post(
    `https://dummyjson.com/auth/login`,
    login,
    options,
  );
};

export default function LoginRoute() {
  const [selectedLogin, setSelectedLogin] = useState();
  const test = useAuthDispatch();

  const mutation = useMutation({
    mutationFn: (login) => {
      return postLogin(login);
    },
  });

  useEffect(() => {
    if (mutation.data?.data.token) {
      test(mutation.data?.data.token);
    }
  }, [mutation.data?.data.token, test]);

  return (
    <Container>
      <Select
        placeholder="Select option"
        value={selectedLogin?.username}
        onChange={(e) => {
          setSelectedLogin(
            users.find((user) => user.username === e.target.value),
          );
        }}
      >
        {users.map((user) => (
          <option value={user.username}>{user.username}</option>
        ))}
      </Select>
      <Button type="submit" onClick={() => mutation.mutate(selectedLogin)}>
        Přihlásit
      </Button>
    </Container>
  );
}
