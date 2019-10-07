const express = require('express');
const { getPokemonData } = require('./controller');

const app = express();
const PORT = 3000;

app.route('/pokemon/:name')
  .get(getPokemonData);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
