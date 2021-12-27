import { useEffect, useState } from "react";
import { randomPokemon } from "./utils";

function Pokemon({pokedex}) {
  const [loaded, setLoaded] = useState(false);
  const [pokemon, setPokemon] = useState('squirtle')
  const [pokemonData, setPokemonData] = useState("");
  const [poke_id, setPokeId] = useState(0)


//   console.log(randomPokemon())
  useEffect(() => {
    (async () => {
        setPokeId(randomPokemon());
        const rendered_pokemon = await pokedex.pokedex.getPokemonByName(poke_id);
        console.log(rendered_pokemon, poke_id, randomPokemon())
        setPokemonData(rendered_pokemon)
        setLoaded(true)
    })();
  }, []);

//   console.log(poke_id)

  return (
    <div className="pokemon">
      {loaded && (
        <>
        {poke_id && 
        <>
          <h1>{pokemonData.name}</h1>
          <img src={pokemonData.sprites["front_default"]} alt={pokemonData.name} />
        </>
        }

        </>
      )}
    </div>
  );
}

export default Pokemon;
