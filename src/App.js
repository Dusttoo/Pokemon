import { useEffect, useState } from 'react';
import Pokemon from './components/Pokemon';
import ProgressBar from './components/ProgressBar';
import { calculateUserLevel, eraseCookie, getCookie, setCookie, storePokeId } from './components/utils';
import Bag from './components/Your_Pokemon';
import './index.css'

function App(pokedex) {
  const [loaded, setLoaded] = useState(false)
  const [pokeball, openPokeball] = useState(false)
  const [firstThrow, setFirstThrow] = useState(false)
  const [bag, openBag] = useState(false)
  const cookie = getCookie('poke_id')
  const xp = getCookie('xp')
  const level = getCookie('level')
  const poke_list = getCookie('poke_list')
  const userLevel = calculateUserLevel()
  console.log(xp, level, userLevel)

  //need to dynamicallly render level


    useEffect(() => {
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
      <div className="main-container">
        {bag && <Bag pokedex={pokedex} openBag={openBag} />}
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
              <div className="bag-button-container">
                <button
                  className="bag-button"
                  onClick={() => {
                    openBag(true);
                  }}
                >
                  <img
                    className="bag-image"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrzUFlpFn1MNsq7-MjbOBkZBtXUugfODtpVg&usqp=CAU"
                    alt="inventory bag"
                  />
                  Your Pokemon
                </button>
              </div>
              <p className="level-container">
                Current level: {userLevel} Current xp: {xp} Next level in:{" "}
                {level * 2000 + 1000 - xp}
              </p>
              <ProgressBar completed={(xp / (level * 2000 + 1000)) * 100} />
              {poke_list ? (
                <p className="level-container">
                  You have caught {JSON.parse(poke_list).length} pokemon
                </p>
              ) : (
                <p className="level-container">
                  You haven't caught any pokemon yet!
                </p>
              )}
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
      </div>
    </>
  );
}

export default App;
