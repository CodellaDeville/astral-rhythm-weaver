
import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface MeditationSession {
  id: string;
  title: string;
  duration: number;
  description: string;
}

interface GuidedMeditationProps {
  isActive: boolean;
  onPlay: (sessionId: string) => void;
  onPause: () => void;
}

const GuidedMeditation: React.FC<GuidedMeditationProps> = ({ isActive, onPlay, onPause }) => {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const meditationSessions: MeditationSession[] = [
    {
      id: 'calm-mind',
      title: 'Calm Mind',
      duration: 5,
      description: 'A short meditation to calm your mind and reduce anxiety'
    },
    {
      id: 'deep-focus',
      title: 'Deep Focus',
      duration: 10,
      description: 'Increase concentration and mental clarity'
    },
    {
      id: 'sleep-well',
      title: 'Sleep Well',
      duration: 15,
      description: 'Gentle guidance into a restful sleep'
    }
  ];
  
  const handleSessionSelect = (sessionId: string) => {
    if (!isActive) return;
    
    if (activeSession === sessionId && isPlaying) {
      // Pause current session
      setIsPlaying(false);
      onPause();
    } else {
      // Play new or paused session
      setActiveSession(sessionId);
      setIsPlaying(true);
      onPlay(sessionId);
    }
  };
  
  return (
    <div className="cosmic-panel">
      <h3 className="text-xl font-heading mb-4 text-shadow-neon">Guided Meditation</h3>
      
      <div className="space-y-4">
        {meditationSessions.map((session) => (
          <div 
            key={session.id}
            className={`p-4 rounded-lg transition-all duration-300 ${
              activeSession === session.id 
                ? 'bg-cosmic-purple/20 border border-cosmic-purple/40'
                : 'bg-cosmic-charcoal'
            } ${!isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-cosmic-purple/10'}`}
            onClick={() => handleSessionSelect(session.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{session.title}</h4>
              <span className="text-sm text-cosmic-purple-light">{session.duration} min</span>
            </div>
            
            <p className="text-sm text-cosmic-purple-light mb-3">{session.description}</p>
            
            <button
              className={`px-4 py-2 rounded-full flex items-center justify-center transition-all ${
                activeSession === session.id && isPlaying
                  ? 'bg-cosmic-purple text-white shadow-neon-glow'
                  : 'bg-cosmic-charcoal/50 text-cosmic-purple-light hover:bg-cosmic-purple/20'
              } ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isActive}
            >
              {activeSession === session.id && isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" /> Play
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuidedMeditation;
