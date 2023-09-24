import { useEffect, useState } from "react";
import PokemonThumbnails from "./PokemonThumbnails";

import "./App.css";
import "./index.css";

function App() {
  const [pokemonNames, setPokemonNames] = useState([]);

  const pokemons = [
    {
      id: 1,
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      type: "くさ",
    },
    {
      id: 2,
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      type: "くさ",
    },
    {
      id: 3,
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      type: "くさ",
    },
  ];

  const url = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results[0].name);
        // 仮で３つのポケモンの名前をセットする
        const names = [
          data.results[0].name,
          data.results[1].name,
          data.results[2].name,
        ];
        setPokemonNames(names);
      });
  }, []);

  return (
    <div className="App">
      {pokemons.map((pokemon, index) => (
        <PokemonThumbnails
          id={pokemon.id}
          name={pokemonNames[index]}
          image={pokemon.image}
          type={pokemon.type}
          key={index}
        />
      ))}
    </div>
  );
}

export default App;
