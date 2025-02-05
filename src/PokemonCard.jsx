import React from "react";

const PokemonCard = ({pokemon, handleClick}) => {
  return (
    <div className="pokemon-card" onClick={handleClick}>
      <div className="card-image">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <div className="card-info">
        
        <h2 style={{
          fontSize: '20px'
        }}>{pokemon.name}</h2>
      </div>
    </div>
  );
}

export default PokemonCard;