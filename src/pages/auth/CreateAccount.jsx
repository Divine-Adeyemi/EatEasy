import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button'; 
import Slider from '../../components/layouts/Slider'; 
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function EmailVerification() {
  const navigate = useNavigate();
  
  // LOGIC FIX 1: Added error state so validation messages work
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
   // LOGIC FIX 2: Clear error when user starts typing
   if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username) {
        setError('Please enter a username');
        return;
    }
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.password) {
      setError('Please enter your password');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
     navigate('/VerifyCode', { state: { email: formData.email, username: formData.username } });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-dvh w-full overflow-hidden flex flex-col md:grid md:grid-cols-2 relative">
      
      <div className="hidden md:flex md:order-2 md:m-8 flex items-center justify-center">
        <Slider />
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
                <h1 className="text-3xl font-bold font-heading text-[var(--text-primary)] mb-3">
                Getting started! ✌️
                </h1>
                <p className="">
                    Look like you are new to us! Create an account for a complete experience.   
                </p>
            </div>
              
            
             <form id="signup-form" onSubmit={handleSubmit} className="space-y-4" noValidate autoComplete='off'>
                
                {/* Error Display */}
                {error && (
                    <p className="text-red-500 text-sm font-medium animate-pulse">{error}</p>
                )}

                <div className="space-y-1">
                    
                    <input 
                        type="text" 
                        name="username" 
                        id="Username" 
                        placeholder="Username" 
                        value={formData.username} 
                        onChange={handleChange}
                        className='w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-[var(--neutral-700)] bg-white dark:bg-[var(--neutral-800)] dark:text-white outline-none transition-all'
                    />
                </div>

                <div className="space-y-1">
                
                    <input 
                        type="email" 
                        name="email" 
                        id="Email" 
                        placeholder="Email Address" 
                        value={formData.email} 
                        onChange={handleChange}
                        className='w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-[var(--neutral-700)] bg-white dark:bg-[var(--neutral-800)] dark:text-white outline-none transition-all'
                    />
                </div>

                <div className="space-y-1">
                  <PhoneInput 
                    country={'us'} 
                    value={formData.phone} 
                    onChange={(phone) => setFormData({ ...formData, phone })}
                    containerClass="w-full"
                    inputClass="!w-full !h-[58px] !pl-[60px] !pr-4 !rounded-xl !border-gray-200 dark:!border-[var(--neutral-700)] !bg-white dark:!bg-[var(--neutral-800)] !text-[var(--text-primary)] !text-base focus:!ring-2 focus:!ring-[var(--primary-200)] focus:!border-[var(--primary-600)] !transition-all"
                    buttonClass="!bg-transparent !border-0 !rounded-l-xl !pl-3"
                    dropdownClass="!bg-white dark:!bg-[var(--neutral-800)] !text-[var(--text-primary)] !border-gray-200 dark:!border-[var(--neutral-700)] !rounded-xl !shadow-lg !overflow-hidden"
                    disableDropdown={false} 
                  />
                </div>

                <div className="relative space-y-1">
                  <input
                    type={showPassword ? "text" : "password"} 
                    name="password"  
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-[var(--neutral-700)] bg-white dark:bg-[var(--neutral-800)] dark:text-white outline-none focus:ring-2 focus:ring-[var(--primary-200)] focus:border-[var(--primary-600)] transition-all"
                  />
                  
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" >
                    {showPassword ? (<Eye className="w-5 h-5" /> ) : ( <EyeOff className="w-5 h-5" />)}
                  </button>
                </div>
            
            </form>
        
            <div className="mt-10">
                {/* LOGIC FIX 8: form="signup-form" links this button to the form above */}
                <Button 
                    type="submit" 
                    form="signup-form"
                    disabled={isLoading} 
                    className="w-full py-4 rounded-xl font-bold shadow-lg shadow-purple-500/20"
                >
                    {isLoading ? 'Checking...' : 'Next'}
                </Button>
            </div>    
        </div> 
      </div>

    </div>
  );    
}