import express from 'express';
import dayjs from 'dayjs';
import methodMiddlewares from './middlewares/method.js';
import errorsMiddlewares from './middlewares/errors.js';

import planetsRoutes from './routes/planetes-routes.js';
import elementsRoutes from './routes/elements-routes.js';

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

app.get('/date', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/plain');
    const d = dayjs().format('YYYY-MM-DD HH:mm:ss');

    res.send(`${d}`)

});

app.get('/maths/:operation', (req, res) => {

    const operation = req.params.operation;
    console.log(operation);


    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);


    let result = 0;
    switch(operation)
    {
        case 'somme':
            result = a + b;
        break;
        case 'produit':
            result = a * b;
        break;
        case 'difference':
            result = a - b;
        break;
        case 'quotient':
            result = a / b;
        break;
        case 'reste':
            result = a % b;
        break;
        default:
            //res.status(400);
            return res.status(400).end();
            //return res.send('Opération non reconnue');
            //return res.end();
    }

    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send(`${result}`);

    //console.log(req.query);


})

app.use(errorsMiddlewares);

export default app;