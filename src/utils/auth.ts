import { AXIOS_INSTANCE } from '../constants/axiosInstance';
import { postAuthLogin } from '../lib/api/login/login';
import { User } from '../model';

interface AuthProvider {
  isAuthenticated: boolean;
  user: null | User;
  interceptorId: null | number;
  signin(username: string, password: string): Promise<User>;
  signout(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const fakeAuthProvider: AuthProvider = {
  isAuthenticated: false,
  user: null,
  interceptorId: null,
  async signin(username: string, password: string) {
    const response = await postAuthLogin({ username, password });
    fakeAuthProvider.isAuthenticated = true;
    fakeAuthProvider.user = response;
    fakeAuthProvider.interceptorId = AXIOS_INSTANCE.interceptors.request.use(
      (config) => {
        if (response?.token)
          config.headers['Authorization'] = `Bearer ${response.token}`;
        return config;
      },
    );
    return response;
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    fakeAuthProvider.isAuthenticated = false;
    fakeAuthProvider.user = null;

    if (fakeAuthProvider.interceptorId)
      AXIOS_INSTANCE.interceptors.request.eject(fakeAuthProvider.interceptorId);
  },
};
