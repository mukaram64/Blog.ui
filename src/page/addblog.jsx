import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBlogs } from "../context/blogcontext"

function AddBlog() {
  const navigate = useNavigate()
  const { addBlog } = useBlogs()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("React")
  const [image, setImage] = useState("")

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

    const newBlog = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      author: "Moazam",
      category,
      image,
      date: new Date().toISOString(),
      readTime: "3 min read",
    }

    addBlog(newBlog)

    navigate("/blogs")
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16 transition-colors dark:bg-gray-950">

      <div className="mx-auto max-w-3xl">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Create Content
        </p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
          Add New Blog
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Share your knowledge with the community.
        </p>

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
              placeholder="Enter blog title"
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
              placeholder="Write a short description..."
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
              placeholder="Write your complete blog here..."
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
            <div>

              <p className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                Image Preview
              </p>

              <img
                src={image}
                alt="Blog preview"
                className="h-64 w-full rounded-xl object-cover"
              />

            </div>
          )}

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Publish Blog
          </button>

        </form>

      </div>

    </main>
  )
}

export default AddBlog