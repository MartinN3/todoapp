import {
  ChakraProvider,
  theme as chakraTheme,
  extendBaseTheme,
} from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import DrawerWrapper from './components/DrawerWrapper';
import { ROUTES } from './constants/routes';
import Index from './routes/Index';
import Root from './routes/Root';
import Product from './routes/product/Product';
import ProductEdit from './routes/productEdit/ProductEdit';
import editAction from './routes/productEdit/routerAction';
import editLoader from './routes/productEdit/routerLoader';
import Products from './routes/products/Products';
import Todos from './routes/todos/Todos';
import { queryClient } from './utils/queryClient';

//TODO extend theme with customer styles
const theme = extendBaseTheme(chakraTheme);

const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <Root />,
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
        children: [
          {
            path: ROUTES.product,
            element: <DrawerWrapper />,
            children: [
              {
                index: true,
                element: <Product />,
              },
              {
                path: ROUTES.productEdit,
                element: <ProductEdit />,
                loader: editLoader(queryClient),
                action: editAction(queryClient),
              },
            ],
          },
        ],
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
