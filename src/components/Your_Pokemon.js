import { useEffect, useState } from "react";
import GetPokemon from "./Get_Pokemon";
import { getCookie } from "./utils";

function Bag({ pokedex }) {
  const poke_list = getCookie('poke_list')
  const parsed = JSON.parse(poke_list);
  const [loaded, setLoaded] = useState(false)
  const my_pokemon = [];





            
          

console.log(my_pokemon);




  return (
    <>
    <h1>Bag</h1>
    {parsed.map(pokemon => {
      console.log(pokemon)
        return(
            <GetPokemon key={pokemon} poke_id={pokemon} pokedex={pokedex}/>
            // <h1>{pokemon.name}</h1>
        )
    })}
    </>
  );
}

export default Bag;
