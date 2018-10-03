const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


require('./routes/cpf')(app);
require('./routes/status')(app);

app.listen(process.env.PORT || 3000, function () {
    console.log('listening on port: ', process.env.PORT || 3000);
});