const http = require('http'); // '#include' ou 'using'

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bonjour, mon premier serveur');

    console.log(req.url);
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Le serveur est en mode écoute');
});