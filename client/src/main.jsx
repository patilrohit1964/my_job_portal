import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import './index.css'
import store from './redux/store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="bottom-right" />
  </Provider>,
)
