const searchButton = document.querySelector('#searchButton');
const pokemonInfo = document.querySelector('#pokemonInfo');


function displayPokemonInfo(data) {
  pokemonInfo.innerHTML = `
    <img src=${data.sprites.front_default} alt="Pokemon Image">
    <div>Name: ${data.name}</div>
    <div>Height: ${data.height}</div>
    <div>Weight: ${data.weight}</div>
  `;
}

function getPokemonData(e) {
  const inputText = e.target.form[0].value.toLowerCase();
  axios.get(`pokemon/${inputText}`)
    .then((response) => displayPokemonInfo(response.data))
    .catch((error) => {
      if (error.response.status === 404) {
        pokemonInfo.innerHTML = `
          <br>
          <div>${error.response.data}</div>
          `;
      } else {
        pokemonInfo.innerHTML = `
          <br>
          <div>${error}</div>
          `;
      }
    });
  e.preventDefault();
}


searchButton.addEventListener('click', getPokemonData);
