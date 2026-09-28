import { Link, NavLink } from "react-router-dom"

import { useBlogs } from "../context/blogcontext"
import { useTheme } from "../context/themecontext"

function Header() {
  const { blogs, visitorId } = useBlogs()
  const { darkMode, toggleDarkMode } = useTheme()

  const savedCount = blogs.filter(
    (blog) =>
      blog.bookmarksBy?.includes(visitorId)
  ).length

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          BlogApp
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              }`
            }
          >
            Blogs
          </NavLink>

          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              }`
            }
          >
            🔖 Saved
            {savedCount > 0 && (
              <span className="ml-1 rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                {savedCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/add-blog"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Add Blog
          </NavLink>

          <button
            onClick={toggleDarkMode}
            className="rounded-lg border border-gray-300 px-3 py-2 text-lg transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="rounded-lg border border-gray-300 px-3 py-2 text-lg dark:border-gray-700"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 border-t border-gray-100 px-6 py-3 md:hidden dark:border-gray-800">
        <NavLink
          to="/"
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          Home
        </NavLink>

        <NavLink
          to="/blogs"
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          Blogs
        </NavLink>

        <NavLink
          to="/bookmarks"
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          🔖 Saved {savedCount}
        </NavLink>

        <NavLink
          to="/add-blog"
          className="text-sm font-semibold text-blue-600 dark:text-blue-400"
        >
          Add Blog
        </NavLink>
      </div>
    </header>
  )
}

export default Header