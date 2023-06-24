// Globale Varbiablen
const max_pokemon_team = 6;
let size_team = 0;
const pokemonTeam = [undefined, undefined, undefined, undefined, undefined, undefined];

// Fetch Pokémon data from the PokeAPI
fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
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

    function generateTeamImages(pokemonName) {
     // teamInformation.innerHTML = '';
    //  for (let i = 0; i < size_team; i++) {
       // const pokemonName = pokemonTeam[i];
        if (pokemonName) {
          const listItem = document.createElement("li");
          listItem.textContent = pokemonName;
          const pokemonURL = pokemonDetails[pokemonName];
          fetch(pokemonURL)
            .then(response => response.json())
            .then(data => generatePokemonImage(pokemonName, listItem, data))
            .then(() => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)) 
            .then(response => response.json())
            .then(data => {
              teamInformation.appendChild(listItem) // Append the <li> element to the team list
              generatePokemonTypes(listItem, data)
              return data;
            })
            .then(data => generateAbilitiesDropdown(listItem, data))
            .then(data => generateMovesDropdown(listItem, data))
            .then(data => generatePokemonStats(listItem, data))
            .then(data => generateDeleteButton(listItem, data))
            .then(() => fetch('https://pokeapi.co/api/v2/item/?limit=2050'))
            .then(response => response.json())
            .then(items => {
              console.log(items);
              generateItemDropdown(listItem, items); 
            })
            console.log(size_team)
    }}//}

    function generateItemDropdown(listItem, data) {
        const items = data;

        const dropdown = document.createElement("select");

        dropdown.classList.add("pokemon-items-dropdown");
  
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select an Item" ;
        dropdown.appendChild(defaultOption);
        
        for (let i = 0; i < 2050; i++) {
          
          const option = document.createElement("option");
          option.value = items.results[i].name;
          option.textContent = items.results[i].name;
          dropdown.appendChild(option)
        }
        listItem.appendChild(dropdown);
        return items;
    }


    function generatePokemonImage(pokemonName, listItem, data) {

            const pokemonImage = data.sprites.front_default;
            if (pokemonImage) {
              const imageElement = document.createElement("img");
              imageElement.src = pokemonImage;
              imageElement.alt = pokemonName;
              listItem.appendChild(imageElement);
            }

            return data;
      }

    function generateAbilitiesDropdown(listItem, data) {
      // kreiert die abilities dropdown

        const abilities = data.abilities;

        const dropdown = document.createElement("select");
        dropdown.classList.add("pokemon-abilities-dropdown");
  
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select an ability" ;
        dropdown.appendChild(defaultOption);
        
        for (let i = 0; i < abilities.length; i++) {
          const option = document.createElement("option");
          option.value = abilities[i].ability.name;
          option.textContent = abilities[i].ability.name;
          dropdown.appendChild(option);
        }
        listItem.appendChild(dropdown);
        return data;
    }

    function generateMovesDropdown(listItem, data) {
      // kreiert die abilities dropdown
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

      return data;
      }

    function generatePokemonStats(listItem, data) {
        const stats = data.stats;
        
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
        return data;
    }

    function generateDeleteButton(listItem, data) {
       // Hinzufügen eines Knopfes zum Löschen des Pokemons
       let removeFromTeam = document.createElement("button");
       removeFromTeam.innerHTML = "Delete Pokémon";
       listItem.appendChild(removeFromTeam);
       removeFromTeam.addEventListener ("click", function() {

         // delete pokemon from array
         const listItem = this.parentNode;
          const pokemonName = listItem.textContent.replace("Delete Pokémon", "");

         size_team--;
         console.log(listItem)
         listItem.remove();
       });
       return data;
    }

    function generatePokemonTypes(listItem, data) {
        
        const types = data.types;

        let typeName = "Type(s): ";
        for (let i = 0; i < types.length; i++) {
          typeName += types[i].type.name + " ";
        }
        const typeTextfeld = document.createElement("p");
        typeTextfeld.value = typeName;
        typeTextfeld.textContent = typeName;
        listItem.appendChild(typeTextfeld);

        return data;
    }

    // Add event listener to the "Add to Team" button
    addToTeamBtn.addEventListener("click", () => {
      const selectedPokemon = pokemonDropdown.value;

      if (selectedPokemon && size_team < max_pokemon_team) {
        size_team++;
        const listItem = document.createElement("li");
        listItem.textContent = selectedPokemon;




        // add pokemon to array
        pokemonTeam[size_team-1] = selectedPokemon;

        generateTeamImages(selectedPokemon);
      }
    });
  })
  .catch(error => {
    console.log("Error fetching Pokémon data:", error);
  });