import chalk from 'chalk';
// const chalk = require('chalk'); équivalent à la première ligne

import app from './src/app.js';

console.log(chalk.red("Hello world!"));

const PORT = 1337;

app.listen(PORT, err => {
    console.log(chalk.blue(`Server listening on port: ${PORT} `))
});