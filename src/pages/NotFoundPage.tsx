import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-polka px-4">
      <div className="folk-card max-w-md rounded-3xl px-8 py-10 text-center">
        <h1 className="font-display text-7xl font-bold italic text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border-2 border-ink bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
