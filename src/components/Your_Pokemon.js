import { useEffect, useState } from "react";
import { getCookie } from "./utils";

function Bag({ pokedex }) {
  const poke_list = getCookie('poke_list')
  const my_pokemon = []
  const parsed = JSON.parse(poke_list);


    useEffect(() => {
        

    }, []);

    const getMyPokemon = () => {
          parsed.map((poke_id) => {
            pokedex.pokedex.getPokemonByName(poke_id).then(res => {
                my_pokemon.push(res)
            })
            console.log(my_pokemon)
          })        
    }

getMyPokemon();
    console.log(my_pokemon)




  return (
    <>
    <h1>Bag</h1>
    {my_pokemon.map(pokemon => {

        return(
            <h3>{pokemon.name}</h3>
        )
    })}
    </>
  );
}

export default Bag;
