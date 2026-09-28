# BlogApp

A modern and responsive blog application built with React, Tailwind CSS, React Router and localStorage.

## Features

- 📝 Create blogs
- ✏️ Edit blogs
- 🗑️ Delete blogs
- 🔍 Search blogs
- 👤 Filter by author
- 📚 Filter by category
- 🔃 Sort blogs
- 📄 Pagination
- ❤️ Like blogs
- 🔖 Bookmark blogs
- 💬 Add and delete comments
- 🌙 Dark mode
- 💾 localStorage persistence
- 📱 Responsive design
- ⚠️ Error state
- ⏳ Loading UI
- 🔗 React Router navigation
- 📅 Blog dates
- ⏱️ Reading time
- 🖼️ Image upload and preview
- ❌ 404 page

## Technologies

- React
- Vite
- Tailwind CSS
- React Router
- JavaScript
- localStorage

## Project Structure

```text
src/
├── components/
│   ├── blogcard.jsx
│   ├── bloglist.jsx
│   ├── errorstate.jsx
│   ├── footer.jsx
│   ├── header.jsx
│   ├── hero.jsx
│   └── loading.jsx
│
├── context/
│   ├── blogcontext.jsx
│   └── themecontext.jsx
│
├── data/
│   └── blogs.js
│
├── page/
│   ├── addblog.jsx
│   ├── blogdetails.jsx
│   ├── blogs.jsx
│   ├── bookmarks.jsx
│   ├── editblog.jsx
│   ├── home.jsx
│   └── notfound.jsx
│
├── App.jsx
├── index.css
└── main.jsx