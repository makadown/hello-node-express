const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


// Middleware #1
app.use((req, res, next) => {
    const now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
            console.log(err);
    });
    /* El next se usa para decirle a express que el método ha terminado. */
    next();
    /* Si hacemos algo asíncrono, el middleware no se moverá hasta que se invoque
    el next */
});

// Middleware #2 , usado en epoca de mantenimiento
/*app.use((req, res, next) => {
    res.render('maintenance.hbs');
});*/


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

app.get('/maintenance', (req, res) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Under maintenance!'
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