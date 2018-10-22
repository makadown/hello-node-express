const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.send({
        name: 'Mario',
        likes: [
            'Biking',
            'Cities'
        ]
    });
});

app.get('/about', (req, res) => {
    res.send('<h1>About page!</h1>');

});

app.get('/bad', (req, res) => {
    res.send({
        name: 'Ha habido un error',
        message: 'No se pudo manejar peticion'
    });
});

app.listen(3000);