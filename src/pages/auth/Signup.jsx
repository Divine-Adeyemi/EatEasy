
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { FacebookIcon, GoogleIcon } from '../../components/ui/Button';
import Slider from '../../components/layouts/Slider';

 
export default function Onboarding({ onComplete }) {
 const navigate = useNavigate();
  return (
    <div className="h-dvh w-full overflow-hidden flex flex-col justify-center md:grid md:grid-cols-2">
      
    
      <div className="hidden
                      md:flex flex-1 order-1 md:order-2 
                      md:m-8 
                      md:rounded-3xl
                    
                 
                      md:shadow-2xl md:dark:shadow-none 
                      flex items-center justify-center 
                      relative overflow-hidden">
        
        {/* Desktop*/}
        <div className="hidden md:block absolute inset-0 border border-gray-100 dark:border-white/5 rounded-3xl pointer-events-none z-20"></div>

        <Slider />
        </div>

        <div className="shrink-0 order-2 md:order-1 flex flex-col justify-center items-center gap-6 p-6 md:p-20">  
          <div className="flex-col items-center md:block text-center">
          
              <h1 className="text-5xl font-bold font-heading">
                Let’s Get Started 😁
              </h1>
              
              <p className=" mt-2">
                Sign up or login into to have a full digital experience in our restaurant
              </p>
          </div>

          <div className="w-full max-w-xs flex flex-col gap-3">
            <Button onClick={() => navigate('/EmailVerification')} variant="primary">
              Get Started
            </Button>

            <div className="flex items-center gap-3 my-1">
              <div className="h-px bg-[var(--neutral-200)] dark:bg-[var(--neutral-700)] flex-1"></div>
              <span className="text-xs font-bold text-[var(--neutral-500)] uppercase">OR</span>
              <div className="h-px bg-[var(--neutral-200)] dark:bg-[var(--neutral-700)] flex-1"></div>
            </div>

            <Button variant="social" icon={<FacebookIcon />}>
              Continue with Facebook
            </Button>
            <Button variant="social" icon={<GoogleIcon />}>
              Continue with Google
            </Button>
            
          </div>
         
        <div className="">
          <Button onClick={() => navigate('/Login')} variant="text" icon={GoogleIcon}>
            Sign up later
          </Button>  
        </div>  

      </div>
     
    </div>
    
  ); 
  
 
}