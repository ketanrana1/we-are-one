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
    controllers: [RegisterController, CardController, BookController, PuzzleListController, OrderController, ContentController, PayController, ArtprintsController, PagecontentController, CheckoutController, PaymentController, SubscribeController, ContactController ],
  }
)

app.listen(4000, () => console.log("App running on PORT", 4000));