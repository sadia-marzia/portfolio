export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl text-navy font-bold mb-6">404 - Page Not Found</h1>
      <p className="text-lg text-ash-dark">
        The page you were looking for could not be found.
      </p>
      <a href="/" className="mt-4 inline-block px-6 py-3 bg-accent text-white rounded-md">
        Go to Home
      </a>
    </div>
  );
}
