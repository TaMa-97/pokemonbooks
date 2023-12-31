import { useEffect, useState } from "react";
import PokemonThumbnails from "./PokemonThumbnails";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);

  // APIからデータ取得
  // パラメータにlimitを設定し20件取得
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [isLoading, setIsLoading] = useState(false);

  const getAllPokemons = () => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // 次の20件をURLにセット
        setUrl(data.next);
        createPokemonObject(data.results);
      })
      .finally(() => {
        allPokemons.sort((a, b) => a.id - b.id);
        setIsLoading(false);
      });
  };

  const createPokemonObject = (results) => {
    results.forEach((pokemon) => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(pokemonUrl)
        .then((res) => res.json())
        .then((data) => {
          const _image = data.sprites.other["official-artwork"].front_default;
          const _iconImage = data.sprites.other.dream_world.front_default;
          const _type = data.types[0].type.name;
          const newList = {
            id: data.id,
            name: data.name,
            iconImage: _iconImage,
            image: _image,
            type: _type,
          };
          // 既存のデータを展開し、新しいデータを追加する
          setAllPokemons((currentList) => [...currentList, newList]);
        });
    });
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnails
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              iconImage={pokemon.iconImage}
              type={pokemon.type}
              key={index}
            />
          ))}
        </div>
        {isLoading ? (
          <div className="load-more">now loading...</div>
        ) : (
          <button className="load-more" onClick={getAllPokemons}>
            もっとみる
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
