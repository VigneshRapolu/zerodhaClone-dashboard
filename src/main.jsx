import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from './components/Home.jsx';
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
    
      <Routes>

        <Route path="/*" element={<Home />} /> {/* this is used because the path to be nested so that the entire page will not reload */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  // </StrictMode>,
)
