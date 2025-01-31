import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./App.css"
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Browse from './components/Browse'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'



const appRoutes = createBrowserRouter([
  {
    path: "",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/jobs/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },

  // admin routes
  {
    path: "/admin/companies",
    element: <Companies />
  }
])
const App = () => {
  return (
    <RouterProvider router={appRoutes}>

    </RouterProvider>
  )
}

export default App