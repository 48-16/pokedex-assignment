import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loading from '../components/Loading.jsx'
import Pagination from '../components/Pagination.jsx'
import PokemonCard from '../components/PokemonCard.jsx'
import { getPokemonPage } from '../services/pokeApi.js'

const PAGE_SIZE = 20

export default function PokedexPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(Number(searchParams.get('page')) || 1, 1)
  const offset = (page - 1) * PAGE_SIZE

  const [pokemonPage, setPokemonPage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCurrentRequest = true

    async function loadPokemon() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getPokemonPage(PAGE_SIZE, offset)

        if (isCurrentRequest) {
          setPokemonPage(data)
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

    loadPokemon()

    return () => {
      isCurrentRequest = false
    }
  }, [offset])

  function goToPage(nextPage) {
    setSearchParams({ page: String(nextPage) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Browse Pokémon</p>
          <h2>Pokédex</h2>
        </div>
        <p>
          Click a Pokémon to see its type, abilities, height, weight and base stats.
        </p>
      </div>

      {isLoading && <Loading text="Loading Pokémon..." />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && pokemonPage && (
        <>
          <Pagination
            page={page}
            canGoBack={page > 1}
            canGoNext={Boolean(pokemonPage.next)}
            onPrevious={() => goToPage(page - 1)}
            onNext={() => goToPage(page + 1)}
          />

          <div className="pokemon-grid">
            {pokemonPage.results.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>

          <Pagination
            page={page}
            canGoBack={page > 1}
            canGoNext={Boolean(pokemonPage.next)}
            onPrevious={() => goToPage(page - 1)}
            onNext={() => goToPage(page + 1)}
          />
        </>
      )}
    </section>
  )
}
