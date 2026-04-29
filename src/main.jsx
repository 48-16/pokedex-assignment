import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'
import App from './App.jsx'
import PokedexPage from './pages/PokedexPage.jsx'
import PokemonDetailsPage from './pages/PokemonDetailsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import './styles.css'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/pokedex" replace /> },
      { path: 'pokedex', element: <PokedexPage /> },
      { path: 'pokemon/:pokemonName', element: <PokemonDetailsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
