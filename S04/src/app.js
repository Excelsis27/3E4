import express from 'express';
import dayjs from 'dayjs';

import database from './libs/database.js';

import methodMiddlewares from './middlewares/method.js';
import errorsMiddlewares from './middlewares/errors.js';

import planetsRoutes from './routes/planetes-routes.js';
import elementsRoutes from './routes/elements-routes.js';

database();
const app = express();

app.use(express.json());

app.use(methodMiddlewares);

app.use('/planets',planetsRoutes);
app.use('/elements',elementsRoutes);

app.get('/premiere', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send('Notre première route avec express \n deuxième ligne');
    // res.send('deuxième ligne'); On ne peut faire 'send' qu'une seule fois.
});

app.use(errorsMiddlewares);

export default app;