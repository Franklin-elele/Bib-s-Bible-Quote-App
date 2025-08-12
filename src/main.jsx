import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { savedQuoteProvider } from './Components/SavedQuoteContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <link rel="website-icon" type="Bib's" href='../src/assets/file.svg'/>
  </React.StrictMode>,
)
