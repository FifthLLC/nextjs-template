import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      //@TODO use your own Swagger url
      target: "https://petstore.swagger.io/v2/swagger.json",
      parserOptions: {
        resolve: {
          http: {
            headers: {
              timeout: 10000,
            },
          },
        },
      },
    },
    output: {
      target: './src/infrastructure/api/generated',
      schemas: './src/infrastructure/api/generated',
      client: 'react-query',
      mode: 'tags-split',
      mock: false,
      biome: true,
      clean: true,
    },
  },
}); 