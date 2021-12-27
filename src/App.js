import { useEffect, useState } from 'react';
import Pokemon from './components/Pokemon';

function App(pokedex) {
  const [loaded, setLoaded] = useState(false)
  const [pokeball, openPokeball] = useState(false)


  return (
    <>
      <h1>Who will you catch?!</h1>
      {!pokeball ? (
        <button
          onClick={() => {
            openPokeball(true);
          }}
        >
          Throw Pokeball
        </button>
      ) : (
        <Pokemon pokedex={pokedex}/>

      )}
    </>
  );
}

export default App;
