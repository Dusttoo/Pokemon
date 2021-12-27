import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loaded, setLoaded] = useState(false)
  const [pokemon, setPokemon] = useState('')
  const [species, setSpecies] = useState('')

  useEffect(() => {
    (async () => {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
      .then((res) => res.json())
      .then((result) => {
        setPokemon(result);
      });

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
      .then((res) => res.json())
      .then((result) => {
        setSpecies(result)
      })

    })();
    setLoaded(true)
  }, [])

  console.log(pokemon.sprites)
  console.log(species)

  


  return (
    <div className="App">
      {!loaded ? (
        <h1>Where is Pikachu??</h1>
      ) : (
        <>
          <h1>Here he is</h1>
          <img
            src={pokemon.sprites['front_default']}
            alt={pokemon.name}
          />
        </>
      )}
    </div>
  );
}

export default App;
