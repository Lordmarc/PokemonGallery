const ViewPokemon = ({ pokemon }) => {
  const pokemonId = pokemon.id;
  const convertString = pokemonId.toString().padStart(4, "0");

  return (
    <div className="pokemon-container">
      <div className="pokemon-img">
        <img src={pokemon.image} alt={pokemon.name} height={300} width={300} />
      </div>
      <div className="pokemon-info">
        <div style={{ backgroundColor: "#E5D9F2", borderBottom: '1px solid #A294F9' }}>
          <h2>{convertString}</h2>
        </div>
        <div style={{ backgroundColor: "#E5D9F2" }}>
          <h2>{pokemon.name}</h2>
        </div>
        <div className="other-info">
          <div style={{ display: "flex", gap: "3rem" }}>
            <p style={{ color: "#F5EFFF" }}>
              <strong style={{ color: "black" }}>Height:</strong>
              {` ${pokemon.height}dm`}
            </p>

            <p style={{ color: "#F5EFFF" }}>
              <strong style={{ color: "black" }}>Weight:</strong>
              {` ${pokemon.weight}hg`}
            </p>
          </div>

          <p>
            <strong>Types:</strong>
          </p>
          {pokemon.types.map((type) => (
            <p
              style={{ marginLeft: "5px", color: "#F5EFFF" }}
              key={`${pokemon.id}-${type.type.name}`}
            >
              {type.type.name}
            </p>
          ))}

          <p>
            <strong>Abilities:</strong>
          </p>
          {pokemon.abilities.map((ability) => (
            <div
              key={`${pokemon.id}-${ability.ability.name}`}
              style={{ color: "#F5EFFF", marginLeft: '5px' }}
            >
              {ability.ability.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPokemon;
