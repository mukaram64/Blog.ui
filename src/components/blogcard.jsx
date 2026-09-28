import { Link } from "react-router-dom"
import { useBlogs } from "../context/blogcontext"

function BlogCard({ blog }) {
  const {
    deleteBlog,
    likes,
    bookmarks,
    toggleLike,
    toggleBookmark,
  } = useBlogs()

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    )

    if (confirmDelete) {
      deleteBlog(blog.id)
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">

      <Link
        to={`/blogs/${blog.id}`}
        className="relative block h-52 overflow-hidden bg-blue-50 dark:bg-gray-800"
      >

        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-6xl transition duration-500 group-hover:scale-110">
              📝
            </span>
          </div>
        )}

      </Link>

      <div className="flex flex-1 flex-col p-6">

        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-3 text-xs text-gray-400">

            <span>
              {blog.readTime || "3 min read"}
            </span>

            <span>•</span>

            <span>
              {blog.date
                ? new Date(
                    blog.date
                  ).toLocaleDateString()
                : "No date"}
            </span>

          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            {blog.category || "Other"}
          </span>

        </div>

        <h2 className="mt-3 text-xl font-bold leading-7 text-gray-900 dark:text-white">
          {blog.title}
        </h2>

        <p className="mt-3 line-clamp-3 leading-7 text-gray-600 dark:text-gray-400">
          {blog.description}
        </p>

        <div className="mt-auto pt-6">

          <div className="flex items-center justify-between border-t border-gray-100 pt-5 dark:border-gray-800">

            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              By {blog.author}
            </p>

            <Link
              to={`/blogs/${blog.id}`}
              className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              Read More →
            </Link>

          </div>

          <div className="mt-4 flex gap-3">

            <button
              onClick={() =>
                toggleLike(blog.id)
              }
              className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                likes[blog.id]
                  ? "border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {likes[blog.id]
                ? "❤️ Liked"
                : "🤍 Like"}
            </button>

            <button
              onClick={() =>
                toggleBookmark(blog.id)
              }
              className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                bookmarks[blog.id]
                  ? "border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {bookmarks[blog.id]
                ? "🔖 Saved"
                : "🔖 Save"}
            </button>

          </div>

          <div className="mt-3 flex gap-3">

            <Link
              to={`/edit-blog/${blog.id}`}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-semibold text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </article>
  )
}

export default BlogCard