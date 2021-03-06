import { useEffect, useState } from "react";
import PokemonStats from "./Pokemon_Stats";
import Species from "./Species";
import { getCookie } from "./utils";
import "./pokemon.css";

function Pokemon({ pokedex, rethrow, addAttempt, attempts }) {
  const [loaded, setLoaded] = useState(false);
  const [pokemonData, setPokemonData] = useState("");
  const poke_id = getCookie("poke_id");
  const caught_pokemon = getCookie("caught");

  useEffect(() => {
    (async () => {
      const rendered_pokemon = await pokedex.pokedex.getPokemonByName(poke_id);
      if (rendered_pokemon) {
        setPokemonData(rendered_pokemon);
        setLoaded(true);
      }
    })();
  }, []);

  return (
    <div className="pokemon-container">
      {loaded ? (
        <>
          {poke_id && (
            <div className="pokemon-card">
              <h1 className="pokemon-name">{pokemonData.name}</h1>
              <img
                className="pokemon-image"
                src={pokemonData.sprites["front_default"]}
                alt={pokemonData.name}
              />
              <h2>XP: {pokemonData.base_experience}</h2>
              <Species
                addAttempt={addAttempt}
                attempts={attempts}
                species={pokemonData.species}
                pokedex={pokedex}
                caught_pokemon={caught_pokemon}
                pokemon={pokemonData}
              />
              <PokemonStats stats={pokemonData.stats} />
              {rethrow}
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
