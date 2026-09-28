import { Link } from "react-router-dom"

function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this page. Please try again.",
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-6 py-16 dark:bg-gray-950">

      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-gray-900">

        <div className="text-6xl">
          ⚠️
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>

        <p className="mt-3 leading-7 text-gray-500 dark:text-gray-400">
          {message}
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>

          <Link
            to="/"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Go Home
          </Link>

        </div>

      </div>

    </main>
  )
}

export default ErrorState