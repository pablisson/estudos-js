// eslint-disable-next-line prettier/prettier
import 'reflect-metadata';

// O pacote async erros
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './erros/AppError';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

/**
 * Esse trecho de código precisa vir depois de todas rotas
 */
app.use(
  (err:Error, request:Request, response:Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

/**
 * Nesse caso estamos criando as rotas, essa rota que será acessada via metodo get
 * será encontrada na raiz
 * http://localhost/
 */

// apenas testantdo
/*
app.get('/', (request, response) => {
  return response.json({ message: "Hello World" });
})
*/
app.listen(3333, () => {
  console.log('Servidor funcionando');
});
