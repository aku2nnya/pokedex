const express = require('express');
const { getPokemonData } = require('./controller');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/pokemon/:name', getPokemonData);


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
