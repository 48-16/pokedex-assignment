function formatStatName(name) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function StatBar({ stat }) {
  const value = stat.base_stat
  const percentage = Math.min((value / 160) * 100, 100)

  return (
    <div className="stat-row">
      <span>{formatStatName(stat.stat.name)}</span>
      <div className="stat-track" aria-hidden="true">
        <div className="stat-fill" style={{ width: `${percentage}%` }} />
      </div>
      <strong>{value}</strong>
    </div>
  )
}
