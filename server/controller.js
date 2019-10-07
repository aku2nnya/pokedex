const axios = require('axios');


const getPokemonData = (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => {
      console.error(err);
      if (err.response.status === 404) res.status(404).send('Entered Pokemon does not exist!');
      else res.status(500).send(err);
    });
};


module.exports = { getPokemonData };
