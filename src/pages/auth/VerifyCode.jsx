
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

        <div className="shrink-0 order-2 md:order-1 flex flex-col justify-start md:justify-center items-center gap-6 p-6 md:p-20">  
          <div className="flex-col items-center md:block text-center">
          
              <h1 className="text-4xl font-bold font-heading">
              What’s your email? 📨
              </h1>

              <p className=" mt-2 w-sm text-nowrap">
               We need it to search for an existing account or create a new one.</p>
          </div>

           
          <div className="w-full max-w-sm flex flex-col gap-3">
          <form action="">
            <input 
              type="email" 
              name="email"
              placeholder="name@example.com"
              className="bg-transparent border-neutral-150 rounded-xl py-2 w-full focus:ring-0 p-3"
              required 
              />          
           </form>
          <div className="">
             
          <Button onClick={() => navigate('/EmailVerification')} variant="primary">
              Next
            </Button>  
         
          </div>
          </div>
         
      </div>
     
    </div>
    
  ); 
  
 
}