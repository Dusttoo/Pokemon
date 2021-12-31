import { useEffect, useState } from "react";
import { getCookie } from "./utils";

function Item({ pokedex, name }) {
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    (async () => {
      const item = await pokedex.pokedex.getItemByName(name);
      if (item) {
        setItem(item);
        setLoaded(true);
      }
    })();
  }, []);


  return (
    <>
      {loaded && (
        <div className="item-container">
          <p>{item.name}</p>
          <img src={item.sprites["default"]} alt={item.name} />
        </div>
      )}
    </>
  );
}

export default Item;
