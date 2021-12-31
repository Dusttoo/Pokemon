import { useEffect, useState } from "react";
import { calculateXP, catchPokemon, getCookie, getRandomIntInclusive, setCookie } from "./utils";

function Species({species, pokedex, caught_pokemon, pokemon}) {
    const [speciesData, setSpeciesData] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [caught, setCaught] = useState(false)
    const [failedCatch, setFailed] = useState(false)
    const magicNum = getCookie('catch_num')
    const poke_list = getCookie('poke_list')
    const level = getCookie('level')
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


      const attemptCatch = () => {
        const all_pokemon = []
        if(poke_list) {
          const parsed = JSON.parse(poke_list)
          parsed.forEach(pokemon => {
            all_pokemon.push(pokemon)
          })
        }
        let max = catchPokemon(speciesData)
        const throw_attempt =getRandomIntInclusive(1, max)
        const lowest = parseInt(magicNum) - 5;
        const highest = parseInt(magicNum) + 5;

        if(throw_attempt < highest &&
          throw_attempt > lowest) {
            all_pokemon.push(speciesData.id)
            setCookie('poke_list', JSON.stringify(all_pokemon))
            setFailed(false)
            setCaught(true)
            calculateXP('caught', pokemon)
          } else { setFailed(true)}


      }




  return (
    <>
      {loaded && (
        <>
          <h2>Species: {species.name}</h2>
          {speciesData.habitat ? (
            <p>Habitat: {speciesData.habitat.name}</p>
          ) : (
            <p>Habitat: Unknown</p>
          )}
          {!poke_list ? (
            <>
              {failedCatch && (
                <p>Sorry, {speciesData.name} got away. Try again?</p>
              )}
              {caught ? (
                <p>Success you caught {speciesData.name}!</p>
              ) : (
                <button className="catch-pokemon" onClick={attemptCatch}>
                  Try to catch?
                </button>
              )}
            </>
          ) : (
            <>
              {!JSON.parse(poke_list).includes(speciesData.id) ? (
                <>
                  {failedCatch && (
                    <p>Sorry, {speciesData.name} got away. Try again?</p>
                  )}
                  {caught ? (
                    <>{console.log(caught)}
                    <p>

                      Success you caught {speciesData.name} for{" "}
                      {pokemon.base_experience * (+level + 1)} xp!
                    </p></>
                  ) : (
                    <button className="catch-pokemon" onClick={attemptCatch}>
                      Try to catch?
                    </button>
                  )}
                </>
              ) : (
                <>
                  {caught ? (
                    <p>
                      Success you caught {speciesData.name} for{" "}
                      {pokemon.base_experience * (+level + 1)} xp!
                    </p>
                  ) : (
                    <p>You own this pokemon</p>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Species;
