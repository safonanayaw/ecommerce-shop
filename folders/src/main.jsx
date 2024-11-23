import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* this will allow context react API making context values in any components   */}
  <ShopContextProvider>
    <App />
  </ShopContextProvider>
  </BrowserRouter>,
)
