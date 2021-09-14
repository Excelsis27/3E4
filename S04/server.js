import './env.js';
import chalk from 'chalk';
// const chalk = require('chalk'); équivalent à la première ligne

import app from './src/app.js';

console.log(chalk.red("Hello world!"));

const PORT = process.env.PORT;

app.listen(PORT, err => {
    console.log(chalk.blue(`Server listening on port: ${PORT} `))
});