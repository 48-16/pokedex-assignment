import { Link } from 'react-router-dom'

function getPokemonIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean)
  return parts[parts.length - 1]
}

function formatName(name) {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function PokemonCard({ pokemon }) {
  const id = getPokemonIdFromUrl(pokemon.url)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Link className="pokemon-card" to={`/pokemon/${pokemon.name}`}>
      <span className="pokemon-number">#{id.padStart(3, '0')}</span>
      <img src={imageUrl} alt={pokemon.name} loading="lazy" />
      <h2>{formatName(pokemon.name)}</h2>
      <span className="details-link">View details</span>
    </Link>
  )
}
