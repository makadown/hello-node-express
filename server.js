const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Bienvenid@',
        name: 'Mario',
        likes: [
            'Biking',
            'Cities'
        ]
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Mi pagina de about!',
        currentYear: new Date().getFullYear()
    });

});

app.get('/bad', (req, res) => {
    res.send({
        name: 'Ha habido un error',
        message: 'No se pudo manejar peticion'
    });
});

app.listen(3000, () => console.log('Server is up in port 3000!'));