// Globale Varbiablen
const max_pokemon_team = 6;
let size_team = 0;
const pokemonTeam = [undefined, undefined, undefined, undefined, undefined, undefined];

// Fetch Pokémon data from the PokeAPI
fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then(response => response.json())
  .then(data => {
    const pokemonDropdown = document.getElementById("pokemon-dropdown");
    const addToTeamBtn = document.getElementById("add-to-team");
    const teamList = document.getElementById("team-list");
    const teamInformation = document.getElementById("single-pokemons");
    const pokemonAbilitiesContainer = document.getElementById("pokemon-abilities-container");

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
        if (pokemonName) {
          const listItem = document.createElement("li");
          listItem.textContent = pokemonName;

          // Retrieve the Pokémon details including the image URL
          const pokemonURL = pokemonDetails[pokemonName];
          fetch(pokemonURL)
            .then(response => response.json())
            .then(pokemonData => {
              console.log(pokemonData);
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
            })
            .then(() => teamInformation.appendChild(listItem)) // Append the <li> element to the team list
            .then(() => generatePokemonTypes(pokemonName, listItem))
            .then(() => generateAbilitiesDropdown(pokemonName, listItem))
            .then(() => generateMovesDropdown(pokemonName, listItem))
            .then(() => generatePokemonStats(pokemonName, listItem))
       
    }}}

    function generateAbilitiesDropdown(pokemonName, listItem) {
      // kreiert die abilities dropdown
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(characteristic => {
        
        const abilities = characteristic.abilities;
        console.log(abilities);

        const dropdown = document.createElement("select");
        dropdown.classList.add("pokemon-abilities-dropdown");
  
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select an ability" ;
        dropdown.appendChild(defaultOption);
        
        for (let i = 0; i < abilities.length; i++) {
          const option = document.createElement("option");
          option.value = abilities[i].ability.name;
          console.log(abilities.length);
          option.textContent = abilities[i].ability.name;
          dropdown.appendChild(option);
        }
        //pokemonAbilitiesContainer.appendChild(dropdown);
        console.log(dropdown);
        listItem.appendChild(dropdown);
        //return dropdown;
      })
    }

    function generateMovesDropdown(pokemonName, listItem) {
      // kreiert die abilities dropdown
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        const pokemonMoves = data.moves;
        
        for (let i = 0; i < 4; i++) {
          const dropdown = document.createElement("select");
          dropdown.classList.add("pokemon-moves-dropdown");
          const defaultOption = document.createElement("option");
          defaultOption.value = "";
          defaultOption.textContent = "Select a move" ;
          dropdown.appendChild(defaultOption);
          
          for (let j = 0; j < pokemonMoves.length; j++) {
            const option = document.createElement("option");
            option.value = pokemonMoves[j].move.name;
            option.textContent = pokemonMoves[j].move.name;
            dropdown.appendChild(option);
          }
          listItem.appendChild(dropdown);
      }
      })
    }

    function generatePokemonStats(pokemonName, listItem) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        const stats = data.stats;
        console.log(stats);
        
        for (let i = 0; i < stats.length; i++) {
          const pElement = document.createElement("p");
            switch (i) {
              case 0:
                pElement.value = 'hp: ' + stats[i].base_stat;
                pElement.textContent = 'hp: ' + stats[i].base_stat;
                listItem.appendChild(pElement);
                break;
              case 1:
                pElement.value = 'attack: ' + stats[i].base_stat;
                pElement.textContent = 'attack: ' + stats[i].base_stat;
                listItem.appendChild(pElement);
                break;
              case 2:
                pElement.value = 'defence: ' + stats[i].base_stat;
                pElement.textContent = 'defence: ' + stats[i].base_stat;
                listItem.appendChild(pElement);
                break;
              case 3:
                pElement.value = 'special attack: ' + stats[i].base_stat;
                pElement.textContent = 'special attack: ' + stats[i].base_stat;
                listItem.appendChild(pElement);
                break;
              case 4:
                pElement.value = 'special defense: ' + stats[i].base_stat;
                pElement.textContent = 'special defense: ' + stats[i].base_stat;
                listItem.appendChild(pElement);
                break;
              case 5:
                  pElement.value = 'speed: ' + stats[i].base_stat;
                  pElement.textContent = 'speed: ' + stats[i].base_stat;
                  listItem.appendChild(pElement);
                  break;
              default:
                console.log("error");
            }
        }
      })
    }

    function generatePokemonTypes(pokemonName, listItem) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        
        const types = data.types;
        console.log(types);

        //const dropdown = document.createElement("p");
        //dropdown.classList.add("pokemon-abilities-dropdown");
  
        //const defaultOption = document.createElement("option");
        //defaultOption.value = "";
        //defaultOption.textContent = "Select an ability" ;
        //dropdown.appendChild(defaultOption);
        let typeName = "Type(s): ";
        for (let i = 0; i < types.length; i++) {
          typeName += types[i].type.name + " ";
        }
        const typeTextfeld = document.createElement("p");
        typeTextfeld.value = typeName;
        //console.log(abilities.length);
        typeTextfeld.textContent = typeName;
        listItem.appendChild(typeTextfeld);
        //pokemonAbilitiesContainer.appendChild(dropdown);
        //console.log(dropdown);
        //listItem.appendChild(dropdown);
        //return dropdown;
      })
    }

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

        //generateAbilitiesDropdown(selectedPokemon, listItem);
        //console.log(abilitiesDropdown);
        //listItem.appendChild(abilitiesDropdown);


        //generateAbilitiesDropdown(selectedPokemon);

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

  
