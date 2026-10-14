import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, delay = 0 }) => {
  const delayClass = delay > 0 ? `animation-delay-${delay}` : '';
  
  return (
    <div className={`animate-slide-up ${delayClass}`}>
      {children}
    </div>
  );
};

export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => {
  const delayClass = delay > 0 ? `animation-delay-${delay}` : '';
  
  return (
    <div className={`animate-fade-in ${delayClass}`}>
      {children}
    </div>
  );
};

export const ScaleIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => {
  const delayClass = delay > 0 ? `animation-delay-${delay}` : '';
  
  return (
    <div className={`animate-scale-in ${delayClass}`}>
      {children}
    </div>
  );
};
