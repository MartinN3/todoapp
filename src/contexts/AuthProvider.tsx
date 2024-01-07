import { ReactNode, createContext, useEffect, useState } from 'react';

import { AXIOS_INSTANCE } from '../utils/customAxiosInstance';

export type SetToken = (Auth: string) => void;
export type AuthProviderProps = {
  children: ReactNode;
  initialState?: string | null;
};

export const AuthContext = createContext<string | null>(null);
export const AuthDispatchContext = createContext<SetToken | null>(null);

const AuthProvider = ({ children, initialState = null }: AuthProviderProps) => {
  const [token, setToken] = useState(initialState);

  useEffect(() => {
    const interceptorId = AXIOS_INSTANCE.interceptors.request.use((config) => {
      if (token) config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    });

    return () => {
      AXIOS_INSTANCE.interceptors.request.eject(interceptorId);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={token}>
      <AuthDispatchContext.Provider value={setToken}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
