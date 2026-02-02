import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button'; 
import Slider from '../../components/layouts/Slider'; 

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data passed from previous page
  const { email, username } = location.state || {};
  const displayEmail = email || "robert.fox@gmail.com";
  const displayUser = username || "Robert"; // Default fallback

  // State: Array of 4 digits instead of one string
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs to manage focus jumping
  const inputRefs = useRef([]);

  // Handle typing in a box
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otp];
    // Take the last character typed (allows replacing a number)
    newOtp[index] = value.substring(value.length - 1); 
    setOtp(newOtp);
    setError(''); // Clear error on type

    // Move to next input if value is entered
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      // If empty and backspace pressed, move focus back
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle Paste (e.g. user pastes "1234")
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4).split('');
    if (pastedData.every(char => !isNaN(char))) {
      const newOtp = [...otp];
      pastedData.forEach((digit, i) => {
        if (i < 4) newOtp[i] = digit;
      });
      setOtp(newOtp);
      // Focus the last filled box
      const lastIndex = Math.min(pastedData.length, 3);
      inputRefs.current[lastIndex].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    
    if (code.length !== 4) {
      setError('Please fill all 4 boxes');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (code === "1234") {
        console.log("Success!");
        navigate('/dashboard'); 
      } else {
        throw new Error('Invalid code');
      }
    } catch (err) {
      setError('Wrong code. Try "1234"'); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full overflow-hidden flex flex-col md:grid md:grid-cols-2 relative">
      
      {/* Slider*/}
      <div className="hidden md:flex md:order-2 md:p-8 flex items-center justify-center">
        <div className="w-full h-full rounded-3xl overflow-hidden">
           <Slider />
        </div>
      </div>

      
      <div className="shrink-0 order-2 md:order-1 flex flex-col justify-center items-center gap-6 p-6 md:p-20 relative">
        
     
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-6 left-6 p-2 rounded-full bg-gray-100 dark:bg-[var(--neutral-800)] hover:opacity-80 transition z-10"
        >
          <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="w-full max-w-sm">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold font-heading mb-3">
              Verify Code ⚡
            </h1>
            
            <p className="leading-relaxed">
              We just sent a 4-digit verification code to <span className="font-bold">{displayEmail}</span>. 
              Enter the code in the box below to continue.
            </p>
          </div>

          <form id="otp-form" onSubmit={handleSubmit} className="flex flex-col items-center space-y-8" autoComplete="off">
            
            {/* 4-DIGIT INPUT BOXES */}
            <div className="flex gap-4 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)} // Save ref for focus
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`
                    w-16 h-16 md:w-20 md:h-20 
                    text-3xl font-bold text-center 
                    rounded-2xl border outline-none transition-all
                    focus:ring-2 focus:ring-[var(--primary-200)] focus:border-[var(--primary-600)]
                    ${error ? 'border-red-500 bg-red-50' : 'border-gray-200 dark:border-[var(--neutral-700)] bg-white dark:bg-[var(--neutral-800)] dark:text-white'}
                  `}
                />
              ))}
            </div>

            {error && (
                <p className="text-red-500 text-sm font-medium animate-pulse">{error}</p>
            )}

            {/* Resend Link */}
            <p className="text-center text-sm">
                Didn't receive a code? <button type="button" className="font-bold hover:underline text-[var(--secondary-700)]">Resend Code</button>
            </p>

            {/* Next Button */}
            <div className="w-full pt-4">
                <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full py-4 rounded-xl font-bold shadow-lg shadow-purple-500/20"
                >
                    {isLoading ? 'Verifying...' : 'Next'}
                </Button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}