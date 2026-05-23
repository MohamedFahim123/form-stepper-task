import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="app-container flex min-h-screen items-center justify-center">
      <section className="form-card max-w-lg text-center">
        <h1 className="text-heading-2">Page not found</h1>
        <p className="mt-3 text-body-sm text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Back to form
        </Link>
      </section>
    </main>
  );
}
