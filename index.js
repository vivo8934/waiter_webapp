const express = require('express');
var exphbs  = require('express-handlebars');
const WaiterRoutes = require('./waiter');
const Models = require('./models');
const app = express();

var bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const models = Models(process.env.MONGO_DB_URL ||'mongodb://localhost/waiter-tests');
const waiterRoutes = WaiterRoutes(models);

app.use(express.static('public'));
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000  * 30}}))
app.use(flash());


app.get('/waiters/:waitername', waiterRoutes.add);
app.post('/waiters/:waitername', waiterRoutes.index)
app.get('/days', waiterRoutes.roster)
var server = app.listen(4000);
