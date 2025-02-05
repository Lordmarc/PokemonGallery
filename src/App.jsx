
import { useState } from "react";
import PokemonGallery from './PokemonGallery.jsx';
import ViewPokemon from './ViewPokemon.jsx';
import Search from './SearchPokemon.jsx';


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="App">
      <div className="Pokemons">
        <PokemonGallery
          searchQuery={searchQuery}
          onPokemonSelect={setSelectedPokemon}
        />
      </div>

      <div className="ViewPokemon">
        {selectedPokemon ? (
          <ViewPokemon pokemon={selectedPokemon} />
        ) : (
          <p>Select a Pokemon to view</p>
        )}
      </div>

      <div className="search">
        <Search onSearch={setSearchQuery} />
      </div>
    </div>
  );
}

export default App;
