import { fakeAuthProvider } from '../../../utils/auth';

export default function loader() {
  return { user: fakeAuthProvider.user };
}
