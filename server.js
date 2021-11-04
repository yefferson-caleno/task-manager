//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/task-manager'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/task-manager/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


/********************************************************
 * https://medium.com/@roliver_javier/como-desplegar-tu-aplicacion-de-angular-en-heroku-7b9941b6d39
 * https://www.javaguides.net/2020/11/how-to-deploy-angular-application-to-heroku.html
 ******************************************************** */