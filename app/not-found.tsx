export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-400 mb-6">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}
