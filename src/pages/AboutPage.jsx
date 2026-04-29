export default function AboutPage() {
  return (
    <section className="page-section about-page">
      <p className="eyebrow">About this project</p>
      <h2>About</h2>
      <p>
        This application was built for WEB2 Assignment 2. It uses React, Vite,
        React Router and PokéAPI to create a small Pokédex with pagination and a
        detailed view for each Pokémon.
      </p>
      <p>
        The Pokédex page loads Pokémon in pages of 20. The detail page fetches
        one specific Pokémon and displays its types, abilities, height, weight
        and base stats.
      </p>
    </section>
  )
}
