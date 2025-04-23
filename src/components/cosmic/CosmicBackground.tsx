
import React, { useEffect, useRef } from 'react';

const CosmicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Remove any existing stars
    const existingStars = container.querySelectorAll('.star, .nebula');
    existingStars.forEach(star => star.remove());
    
    // Create stars
    const createStars = (count: number, className: string) => {
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = `star ${className}`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        container.appendChild(star);
      }
    };
    
    // Create nebulas
    const createNebulas = (count: number) => {
      for (let i = 0; i < count; i++) {
        const nebula = document.createElement('div');
        const size = Math.random() * 250 + 150;
        const isBlue = Math.random() > 0.5;
        
        nebula.className = `nebula ${isBlue ? 'nebula-blue' : 'nebula-purple'}`;
        nebula.style.width = `${size}px`;
        nebula.style.height = `${size}px`;
        nebula.style.left = `${Math.random() * 100}%`;
        nebula.style.top = `${Math.random() * 100}%`;
        nebula.style.opacity = `${Math.random() * 0.2}`;
        container.appendChild(nebula);
      }
    };
    
    // Generate stars based on container size
    const smallStarCount = Math.floor((containerWidth * containerHeight) / 1000);
    const mediumStarCount = Math.floor(smallStarCount / 3);
    const largeStarCount = Math.floor(smallStarCount / 10);
    const nebulaCount = 5;
    
    createStars(smallStarCount, 'star-sm');
    createStars(mediumStarCount, 'star-md');
    createStars(largeStarCount, 'star-lg');
    createNebulas(nebulaCount);
    
    // Simple parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX / containerWidth - 0.5) * 20;
      const moveY = (e.clientY / containerHeight - 0.5) * 20;
      
      const stars = container.querySelectorAll('.star');
      const nebulas = container.querySelectorAll('.nebula');
      
      stars.forEach((star, i) => {
        const htmlStar = star as HTMLElement;
        const depth = i % 3 === 0 ? 0.5 : i % 3 === 1 ? 0.3 : 0.1;
        htmlStar.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
      
      nebulas.forEach((nebula, i) => {
        const htmlNebula = nebula as HTMLElement;
        const depth = 0.05;
        htmlNebula.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="cosmic-background" />
  );
};

export default CosmicBackground;
