import { Link } from "react-router-dom"

function Hero() {
  return (
    <section className="bg-gray-900 px-6 py-20 text-white transition-colors md:py-28 dark:bg-black">
      <div className="mx-auto max-w-6xl">

        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Welcome to BlogApp
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Learn, Build and
            <span className="text-blue-500"> Grow</span>
          </h1>

          <p className="mt-6 text-base leading-7 text-gray-300 sm:text-lg md:max-w-2xl">
            Discover helpful articles about React, JavaScript,
            web development and modern technology.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <Link
              to="/blogs"
              className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold hover:bg-blue-700"
            >
              Explore Blogs
            </Link>

            <Link
              to="/add-blog"
              className="rounded-lg border border-gray-600 px-6 py-3 text-center font-semibold hover:bg-gray-800"
            >
              Write a Blog
            </Link>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero