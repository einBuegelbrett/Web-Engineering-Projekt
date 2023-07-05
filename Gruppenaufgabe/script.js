// Globale Varbiablen
const max_pokemon_team = 6;
let size_team = 0;
// eigentlich array
const pokemonTeam = [undefined, undefined, undefined, undefined, undefined, undefined];
let dict = { "normal": 0, "fighting": 0, "flying": 0, "poison": 0, "ground": 0, "rock": 0, "bug": 0, "ghost": 0, "steel": 0, "fire": 0, "water": 0, "grass": 0, "electric": 0, "psychic": 0, "ice": 0, "dragon": 0, "dark": 0, "fairy": 0 };
const typeCoverageBackgroundColor = { "normal": "#a8a899", "fighting": "#a84c3d", "flying": "#87b5e5", "poison": "#864ab8", "ground": "#956833", "rock": "#a8995b", "bug": "#83ad25", "ghost": "#633c64", "steel": "#9999a8", "fire": "#e53b19", "water": "#278bcc", "grass": "#58a951", "electric": "#e5c600", "psychic": "#e55973", "ice": "#68baac", "dragon": "#4d64ab", "dark": "#463e3e", "fairy": "#d480cf"};

// Items werden nur einmal geladen
let itemsList;
fetch('https://pokeapi.co/api/v2/item/?limit=2050')
.then(response => response.json())
.then(items => {
  itemsList = items;
}); 

// Fetch Pokémon data von der PokeAPI
fetch("https://pokeapi.co/api/v2/pokemon?limit=1010")
  .then(response => response.json())
  .then(data => {
    const pokemonDropdown = document.getElementById("pokemon-dropdown");
    const addToTeamBtn = document.getElementById("add-to-team");

    $(document).ready(function() {
      $('#pokemon-dropdown').select2({
        minimumResultsForSearch: 0
      });
    });

    // Speichert pokemon Daten für die Bilder
    const pokemonDetails = data.results.reduce((details, pokemon) => {
      details[pokemon.name] = pokemon.url;
      return details;
    }, {});

    // Kreiert die Options für pokemons
    data.results.forEach(pokemon => {
      const option = document.createElement("option");
      option.value = pokemon.name;
      option.textContent = pokemon.name;
      pokemonDropdown.appendChild(option);
    });

    function generatePokemon(pokemon) {
        const pokemonName = pokemon;
        if (pokemonName) {

          let listItem;
          let string
          for(i = 1; i < 7; i++)
          {
            string = "pokemon-" + i;
            listItem = document.getElementById(string);
            if(listItem.innerHTML == '<img class="pokemon-balls" alt="pokeball-icon" src="images/placeholder/pokeball.png">'){
              break;
            }
          } 

          let FlexBoxDeleteAndItemDropdown = document.createElement("div");
          FlexBoxDeleteAndItemDropdown.classList.add("DeleteAndItemDropdown");

          let FlexBoxImageAndNameAndTyps = document.createElement("div");
          FlexBoxImageAndNameAndTyps.classList.add("FlexBoxImageAndNameAndTyps");

          let FlexBoxNameAndTyps = document.createElement("div");
          FlexBoxNameAndTyps.classList.add("FlexBoxNameAndTyps");
          listItem.textContent = '';
          FlexBoxDeleteAndItemDropdown.textContent = "";
          FlexBoxImageAndNameAndTyps.textContent = "";
          FlexBoxNameAndTyps.textContent = "";
         
        const pokemonURL = pokemonDetails[pokemonName];
          fetch(pokemonURL)
            .then(response => response.json())
            .then(data => generatePokemonImage(pokemonName, FlexBoxImageAndNameAndTyps, FlexBoxNameAndTyps, data))
            .then(() => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)) 
            .then(response => response.json())
            .then(data => {
              //teamInformation.appendChild(listItem) // Append the <li> element to the team list
              generatePokemonTypes(listItem, FlexBoxImageAndNameAndTyps, FlexBoxNameAndTyps, data)
              return data;
            })
            .then(data => generateAbilitiesDropdown(listItem, data))
            .then(data => generateMovesDropdown(listItem, data))
            .then(data => generateDeleteButton(FlexBoxDeleteAndItemDropdown, data))
            .then(() => {
              generateItemDropdown(listItem, FlexBoxDeleteAndItemDropdown, itemsList);
            });        
    }}

    function generateItemDropdown(listItem, FlexBoxDeleteAndItemDropdown, data) {
        const items = data;

        const dropdown = document.createElement("select");
        dropdown.classList.add("select-class");

        let DivItemsDropdown = document.createElement("div");
        DivItemsDropdown.classList.add("pokemon-items-dropdown");

        $(document).ready(function() {
          $('.select-class').select2({
            minimumResultsForSearch: 0
          });
        });

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = items.results[i].name;
        dropdown.appendChild(defaultOption);
        
        for (let i = 0; i < 2050; i++) {
          const option = document.createElement("option");
          option.value = items.results[i].name;
          option.textContent = items.results[i].name;
          dropdown.appendChild(option)
        }
        DivItemsDropdown.appendChild(dropdown);
        FlexBoxDeleteAndItemDropdown.appendChild(DivItemsDropdown);
        listItem.appendChild(FlexBoxDeleteAndItemDropdown);

        return items;
    }

    function generatePokemonImage(pokemonName, FlexBoxImageAndNameAndTyps, FlexBoxNameAndTyps, data) {

            const pokemonImage = data.sprites.front_default;
            if (pokemonImage) {
              const imageElement = document.createElement("img");
              imageElement.src = pokemonImage;
              imageElement.alt = pokemonName;
              imageElement.classList.add("pokemon-bilder");
              FlexBoxImageAndNameAndTyps.appendChild(imageElement);
              const pokemonNameElementP = document.createElement("p");
              pokemonNameElementP.textContent = pokemonName
              pokemonNameElementP.classList.add("pokemon-name-text");
              FlexBoxNameAndTyps.appendChild(pokemonNameElementP);
            }

            return data;
      }

    function generateAbilitiesDropdown(listItem, data) {

      // kreiert die abilities dropdown
        const abilities = data.abilities;

        const dropdown = document.createElement("select");
        dropdown.classList.add("select-class");

        let DivAbilitiesDropdown = document.createElement("div");
        DivAbilitiesDropdown.classList.add("pokemon-abilities-dropdown");

        $(document).ready(function() {
          $('.select-class').select2({
            minimumResultsForSearch: 0
          });
        });
  
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = abilities[0].ability.name;
        dropdown.appendChild(defaultOption);
        
        for (let i = 0; i < abilities.length; i++) {
          const option = document.createElement("option");
          option.value = abilities[i].ability.name;
          option.textContent = abilities[i].ability.name;
          dropdown.appendChild(option);
        }

        DivAbilitiesDropdown.appendChild(dropdown);
        listItem.appendChild(DivAbilitiesDropdown);
        return data;
    }

    function generateMovesDropdown(listItem, data) {

      // kreiert die moves dropdown
        const pokemonMoves = data.moves

        const moveTable = document.createElement("table");
        moveTable.setAttribute('id', 'moves-table');
        const tr1 = document.createElement("tr");
        const tr2 = document.createElement("tr");
        
        for (let i = 0; i < 4; i++) {
          const dropdown = document.createElement("select");
          dropdown.classList.add("select-class");

          let DivMovesDropdown = document.createElement("div");
          DivMovesDropdown.classList.add("pokemon-moves-dropdown");

          $(document).ready(function() {
            $('.select-class').select2({
              minimumResultsForSearch: 0
            });
          });

          const defaultOption = document.createElement("option");
          defaultOption.value = "";
          defaultOption.textContent = pokemonMoves[0].move.name;
          dropdown.appendChild(defaultOption);
          
          for (let j = 0; j < pokemonMoves.length; j++) {
            const option = document.createElement("option");
            option.value = pokemonMoves[j].move.name;
            option.textContent = pokemonMoves[j].move.name;
            dropdown.appendChild(option);
          }
          if(i == 0 || i == 1)
          {
            const th = document.createElement("th");

            DivMovesDropdown.appendChild(dropdown);
            th.appendChild(DivMovesDropdown);

            tr1.appendChild(th);
            if(i == 0) {moveTable.appendChild(tr1)};
          }

          if (i == 2 || i == 3) {
            const th = document.createElement("th");

            DivMovesDropdown.appendChild(dropdown);
            th.appendChild(DivMovesDropdown);
            
            tr2.appendChild(th);
            if(i == 2) {moveTable.appendChild(tr2)};
          }
          listItem.appendChild(moveTable);
      }

      return data;
    }

    function generateDeleteButton(FlexBoxDeleteAndItemDropdown, data) {
       // Hinzufügen eines Knopfes zum Löschen des Pokemons
       let removeFromTeam = document.createElement("button");
        
       removeFromTeam.innerHTML = 'Delete';
       removeFromTeam.classList.add("btn",  "btn-danger");
       FlexBoxDeleteAndItemDropdown.appendChild(removeFromTeam);
       removeFromTeam.addEventListener ("click", function() {

         // pokemon vom array löschen
         const listItem = this.parentNode.parentNode;

         size_team--;
         deletePokemonTypes(data);
         listItem.innerHTML = '<img class="pokemon-balls" alt="pokeball-icon" src="images/placeholder/pokeball.png">';
       });
       return data;
    }

    function generatePokemonTypes(listItem, FlexBoxImageAndNameAndTyps, FlexBoxNameAndTyps, data) {
        const types = data.types;

        let typesdiv = document.createElement("div");
        typesdiv.classList.add("types-div");
        for (let i = 0; i < types.length; i++) {
          const type = types[i].type.name;
          let typeTextfeld = document.createElement("div");
          typeTextfeld.innerHTML = `<p class="pokemon-type-text" style="background: ${typeCoverageBackgroundColor[type]};">${type}</p>`
          typeTextfeld.classList.add("pokemon-type");
          
          typesdiv.appendChild(typeTextfeld);

          generatePokemonTableTypes(types[i].type.name);
        }
        FlexBoxNameAndTyps.appendChild(typesdiv);
        FlexBoxImageAndNameAndTyps.appendChild(FlexBoxNameAndTyps);
        listItem.appendChild(FlexBoxImageAndNameAndTyps);
        const typeTextfeld = document.createElement("p");

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
          
          const typTable = document.getElementById("type-table");
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
        thZelleBild.innerHTML = `<div style="background: ${typeCoverageBackgroundColor[type]};""><img alt="Typ-Icon ${type}" src="images/types/${type}.png"/></div>`;
        dict[type]++;
        thZelleZahl.innerHTML = dict[type];
        thZelleBild.classList.add(type);
        thZelleZahl.classList.add(type);
        thZelleZahl.setAttribute("id", type);
        trTableImage.appendChild(thZelleBild);
        trTableNumber.appendChild(thZelleZahl);
      }

    }

    // Hizufügen des event listener zu dem "Add to Team" Knopf
    addToTeamBtn.addEventListener("click", () => {
      const selectedPokemon = pokemonDropdown.value;

      if (selectedPokemon && size_team < max_pokemon_team) {
        size_team++;
        const listItem = document.createElement("li");
        listItem.textContent = selectedPokemon;

        generatePokemon(selectedPokemon);
      }
    });
  })
  .catch(error => {
    console.log("Error fetching Pokémon data:", error);
  });