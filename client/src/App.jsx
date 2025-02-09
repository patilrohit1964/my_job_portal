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
import ProtectRoute from './components/admin/ProtectRoute'



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
    element: <ProtectRoute><Companies /></ProtectRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectRoute><CompaniesCreate /></ProtectRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectRoute><CompanySetup /></ProtectRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectRoute><AdminJobs /></ProtectRoute>
  },
  {
    path: "/admin/jobs/post",
    element: <ProtectRoute><PostJob /></ProtectRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectRoute><Applicants /></ProtectRoute>
  }
])
const App = () => {
  return (
    <RouterProvider router={appRoutes}>

    </RouterProvider>
  )
}

export default App