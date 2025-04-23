
import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";

interface BinauralBeatPreset {
  name: string;
  baseFreq: number;
  beatFreq: number;
  description: string;
  color: string;
}

interface BinauralBeatsProps {
  onFrequencyChange: (baseFreq: number, beatFreq: number) => void;
  isActive: boolean;
}

const BinauralBeats: React.FC<BinauralBeatsProps> = ({ onFrequencyChange, isActive }) => {
  const [baseFreq, setBaseFreq] = useState(200);
  const [beatFreq, setBeatFreq] = useState(10);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [autoCycle, setAutoCycle] = useState(false);
  
  const presets: BinauralBeatPreset[] = [
    { 
      name: "Delta", 
      baseFreq: 100, 
      beatFreq: 2, 
      description: "Deep sleep, healing (0.5-4Hz)",
      color: "from-neuro-blue to-neuro-blue/50"
    },
    { 
      name: "Theta", 
      baseFreq: 200, 
      beatFreq: 6, 
      description: "Meditation, creativity (4-8Hz)",
      color: "from-neuro-gold to-neuro-gold/50" 
    },
    { 
      name: "Alpha", 
      baseFreq: 300, 
      beatFreq: 10, 
      description: "Relaxation, calmness (8-13Hz)",
      color: "from-neuro-green to-neuro-green/50" 
    },
    { 
      name: "Beta", 
      baseFreq: 400, 
      beatFreq: 20, 
      description: "Focus, alertness (13-30Hz)",
      color: "from-cosmic-purple to-cosmic-purple/50" 
    },
    { 
      name: "Gamma", 
      baseFreq: 500, 
      beatFreq: 40, 
      description: "Insight, peak focus (30-50Hz)",
      color: "from-cosmic-blue to-cosmic-blue/50" 
    }
  ];

  // Auto-cycle through presets if enabled
  useEffect(() => {
    if (!autoCycle || !isActive) return;
    
    let currentIndex = 0;
    const presetNames = presets.map(p => p.name);
    
    if (activePreset) {
      const activeIndex = presetNames.indexOf(activePreset);
      if (activeIndex >= 0) {
        currentIndex = activeIndex;
      }
    }
    
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % presets.length;
      selectPreset(presets[currentIndex]);
    }, 300000); // Change every 5 minutes
    
    return () => clearInterval(intervalId);
  }, [autoCycle, isActive, activePreset]);
  
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
  
  const toggleAutoCycle = () => {
    setAutoCycle(prev => !prev);
  };
  
  return (
    <div className="cosmic-panel">
      <h3 className="text-xl font-heading mb-4 text-shadow-neon">Binaural Beats</h3>
      
      <div className="flex flex-col space-y-2 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => selectPreset(preset)}
              disabled={!isActive}
              className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                activePreset === preset.name
                  ? `bg-gradient-to-r ${preset.color} text-white shadow-neon-glow`
                  : 'bg-cosmic-charcoal text-white hover:bg-cosmic-purple/20'
              } ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>
        
        <button
          onClick={toggleAutoCycle}
          disabled={!isActive}
          className={`mt-2 px-4 py-2 rounded-lg transition-all ${
            autoCycle 
              ? 'bg-neuro-gold text-cosmic-dark'
              : 'bg-cosmic-charcoal hover:bg-neuro-gold/20 text-white'
          } ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {autoCycle ? 'Auto-Cycle Enabled' : 'Enable Auto-Cycle'}
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-cosmic-purple-light">Base Frequency: {baseFreq} Hz</label>
            <span className="text-sm text-cosmic-purple-light">20 - 1500 Hz</span>
          </div>
          <Slider
            min={20}
            max={1500}
            step={1}
            value={[baseFreq]}
            onValueChange={([value]) => handleBaseFreqChange(value)}
            disabled={!isActive}
            className={`w-full ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-cosmic-purple-light">Beat Frequency: {beatFreq} Hz</label>
            <span className="text-sm text-cosmic-purple-light">1 - 50 Hz</span>
          </div>
          <Slider
            min={1}
            max={50}
            step={0.1}
            value={[beatFreq]}
            onValueChange={([value]) => handleBeatFreqChange(value)}
            disabled={!isActive}
            className={`w-full ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>
      
      {/* Frequency Visualizer */}
      {isActive && (
        <div className="mt-6 h-16 bg-cosmic-charcoal/50 rounded-lg overflow-hidden relative">
          <div className={`absolute inset-0 flex items-center justify-center ${activePreset ? '' : 'opacity-50'}`}>
            {activePreset && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`h-2 w-full ${getPresetColor(activePreset)}`}>
                      <div className="absolute h-full w-8 bg-white/70 animate-[pulse_2s_ease-in-out_infinite] blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get color based on preset name
function getPresetColor(presetName: string): string {
  switch(presetName) {
    case 'Delta': return 'bg-gradient-to-r from-neuro-blue to-neuro-blue/50';
    case 'Theta': return 'bg-gradient-to-r from-neuro-gold to-neuro-gold/50';
    case 'Alpha': return 'bg-gradient-to-r from-neuro-green to-neuro-green/50';
    case 'Beta': return 'bg-gradient-to-r from-cosmic-purple to-cosmic-purple/50';
    case 'Gamma': return 'bg-gradient-to-r from-cosmic-blue to-cosmic-blue/50';
    default: return 'bg-neuro-gold';
  }
}

export default BinauralBeats;
