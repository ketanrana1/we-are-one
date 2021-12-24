
// import 'reflect-metadata';
// import path from 'path';
// import { getMetadataArgsStorage, useExpressServer } from 'routing-controllers';
// import { routingControllersToSpec } from 'routing-controllers-openapi';
// import swaggerUi from 'swagger-ui-express';
// import { createConnection } from 'typeorm';
// import { ApolloServer } from 'apollo-server-express';

// import graphqlSchema from 'app/graphql/schema';
// import logger from 'app/services/Logger';

// (async () => {
//   const app: Application = express();

//   createConnection().then(() => {
//     logger.info('Database Connection Established.');
//   }).catch((_err) => {
//     logger.info('Database Connection Failed.', _err.message);
//   });

//   const isProduction = process.env.NODE_ENV === 'production';

//   app.use('/health', (req: Request, res: Response) => res.json({ status: 'ok', uptime: process.uptime().toFixed(2) }));

//   app.set('views', path.join(__dirname, '/views'));

//   useExpressServer(app, {
//     cors: true,
//     routePrefix: '/v1',
//     controllers: [`${__dirname}/controllers/**/*.${isProduction ? 'js' : 'ts'}`],
//     middlewares: [`${__dirname}/middlewares/**/*.${isProduction ? 'js' : 'ts'}`],
//     interceptors: [`${__dirname}/interceptors/**/*.${isProduction ? 'js' : 'ts'}`],
//   });

//   const storage = getMetadataArgsStorage();
//   const spec = routingControllersToSpec(storage);
//   spec.info = {
//     title: 'Candy Coin REST',
//     description: 'Candy Coin REST',
//     version: 'V1',
//   };
//   spec.servers = [
//     {
//       url: `http://127.0.0.1:${process.env.PORT}/v1`,
//       description: 'Local Server',
//     },
//     {
//       url: 'https://dev-api.thecandycoin.com/v1',
//       description: 'Development Server',
//     },
//   ];

//   app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec));


//   const apolloServer = new ApolloServer({
//     schema: await graphqlSchema,
//     context: ({ req, res }) => ({ req, res }),
//   });

//   apolloServer.applyMiddleware({ app, cors: true });

//   app.listen(process.env.PORT, () => logger.info(`API Server started with ${process.env.NODE_ENV} environment on port: ${process.env.PORT}!`));
// })();

require("dotenv").config();
import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import { getMetadataArgsStorage, useExpressServer, createExpressServer } from 'routing-controllers';
import { BookController } from './controllers/BookController';
import { RegisterController } from './controllers/RegisterController';
import { CardController } from './controllers/CardController';
import { PuzzleListController } from 'controllers/PuzzleListController';
import { OrderController } from 'controllers/OrderController';
import { ContentController } from 'controllers/ContentController';
import { PayController } from 'controllers/PayController';
import { TestController } from 'controllers/TestController'
import { ArtprintsController } from 'controllers/ArtprintsController'
import { PagecontentController } from 'controllers/PagecontentController'
import { CheckoutController } from 'controllers/CheckoutController'
import { ContactController } from 'controllers/ContactContoller'
import SubscribeController from 'controllers/SubscribeController'
import PaymentController from "controllers/PaymentController"
import './database/mongoose';
import path from "path"
import { json as jsonBodyParser, urlencoded as urlencodedBodyParser } from 'body-parser';
var cors = require('cors') 

const jwt = require('jsonwebtoken');
const app: express.Application = express();

app.use("/images", express.static(path.join(__dirname + '/public/uploads/images')));
app.use("/videos", express.static(path.join(__dirname + '/public/uploads/videos')));


app.use(jsonBodyParser());
app.use(urlencodedBodyParser({ extended: true }));

useExpressServer(app, 
  {
    cors: true,
    controllers: [RegisterController, CardController, BookController, PuzzleListController, OrderController, ContentController, PayController, TestController, ArtprintsController, PagecontentController, CheckoutController, PaymentController, SubscribeController, ContactController ],
  }
)

app.listen(4000, () => console.log("App running on PORT", 4000));