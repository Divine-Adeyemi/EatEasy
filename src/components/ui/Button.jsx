import React from 'react';


export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  icon,
  ...props 
}) {
  
  
  const baseStyles = "w-full rounded-2xl py-4 font-bold transition active:scale-95 flex items-center justify-center gap-3 cursor-pointer select-none";
  const variants = {
     
    primary: "bg-[#615793] text-white shadow-lg shadow-[#615793]/20 hover:brightness-110",
    
    
    social: "bg-[var(--neutral-0)] dark:bg-transparent text-[var(--text-primary)] border border-[var(--neutral-200)] dark:border-[var(--neutral-700)] hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-800)]",
    
  
    text: "bg-transparent text-[var(--neutral-500)] hover:text-[var(--text-primary)] font-medium shadow-none py-2 active:scale-100"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
     
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      
      {children}
    </button>
  );
}

export const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12.06C22 6.53 17.5 2.05 12 2.05C6.5 2.05 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.2 5.96 16.13 6.04 16.39 6.07V8.7H14.85C13.63 8.7 13.4 9.28 13.4 10.13V12.06H16.34L15.87 14.96H13.4V21.96C18.19 21.21 22 17.06 22 12.06Z" fill="#1877F2"/>
  </svg>
);

export const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.5 12.28c0-.85-.08-1.67-.22-2.46H12v4.66h6.45c-.28 1.5-.7 2.6-1.5 3.38v.02l.02.13 3.53 2.72.24.02c2.18-2 3.6-5.1 3.6-8.47z" fill="#4285F4"/>
    <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.79-2.94c-1.07.72-2.45 1.15-4.14 1.15-3.13 0-5.78-2.11-6.73-4.96l-.16.01-3.7 2.85-.05.16C3.37 21.32 7.37 24 12 24z" fill="#34A853"/>
    <path d="M5.27 14.34c-.24-.71-.38-1.46-.38-2.34 0-.88.14-1.63.38-2.34l-.01-.17-3.72-2.88-.12.06C.51 8.52 0 10.2 0 12c0 1.8.51 3.48 1.42 5.34l3.85-2.99z" fill="#FBBC05"/>
    <path d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.43-3.44C17.95 1.15 15.24 0 12 0 7.37 0 3.37 2.68 1.42 6.66l3.72 2.88c.95-2.85 3.6-4.96 6.73-4.96z" fill="#EA4335"/>
  </svg>
);