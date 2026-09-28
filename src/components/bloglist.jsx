import { useEffect, useState } from "react"
import BlogCard from "./blogcard"
import Loading from "./loading"
import ErrorState from "./errorstate"
import { useBlogs } from "../context/blogcontext"

function BlogList() {
  const { blogs } = useBlogs()

  const [search, setSearch] = useState("")
  const [author, setAuthor] = useState("All")
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)

  const blogsPerPage = 6

  const authors = [
    "All",
    ...new Set(
      blogs.map((blog) => blog.author)
    ),
  ]

  const categories = [
    "All",
    ...new Set(
      blogs.map(
        (blog) => blog.category || "Other"
      )
    ),
  ]

  const filteredBlogs = blogs
    .filter((blog) => {

      const matchesSearch =
        blog.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        blog.description
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesAuthor =
        author === "All" ||
        blog.author === author

      const matchesCategory =
        category === "All" ||
        (blog.category || "Other") === category

      return (
        matchesSearch &&
        matchesAuthor &&
        matchesCategory
      )
    })
    .sort((a, b) => {

      if (sort === "newest") {
        return (
          new Date(b.date) -
          new Date(a.date)
        )
      }

      if (sort === "oldest") {
        return (
          new Date(a.date) -
          new Date(b.date)
        )
      }

      if (sort === "titleAZ") {
        return a.title.localeCompare(
          b.title
        )
      }

      if (sort === "titleZA") {
        return b.title.localeCompare(
          a.title
        )
      }

      return 0
    })

  const totalPages = Math.ceil(
    filteredBlogs.length / blogsPerPage
  )

  const startIndex =
    (currentPage - 1) * blogsPerPage

  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [
    search,
    author,
    category,
    sort,
  ])

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages)
    }
  }, [
    currentPage,
    totalPages,
  ])

  const hasBlogs = blogs.length > 0
  const hasResults = filteredBlogs.length > 0

  if (blogs === null) {
    return <Loading />
  }

  if (!Array.isArray(blogs)) {
    return (
      <ErrorState
        title="Unable to Load Blogs"
        message="The blog data could not be loaded correctly."
      />
    )
  }

  return (
    <section className="bg-gray-50 px-6 py-16 transition-colors md:py-20 dark:bg-gray-950">

      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Our Articles
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Latest Blogs
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Explore our latest articles and learn something new every day.
          </p>

        </div>

        {!hasBlogs ? (

          <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm dark:bg-gray-900">

            <div className="text-6xl">
              📝
            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              No Blogs Yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-gray-500 dark:text-gray-400">
              There are no blog posts available right now.
              Start by creating your first blog.
            </p>

          </div>

        ) : (

          <>

            <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />

              <select
                value={author}
                onChange={(event) =>
                  setAuthor(event.target.value)
                }
                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                {authors.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    Author: {item}
                  </option>
                ))}
              </select>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    Category: {item}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="newest">
                  Newest First
                </option>

                <option value="oldest">
                  Oldest First
                </option>

                <option value="titleAZ">
                  Title A-Z
                </option>

                <option value="titleZA">
                  Title Z-A
                </option>
              </select>

            </div>

            {!hasResults ? (

              <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm dark:bg-gray-900">

                <div className="text-6xl">
                  🔍
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                  No Results Found
                </h3>

                <p className="mt-3 text-gray-500 dark:text-gray-400">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={() => {
                    setSearch("")
                    setAuthor("All")
                    setCategory("All")
                    setSort("newest")
                  }}
                  className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Clear Filters
                </button>

              </div>

            ) : (

              <>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                  {currentBlogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                    />
                  ))}

                </div>

                {totalPages > 1 && (

                  <div className="mt-12 flex flex-wrap items-center justify-center gap-2">

                    <button
                      onClick={() =>
                        setCurrentPage(
                          currentPage - 1
                        )
                      }
                      disabled={
                        currentPage === 1
                      }
                      className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                    >
                      ← Previous
                    </button>

                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, index) =>
                        index + 1
                    ).map((page) => (

                      <button
                        key={page}
                        onClick={() =>
                          setCurrentPage(page)
                        }
                        className={`rounded-lg px-4 py-2 font-semibold ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 text-gray-700 hover:bg-white dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                        }`}
                      >
                        {page}
                      </button>

                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage(
                          currentPage + 1
                        )
                      }
                      disabled={
                        currentPage === totalPages
                      }
                      className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                    >
                      Next →
                    </button>

                  </div>

                )}

              </>

            )}

          </>

        )}

      </div>

    </section>
  )
}

export default BlogList