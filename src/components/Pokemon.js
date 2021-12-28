import { useEffect, useState } from "react";
import PokemonStats from "./Pokemon_Stats";
import Species from "./Species";
import { getCookie, randomPokemon, setCookie } from "./utils";
import "./pokemon.css";

function Pokemon({ pokedex }) {
  const [loaded, setLoaded] = useState(false);
  const [pokemonData, setPokemonData] = useState("");
  const poke_id = getCookie("poke_id");


  useEffect(() => {
    (async () => {
      const rendered_pokemon = await pokedex.pokedex.getPokemonByName(poke_id);
      console.log(rendered_pokemon);
      if (rendered_pokemon) {
        setPokemonData(rendered_pokemon);
        setLoaded(true);
      }
    })();
  }, []);

  //   console.log(pokemonData)

  return (
    <div className="pokemon-container">
      {loaded ? (
        <>
          {poke_id && (
            <div className="pokemon-card">
              <h1 className="pokemon-name">{pokemonData.name}</h1>
              <img
                src={pokemonData.sprites["front_default"]}
                alt={pokemonData.name}
              />
              <span>XP: {pokemonData.base_experience}</span>
              <Species species={pokemonData.species} pokedex={pokedex} />
              <PokemonStats stats={pokemonData.stats} />
            </div>
          )}
        </>
      ) : (
        <h1>Throwing Pokeball...</h1>
      )}
    </div>
  );
}

export default Pokemon;
