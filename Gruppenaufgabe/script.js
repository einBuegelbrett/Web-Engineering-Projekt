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
              const pokemonImage = pokemonData.sprites.front_default;
              if (pokemonImage) {
                const imageElement = document.createElement("img");
                imageElement.src = pokemonImage;
                imageElement.alt = pokemonName;
                listItem.appendChild(imageElement);
              }
              
              /*
              // kreiert die abilities dropdown
              fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(response => response.json())
                .then(characteristic => {
                  //const pokemonAbilities = characteristic.abilities[1].ability.name;
                  //console.log(pokemonAbilities);
                  const abilities = characteristic.abilities;
                  console.log(abilities);

                  //for (let i = 1; i <= 6; i++) {
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

                    pokemonAbilitiesContainer.appendChild(dropdown);
                })
                */



              /*
              // Fetch additional details including stats
              const speciesURL = pokemonData.species.url;
              fetch(speciesURL)
                .then(response => response.json())
                .then(speciesData => {
                  const stats = speciesData.stats[0].base_stats;
                  console.log(speciesData);
                  console.log(stats);
                  const statsList = document.createElement("ul");
                  statsList.classList.add("pokemon-stats");

                  //stats.forEach(stat => {
                    const statItem = document.createElement("li");
                    statItem.textContent = stats;
                    //statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
                    statsList.appendChild(statItem);
                  //});

                  listItem.appendChild(statsList);
                } 
                )
                .catch(error => {
                  console.log("Error fetching Pokémon species details:", error);
                });*/
            })
            .catch(error => {
              console.log("Error fetching Pokémon details:", error);
            })

            teamInformation.appendChild(listItem); // Append the <li> element to the team list
            generateAbilitiesDropdown(pokemonName, listItem);
    }}}

    function generateAbilitiesDropdown(pokemonName, listItem) {
      // kreiert die abilities dropdown
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(characteristic => {
        //const pokemonAbilities = characteristic.abilities[1].ability.name;
        //console.log(pokemonAbilities);
        
        const abilities = characteristic.abilities;
        console.log(abilities);

        //for (let i = 1; i <= 6; i++) {
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

  
