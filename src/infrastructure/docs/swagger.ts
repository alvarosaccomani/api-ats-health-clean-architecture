import type { Application, Request, Response } from 'express';
import swaggerJSDoc, { type OAS3Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition: OAS3Options['definition'] = {
  openapi: '3.0.0',
  info: {
    title: 'API Clean Architecture / DDD',
    version: '1.0.0',
    description: 'API documentation with OpenAPI 3.0.0',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}/${process.env.BASE_URL_API || 'api'}`,
      description: 'Servidor Local de Desarrollo',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  definition: swaggerDefinition,
  apis: [
    './src/infrastructure/router/**/*.ts',
    './src/infrastructure/docs/schemas/*.schemas.ts',
    './dist/infrastructure/router/**/*.js',
    './dist/infrastructure/docs/schemas/*.schemas.js',
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Application): void => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

export default setupSwagger;
