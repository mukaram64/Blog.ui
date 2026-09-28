import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useTheme } from "../context/themecontext"
import { useBlogs } from "../context/blogcontext"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const { darkMode, toggleDarkMode } = useTheme()

  const { bookmarks } = useBlogs()

  const savedCount = Object.values(bookmarks).filter(
    Boolean
  ).length

  const navClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-blue-600 dark:text-blue-400"
      : "font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"

  const mobileNavClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-blue-600 dark:text-blue-400"
      : "font-medium text-gray-700 dark:text-gray-300"

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">

      <div className="mx-auto max-w-6xl px-6">

        <div className="flex items-center justify-between py-4">

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-bold text-blue-600"
          >
            BlogApp
          </NavLink>

          <nav className="hidden items-center gap-6 md:flex">

            <NavLink
              to="/"
              className={navClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/blogs"
              className={navClass}
            >
              Blogs
            </NavLink>

            <NavLink
              to="/bookmarks"
              className={navClass}
            >
              <span className="flex items-center gap-1">
                🔖 Saved

                {savedCount > 0 && (
                  <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                    {savedCount}
                  </span>
                )}
              </span>
            </NavLink>

            <NavLink
              to="/add-blog"
              className={({ isActive }) =>
                isActive
                  ? "rounded-lg bg-blue-700 px-4 py-2 font-medium text-white"
                  : "rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              }
            >
              Add Blog
            </NavLink>

            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="rounded-lg border border-gray-300 px-3 py-2 text-lg transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

          </nav>

          <div className="flex items-center gap-3 md:hidden">

            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="rounded-lg border border-gray-300 px-3 py-2 text-lg dark:border-gray-700"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              aria-label="Toggle menu"
              className="text-2xl text-gray-700 dark:text-gray-300"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>

        </div>

        {menuOpen && (

          <nav className="border-t border-gray-200 py-4 dark:border-gray-800 md:hidden">

            <div className="flex flex-col gap-4">

              <NavLink
                to="/"
                onClick={() =>
                  setMenuOpen(false)
                }
                className={mobileNavClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/blogs"
                onClick={() =>
                  setMenuOpen(false)
                }
                className={mobileNavClass}
              >
                Blogs
              </NavLink>

              <NavLink
                to="/bookmarks"
                onClick={() =>
                  setMenuOpen(false)
                }
                className={mobileNavClass}
              >
                <span className="flex items-center gap-2">
                  🔖 Saved

                  {savedCount > 0 && (
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                      {savedCount}
                    </span>
                  )}
                </span>
              </NavLink>

              <NavLink
                to="/add-blog"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white"
              >
                Add Blog
              </NavLink>

            </div>

          </nav>

        )}

      </div>

    </header>
  )
}

export default Header