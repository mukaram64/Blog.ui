import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useBlogs } from "../context/blogcontext"

function EditBlog() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { blogs, updateBlog } = useBlogs()

  const blog = blogs.find(
    (blog) => blog.id === Number(id)
  )

  const [title, setTitle] = useState(
    blog?.title || ""
  )

  const [description, setDescription] = useState(
    blog?.description || ""
  )

  const [content, setContent] = useState(
    blog?.content || ""
  )

  const [category, setCategory] = useState(
    blog?.category || "React"
  )

  const [image, setImage] = useState(
    blog?.image || ""
  )

  const [errors, setErrors] = useState({})

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      setImage(reader.result)
    }

    reader.readAsDataURL(file)
  }

  if (!blog) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 dark:bg-gray-950">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Blog Not Found
          </h1>

          <button
            onClick={() => navigate("/blogs")}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Blogs
          </button>

        </div>

      </main>
    )
  }

  const validateForm = () => {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = "Blog title is required."
    } else if (title.trim().length < 5) {
      newErrors.title =
        "Title must be at least 5 characters."
    }

    if (!description.trim()) {
      newErrors.description =
        "Short description is required."
    } else if (description.trim().length < 10) {
      newErrors.description =
        "Description must be at least 10 characters."
    }

    if (!content.trim()) {
      newErrors.content =
        "Blog content is required."
    } else if (content.trim().length < 20) {
      newErrors.content =
        "Content must be at least 20 characters."
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    updateBlog({
      id: blog.id,
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      author: blog.author,
      category,
      image,
      date: blog.date,
      readTime: blog.readTime || "3 min read",
    })

    navigate("/blogs")
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16 dark:bg-gray-950">

      <div className="mx-auto max-w-3xl">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Update Content
        </p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
          Edit Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          <div>

            <label
              htmlFor="title"
              className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
            >
              Blog Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)

                if (errors.title) {
                  setErrors({
                    ...errors,
                    title: "",
                  })
                }
              }}
              className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 outline-none dark:bg-gray-900 dark:text-white ${
                errors.title
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500 dark:border-gray-700"
              }`}
            />

            <div className="mt-2 flex justify-between">

              {errors.title ? (
                <p className="text-sm text-red-500">
                  {errors.title}
                </p>
              ) : (
                <span />
              )}

              <span className="text-xs text-gray-400">
                {title.length} characters
              </span>

            </div>

          </div>

          <div>

            <label
              htmlFor="category"
              className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
            >
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="React">
                React
              </option>

              <option value="JavaScript">
                JavaScript
              </option>

              <option value="CSS">
                CSS
              </option>

              <option value="Web Development">
                Web Development
              </option>

              <option value="Technology">
                Technology
              </option>
            </select>

          </div>

          <div>

            <label
              htmlFor="description"
              className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
            >
              Short Description
            </label>

            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value)

                if (errors.description) {
                  setErrors({
                    ...errors,
                    description: "",
                  })
                }
              }}
              className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 outline-none dark:bg-gray-900 dark:text-white ${
                errors.description
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500 dark:border-gray-700"
              }`}
            />

            <div className="mt-2 flex justify-between">

              {errors.description ? (
                <p className="text-sm text-red-500">
                  {errors.description}
                </p>
              ) : (
                <span />
              )}

              <span className="text-xs text-gray-400">
                {description.length} characters
              </span>

            </div>

          </div>

          <div>

            <label
              htmlFor="content"
              className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
            >
              Full Blog Content
            </label>

            <textarea
              id="content"
              rows="12"
              value={content}
              onChange={(event) => {
                setContent(event.target.value)

                if (errors.content) {
                  setErrors({
                    ...errors,
                    content: "",
                  })
                }
              }}
              className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 outline-none dark:bg-gray-900 dark:text-white ${
                errors.content
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500 dark:border-gray-700"
              }`}
            />

            <div className="mt-2 flex justify-between">

              {errors.content ? (
                <p className="text-sm text-red-500">
                  {errors.content}
                </p>
              ) : (
                <span />
              )}

              <span className="text-xs text-gray-400">
                {content.length} characters
              </span>

            </div>

          </div>

          <div>

            <label
              htmlFor="image"
              className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
            >
              Blog Image
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            />

          </div>

          {image && (
            <img
              src={image}
              alt="Blog preview"
              className="h-64 w-full rounded-xl object-cover"
            />
          )}

          <div className="flex gap-4">

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Update Blog
            </button>

            <button
              type="button"
              onClick={() => navigate("/blogs")}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </main>
  )
}

export default EditBlog