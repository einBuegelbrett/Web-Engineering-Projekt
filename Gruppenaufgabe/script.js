// Globale Varbiablen
const max_pokemon_team = 6;
let size_team = 0;
const pokemonTeam = ["", "", "", "", "", ""];

// Fetch Pokémon data from the PokeAPI
fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then(response => response.json())
  .then(data => {
    const pokemonDropdown = document.getElementById("pokemon-dropdown");
    const addToTeamBtn = document.getElementById("add-to-team");
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

      if (selectedPokemon && size_team < max_pokemon_team) {
        size_team++;
        const listItem = document.createElement("li");
        listItem.textContent = selectedPokemon;
        teamList.appendChild(listItem);
        // add pokemon to array
        pokemonTeam[size_team-1] = selectedPokemon;
        console.log(pokemonTeam);

        // Hinzufügen eines Knopfes zum Löschen des Pokemons
        let removeFromTeam = document.createElement("button");
        removeFromTeam.innerHTML = "Delete Pokémon";
        listItem.appendChild(removeFromTeam);
        removeFromTeam.addEventListener ("click", function() {
          // delete pokemon from array
          /*
          for(i = 0; i < 6; i++) {
            if(pokemonTeam[i] == listItem) {
              pokemonTeam[size_team-1] = "";
              console.log(pokemonTeam);
            }
          }
          */
          const listItem = this.parentNode;
          const pokemonName = listItem.textContent.replace("Delete Pokémon", "").trim();;
          console.log(pokemonTeam + " " + pokemonName)
          const pokemonIndex = pokemonTeam.findIndex(
            name => name.toLowerCase() === pokemonName.toLowerCase()
          );
          console.log(pokemonIndex);
          if (pokemonIndex !== -1) {
            pokemonTeam[pokemonIndex] = "";
            for (let i = pokemonIndex; i < pokemonTeam.length; i++) {
              pokemonTeam[i] = pokemonTeam[i + 1];
            }
            console.log(pokemonTeam);
          }
          
          console.log('Mupmiep');
          size_team--;
          teamList.removeChild(listItem);
          console.log('Miepmiep');
        });
      }
    });
  })
  .catch(error => {
    console.log("Error fetching Pokémon data:", error);
  });

  
