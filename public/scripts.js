const searchButton = document.querySelector('#searchButton');

function getPokemonData(e) {
  const inputText = e.target.form[0].value;
  axios.get(`pokemon/${inputText}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.response.data));
  e.preventDefault();
}

searchButton.addEventListener('click', getPokemonData);
