import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// Imported pages
import Splash from './pages/public/Splash';
import Onboarding from './pages/public/Onboarding';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import EmailVerification from './pages/auth/EmailVerification';
import VerifyCode from './pages/auth/VerifyCode';
import CreateAccount from './pages/auth/CreateAccount';





function App() {

  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light');
  
  useEffect(() => {
    if (theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    
    <BrowserRouter>
      <div className="app-layout">
        
    
        <button 
          
          onClick={toggleTheme} 
          className="fixed top-5 right-5 z-[9999] p-2 rounded-full bg-transparent dark:bg-[var(--neutral-800)] shadow-sm transition-transform hover:scale-110 active:scale-95"
          aria-label="Toggle Theme"
        >     
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Routes */}
       <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/emailverification" element={<EmailVerification/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Createaccount" element={<CreateAccount/>} />
          <Route path="/verifycode" element={<VerifyCode />} />
        </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;