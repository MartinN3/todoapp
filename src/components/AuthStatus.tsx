import { useFetcher, useRouteLoaderData } from 'react-router-dom';

import { User } from '../model';

export default function AuthStatus() {
  // Get our logged in user, if they exist, from the root route loader data
  const { user } = useRouteLoaderData('root') as { user: User | null };
  const fetcher = useFetcher();

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  const isLoggingOut = fetcher.formData != null;

  return (
    <div>
      <p>Welcome {user.username}</p>
      <fetcher.Form method="post" action="/logout">
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </button>
      </fetcher.Form>
    </div>
  );
}
