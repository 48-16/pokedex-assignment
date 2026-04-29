export default function ErrorMessage({ message }) {
  return (
    <div className="error-box" role="alert">
      <strong>Something went wrong.</strong>
      <p>{message}</p>
    </div>
  )
}
