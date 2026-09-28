import { Link } from "react-router-dom"

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 dark:bg-gray-950">

      <div className="text-center">

        <p className="text-7xl font-bold text-blue-600">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Go Home
        </Link>

      </div>

    </main>
  )
}

export default NotFound