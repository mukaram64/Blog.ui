import { useState } from "react"
import { Link, useParams } from "react-router-dom"

import { useBlogs } from "../context/blogcontext"

import Loading from "../components/loading"
import ErrorState from "../components/errorstate"

function BlogDetails() {
  const { id } = useParams()

  const {
    blogs,
    likes,
    bookmarks,
    toggleLike,
    toggleBookmark,
    comments,
    addComment,
    deleteComment,
  } = useBlogs()

  const [commentText, setCommentText] = useState("")

  if (!Array.isArray(blogs)) {
    return (
      <ErrorState
        title="Unable to Load Blog"
        message="The blog data could not be loaded correctly."
      />
    )
  }

  const blog = blogs.find(
    (blog) => blog.id === Number(id)
  )

  if (!blog) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">

        <div className="text-center">

          <div className="text-7xl">
            📝
          </div>

          <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
            Blog Not Found
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            The blog you are looking for does not exist.
          </p>

          <Link
            to="/blogs"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            ← Back to Blogs
          </Link>

        </div>

      </main>
    )
  }

  const blogComments = comments[blog.id] || []

  const handleCommentSubmit = (event) => {
    event.preventDefault()

    if (!commentText.trim()) {
      return
    }

    addComment(
      blog.id,
      commentText.trim()
    )

    setCommentText("")
  }

  return (
    <main className="bg-gray-50 px-6 py-12 transition-colors md:py-16 dark:bg-gray-950">

      <article className="mx-auto max-w-4xl">

        <Link
          to="/blogs"
          className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400"
        >
          ← Back to Blogs
        </Link>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-900">

          <div className="h-64 overflow-hidden bg-blue-50 dark:bg-gray-800 md:h-[28rem]">

            {blog.image ? (
              <img
                src={blog.image}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-8xl">
                  📝
                </span>
              </div>
            )}

          </div>

          <div className="px-6 py-10 md:px-12 md:py-14">

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">

              <span className="font-medium text-gray-700 dark:text-gray-300">
                By {blog.author}
              </span>

              <span>•</span>

              <span>
                {blog.date
                  ? new Date(
                      blog.date
                    ).toLocaleDateString()
                  : "No date"}
              </span>

              <span>•</span>

              <span>
                {blog.readTime || "3 min read"}
              </span>

              <span>•</span>

              <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                {blog.category || "Other"}
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
              {blog.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 md:text-xl">
              {blog.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <button
                onClick={() =>
                  toggleLike(blog.id)
                }
                className={`rounded-lg border px-5 py-3 font-semibold transition ${
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
                className={`rounded-lg border px-5 py-3 font-semibold transition ${
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

            <div className="my-10 border-t border-gray-200 dark:border-gray-800" />

            <div className="whitespace-pre-line text-lg leading-9 text-gray-700 dark:text-gray-300">
              {blog.content ||
                "No full content available."}
            </div>

            <div className="mt-12 border-t border-gray-200 pt-10 dark:border-gray-800">

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Comments ({blogComments.length})
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
                  placeholder="Write a comment..."
                  rows="4"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                />

                <button
                  type="submit"
                  className="mt-3 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Add Comment
                </button>

              </form>

              <div className="mt-8 space-y-4">

                {blogComments.length === 0 ? (

                  <div className="rounded-xl bg-gray-50 px-6 py-8 text-center dark:bg-gray-950">

                    <div className="text-4xl">
                      💬
                    </div>

                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                      No comments yet. Be the first to comment!
                    </p>

                  </div>

                ) : (

                  blogComments.map((comment) => (

                    <div
                      key={comment.id}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950"
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <p className="font-semibold text-gray-900 dark:text-white">
                            {comment.author}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {new Date(
                              comment.date
                            ).toLocaleDateString()}
                          </p>

                        </div>

                        <button
                          onClick={() =>
                            deleteComment(
                              blog.id,
                              comment.id
                            )
                          }
                          className="text-sm font-semibold text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>

                      </div>

                      <p className="mt-4 leading-7 text-gray-700 dark:text-gray-300">
                        {comment.text}
                      </p>

                    </div>

                  ))

                )}

              </div>

            </div>

            <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">

              <Link
                to={`/edit-blog/${blog.id}`}
                className="inline-block rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Edit This Blog
              </Link>

            </div>

          </div>

        </div>

      </article>

    </main>
  )
}

export default BlogDetails