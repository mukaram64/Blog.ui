import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useBlogs } from "../context/blogcontext"

function AddBlog() {
  const navigate = useNavigate()
  const { addBlog } = useBlogs()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    category: "",
    image: "",
    readTime: "",
  })

  const [imagePreview, setImagePreview] = useState("")
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: "",
      submit: "",
    }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        image: "Image must be smaller than 2MB.",
      }))
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      const image = reader.result

      setImagePreview(image)

      setFormData((current) => ({
        ...current,
        image,
      }))

      setErrors((current) => ({
        ...current,
        image: "",
      }))
    }

    reader.readAsDataURL(file)
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required."
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Description is required."
    }

    if (!formData.content.trim()) {
      newErrors.content =
        "Content is required."
    }

    if (!formData.author.trim()) {
      newErrors.author =
        "Author is required."
    }

    if (!formData.category.trim()) {
      newErrors.category =
        "Category is required."
    }

    if (
      formData.readTime &&
      !formData.readTime
        .toLowerCase()
        .includes("min")
    ) {
      newErrors.readTime =
        'Example: "3 min read"'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (submitting) return

    if (!validate()) return

    try {
      setSubmitting(true)

      await addBlog({
        ...formData,
        title: formData.title.trim(),
        description:
          formData.description.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        category: formData.category.trim(),
        readTime:
          formData.readTime.trim() ||
          "3 min read",
        date: new Date().toISOString(),
      })

      navigate("/blogs")
    } catch (error) {
      console.error(error)

      setErrors({
        submit:
          "Failed to create blog. Please try again.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Create Content
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
            Add New Blog
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Create a new blog and save it directly to MongoDB.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900"
        >
          {errors.submit && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
              {errors.submit}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Short blog description"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Author
              </label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              {errors.author && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.author}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="React, CSS, JavaScript..."
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              {errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Read Time
              </label>

              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="3 min read"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              {errors.readTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.readTime}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Blog Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              />

              {errors.image && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.image}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Content
              </label>

              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="12"
                placeholder="Write your blog content..."
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              {errors.content && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.content}
                </p>
              )}
            </div>
          </div>

          {imagePreview && (
            <div className="mt-6">
              <p className="mb-3 font-semibold text-gray-800 dark:text-gray-200">
                Image Preview
              </p>

              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-72 w-full rounded-xl object-cover"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Publishing..."
              : "Publish Blog"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default AddBlog