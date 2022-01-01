import GetPokemon from "./Get_Pokemon";
import { getCookie } from "./utils";

function Bag({ pokedex, openBag }) {
  const poke_list = getCookie("poke_list");
  const parsed = JSON.parse(poke_list);

  return (
    <>
      <div className="your-pokemon-container">
        <div className="bag-header">
          <h1>Bag</h1>
          <button className="continue-button" onClick={() => openBag(false)}>
            Continue exploring?
          </button>
        </div>
        <div className="your-poke-cards">
          {parsed ? (
            parsed.map((pokemon) => {
              return (
                <GetPokemon key={pokemon} poke_id={pokemon} pokedex={pokedex} />
                // <h1>{pokemon.name}</h1>
              );
            })
          ) : (
            <h1>Your bag is empty</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Bag;
