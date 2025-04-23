
import React from 'react';
import { Volume, Pause, Play } from 'lucide-react';

interface AppHeaderProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  isPlaying, 
  onPlayPause, 
  volume, 
  onVolumeChange 
}) => {
  return (
    <header className="z-10 relative flex items-center justify-between p-6 backdrop-blur-cosmic border-b border-cosmic-purple/20">
      <div className="flex items-center">
        <h1 className="text-3xl font-heading font-bold text-white">
          <span className="text-neuro-gold">Neuro</span> Mix Music Box
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Volume className="h-5 w-5 text-neuro-gold mr-2" />
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} 
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="cosmic-slider w-24" 
          />
        </div>
        
        <button 
          onClick={onPlayPause}
          className="neon-icon-button border-2 border-neuro-gold/30 hover:border-neuro-gold/70"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="h-5 w-5 text-neuro-gold" /> : <Play className="h-5 w-5 text-neuro-gold" />}
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
