import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loading from '../components/Loading.jsx'
import StatBar from '../components/StatBar.jsx'
import { getPokemonDetails } from '../services/pokeApi.js'

function formatName(name) {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function formatMeasurement(value) {
  return Number(value / 10).toFixed(1)
}

export default function PokemonDetailsPage() {
  const { pokemonName } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCurrentRequest = true

    async function loadPokemonDetails() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getPokemonDetails(pokemonName)

        if (isCurrentRequest) {
          setPokemon(data)
        }
      } catch (err) {
        if (isCurrentRequest) {
          setError(err.message)
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false)
        }
      }
    }

    loadPokemonDetails()

    return () => {
      isCurrentRequest = false
    }
  }, [pokemonName])

  if (isLoading) {
    return <Loading text="Loading Pokémon details..." />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!pokemon) {
    return <ErrorMessage message="No Pokémon data was found." />
  }

  const imageUrl =
    pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default

  return (
    <section className="details-page">
      <Link className="back-link" to="/pokedex">
        ← Back to Pokédex
      </Link>

      <article className="details-card">
        <div className="details-hero">
          <div>
            <p className="pokemon-number">#{String(pokemon.id).padStart(3, '0')}</p>
            <h2>{formatName(pokemon.name)}</h2>
            <div className="type-list">
              {pokemon.types.map(({ type }) => (
                <span key={type.name} className="type-badge">
                  {formatName(type.name)}
                </span>
              ))}
            </div>
          </div>

          <img src={imageUrl} alt={pokemon.name} />
        </div>

        <div className="details-layout">
          <section className="info-panel">
            <h3>Profile</h3>
            <dl>
              <div>
                <dt>Height</dt>
                <dd>{formatMeasurement(pokemon.height)} m</dd>
              </div>
              <div>
                <dt>Weight</dt>
                <dd>{formatMeasurement(pokemon.weight)} kg</dd>
              </div>
              <div>
                <dt>Base experience</dt>
                <dd>{pokemon.base_experience ?? 'Unknown'}</dd>
              </div>
            </dl>
          </section>

          <section className="info-panel">
            <h3>Abilities</h3>
            <ul className="ability-list">
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <li key={ability.name}>
                  {formatName(ability.name)} {is_hidden && <span>(hidden)</span>}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="info-panel stats-panel">
          <h3>Base stats</h3>
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.stat.name} stat={stat} />
          ))}
        </section>
      </article>
    </section>
  )
}
