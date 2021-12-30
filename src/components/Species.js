import { useEffect, useState } from "react";
import { catchPokemon, getCookie, getRandomIntInclusive, setCookie } from "./utils";

function Species({species, pokedex, caught_pokemon}) {
    const [speciesData, setSpeciesData] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [caught, setCaught] = useState(false)
    const [failedCatch, setFailed] = useState(false)
    const magicNum = getCookie('catch_num')
    const poke_list = getCookie('poke_list')
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

      const attemptCatch = () => {
        const all_pokemon = []
        console.log(all_pokemon, 'all pokemon')
        if(poke_list) {
          console.log('poke list exists', poke_list)
          const parsed = JSON.parse(poke_list)
          parsed.forEach(pokemon => {
            all_pokemon.push(pokemon)
          })
          console.log('pushed cookie', all_pokemon)
        }
        let max = catchPokemon(speciesData)
        const throw_attempt =getRandomIntInclusive(1, max)
        console.log(typeof magicNum)
        const lowest = parseInt(magicNum) - 10;
        const highest = parseInt(magicNum) + 10;

            console.log(
              "throw attempt",
              lowest,
              throw_attempt,
              highest
            );


        if(throw_attempt < highest &&
          throw_attempt > lowest) {
            console.log('throw attempt in range', lowest, throw_attempt, highest)
            all_pokemon.push(speciesData.id)
            console.log('pushed new', all_pokemon)
            setCookie('poke_list', JSON.stringify(all_pokemon))
            setFailed(false)
            setCaught(true)
          } else { setFailed(true)}


      }




  return (
    <>
      <h2>Species: {species.name}</h2>
      {speciesData.habitat ? (
        <p>Habitat: {speciesData.habitat.name}</p>
      ) : (
        <p>Habitat: Unknown</p>
      )}

      {!JSON.parse(poke_list).includes(speciesData.id) ? (
        <>
          {failedCatch && <p>Sorry, {speciesData.name} got away.
          Try again?</p>}
          {caught ? (
            <p>Success you caught {speciesData.name}!</p>
          ) : (
            <button className="catch-pokemon" onClick={attemptCatch}>
              Try to catch?
            </button>
          )}
        </>
      ) : (
        <p>You own this pokemon</p>
      )}
    </>
  );
}

export default Species;
