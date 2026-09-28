import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useBlogs } from "../context/blogcontext"
import Loading from "../components/loading"
import ErrorState from "../components/errorstate"

function EditBlog() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    blogs,
    loading,
    error,
    updateBlog,
  } = useBlogs()

  const blog = blogs.find(
    (item) => item._id === id
  )

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

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        description: blog.description || "",
        content: blog.content || "",
        author: blog.author || "",
        category: blog.category || "",
        image: blog.image || "",
        readTime: blog.readTime || "",
      })

      setImagePreview(blog.image || "")
    }
  }, [blog])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  if (!blog) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
        <div className="text-center">
          <div className="text-6xl">📝</div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
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

      await updateBlog({
        ...formData,
        _id: blog._id,
        title: formData.title.trim(),
        description:
          formData.description.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        category: formData.category.trim(),
        readTime:
          formData.readTime.trim() ||
          "3 min read",
      })

      navigate(`/blogs/${blog._id}`)
    } catch (error) {
      console.error(error)

      setErrors({
        submit:
          "Failed to update blog. Please try again.",
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
            Update Content
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
            Edit Blog
          </h1>
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

          <div className="space-y-6">
            <div>
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="font-semibold text-gray-800 dark:text-gray-200">
                  Author
                </label>

                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
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
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />

                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Read Time
              </label>

              <input
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

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Blog preview"
                className="max-h-72 w-full rounded-xl object-cover"
              />
            )}

            <div>
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Content
              </label>

              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="12"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              {errors.content && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.content}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Updating..."
              : "Update Blog"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default EditBlog