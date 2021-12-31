import { useEffect, useState } from "react";
import { getCookie } from "./utils";

function GetPokemon({ pokedex, poke_id }) {
  const [loaded, setLoaded] = useState(false);
  const [pokemon, setPokemon] = useState({})


  useEffect(() => {
    (async () => {
    const pokemon = await pokedex.pokedex.getPokemonByName(poke_id);
    // console.log(pokemon);
    if (pokemon) {
      setLoaded(true);
      setPokemon(pokemon);
    }
    })();
  }, []);

  console.log(pokemon, loaded)


  return (
    <>

      <h1>{pokemon.name}</h1>
    </>
  );
}

export default GetPokemon;
