const express = require('express');
const app = express();

const Auth = require('./routes/auth');

app.use('/google/auth', Auth)

app.get('/', (req, res) => {
    res.send({hi : 'world'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);