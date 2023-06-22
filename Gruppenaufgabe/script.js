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
    const teamInformation = document.getElementById("single-pokemons");

        // Store the Pokémon details for image retrieval
        const pokemonDetails = data.results.reduce((details, pokemon) => {
          details[pokemon.name] = pokemon.url;
          return details;
        }, {});

    // Loop through the fetched results and create options for the dropdown
    data.results.forEach(pokemon => {
      const option = document.createElement("option");
      option.value = pokemon.name;
      option.textContent = pokemon.name;
      pokemonDropdown.appendChild(option);
    });

    const generateTeamImages = () => {
      teamInformation.innerHTML = '';

      for (let i = 0; i < size_team; i++) {
        const pokemonName = pokemonTeam[i];
        console.log("jaaa");
        if (pokemonName) {
          const listItem = document.createElement("li");
          listItem.textContent = pokemonName;

          // Retrieve the Pokémon details including the image URL
          const pokemonURL = pokemonDetails[pokemonName];
          fetch(pokemonURL)
            .then(response => response.json())
            .then(pokemonData => {
              const pokemonImage = pokemonData.sprites.front_default;
              if (pokemonImage) {
                const imageElement = document.createElement("img");
                imageElement.src = pokemonImage;
                imageElement.alt = pokemonName;
                listItem.appendChild(imageElement);
              }
            })
            .catch(error => {
              console.log("Error fetching Pokémon details:", error);
            });

            teamInformation.appendChild(listItem); // Append the <li> element to the team list
        }}}

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
        generateTeamImages();

        // Hinzufügen eines Knopfes zum Löschen des Pokemons
        let removeFromTeam = document.createElement("button");
        removeFromTeam.innerHTML = "Delete Pokémon";
        listItem.appendChild(removeFromTeam);
        removeFromTeam.addEventListener ("click", function() {

          // delete pokemon from array
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
          generateTeamImages();
        });
      }
    });
  })
  .catch(error => {
    console.log("Error fetching Pokémon data:", error);
  });

  
