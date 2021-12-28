import { useEffect, useState } from "react";
import PokemonStats from "./Pokemon_Stats";
import Species from "./Species";
import { randomPokemon } from "./utils";

function Pokemon({pokedex}) {
  const [loaded, setLoaded] = useState(false);
  const [pokemonData, setPokemonData] = useState("");
  const poke_id = randomPokemon();


//   console.log(randomPokemon())
  useEffect(() => {
    (async () => {
        const rendered_pokemon = await pokedex.pokedex.getPokemonByName(poke_id);
        if(rendered_pokemon) {
            setPokemonData(rendered_pokemon);
            setLoaded(true);
        }
        
    })();
  }, []);

  console.log(pokemonData)

  return (
    <div className="pokemon">
      {loaded ? (
        <>
        {poke_id && 
        <>
          <h1>{pokemonData.name}</h1>
          <img src={pokemonData.sprites["front_default"]} alt={pokemonData.name} />
          <span>XP: {pokemonData.base_experience}</span>
          <Species species={pokemonData.species} pokedex={pokedex} />
          <PokemonStats stats={pokemonData.stats} />
        </>
        }

        </>
      ) :
      <h1>Throwing Pokeball...</h1>}
    </div>
  );
}

export default Pokemon;
