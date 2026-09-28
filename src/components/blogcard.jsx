import { Link } from "react-router-dom"
import { useBlogs } from "../context/blogcontext"

function BlogCard({ blog }) {
  const {
    visitorId,
    toggleLike,
    toggleBookmark,
    deleteBlog,
  } = useBlogs()

  const blogId = blog._id

  const liked =
    blog.likesBy?.includes(visitorId)

  const bookmarked =
    blog.bookmarksBy?.includes(visitorId)

  const likeCount =
    blog.likesBy?.length || 0

  const commentCount =
    blog.comments?.length || 0

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    )

    if (!confirmed) return

    try {
      await deleteBlog(blogId)
    } catch (error) {
      console.error(error)
      alert("Failed to delete blog.")
    }
  }

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900">
      {blog.image ? (
        <img
          src={blog.image}
          alt={blog.title}
          className="h-52 w-full object-cover"
        />
      ) : (
        <div className="flex h-52 items-center justify-center bg-gray-100 text-5xl dark:bg-gray-800">
          📝
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            {blog.category}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {blog.readTime || "3 min read"}
          </span>
        </div>

        <h2 className="mt-4 line-clamp-2 text-2xl font-bold text-gray-900 dark:text-white">
          {blog.title}
        </h2>

        <p className="mt-3 line-clamp-3 leading-7 text-gray-600 dark:text-gray-400">
          {blog.description}
        </p>

        <div className="mt-5 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>By {blog.author}</span>

          <span>
            {blog.date
              ? new Date(
                  blog.date
                ).toLocaleDateString()
              : ""}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => toggleLike(blogId)}
            className={`rounded-lg px-3 py-2 text-sm font-semibold ${
              liked
                ? "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            ❤️ {likeCount}
          </button>

          <button
            onClick={() =>
              toggleBookmark(blogId)
            }
            className={`rounded-lg px-3 py-2 text-sm font-semibold ${
              bookmarked
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            🔖 {bookmarked ? "Saved" : "Save"}
          </button>

          <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            💬 {commentCount}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to={`/blogs/${blogId}`}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Read More
          </Link>

          <Link
            to={`/edit-blog/${blogId}`}
            className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default BlogCard