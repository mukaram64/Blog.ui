import { Link } from "react-router-dom"
import BlogCard from "../components/blogcard"
import { useBlogs } from "../context/blogcontext"

function Bookmarks() {
  const { blogs, bookmarks } = useBlogs()

  const savedBlogs = blogs.filter(
    (blog) => bookmarks[blog.id]
  )

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 dark:bg-gray-950">

      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Your Collection
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
            Saved Blogs
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Find all the blogs you have saved for later.
          </p>

        </div>

        {savedBlogs.length === 0 ? (

          <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm dark:bg-gray-900">

            <div className="text-6xl">
              🔖
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              No Saved Blogs
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-500 dark:text-gray-400">
              You haven't saved any blogs yet.
            </p>

            <Link
              to="/blogs"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Explore Blogs
            </Link>

          </div>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {savedBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
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