import { useEffect, useState } from "react";

function PokemonStats({stats}) {
  let statId = 0

  return (
    <div className="stats">
        {stats.map(stat => {
            return(
            <div key={statId += 1}
            className="stat-container">
              {!stat.stat.name.includes('special') &&
              <>
                <p>{stat.stat.name}</p>
                <p>{stat.base_stat}</p>
              </>
              }
                
            </div>
            )
        })}
    </div>
  );
}

export default PokemonStats;
