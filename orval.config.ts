import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    input: {
      target: './dummyJSON.json',
    },
    output: {
      mode: 'tags-split',
      target: 'src/lib/api/v1.d.ts',
      schemas: 'src/model',
      client: 'react-query',
      mock: true,
      prettier: true,
      baseUrl: 'https://dummyjson.com',
    },
  },
});
