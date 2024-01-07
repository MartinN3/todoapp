import { Outlet } from 'react-router-dom';

import Layout from '../../Layout';

export default function RootRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
