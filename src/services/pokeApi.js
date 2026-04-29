const API_BASE_URL = 'https://pokeapi.co/api/v2'

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export function getPokemonPage(limit, offset) {
  return fetchJson(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
}

export function getPokemonDetails(nameOrId) {
  return fetchJson(`${API_BASE_URL}/pokemon/${nameOrId}`)
}
