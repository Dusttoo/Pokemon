import { useEffect, useState } from 'react';
import Pokemon from './components/Pokemon';
import { eraseCookie, getCookie, storePokeId } from './components/utils';
import './index.css'

function App(pokedex) {
  const [loaded, setLoaded] = useState(false)
  const [pokeball, openPokeball] = useState(false)
  const [firstThrow, setFirstThrow] = useState(false)
  const cookie = getCookie('poke_id')
  console.log(getCookie('catch_num'))


    useEffect(() => {
      if (cookie) {
        openPokeball(true);
      } else {
        setFirstThrow(true)
      }
    }, []);
  


  return (
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
        </>
      ) : (
        <>
          {cookie && firstThrow ? (
            <h1 className="returning-message">
              Last time you were here you found:
            </h1>
          ) : <></>}
          <Pokemon
            pokedex={pokedex}
            rethrow={
              <button
                className="rethrow-button"
                onClick={() => {
                  openPokeball(false);
                  eraseCookie("poke_id");
                  eraseCookie('catch_num')
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
  );
}

export default App;
