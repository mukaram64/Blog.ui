import { createContext, useContext, useState } from "react"
import blogsData from "../data/blogs"

const BlogContext = createContext()

function getInitialBlogs() {
  const savedBlogs = localStorage.getItem("blogs")

  if (savedBlogs) {
    return JSON.parse(savedBlogs)
  }

  return blogsData
}

function getInitialLikes() {
  const savedLikes = localStorage.getItem("blogLikes")

  if (savedLikes) {
    return JSON.parse(savedLikes)
  }

  return {}
}

function getInitialBookmarks() {
  const savedBookmarks = localStorage.getItem("blogBookmarks")

  if (savedBookmarks) {
    return JSON.parse(savedBookmarks)
  }

  return {}
}

function getInitialComments() {
  const savedComments = localStorage.getItem("blogComments")

  if (savedComments) {
    return JSON.parse(savedComments)
  }

  return {}
}

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState(getInitialBlogs)

  const [likes, setLikes] = useState(
    getInitialLikes
  )

  const [bookmarks, setBookmarks] = useState(
    getInitialBookmarks
  )

  const [comments, setComments] = useState(
    getInitialComments
  )

  const saveBlogs = (updatedBlogs) => {
    localStorage.setItem(
      "blogs",
      JSON.stringify(updatedBlogs)
    )

    setBlogs(updatedBlogs)
  }

  const addBlog = (newBlog) => {
    saveBlogs([
      ...blogs,
      newBlog,
    ])
  }

  const deleteBlog = (id) => {
    const updatedBlogs = blogs.filter(
      (blog) => blog.id !== id
    )

    saveBlogs(updatedBlogs)
  }

  const updateBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id
        ? updatedBlog
        : blog
    )

    saveBlogs(updatedBlogs)
  }

  const toggleLike = (id) => {
    const updatedLikes = {
      ...likes,
      [id]: !likes[id],
    }

    setLikes(updatedLikes)

    localStorage.setItem(
      "blogLikes",
      JSON.stringify(updatedLikes)
    )
  }

  const toggleBookmark = (id) => {
    const updatedBookmarks = {
      ...bookmarks,
      [id]: !bookmarks[id],
    }

    setBookmarks(updatedBookmarks)

    localStorage.setItem(
      "blogBookmarks",
      JSON.stringify(updatedBookmarks)
    )
  }

  const addComment = (blogId, commentText) => {
    const newComment = {
      id: Date.now(),
      text: commentText,
      author: "Moazam",
      date: new Date().toISOString(),
    }

    const updatedComments = {
      ...comments,
      [blogId]: [
        ...(comments[blogId] || []),
        newComment,
      ],
    }

    setComments(updatedComments)

    localStorage.setItem(
      "blogComments",
      JSON.stringify(updatedComments)
    )
  }

  const deleteComment = (blogId, commentId) => {
    const updatedComments = {
      ...comments,
      [blogId]: (comments[blogId] || []).filter(
        (comment) => comment.id !== commentId
      ),
    }

    setComments(updatedComments)

    localStorage.setItem(
      "blogComments",
      JSON.stringify(updatedComments)
    )
  }

  return (
    <BlogContext.Provider
      value={{
        blogs,
        addBlog,
        deleteBlog,
        updateBlog,
        likes,
        bookmarks,
        toggleLike,
        toggleBookmark,
        comments,
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