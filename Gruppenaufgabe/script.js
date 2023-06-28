// Globale Varbiablen
const max_pokemon_team = 6;
let size_team = 0;
const pokemonTeam = [undefined, undefined, undefined, undefined, undefined, undefined];
let dict = { "normal": 0, "fighting": 0, "flying": 0, "poison": 0, "ground": 0, "rock": 0, "bug": 0, "ghost": 0, "steel": 0, "fire": 0, "water": 0, "grass": 0, "electric": 0, "psychic": 0, "ice": 0, "dragon": 0, "dark": 0, "fairy": 0 };
const typeBackgroundColor = { "normal": "#a8a899", "fighting": "#a84c3d", "flying": "#87b5e5", "poison": "#864ab8", "ground": "#956833", "rock": "#a8995b", "bug": "#83ad25", "ghost": "#633c64", "steel": "#9999a8", "fire": "#e53b19", "water": "#278bcc", "grass": "#58a951", "electric": "#e5c600", "psychic": "#e55973", "ice": "#68baac", "dragon": "#4d64ab", "dark": "#463e3e", "fairy": "#d480cf"};


// Fetch Pokémon data from the PokeAPI
fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
  .then(response => response.json())
  .then(data => {
    const pokemonDropdown = document.getElementById("pokemon-dropdown");
    const addToTeamBtn = document.getElementById("add-to-team");
    const teamList = document.getElementById("team-list");
    //const teamInformation = document.getElementById("single-pokemons");
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

    function generatePokemon(pokemon) {
        const pokemonName = pokemon;
        console.log(pokemon.name);
        if (pokemonName) {

          let listItem;
          let string

          for(i = 1; i < 7; i++)
          {
            string = "pokemon-" + i;
            listItem = document.getElementById(string);
            console.log("GUUUUU");
            console.log(listItem.innerHTML == '<img alt="pokeball-icon" src="images/placeholder/pokeball.png">');
            if(listItem.innerHTML == '<img alt="pokeball-icon" src="images/placeholder/pokeball.png">'){
              break;
            }
          } 

          console.log(listItem);
          listItem.textContent = pokemonName;
          const pokemonURL = pokemonDetails[pokemonName];
          fetch(pokemonURL)
            .then(response => response.json())
            .then(data => generatePokemonImage(pokemonName, listItem, data))
            .then(() => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)) 
            .then(response => response.json())
            .then(data => {
              //teamInformation.appendChild(listItem) // Append the <li> element to the team list
              generatePokemonTypes(listItem, data)
              return data;
            })
            .then(data => generateAbilitiesDropdown(listItem, data))
            .then(data => generateMovesDropdown(listItem, data))
            //.then(data => generatePokemonStats(listItem, data))
            .then(data => generateDeleteButton(listItem, data))
            .then(() => fetch('https://pokeapi.co/api/v2/item/?limit=2050'))
            .then(response => response.json())
            .then(items => {

              console.log(items);
              generateItemDropdown(listItem, items); 
            });        
    }}

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
        defaultOption.textContent = "Select ability" ;
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
          defaultOption.textContent = "Select move" ;
          dropdown.appendChild(defaultOption);
          
          for (let j = 0; j < pokemonMoves.length; j++) {
            const option = document.createElement("option");
            option.value = pokemonMoves[j].move.name;
            option.textContent = pokemonMoves[j].move.name;
            dropdown.appendChild(option);
          }
          listItem.appendChild(dropdown);
      }
      console.log("Skip")
      console.log(pokemonMoves)
      

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
       
        
       //let removeFromTeam = document.getElementsByClassName("btn btn-danger");
       removeFromTeam.innerHTML = 'Delete';
       removeFromTeam.classList.add("btn",  "btn-danger");
       listItem.appendChild(removeFromTeam);
       removeFromTeam.addEventListener ("click", function() {

         // delete pokemon from array
         const listItem = this.parentNode;
          const pokemonName = listItem.textContent.replace("Delete Pokémon", "");

         size_team--;
         console.log(listItem)
         //listItem.remove();
         deletePokemonTypes(data);
         listItem.innerHTML = '<img alt="pokeball-icon" src="images/placeholder/pokeball.png">';
       });
       return data;
    }

    function generatePokemonTypes(listItem, data) {
        const types = data.types;

        let typeName = "Type(s): ";
        for (let i = 0; i < types.length; i++) {
          typeName += types[i].type.name + " ";
          generatePokemonTableTypes(types[i].type.name);
        }
        const typeTextfeld = document.createElement("p");
        typeTextfeld.value = typeName;
        typeTextfeld.textContent = typeName;
        listItem.appendChild(typeTextfeld);

        return data;
    }

  function deletePokemonTypes(data) {
    const types = data.types;
    for (let i = 0; i < types.length; i++) {
      type = types[i].type.name;
      if(dict.hasOwnProperty(type)) {
        const typeInformation = document.getElementById(type);
        dict[type]--;
        if(dict[type] == 0) {
          console.log("BUUUUUUP");
          
          const typTable = document.getElementById("type-table");
          console.log(typTable.classList.remove(type));
          const typeElements = typTable.getElementsByClassName(type);

          while (typeElements.length > 0) {
            typeElements[0].parentNode.removeChild(typeElements[0]);
          }
        }
        else {
          typeInformation.textContent = dict[type];
        }
      }
    }
  }

    function generatePokemonTableTypes(type) {
      const trTableImage = document.getElementById("tr-type-table-images");
      const trTableNumber = document.getElementById("tr-type-table-numbers");
      console.log(`image-${type}`);
      console.log(document.getElementById(`image-${type}`));
      if(document.getElementById(type)) {
        if(dict.hasOwnProperty(type)) {
          const typeInformation = document.getElementById(type);
          dict[type]++;
          typeInformation.textContent = dict[type];
        }
      }
      else {
        const thZelleBild = document.createElement("th");
        const thZelleZahl = document.createElement("th");
        thZelleBild.innerHTML = `<div style="background: ${typeBackgroundColor[type]};""><img alt="Typ-Icon ${type}" src="images/types/${type}.png"/></div>`;
        dict[type]++;
        thZelleZahl.innerHTML = dict[type];
        thZelleBild.classList.add(type);
        thZelleZahl.classList.add(type);
        thZelleZahl.setAttribute("id", type);
        trTableImage.appendChild(thZelleBild);
        trTableNumber.appendChild(thZelleZahl);
      }

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
        console.log(selectedPokemon);
        generatePokemon(selectedPokemon);
      }
    });
  })
  .catch(error => {
    console.log("Error fetching Pokémon data:", error);
  });