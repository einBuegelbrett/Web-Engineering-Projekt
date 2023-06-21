// Fetch Pokémon data from the PokeAPI
const max_pokemon_team = 6;
let size_team = 0;

fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then(response => response.json())
  .then(data => {
    const pokemonDropdown = document.getElementById("pokemon-dropdown");
    const addToTeamBtn = document.getElementById("team-builder");
    const teamList = document.getElementById("team-list");


    // Loop through the fetched results and create options for the dropdown
    data.results.forEach(pokemon => {
      const option = document.createElement("option");
      option.value = pokemon.name;
      option.textContent = pokemon.name;

      pokemonDropdown.appendChild(option);
    });

    // Add event listener to the "Add to Team" button
    addToTeamBtn.addEventListener("click", () => {
      const selectedPokemon = pokemonDropdown.value;

      if (selectedPokemon && size_team < max_pokemon_team && listItem.textContent != selectedPokemon) {
        size_team++;
        const listItem = document.createElement("li");
        listItem.textContent = selectedPokemon;


        teamList.appendChild(listItem);
        console.log('Miepmup');
      }
    });
  })
  .catch(error => {
    console.log("Error fetching Pokémon data:", error);
  });

  
