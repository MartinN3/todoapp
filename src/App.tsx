import {
  ChakraProvider,
  theme as chakraTheme,
  extendBaseTheme,
} from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './constants/routes';
import Index from './routes/Index';
import Product from './routes/product/Product';
import productLoader from './routes/product/routerLoader';
import ProductEdit from './routes/productEdit/ProductEdit';
import editAction from './routes/productEdit/routerAction';
import editLoader from './routes/productEdit/routerLoader';
import Products from './routes/products/Products';
import RootBoundary from './routes/root/ErrorBoundary';
import Root from './routes/root/Root';
import Todos from './routes/todos/Todos';
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
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
