
function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => {
        return `
            <li class="type"> ${typeSlot.type.name}</>
        `
    })
}


function convertToPokemonHtml(pokemon) {
    return `
        <li class="pokemon">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="details">
                    <ol class="types">
                        ${convertPokemonTypesToLi(pokemon.types).join('')}
                    </ol>
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                </div>
            </li>
    `
}


pokeApi.getPokemons().then((pokemonList = []) => {
    const list = document.querySelector(".pokemons");
    pokemonList.map((pokemon) => {
        list.innerHTML += convertToPokemonHtml(pokemon);
    })
})
