
import React, { useState } from 'react';

interface BinauralBeatPreset {
  name: string;
  baseFreq: number;
  beatFreq: number;
  description: string;
}

interface BinauralBeatsProps {
  onFrequencyChange: (baseFreq: number, beatFreq: number) => void;
  isActive: boolean;
}

const BinauralBeats: React.FC<BinauralBeatsProps> = ({ onFrequencyChange, isActive }) => {
  const [baseFreq, setBaseFreq] = useState(200);
  const [beatFreq, setBeatFreq] = useState(10);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  
  const presets: BinauralBeatPreset[] = [
    { 
      name: "Delta", 
      baseFreq: 100, 
      beatFreq: 2, 
      description: "Deep sleep, healing (0.5-4Hz)" 
    },
    { 
      name: "Theta", 
      baseFreq: 200, 
      beatFreq: 6, 
      description: "Meditation, creativity (4-8Hz)" 
    },
    { 
      name: "Alpha", 
      baseFreq: 300, 
      beatFreq: 10, 
      description: "Relaxation, calmness (8-13Hz)" 
    },
    { 
      name: "Beta", 
      baseFreq: 400, 
      beatFreq: 20, 
      description: "Focus, alertness (13-30Hz)" 
    },
    { 
      name: "Gamma", 
      baseFreq: 500, 
      beatFreq: 40, 
      description: "Insight, peak focus (30-50Hz)" 
    }
  ];
  
  const handleBaseFreqChange = (value: number) => {
    setBaseFreq(value);
    setActivePreset(null);
    onFrequencyChange(value, beatFreq);
  };
  
  const handleBeatFreqChange = (value: number) => {
    setBeatFreq(value);
    setActivePreset(null);
    onFrequencyChange(baseFreq, value);
  };
  
  const selectPreset = (preset: BinauralBeatPreset) => {
    setBaseFreq(preset.baseFreq);
    setBeatFreq(preset.beatFreq);
    setActivePreset(preset.name);
    onFrequencyChange(preset.baseFreq, preset.beatFreq);
  };
  
  return (
    <div className="cosmic-panel">
      <h3 className="text-xl font-heading mb-4 text-shadow-neon">Binaural Beats</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => selectPreset(preset)}
            disabled={!isActive}
            className={`px-3 py-2 rounded-lg transition-all duration-300 ${
              activePreset === preset.name
                ? 'bg-cosmic-purple text-white shadow-neon-glow'
                : 'bg-cosmic-charcoal text-white hover:bg-cosmic-purple/20'
            } ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={preset.description}
          >
            {preset.name}
          </button>
        ))}
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-cosmic-purple-light">Base Frequency: {baseFreq} Hz</label>
            <span className="text-sm text-cosmic-purple-light">20 - 1500 Hz</span>
          </div>
          <input
            type="range"
            min="20"
            max="1500"
            step="1"
            value={baseFreq}
            onChange={(e) => handleBaseFreqChange(Number(e.target.value))}
            disabled={!isActive}
            className={`cosmic-slider w-full ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-cosmic-purple-light">Beat Frequency: {beatFreq} Hz</label>
            <span className="text-sm text-cosmic-purple-light">1 - 50 Hz</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            step="0.1"
            value={beatFreq}
            onChange={(e) => handleBeatFreqChange(Number(e.target.value))}
            disabled={!isActive}
            className={`cosmic-slider w-full ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default BinauralBeats;
