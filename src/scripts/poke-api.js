const pokeApi = {};

function convertPokeApiDetailToPokemonClass(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.types = types;
    const [mainType] = pokemon.types;
    pokemon.type = mainType;
    pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default;
    pokemon.cry = pokeDetail.cries.latest;
    return pokemon;
    
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then((convertPokeApiDetailToPokemonClass))
    .catch((error) => console.error(error))
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((body) => body.results)
    .then((pokemons) => pokemons.map((pokemon) => pokeApi.getPokemonDetails(pokemon)))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.error(error))
}