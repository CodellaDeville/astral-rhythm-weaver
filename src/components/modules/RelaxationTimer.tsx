
import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface RelaxationTimerProps {
  onStart: (duration: number) => void;
  onEnd: () => void;
  isActive: boolean;
}

const RelaxationTimer: React.FC<RelaxationTimerProps> = ({ onStart, onEnd, isActive }) => {
  const [duration, setDuration] = useState(5); // Default 5 minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  
  // Timer presets
  const timePresets = [5, 10, 15, 20];
  
  useEffect(() => {
    let timer: number;
    
    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      onEnd();
    }
    
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onEnd]);
  
  const toggleTimer = () => {
    if (!isRunning) {
      setTimeLeft(duration * 60);
      onStart(duration);
    } else {
      onEnd();
    }
    setIsRunning(!isRunning);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const selectDuration = (mins: number) => {
    setDuration(mins);
    setTimeLeft(mins * 60);
  };
  
  return (
    <div className="cosmic-panel">
      <h3 className="text-xl font-heading mb-4 text-shadow-neon">Relaxation Timer</h3>
      
      <div className="grid grid-cols-4 gap-2 mb-6">
        {timePresets.map((preset) => (
          <button
            key={preset}
            onClick={() => selectDuration(preset)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              duration === preset 
                ? 'bg-cosmic-purple text-white shadow-neon-glow' 
                : 'bg-cosmic-charcoal text-white hover:bg-cosmic-purple/20'
            }`}
          >
            {preset} min
          </button>
        ))}
      </div>
      
      <div className="flex flex-col items-center">
        <div className="text-5xl font-bold mb-6 text-shadow-neon">
          {formatTime(timeLeft)}
        </div>
        
        <button
          onClick={toggleTimer}
          disabled={!isActive}
          className={`neon-button flex items-center ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isRunning ? (
            <>
              <Pause className="mr-2 h-5 w-5" /> Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" /> Start Session
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RelaxationTimer;
