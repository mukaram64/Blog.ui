import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-gray-900 px-6 py-12 text-gray-300 dark:bg-black">

      <div className="mx-auto max-w-6xl">

        <div className="grid gap-10 md:grid-cols-3">

          <div>

            <Link
              to="/"
              className="text-2xl font-bold text-white"
            >
              BlogApp
            </Link>

            <p className="mt-4 max-w-sm leading-7 text-gray-400">
              Learn, build and share knowledge through modern web development articles.
            </p>

          </div>

          <div>

            <h3 className="font-semibold text-white">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3">

              <Link
                to="/"
                className="hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/blogs"
                className="hover:text-white"
              >
                Blogs
              </Link>

              <Link
                to="/bookmarks"
                className="hover:text-white"
              >
                Saved Blogs
              </Link>

              <Link
                to="/add-blog"
                className="hover:text-white"
              >
                Add Blog
              </Link>

            </div>

          </div>

          <div>

            <h3 className="font-semibold text-white">
              BlogApp
            </h3>

            <p className="mt-4 leading-7 text-gray-400">
              A modern React blog application built with React, Tailwind CSS and localStorage.
            </p>

          </div>

        </div>

        <div className="mt-10 border-t border-gray-700 pt-6">

          <p className="text-center text-sm text-gray-500">
            © 2026 BlogApp. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer