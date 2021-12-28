import { useEffect, useState } from "react";

function PokemonStats({stats}) {


  return (
    <div className="stats">
        {stats.map(stat => {

            return(
            <div key={stat.id}
            className="stat-container">
                <h2>{stat.stat.name}</h2>
                <p>{stat.base_stat}</p>
            </div>
            )
        })}
    </div>
  );
}

export default PokemonStats;
