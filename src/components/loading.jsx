function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-gray-50 dark:bg-gray-950">

      <div className="text-center">

        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400"></div>

        <p className="mt-4 font-medium text-gray-600 dark:text-gray-400">
          Loading...
        </p>

      </div>

    </div>
  )
}

export default Loading