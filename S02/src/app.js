import express from 'express';
import dayjs from 'dayjs';

const app = express();


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

app.get('/somme', (req, res) => {

    //console.log(req.query);

    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);

    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send(`${a+b}`);
})

export default app;