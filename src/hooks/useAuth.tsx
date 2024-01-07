import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthProvider';

const useAuth = (): string | null => {
  return useContext<string | null>(AuthContext);
};

export default useAuth;
