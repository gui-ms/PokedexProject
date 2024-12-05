
const list = document.querySelector(".pokemons");
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 20;
let offset = 0;



function loadPokemonItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
       const newHTML =  pokemonList.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" data-sound="${pokemon.cry}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="details">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}"> ${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>
        `
        ).join('');
        list.innerHTML += newHTML;

        const items = document.querySelectorAll('.pokemon');
        items.forEach((item) => {
            item.addEventListener('click', () => {
                const audioSrc = item.getAttribute('data-sound'); // Obtém o caminho do áudio
                if (audioSrc) {
                    const audio = new Audio(audioSrc); // Cria um novo elemento de áudio
                    audio.volume = 0.2;
                    audio.play(); // Reproduz o áudio
                }
            });
        });
    })
}

loadPokemonItens(offset, limit);


loadMoreButton.addEventListener('click', () => {
    offset += limit;
    debugger;
    const qtdRecordsWithNextPage = offset + limit;
    if(qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    else {
        loadPokemonItens(offset, limit);
    }
})