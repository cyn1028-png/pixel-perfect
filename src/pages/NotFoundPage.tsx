import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="paper-card max-w-md px-8 py-10 text-center">
        <h1 className="font-display text-7xl text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center btn-scarf px-5 py-2 text-sm font-bold"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
