export default function Pagination({ page, canGoBack, canGoNext, onPrevious, onNext }) {
  return (
    <div className="pagination">
      <button type="button" onClick={onPrevious} disabled={!canGoBack}>
        ← Previous
      </button>
      <span>Page {page}</span>
      <button type="button" onClick={onNext} disabled={!canGoNext}>
        Next →
      </button>
    </div>
  )
}
