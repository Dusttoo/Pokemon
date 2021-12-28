import { useEffect, useState } from "react";

function Species({species, pokedex}) {
    const [speciesData, setSpeciesData] = useState('')
    const [loaded, setLoaded] = useState(false)
      useEffect(() => {
        (async () => {
          const rendered_pokemon_species =
            await pokedex.pokedex.getPokemonSpeciesByName(species.name);
          if (rendered_pokemon_species) {
            setSpeciesData(rendered_pokemon_species)
            setLoaded(true)
          }
        })();
      }, []);

        console.log(speciesData);



  return (
    <>
      <h2>
        Species: {species.name}
      </h2>
      <p>Habitat: {speciesData.habitat.name}</p>
    </>
  );
}

export default Species;
