import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./App.css"
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'



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
    path: "",
    element: ""
  },
  {
    path: "",
    element: ""
  },
])
const App = () => {
  return (
    <RouterProvider router={appRoutes}>

    </RouterProvider>
  )
}

export default App