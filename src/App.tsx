import {
  ChakraProvider,
  theme as chakraTheme,
  extendBaseTheme,
} from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './constants/routes';
import AuthProvider from './contexts/AuthProvider';
import Index from './routes/Index';
import Login from './routes/login/Main';
import Product from './routes/product/Main';
import productLoader from './routes/product/route/routeLoader';
import ProductEdit from './routes/productEdit/Main';
import editAction from './routes/productEdit/route/routeAction';
import editLoader from './routes/productEdit/route/routeLoader';
import Products from './routes/products/Main';
import Root from './routes/root/Main';
import RootBoundary from './routes/root/components/ErrorBoundary';
import Todos from './routes/todos/Main';
import { queryClient } from './utils/queryClient';

//TODO extend theme with customer styles
const theme = extendBaseTheme(chakraTheme);

const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <Root />,
    errorElement: <RootBoundary />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: ROUTES.login,
        element: <Login />,
      },
      {
        path: ROUTES.todos,
        element: <Todos />,
      },
      {
        path: ROUTES.products,
        element: <Products />,
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
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
