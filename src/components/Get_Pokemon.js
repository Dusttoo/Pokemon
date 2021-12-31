import { useEffect, useState } from "react";
import { getCookie } from "./utils";
import Item from "./Item";
import PokemonStats from "./Pokemon_Stats";

function GetPokemon({ pokedex, poke_id, openBag }) {
  const [loaded, setLoaded] = useState(false);
  const [pokemon, setPokemon] = useState({})
  let key = 0

  useEffect(() => {
    (async () => {
    const pokemon = await pokedex.pokedex.getPokemonByName(poke_id);
    if (pokemon) {
      setPokemon(pokemon);
      setLoaded(true);
    }
    })();
  }, []);

    console.log(pokemon)



  return (
    <>
      {loaded && (
        <div className="your-poke-card">
          <img src={pokemon.sprites["front_default"]} alt={pokemon.name}></img>
          <h1>{pokemon.name}</h1>
          <p>XP: {pokemon.base_experience} </p>
          <PokemonStats stats={pokemon.stats} />
          <h3>Items</h3>
          <div className="items-container">
            {pokemon.held_items.length === 0 ? (
              <p>no items</p>
            ) : (
              <>
                {pokemon.held_items.map((item) => {
                  return <Item pokedex={pokedex} name={item.item.name} />;
                })}
              </>
            )}
          </div>
          <p>Unlocked abilities:</p>
          <ul>
            {pokemon.abilities.map((ability) => {
              if (ability.is_hidden === false) {
                return <li key={key++}>{ability.ability.name}</li>;
              }
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default GetPokemon;
