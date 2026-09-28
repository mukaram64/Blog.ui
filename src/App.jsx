import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/header"
import Footer from "./components/footer"

import Home from "./page/home"
import Blogs from "./page/blogs"
import AddBlog from "./page/addblog"
import BlogDetails from "./page/blogdetails"
import EditBlog from "./page/editblog"
import Bookmarks from "./page/bookmarks"
import NotFound from "./page/notfound"

import { BlogProvider } from "./context/blogcontext"
import { ThemeProvider } from "./context/themecontext"

function App() {
  return (
    <ThemeProvider>
      <BlogProvider>
        <BrowserRouter>

          <Header />

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/blogs"
              element={<Blogs />}
            />

            <Route
              path="/blogs/:id"
              element={<BlogDetails />}
            />

            <Route
              path="/add-blog"
              element={<AddBlog />}
            />

            <Route
              path="/edit-blog/:id"
              element={<EditBlog />}
            />

            <Route
              path="/bookmarks"
              element={<Bookmarks />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

          <Footer />

        </BrowserRouter>
      </BlogProvider>
    </ThemeProvider>
  )
}

export default App