const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
 
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
 
let searchPokemon = 1;
 
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
 
  }
 
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});
buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon);
function createPokemonCard(pokemonData) {
  const pokemonContainer = document.getElementById('pokemon-list');
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');
  const types = pokemonData.types.map(type => type.type.name).join(', ');
  const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
  pokemonCard.innerHTML = `
      <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
      <p>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
      <p>Habilidades: ${abilities}</p>`;
  pokemonContainer.appendChild(pokemonCard);
 
}