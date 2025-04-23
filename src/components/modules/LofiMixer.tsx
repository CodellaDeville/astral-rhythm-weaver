
import React, { useState } from 'react';
import { Volume2, SkipForward, SkipBack, Drum, Piano } from 'lucide-react';

interface LofiSample {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  active: boolean;
}

interface LofiMixerProps {
  isActive: boolean;
  onSampleToggle: (sampleId: string, active: boolean) => void;
}

const LofiMixer: React.FC<LofiMixerProps> = ({ isActive, onSampleToggle }) => {
  const [bpm, setBpm] = useState(75);
  const [samples, setSamples] = useState<LofiSample[]>([
    { id: 'drums1', name: 'Boom Bap', icon: Drum, active: false },
    { id: 'piano1', name: 'Jazz Chords', icon: Piano, active: false },
    { id: 'vinyl', name: 'Vinyl Crackle', icon: Volume2, active: false },
  ]);
  
  const toggleSample = (id: string) => {
    setSamples(samples.map(sample => {
      if (sample.id === id) {
        const newState = !sample.active;
        onSampleToggle(id, newState);
        return { ...sample, active: newState };
      }
      return sample;
    }));
  };
  
  const handleBpmChange = (value: number) => {
    setBpm(value);
    // Here you would update the actual tempo of the audio engine
  };
  
  return (
    <div className="cosmic-panel">
      <h3 className="text-xl font-heading mb-4 text-shadow-neon">Lo-Fi Hip-Hop Mixer</h3>
      
      {/* BPM Slider */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-cosmic-purple-light">Tempo: {bpm} BPM</label>
          <span className="text-sm text-cosmic-purple-light">60 - 90 BPM</span>
        </div>
        <input
          type="range"
          min="60"
          max="90"
          value={bpm}
          onChange={(e) => handleBpmChange(Number(e.target.value))}
          disabled={!isActive}
          className={`cosmic-slider w-full ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </div>
      
      {/* Loop Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          className={`neon-icon-button ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isActive}
        >
          <SkipBack className="h-5 w-5" />
        </button>
        
        <button 
          className={`neon-icon-button ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isActive}
        >
          <SkipForward className="h-5 w-5" />
        </button>
      </div>
      
      {/* Sample Pads */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {samples.map((sample) => (
          <div
            key={sample.id}
            onClick={() => isActive && toggleSample(sample.id)}
            className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-300 cursor-pointer ${
              sample.active 
                ? 'bg-cosmic-purple shadow-neon-glow' 
                : 'bg-cosmic-charcoal hover:bg-cosmic-purple/20'
            } ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <sample.icon className={`h-10 w-10 mb-2 ${sample.active ? 'text-white' : 'text-cosmic-purple-light'}`} />
            <span className={`text-sm font-medium ${sample.active ? 'text-white' : 'text-cosmic-purple-light'}`}>
              {sample.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* Beat Timeline (simplified visualization) */}
      <div className="h-16 bg-cosmic-charcoal rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center text-cosmic-purple-light opacity-50">
          {!isActive ? 'Activate module to use mixer' : 'Timeline visualization goes here'}
        </div>
        {isActive && samples.some(s => s.active) && (
          <div className="absolute left-0 top-0 h-full w-1 bg-cosmic-purple animate-[pulse_2s_ease-in-out_infinite]"></div>
        )}
      </div>
    </div>
  );
};

export default LofiMixer;
