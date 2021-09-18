import './env.js';

import app from './src/app.js';

const PORT = process.env.PORT;

app.listen(PORT, err => {
    console.log(`Server listening on port: ${PORT} `)
});