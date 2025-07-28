import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AuthProvider from './context/AuthContext'
import UserContextProvider from './context/UserContext' // ✅ Corrected import

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </AuthProvider>
)

