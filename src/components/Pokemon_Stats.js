import { useEffect, useState } from "react";

function PokemonStats({stats}) {


  return (
    <>
        {stats.map(stat => {

            return(
            <div key={stat.id}>
                <h2>{stat.stat.name}</h2>
                <p>{stat.base_stat}</p>
            </div>
            )
        })}
    </>
  );
}

export default PokemonStats;
