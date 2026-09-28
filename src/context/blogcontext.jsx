import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

const BlogContext = createContext()

const API_URL = "http://localhost:5000/api/blogs"

function getVisitorId() {
  let visitorId = localStorage.getItem(
    "blogVisitorId"
  )

  if (!visitorId) {
    visitorId =
      crypto.randomUUID()

    localStorage.setItem(
      "blogVisitorId",
      visitorId
    )
  }

  return visitorId
}

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [visitorId] = useState(
    () => getVisitorId()
  )

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error(
          "Failed to fetch blogs"
        )
      }

      const data = await response.json()

      setBlogs(data)
    } catch (error) {
      console.error(error)
      setError("Unable to load blogs.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const addBlog = async (newBlog) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    })

    if (!response.ok) {
      throw new Error(
        "Failed to create blog"
      )
    }

    const createdBlog =
      await response.json()

    setBlogs((currentBlogs) => [
      ...currentBlogs,
      createdBlog,
    ])

    return createdBlog
  }

  const deleteBlog = async (id) => {
    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "DELETE",
      }
    )

    if (!response.ok) {
      throw new Error(
        "Failed to delete blog"
      )
    }

    setBlogs((currentBlogs) =>
      currentBlogs.filter(
        (blog) => blog._id !== id
      )
    )
  }

  const updateBlog = async (updatedBlog) => {
    const response = await fetch(
      `${API_URL}/${updatedBlog._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      }
    )

    if (!response.ok) {
      throw new Error(
        "Failed to update blog"
      )
    }

    const updatedData =
      await response.json()

    setBlogs((currentBlogs) =>
      currentBlogs.map((blog) =>
        blog._id === updatedData._id
          ? updatedData
          : blog
      )
    )

    return updatedData
  }

  const toggleLike = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          "Failed to update like"
        )
      }

      const updatedBlog =
        await response.json()

      setBlogs((currentBlogs) =>
        currentBlogs.map((blog) =>
          blog._id === updatedBlog._id
            ? updatedBlog
            : blog
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const toggleBookmark = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}/bookmark`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          "Failed to update bookmark"
        )
      }

      const updatedBlog =
        await response.json()

      setBlogs((currentBlogs) =>
        currentBlogs.map((blog) =>
          blog._id === updatedBlog._id
            ? updatedBlog
            : blog
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const addComment = async (
    blogId,
    commentText
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/${blogId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: commentText,
            author: "Moazam",
            visitorId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          "Failed to add comment"
        )
      }

      const updatedBlog =
        await response.json()

      setBlogs((currentBlogs) =>
        currentBlogs.map((blog) =>
          blog._id === updatedBlog._id
            ? updatedBlog
            : blog
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const deleteComment = async (
    blogId,
    commentId
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/${blogId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          "Failed to delete comment"
        )
      }

      const updatedBlog =
        await response.json()

      setBlogs((currentBlogs) =>
        currentBlogs.map((blog) =>
          blog._id === updatedBlog._id
            ? updatedBlog
            : blog
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        error,
        fetchBlogs,

        addBlog,
        deleteBlog,
        updateBlog,

        visitorId,

        toggleLike,
        toggleBookmark,

        addComment,
        deleteComment,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

export function useBlogs() {
  return useContext(BlogContext)
}