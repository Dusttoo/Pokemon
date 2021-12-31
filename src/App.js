import { useEffect, useState } from 'react';
import Pokemon from './components/Pokemon';
import { calculateUserLevel, eraseCookie, getCookie, setCookie, storePokeId } from './components/utils';
import Bag from './components/Your_Pokemon';
import './index.css'

function App(pokedex) {
  const [loaded, setLoaded] = useState(false)
  const [pokeball, openPokeball] = useState(false)
  const [firstThrow, setFirstThrow] = useState(false)
  const [bag, openBag] = useState(false)
  const [userLevel, setLevel] = useState(0);
  const cookie = getCookie('poke_id')
  const xp = getCookie('xp')
  const level = getCookie('level')
  const poke_list = getCookie('poke_list')
  console.log('xp: ',xp,'level: ', level, 'user level', userLevel)



    useEffect(() => {

      const currentLevel = calculateUserLevel()
      setLevel(currentLevel)

      if (cookie) {
        openPokeball(true);
      } else {
        setFirstThrow(true)
      }

      if (!xp && !level) {
        setCookie('xp', '0', 7)
        setCookie('level', '0', 7)
      }

    }, [userLevel]);

  


  return (
    <>
      {bag ? (
        <Bag pokedex={pokedex} openBag={openBag}/>
      ) : (
        <>
          {!pokeball ? (
            <>
              <h1 className="main-header">Who will you catch?!</h1>
              <p className="tagline">Click the pokeball to find out</p>
              <div className="pokeball-container">
                <button
                  className="pokeball-button"
                  onClick={() => {
                    storePokeId();
                    openPokeball(true);
                  }}
                >
                  <img
                    className="pokeball-img"
                    src="http://www.pngmart.com/files/2/Pokeball-PNG-Photos.png"
                    alt="pokeball"
                  />
                </button>
              </div>
              <button
                onClick={() => {
                  openBag(true);
                }}
              >
                Your Pokemon
              </button>
              <p>Current level: {userLevel}</p>
              <p>You have caught {JSON.parse(poke_list).length} pokemon</p>

            </>
          ) : (
            <>
              {cookie && firstThrow ? (
                <h1 className="returning-message">
                  Last time you were here you found:
                </h1>
              ) : (
                <></>
              )}
              <Pokemon
                pokedex={pokedex}
                rethrow={
                  <button
                    className="rethrow-button"
                    onClick={() => {
                      openPokeball(false);
                      eraseCookie("poke_id");
                      eraseCookie("catch_num");
                      setFirstThrow(false);
                    }}
                  >
                    Throw Pokeball Again?
                  </button>
                }
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
