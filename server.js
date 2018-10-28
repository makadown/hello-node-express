const express = require('express');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

/* Al registrar esto, las paginas que tienen los partials no necesitan recibir los 
 parametros que ocupan */
hbs.registerHelper('currentYear', () => { return new Date().getFullYear(); });

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
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
        pageTitle: 'Mi pagina de about!'
    });

});

app.get('/bad', (req, res) => {
    res.send({
        name: 'Ha habido un error',
        message: 'No se pudo manejar peticion'
    });
});

app.listen(3000, () => console.log('Server is up in port 3000!'));