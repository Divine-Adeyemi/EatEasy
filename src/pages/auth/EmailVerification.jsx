import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button'; 
import Slider from '../../components/layouts/Slider'; // 1. Restored Slider Layout

export default function EmailVerification() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to next step
      navigate('/CreateAccount', { state: { email } });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="min-h-dvh w-full overflow-hidden flex flex-col md:grid md:grid-cols-2 relative">
      
      
      <div className="hidden md:flex md:order-2 md:m-8 flex items-center justify-center">
        <Slider />
      </div>

      
      <div className="shrink-0 order-2 md:order-1 flex flex-col justify-center items-center gap-6 p-6 md:p-20 relative">
        
      

        <div className="w-full max-w-sm">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold font-heading text-[var(--text-primary)] mb-3">
              What’s your email? 📩
            </h1>
            <p className="">
              We need it to search for your account or create a new one.
            </p>
          </div>

      
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            
            <div className="space-y-2">
              <label htmlFor="email" className="sr-only">Email Address</label>
              
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`
                  w-full px-4 py-4 rounded-xl border outline-none transition-all
                  focus:ring-2 focus:ring-[var(--primary-200)]
                  ${error 
                    ? 'border-red-500 focus:border-red-500 text-red-500' 
                    : 'border-gray-200 dark:border-[var(--neutral-700)] focus:border-[var(--primary-600)]'
                  }
                `}
                autoFocus
              />

            
              {error && (<p className="text-red-500 text-sm px-1 animate-pulse font-medium"> {error}  </p> )}
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full py-4 rounded-xl font-bold shadow-lg shadow-purple-500/20"
            >
              {isLoading ? 'Checking...' : 'Next'}
            </Button>

          </form>
        </div>
      </div>

    </div>
  );
}