const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json({ limit: "5mb" }))

// ==================== COMMENT SCHEMA ====================

const commentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    visitorId: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
)

// ==================== BLOG SCHEMA ====================

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    image: {
      type: String,
      default: "",
    },

    readTime: {
      type: String,
      default: "3 min read",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    likesBy: {
      type: [String],
      default: [],
    },

    bookmarksBy: {
      type: [String],
      default: [],
    },

    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const Blog = mongoose.model("Blog", blogSchema)

// ==================== HELPERS ====================

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id)
}

function cleanText(value) {
  return typeof value === "string"
    ? value.trim()
    : ""
}

// ==================== ROOT ====================

app.get("/", (req, res) => {
  res.json({
    message: "BlogApp API is running",
  })
})

// ==================== GET ALL BLOGS ====================

app.get("/api/blogs", async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .sort({ date: -1 })

    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

// ==================== GET SINGLE BLOG ====================

app.get("/api/blogs/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
      })
    }

    const blog = await Blog.findById(
      req.params.id
    )

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      })
    }

    res.json(blog)
  } catch (error) {
    next(error)
  }
})

// ==================== CREATE BLOG ====================

app.post("/api/blogs", async (req, res, next) => {
  try {
    const {
      title,
      description,
      content,
      author,
      category,
      image,
      readTime,
      date,
    } = req.body

    if (
      !cleanText(title) ||
      !cleanText(description) ||
      !cleanText(content) ||
      !cleanText(author) ||
      !cleanText(category)
    ) {
      return res.status(400).json({
        message:
          "Title, description, content, author and category are required.",
      })
    }

    const blog = await Blog.create({
      title: cleanText(title),
      description: cleanText(description),
      content: cleanText(content),
      author: cleanText(author),
      category: cleanText(category),
      image: image || "",
      readTime:
        cleanText(readTime) || "3 min read",
      date: date || new Date(),
    })

    res.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

// ==================== UPDATE BLOG ====================

app.put("/api/blogs/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
      })
    }

    const {
      title,
      description,
      content,
      author,
      category,
      image,
      readTime,
    } = req.body

    if (
      !cleanText(title) ||
      !cleanText(description) ||
      !cleanText(content) ||
      !cleanText(author) ||
      !cleanText(category)
    ) {
      return res.status(400).json({
        message:
          "Title, description, content, author and category are required.",
      })
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: cleanText(title),
        description: cleanText(description),
        content: cleanText(content),
        author: cleanText(author),
        category: cleanText(category),
        image: image || "",
        readTime:
          cleanText(readTime) || "3 min read",
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      })
    }

    res.json(blog)
  } catch (error) {
    next(error)
  }
})

// ==================== DELETE BLOG ====================

app.delete(
  "/api/blogs/:id",
  async (req, res, next) => {
    try {
      if (!isValidId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid blog ID",
        })
      }

      const blog = await Blog.findByIdAndDelete(
        req.params.id
      )

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        })
      }

      res.json({
        message: "Blog deleted successfully",
      })
    } catch (error) {
      next(error)
    }
  }
)

// ==================== LIKE ====================

app.patch(
  "/api/blogs/:id/like",
  async (req, res, next) => {
    try {
      if (!isValidId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid blog ID",
        })
      }

      const visitorId = cleanText(
        req.body.visitorId
      )

      if (!visitorId) {
        return res.status(400).json({
          message: "visitorId is required",
        })
      }

      const blog = await Blog.findById(
        req.params.id
      )

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        })
      }

      const alreadyLiked =
        blog.likesBy.includes(visitorId)

      if (alreadyLiked) {
        blog.likesBy =
          blog.likesBy.filter(
            (id) => id !== visitorId
          )
      } else {
        blog.likesBy.push(visitorId)
      }

      await blog.save()

      res.json(blog)
    } catch (error) {
      next(error)
    }
  }
)

// ==================== BOOKMARK ====================

app.patch(
  "/api/blogs/:id/bookmark",
  async (req, res, next) => {
    try {
      if (!isValidId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid blog ID",
        })
      }

      const visitorId = cleanText(
        req.body.visitorId
      )

      if (!visitorId) {
        return res.status(400).json({
          message: "visitorId is required",
        })
      }

      const blog = await Blog.findById(
        req.params.id
      )

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        })
      }

      const alreadyBookmarked =
        blog.bookmarksBy.includes(visitorId)

      if (alreadyBookmarked) {
        blog.bookmarksBy =
          blog.bookmarksBy.filter(
            (id) => id !== visitorId
          )
      } else {
        blog.bookmarksBy.push(visitorId)
      }

      await blog.save()

      res.json(blog)
    } catch (error) {
      next(error)
    }
  }
)

// ==================== ADD COMMENT ====================

app.post(
  "/api/blogs/:id/comments",
  async (req, res, next) => {
    try {
      if (!isValidId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid blog ID",
        })
      }

      const text = cleanText(req.body.text)
      const author = cleanText(req.body.author)
      const visitorId = cleanText(
        req.body.visitorId
      )

      if (!text) {
        return res.status(400).json({
          message: "Comment text is required",
        })
      }

      if (!author) {
        return res.status(400).json({
          message: "Author is required",
        })
      }

      if (!visitorId) {
        return res.status(400).json({
          message: "visitorId is required",
        })
      }

      const blog = await Blog.findById(
        req.params.id
      )

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        })
      }

      blog.comments.push({
        id: new mongoose.Types.ObjectId().toString(),
        text,
        author,
        visitorId,
        date: new Date(),
      })

      await blog.save()

      res.status(201).json(blog)
    } catch (error) {
      next(error)
    }
  }
)

// ==================== DELETE COMMENT ====================

app.delete(
  "/api/blogs/:id/comments/:commentId",
  async (req, res, next) => {
    try {
      if (!isValidId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid blog ID",
        })
      }

      const visitorId = cleanText(
        req.body.visitorId
      )

      if (!visitorId) {
        return res.status(400).json({
          message: "visitorId is required",
        })
      }

      const blog = await Blog.findById(
        req.params.id
      )

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        })
      }

      const comment =
        blog.comments.find(
          (item) =>
            item.id === req.params.commentId
        )

      if (!comment) {
        return res.status(404).json({
          message: "Comment not found",
        })
      }

      if (
        comment.visitorId !== visitorId
      ) {
        return res.status(403).json({
          message:
            "You can only delete your own comment.",
        })
      }

      blog.comments =
        blog.comments.filter(
          (item) =>
            item.id !== req.params.commentId
        )

      await blog.save()

      res.json(blog)
    } catch (error) {
      next(error)
    }
  }
)

// ==================== 404 API ====================

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  })
})

// ==================== ERROR HANDLER ====================

app.use((error, req, res, next) => {
  console.error(error)

  if (
    error.name === "ValidationError"
  ) {
    return res.status(400).json({
      message: "Invalid data provided.",
    })
  }

  res.status(500).json({
    message: "Internal server error.",
  })
})

// ==================== DATABASE ====================

const PORT =
  process.env.PORT || 5000

async function startServer() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    )

    console.log(
      "MongoDB connected successfully"
    )

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      )
    })
  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    )

    process.exit(1)
  }
}

startServer()