import { useMemo, useState } from "react"

import { useBlogs } from "../context/blogcontext"
import BlogCard from "./blogcard"
import Loading from "./loading"
import ErrorState from "./errorstate"

function BlogList() {
  const {
    blogs,
    loading,
    error,
  } = useBlogs()

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [author, setAuthor] = useState("All")
  const [sort, setSort] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)

  const blogsPerPage = 6

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        blogs
          .map((blog) => blog.category)
          .filter(Boolean)
      ),
    ]
  }, [blogs])

  const authors = useMemo(() => {
    return [
      "All",
      ...new Set(
        blogs
          .map((blog) => blog.author)
          .filter(Boolean)
      ),
    ]
  }, [blogs])

  const filteredBlogs = useMemo(() => {
    let result = [...blogs]

    if (search.trim()) {
      const searchText = search.toLowerCase()

      result = result.filter((blog) =>
        `${blog.title} ${blog.description} ${blog.content} ${blog.author} ${blog.category}`
          .toLowerCase()
          .includes(searchText)
      )
    }

    if (category !== "All") {
      result = result.filter(
        (blog) => blog.category === category
      )
    }

    if (author !== "All") {
      result = result.filter(
        (blog) => blog.author === author
      )
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )
    }

    if (sort === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.date) -
          new Date(b.date)
      )
    }

    if (sort === "title-az") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    }

    if (sort === "title-za") {
      result.sort((a, b) =>
        b.title.localeCompare(a.title)
      )
    }

    return result
  }, [
    blogs,
    search,
    category,
    author,
    sort,
  ])

  const totalPages = Math.ceil(
    filteredBlogs.length / blogsPerPage
  )

  const startIndex =
    (currentPage - 1) * blogsPerPage

  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage
  )

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setCurrentPage(1)
  }

  const handleCategory = (event) => {
    setCategory(event.target.value)
    setCurrentPage(1)
  }

  const handleAuthor = (event) => {
    setAuthor(event.target.value)
    setCurrentPage(1)
  }

  const handleSort = (event) => {
    setSort(event.target.value)
    setCurrentPage(1)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  return (
    <section className="bg-gray-50 px-6 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Explore
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
            All Blogs
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Discover articles about React, JavaScript,
            CSS and modern web development.
          </p>
        </div>

        <div className="mb-10 rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-900">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search blogs..."
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />

            <select
              value={category}
              onChange={handleCategory}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
              value={author}
              onChange={handleAuthor}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
              value={sort}
              onChange={handleSort}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>

              <option value="title-az">
                Title A-Z
              </option>

              <option value="title-za">
                Title Z-A
              </option>
            </select>
          </div>
        </div>

        {currentBlogs.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm dark:bg-gray-900">
            <div className="text-6xl">🔍</div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              No Blogs Found
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(page - 1, 1)
                )
              }
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg px-4 py-2 font-semibold ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(
                    page + 1,
                    totalPages
                  )
                )
              }
              disabled={
                currentPage === totalPages
              }
              className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300"
            >
              Next
            </button>
          </div>
        )}

        {filteredBlogs.length > 0 && (
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Showing {startIndex + 1}-
            {Math.min(
              startIndex + blogsPerPage,
              filteredBlogs.length
            )}{" "}
            of {filteredBlogs.length} blogs
          </p>
        )}
      </div>
    </section>
  )
}

export default BlogList