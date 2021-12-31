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
      setPokemon(pokemon);
      setLoaded(true);
    }
    })();
  }, []);

//   console.log(pokemon, loaded)


  return (
    <>
    {loaded && 
    <>
    <img src={pokemon.sprites['front_default']}></img>
    <h1>{pokemon.name}</h1>
    <p>XP: {pokemon.base_experience} </p>
    {pokemon.held_items ? 
    pokemon.held_items.map(item => {
        console.log(item)
        return (
            <p>{item.item.name}</p>
        )
    }) :
    <p>No items</p>}
    </>}
      
    </>
  );
}

export default GetPokemon;
