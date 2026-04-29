import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="page-section not-found-page">
      <p className="eyebrow">404</p>
      <h2>Page not found</h2>
      <p>The page you tried to open does not exist.</p>
      <Link className="back-link" to="/pokedex">
        Go to Pokédex
      </Link>
    </section>
  )
}
