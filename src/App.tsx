import {
  ChakraProvider,
  theme as chakraTheme,
  extendBaseTheme,
} from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';

import { ROUTES } from './constants/routes';
import Index from './routes/Index';
import Login from './routes/login/Main';
import loginAction from './routes/login/route/routeAction';
import loginLoader from './routes/login/route/routeLoader';
import Product from './routes/product/Main';
import productLoader from './routes/product/route/routeLoader';
import ProductEdit from './routes/productEdit/Main';
import editAction from './routes/productEdit/route/routeAction';
import editLoader from './routes/productEdit/route/routeLoader';
import Products from './routes/products/Main';
import productsLoader from './routes/products/route/routeLoader';
import Root from './routes/root/Main';
import RootBoundary from './routes/root/components/ErrorBoundary';
import rootLoader from './routes/root/route/routeLoader';
import Todos from './routes/todos/Main';
import { fakeAuthProvider } from './utils/auth';
import { queryClient } from './utils/queryClient';

//TODO extend theme with customer styles
const theme = extendBaseTheme(chakraTheme);

const router = createBrowserRouter([
  {
    id: 'root',
    path: ROUTES.root,
    element: <Root />,
    errorElement: <RootBoundary />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: ROUTES.login,
        element: <Login />,
        action: loginAction,
        loader: loginLoader,
      },
      {
        path: ROUTES.todos,
        element: <Todos />,
      },
      {
        path: ROUTES.products,
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: ROUTES.product,
        element: <Product />,
        loader: productLoader(queryClient),
      },
      {
        path: ROUTES.productEdit,
        element: <ProductEdit />,
        loader: editLoader(queryClient),
        action: editAction(queryClient),
      },
    ],
  },
  {
    path: ROUTES.logout,
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect(ROUTES.root);
    },
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider theme={theme}>
        <RouterProvider
          router={router}
          fallbackElement={<p>Initial Load...</p>}
        />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
