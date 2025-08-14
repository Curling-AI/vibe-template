// This is a example layout, change the content and styles to your own

import { Outlet } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const Layout = () => {
  return (
    <div className="w-full max-w-screen-xl min-h-screen mx-auto p-8 text-center flex flex-col items-center justify-center">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  )
}

export default Layout
