import { useState, useEffect } from 'react';
import './App.css';

// Diccionario de gradientes y colores por tipo principal
const TYPE_COLORS = {
  normal:   { bg: 'linear-gradient(135deg, #a8a29e, #78716c)', glow: 'rgba(120, 113, 108, 0.4)' },
  fire:     { bg: 'linear-gradient(135deg, #f97316, #ef4444)', glow: 'rgba(239, 68, 68, 0.4)' },
  water:    { bg: 'linear-gradient(135deg, #38bdf8, #2563eb)', glow: 'rgba(37, 99, 235, 0.4)' },
  electric: { bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', glow: 'rgba(245, 158, 11, 0.45)' },
  grass:    { bg: 'linear-gradient(135deg, #4ade80, #16a34a)', glow: 'rgba(22, 163, 74, 0.4)' },
  ice:      { bg: 'linear-gradient(135deg, #67e8f9, #0284c7)', glow: 'rgba(2, 132, 199, 0.4)' },
  fighting: { bg: 'linear-gradient(135deg, #f87171, #dc2626)', glow: 'rgba(220, 38, 38, 0.4)' },
  poison:   { bg: 'linear-gradient(135deg, #c084fc, #9333ea)', glow: 'rgba(147, 51, 234, 0.4)' },
  ground:   { bg: 'linear-gradient(135deg, #fde047, #d97706)', glow: 'rgba(217, 119, 6, 0.4)' },
  flying:   { bg: 'linear-gradient(135deg, #a5b4fc, #6366f1)', glow: 'rgba(99, 102, 241, 0.4)' },
  psychic:  { bg: 'linear-gradient(135deg, #f472b6, #e11d48)', glow: 'rgba(225, 29, 72, 0.4)' },
  bug:      { bg: 'linear-gradient(135deg, #bef264, #65a30d)', glow: 'rgba(101, 163, 13, 0.4)' },
  rock:     { bg: 'linear-gradient(135deg, #d4d4d8, #a1a1aa)', glow: 'rgba(161, 161, 170, 0.4)' },
  ghost:    { bg: 'linear-gradient(135deg, #a78bfa, #6d28d9)', glow: 'rgba(109, 40, 217, 0.4)' },
  dragon:   { bg: 'linear-gradient(135deg, #818cf8, #4338ca)', glow: 'rgba(67, 56, 202, 0.4)' },
  dark:     { bg: 'linear-gradient(135deg, #64748b, #334155)', glow: 'rgba(51, 65, 85, 0.4)' },
  steel:    { bg: 'linear-gradient(135deg, #cbd5e1, #94a3b8)', glow: 'rgba(148, 163, 184, 0.4)' },
  fairy:    { bg: 'linear-gradient(135deg, #f9a8d4, #db2777)', glow: 'rgba(219, 39, 119, 0.4)' },
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('25'); // Pikachu
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async (query) => {
    if (!query || !query.toString().trim()) return;

    setLoading(true);
    setError(null);

    const formattedQuery = query.toString().trim().toLowerCase();

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedQuery}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No se encontró ningún Pokémon con ese nombre o número.');
        }
        throw new Error(`Error en el servidor de la PokéAPI (código ${response.status})`);
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Error de conexión a internet o bloqueo del navegador (Brave Shields / AdBlock). No se pudo conectar con pokeapi.co.');
      } else {
        setError(err.message || 'Error al consultar la PokeAPI');
      }
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon('25');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPokemon(searchTerm);
  };

  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    setSearchTerm(randomId.toString());
    fetchPokemon(randomId);
  };

  const primaryType = pokemon?.types?.[0]?.type?.name || 'normal';
  const typeTheme = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;

  return (
    <div className="poke-container">
      {/* Cabecera elegante */}
      <header className="poke-header">
        <div className="brand-badge">PokéAPI Explorer</div>
        <h1>Visor Pokédex</h1>
        <p>Busca cualquier Pokémon por su nombre o código oficial</p>
      </header>

      {/* Buscador */}
      <form className="search-bar" onSubmit={handleSearch}>
        <div className="input-group">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Ej: 25, pikachu, 6, charizard, gengar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-search">
          Buscar
        </button>
        <button
          type="button"
          onClick={handleRandom}
          className="btn-random"
          title="Seleccionar Pokémon al azar"
        >
          🎲
        </button>
      </form>

      {/* Atajos de sugerencias */}
      <div className="quick-suggestions">
        <span className="suggestions-label">Populares:</span>
        {[
          { label: 'Pikachu', code: '25' },
          { label: 'Charizard', code: '6' },
          { label: 'Gengar', code: '94' },
          { label: 'Mewtwo', code: '150' },
          { label: 'Bulbasaur', code: '1' },
          { label: 'Lucario', code: '448' },
        ].map((item) => (
          <button
            key={item.code}
            type="button"
            className="chip-btn"
            onClick={() => {
              setSearchTerm(item.code);
              fetchPokemon(item.code);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Estado: Cargando */}
      {loading && (
        <div className="state-panel loading-panel">
          <div className="pokeball-spinner"></div>
          <p>Buscando en la Pokédex...</p>
        </div>
      )}

      {/* Estado: Error */}
      {error && !loading && (
        <div className="state-panel error-panel">
          <span className="error-icon">⚠️</span>
          <div className="error-body">
            <strong>No se pudo cargar la información</strong>
            <p>{error}</p>
            <button
              type="button"
              className="btn-retry"
              onClick={() => fetchPokemon(searchTerm || '25')}
            >
              🔄 Reintentar
            </button>
          </div>
        </div>
      )}

      {/* VENTANA ÚNICA DEL POKÉMON */}
      {pokemon && !loading && (
        <div
          className="pokemon-card-window"
          style={{
            '--glow-color': typeTheme.glow,
            '--type-gradient': typeTheme.bg,
          }}
        >
          {/* Fondo dinámico iluminado */}
          <div className="card-backdrop"></div>

          {/* Barra superior de la ventana */}
          <div className="window-header">
            <span className="poke-badge-code">
              #{String(pokemon.id).padStart(3, '0')}
            </span>
            <span className="primary-type-pill">{primaryType}</span>
          </div>

          {/* DIBUJO OFICIAL DEL POKÉMON */}
          <div className="artwork-stage">
            <div className="artwork-ring"></div>
            <img
              src={
                pokemon.sprites.other?.['official-artwork']?.front_default ||
                pokemon.sprites.front_default ||
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
              }
              alt={pokemon.name}
              className="pokemon-image"
            />
          </div>

          <h2 className="pokemon-name">{pokemon.name}</h2>

          {/* PANEL DE 3 DATOS */}
          <div className="details-grid">
            {/* DATO 1: TIPOS */}
            <div className="detail-card">
              <div className="detail-header">
                <span className="detail-icon">🏷️</span>
                <span className="detail-title">Dato 1 · Tipos</span>
              </div>
              <div className="types-list">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`type-tag type-${t.type.name}`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* DATO 2: MEDIDAS FÍSICAS */}
            <div className="detail-card">
              <div className="detail-header">
                <span className="detail-icon">⚖️</span>
                <span className="detail-title">Dato 2 · Medidas</span>
              </div>
              <div className="measurements">
                <div className="measure-box">
                  <span className="measure-sub">Altura</span>
                  <span className="measure-value">{(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className="measure-divider"></div>
                <div className="measure-box">
                  <span className="measure-sub">Peso</span>
                  <span className="measure-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
              </div>
            </div>

            {/* DATO 3: HABILIDADES */}
            <div className="detail-card">
              <div className="detail-header">
                <span className="detail-icon">⚡</span>
                <span className="detail-title">Dato 3 · Habilidades</span>
              </div>
              <p className="abilities-text">
                {pokemon.abilities
                  .map((a) => a.ability.name.replace('-', ' '))
                  .join(' · ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
