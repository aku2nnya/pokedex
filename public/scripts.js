const searchButton = document.querySelector('#searchButton');
const pokemonInfo = document.querySelector('#pokemonInfo');


// Display Pokemon data on screen
function displayPokemonInfo(data) {
  // List of Pokemon's Types
  const types = data.types.map((typeObj) => `<td class="${typeObj.type.name}">${typeObj.type.name.charAt(0).toUpperCase() + typeObj.type.name.substring(1)}</td>`).sort().join('');
  // List of Pokemon's Abilities
  const abilities = data.abilities.map((abilityObj) => `<td>${abilityObj.ability.name.charAt(0).toUpperCase() + abilityObj.ability.name.substring(1)}</td>`).sort().join('');
  // List of Pokemon's Moves. If more than 5, row added
  const movesArr = data.moves.map((moveObj) => `<td>${moveObj.move.name.charAt(0).toUpperCase() + moveObj.move.name.substring(1)}</td>`).sort();
  let moves = '';
  if (movesArr.length <= 5) moves = movesArr.join('');
  else {
    const splitMovesArr = [];
    const currMoves = [];
    for (let i = 0; i < movesArr.length; i += 1) {
      currMoves.push(movesArr[i]);
      if (currMoves.length === 5) {
        splitMovesArr.push(currMoves.join(''));
        currMoves.length = 0;
      }
      if (i === movesArr.length - 1 && currMoves) splitMovesArr.push(currMoves.join(''));
    }
    moves = splitMovesArr.join('</tr><tr>');
  }
  // List of Pokemon's Stats
  const stats = data.stats.map((statObj) => `
    <tr>
      <td>${statObj.stat.name.charAt(0).toUpperCase() + statObj.stat.name.substring(1)}</td>
      <td>${statObj.base_stat}</td>
    </tr>
  `).sort().join('');
  // Update pokemonInfo div with data
  pokemonInfo.innerHTML = `
    <img src=${data.sprites.front_default} alt="Pokemon Image">
    <div id="basicInfo">
      <div>#${data.id}</div>
      <div>Name: ${data.name.charAt(0).toUpperCase() + data.name.substring(1)}</div>
      <div>Height: ${data.height}</div>
      <div>Weight: ${data.weight}</div>
      <div>Base EXP: ${data.base_experience}</div>
    </div>
    <table id="statTable">
      <tr><th>Stat</th></tr>
      ${stats}
    </table>
    <table id="typeTable">
      <tr><th>Type</th></tr>
      <tr>${types}</tr>
    </table>
    <table id="abilityTable">
      <tr><th>Ability</th></tr>
      <tr>${abilities}</tr>
    </table>
    <table id="moveTable">
      <tr><th>Move</th></tr>
      <tr>${moves}</tr>
    </table>
  `;
}

// Get data from API when searched by name
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
