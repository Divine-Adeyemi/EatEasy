import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function Splash() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="relative flex h-screen w-full flex-col justify-end items-start p-10 overflow-hidden bg-[var(--bg-primary)]">
      
      <img src="src/assets/splash-bottom.svg" className="absolute -top-5 -left-5 z-10 w-32 md:w-40 animate-pulse-slow" alt="Food" />
      <img src="src/assets/splash-top.svg" className="absolute -bottom-5 -right-5 z-10 w-32 md:w-40 animate-pulse-slow" alt="Food" />

    
      <div className="z-20 mb-12 md:mb-20 max-w-lg">
        
        <h1 className="text-6xl md:text-8xl font-bold">
          Eat
           <br className="md:hidden" />
          <span className="text-brand-orange md:ml-4">Easy</span>
        </h1>

        
        <p className="mt-5 text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium">
          {/* on laptops */}
          <span className="hidden md:inline"> Join us for a full contactless experience.</span>
        </p>

      </div>
      
    </div>
  );
}


 