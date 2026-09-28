import { Link } from "react-router-dom"

import { useBlogs } from "../context/blogcontext"
import BlogCard from "../components/blogcard"
import Loading from "../components/loading"
import ErrorState from "../components/errorstate"

function Home() {
  const {
    blogs,
    loading,
    error,
  } = useBlogs()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  const latestBlogs = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 3)

  const categories = [
    ...new Set(
      blogs
        .map((blog) => blog.category)
        .filter(Boolean)
    ),
  ]

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950 px-6 py-24 text-white md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-gray-950 to-gray-950 opacity-90" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              Welcome to BlogApp ✨
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
              Ideas worth
              <span className="text-blue-400">
                {" "}reading.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
              Discover useful articles about React,
              JavaScript, CSS, web development and
              modern technology.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/blogs"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Blogs →
              </Link>

              <Link
                to="/add-blog"
                className="rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Write a Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-gray-900">
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {blogs.length}
            </p>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Total Blogs
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-gray-900">
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {categories.length}
            </p>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Categories
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-gray-900">
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              ❤️
            </p>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Community
            </p>
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Fresh Content
              </p>

              <h2 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
                Latest Blogs
              </h2>

              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Explore the latest articles from our collection.
              </p>
            </div>

            <Link
              to="/blogs"
              className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              View All →
            </Link>
          </div>

          {latestBlogs.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm dark:bg-gray-900">
              <div className="text-6xl">📝</div>

              <h3 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
                No Blogs Yet
              </h3>

              <p className="mt-3 text-gray-500 dark:text-gray-400">
                Create your first blog to get started.
              </p>

              <Link
                to="/add-blog"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Add Your First Blog
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="border-y border-gray-200 bg-white px-6 py-16 dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Explore Topics
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              Browse by Category
            </h2>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  to="/blogs"
                  className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-blue-600 px-8 py-16 text-center text-white">
          <h2 className="text-4xl font-bold">
            Have an idea to share?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100">
            Create your own blog and share your knowledge
            with the BlogApp community.
          </p>

          <Link
            to="/add-blog"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Create a Blog →
          </Link>
        </div>
      </section>

    </main>
  )
}

export default Home