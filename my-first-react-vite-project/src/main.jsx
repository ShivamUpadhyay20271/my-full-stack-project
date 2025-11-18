import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/dashboard",
    element: <DashboardPage />
  }, 
  {
    path: '/profile',
    element: <ProfilePage />
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
