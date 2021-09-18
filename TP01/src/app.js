import express from 'express';

import methodMiddlewares from './middlewares/method.js';
import errorsMiddlewares from './middlewares/errors.js';


const app = express();


app.use(express.json());
app.use(methodMiddlewares);



app.use(errorsMiddlewares);

export default app;