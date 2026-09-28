import { Link } from "react-router-dom"

import { useBlogs } from "../context/blogcontext"
import BlogCard from "../components/blogcard"
import Loading from "../components/loading"
import ErrorState from "../components/errorstate"

function Bookmarks() {
  const {
    blogs,
    visitorId,
    loading,
    error,
  } = useBlogs()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  const savedBlogs = blogs.filter(
    (blog) =>
      blog.bookmarksBy?.includes(visitorId)
  )

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Your Collection
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
            Saved Blogs 🔖
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Blogs you saved for later.
          </p>
        </div>

        {savedBlogs.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm dark:bg-gray-900">
            <div className="text-6xl">🔖</div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              No Saved Blogs
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Save some blogs and they will appear here.
            </p>

            <Link
              to="/blogs"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Explore Blogs
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {savedBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Bookmarks