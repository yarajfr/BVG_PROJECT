const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const bvgController = require('./BVG/bvgController.js');
const loginController= require('./Login/loginController.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (request, response) => response.redirect('/busdaten'));

app.get('/all', bvgController.listAction);
;app.get('/:id', bvgController.listPersonalId);
app.get('/bus/:nr', bvgController.listBus)
app.get('/all/:prueferNr', bvgController.listBussePruefer);


app.put('/bus/:prueferNr', bvgController.setPrueferBus);

app.get('/user', loginController.readAction);
app.get('/user/:id', loginController.readIdAction);
app.post('/user/login', loginController.loginAction);
app.post('/user/register', loginController.registerAction);

app.listen(8080, () => {
    console.log('Server listening on port 8080  http://localhost:8080');
});