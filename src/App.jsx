import { NavLink, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">WEB2 Assignment 2</p>
          <h1>React Pokédex</h1>
        </div>

        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/pokedex">Pokédex</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
