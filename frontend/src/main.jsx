import { createRoot } from 'react-dom/client'
import './index.css'
import "bulma/css/bulma.min.css"
import App from './App.jsx'
import { UserProvider } from './context/UserContex.jsx'


createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>
)
