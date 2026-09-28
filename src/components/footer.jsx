import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              BlogApp
            </Link>

            <p className="mt-4 max-w-md leading-7 text-gray-600 dark:text-gray-400">
              A modern full-stack blog application built
              with React, Tailwind CSS, Express, and MongoDB.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Home
              </Link>

              <Link
                to="/blogs"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                All Blogs
              </Link>

              <Link
                to="/bookmarks"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Saved Blogs
              </Link>

              <Link
                to="/add-blog"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Add Blog
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Technology
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "React",
                "Tailwind CSS",
                "Express",
                "MongoDB",
                "Node.js",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} BlogApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer