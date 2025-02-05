import axios from "axios";
import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const Pagination = ({ currentData, itemPerPage, setCurrentPage }) => {
  const buttonsPerPage = 5; // Set to 5 buttons per page
  const totalPages = Math.max(Math.ceil(currentData.length / itemPerPage), 1); // Total number of pages
  const [currentPage, setCurrentPageState] = useState(1);

  const startPage = Math.max(
    Math.floor((currentPage - 1) / buttonsPerPage) * buttonsPerPage + 1,
    1
  ); // = 1
  const endPage = Math.min(startPage + buttonsPerPage - 1, totalPages); // 1 + 5 = 6 - 1 = 5

  const pageNumbers =
    endPage >= startPage
      ? [...Array(endPage - startPage + 1)].map((_, index) => startPage + index)
      : [];

  const handlePageChange = (page) => {
    setCurrentPageState(page); // Update current page
    setCurrentPage(page); // Pass current page to parent component
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPageState(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPageState(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="pagination">
        <button
          className="next-prev-btn"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-btn ${page === currentPage ? "active" : ""}`}
          >
            {page}
          </button>
        ))}

        <button
          className="next-prev-btn"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

const PokemonGallery = ({ onPokemonSelect, searchQuery }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(18);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        ); // Fetch all Pokémon
        const pokemonList = response.data.results;

        const pokemonInformation = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return {
              id: res.data.id,
              name: res.data.name,
              image: res.data.sprites.front_default,
              height: res.data.height,
              weight: res.data.weight,
              types: res.data.types,
              abilities: res.data.abilities,
            };
          })
        );
        console.log(pokemonInformation);
        setData(pokemonInformation);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  const filteredData = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const currentData = filteredData.slice(firstItemIndex, lastItemIndex);

  return (
    <div>
      <h1 style={{textAlign: 'center', marginTop: '1rem'}}>Pokémon Gallery</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "1rem",
          placeContent: "center",
        }}
      >
        {loading ? (
          <p>Loading.....</p>
        ) : (
          currentData.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              handleClick={() => onPokemonSelect(pokemon)}
            />
          ))
        )}
      </div>

      <nav style={{ textAlign: "center" }}>
        <Pagination
          currentData={filteredData}
          setCurrentPage={setCurrentPage}
          itemPerPage={itemPerPage}
        />
      </nav>
    </div>
  );
};

export default PokemonGallery;
