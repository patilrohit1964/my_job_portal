import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./App.css"
import AdminJobs from './components/admin/AdminJobs'
import Companies from './components/admin/Companies'
import CompaniesCreate from './components/admin/CompaniesCreate'
import CompanySetup from './components/admin/CompanySetup'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Browse from './components/Browse'
import Home from './components/Home'
import JobDescription from './components/JobDescription'
import Jobs from './components/Jobs'
import Profile from './components/Profile'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'



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
  },
  {
    path: "/admin/companies/create",
    element: <CompaniesCreate />
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />
  },
  {
    path: "/admin/jobs/post",
    element: <PostJob />
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants />
  }
])
const App = () => {
  return (
    <RouterProvider router={appRoutes}>

    </RouterProvider>
  )
}

export default App