import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { useBlogs } from "../context/blogcontext"
import Loading from "../components/loading"
import ErrorState from "../components/errorstate"

function BlogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    blogs,
    loading,
    error,
    visitorId,
    toggleLike,
    toggleBookmark,
    addComment,
    deleteComment,
    deleteBlog,
  } = useBlogs()

  const [commentText, setCommentText] = useState("")

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  const blog = blogs.find(
    (item) => item._id === id
  )

  if (!blog) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
        <div className="text-center">
          <div className="text-6xl">📝</div>

          <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
            Blog Not Found
          </h1>

          <Link
            to="/blogs"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Blogs
          </Link>
        </div>
      </main>
    )
  }

  const blogId = blog._id

  const liked =
    blog.likesBy?.includes(visitorId)

  const bookmarked =
    blog.bookmarksBy?.includes(visitorId)

  const likeCount =
    blog.likesBy?.length || 0

  const comments = blog.comments || []

  const handleCommentSubmit = async (
    event
  ) => {
    event.preventDefault()

    if (!commentText.trim()) return

    await addComment(
      blogId,
      commentText.trim()
    )

    setCommentText("")
  }

  const handleDeleteComment = async (
    commentId
  ) => {
    await deleteComment(
      blogId,
      commentId
    )
  }

  const handleDeleteBlog = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    )

    if (!confirmed) return

    try {
      await deleteBlog(blogId)
      navigate("/blogs")
    } catch (error) {
      console.error(error)
      alert("Failed to delete blog.")
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <article className="mx-auto max-w-4xl">
        <Link
          to="/blogs"
          className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Blogs
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-900">
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="h-72 w-full object-cover md:h-96"
            />
          ) : (
            <div className="flex h-72 items-center justify-center bg-gray-100 text-7xl dark:bg-gray-800 md:h-96">
              📝
            </div>
          )}

          <div className="p-6 md:p-10">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              {blog.category}
            </span>

            <h1 className="mt-5 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              {blog.title}
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
              {blog.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 border-b border-gray-200 pb-6 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <span>By {blog.author}</span>

              <span>•</span>

              <span>
                {blog.date
                  ? new Date(
                      blog.date
                    ).toLocaleDateString()
                  : ""}
              </span>

              <span>•</span>

              <span>
                {blog.readTime || "3 min read"}
              </span>
            </div>

            <div className="mt-8 whitespace-pre-line text-lg leading-8 text-gray-700 dark:text-gray-300">
              {blog.content}
            </div>

            <div className="mt-10 flex flex-wrap gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
              <button
                onClick={() =>
                  toggleLike(blogId)
                }
                className={`rounded-lg px-5 py-3 font-semibold ${
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
                className={`rounded-lg px-5 py-3 font-semibold ${
                  bookmarked
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                🔖 {bookmarked
                  ? "Saved"
                  : "Save"}
              </button>

              <Link
                to={`/edit-blog/${blogId}`}
                className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Edit
              </Link>

              <button
                onClick={handleDeleteBlog}
                className="rounded-lg border border-red-200 px-5 py-3 font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Comments 💬
          </h2>

          <form
            onSubmit={handleCommentSubmit}
            className="mt-6"
          >
            <textarea
              value={commentText}
              onChange={(event) =>
                setCommentText(
                  event.target.value
                )
              }
              rows="4"
              placeholder="Write a comment..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />

            <button
              type="submit"
              className="mt-3 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Add Comment
            </button>
          </form>

          <div className="mt-8 space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No comments yet. Be the first to comment.
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {comment.author}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(
                          comment.date
                        ).toLocaleString()}
                      </p>
                    </div>

                    {comment.visitorId ===
                      visitorId && (
                      <button
                        onClick={() =>
                          handleDeleteComment(
                            comment.id
                          )
                        }
                        className="text-sm font-semibold text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">
                    {comment.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </article>
    </main>
  )
}

export default BlogDetails