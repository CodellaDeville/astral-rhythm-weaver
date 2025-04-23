
import React, { useState, useCallback } from 'react';
import { Drum, Piano, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

interface Sample {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  active: boolean;
  volume: number;
}

interface LofiMixerProps {
  isActive: boolean;
  onSampleToggle: (sampleId: string, active: boolean) => void;
}

const LofiMixer: React.FC<LofiMixerProps> = ({ isActive, onSampleToggle }) => {
  const [bpm, setBpm] = useState(75);
  const [samples, setSamples] = useState<Sample[]>([
    { id: 'drums1', name: 'Boom Bap', icon: Drum, active: false, volume: 80 },
    { id: 'piano1', name: 'Jazz Chords', icon: Piano, active: false, volume: 80 },
    { id: 'vinyl', name: 'Vinyl Crackle', icon: Volume2, active: false, volume: 60 },
  ]);
  
  const toggleSample = useCallback((id: string) => {
    setSamples(prev => {
      const newSamples = prev.map(sample => {
        if (sample.id === id) {
          const newState = !sample.active;
          onSampleToggle(id, newState);
          return { ...sample, active: newState };
        }
        return sample;
      });
      return newSamples;
    });
  }, [onSampleToggle]);

  const handleVolumeChange = useCallback((sampleId: string, value: number) => {
    setSamples(prev =>
      prev.map(sample =>
        sample.id === sampleId
          ? { ...sample, volume: value }
          : sample
      )
    );
  }, []);
  
  const handleBpmChange = useCallback((value: number) => {
    setBpm(value);
  }, []);
  
  return (
    <div className="cosmic-panel">
      <h3 className="text-xl font-heading mb-4 text-shadow-neon">Lo-Fi Hip-Hop Mixer</h3>
      
      {/* BPM Control */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-neuro-gold">Tempo: {bpm} BPM</label>
          <span className="text-sm text-neuro-gold-light">60 - 90 BPM</span>
        </div>
        <Slider
          min={60}
          max={90}
          step={1}
          value={[bpm]}
          onValueChange={([value]) => handleBpmChange(value)}
          disabled={!isActive}
          className={!isActive ? 'opacity-50 cursor-not-allowed' : ''}
        />
      </div>
      
      {/* Transport Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          className={`neon-icon-button border-2 border-neuro-gold/30 hover:border-neuro-gold/70 ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isActive}
        >
          <SkipBack className="h-5 w-5 text-neuro-gold" />
        </button>
        
        <button 
          className={`neon-icon-button border-2 border-neuro-gold/30 hover:border-neuro-gold/70 ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isActive}
        >
          <SkipForward className="h-5 w-5 text-neuro-gold" />
        </button>
      </div>
      
      {/* Sample Pads */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {samples.map((sample) => (
          <div key={sample.id} className="space-y-2">
            <div
              onClick={() => isActive && toggleSample(sample.id)}
              className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-300 cursor-pointer ${
                sample.active 
                  ? 'bg-neuro-gold shadow-gold-glow' 
                  : 'bg-cosmic-charcoal hover:bg-neuro-gold/20'
              } ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <sample.icon className={`h-10 w-10 mb-2 ${sample.active ? 'text-cosmic-dark' : 'text-neuro-gold-light'}`} />
              <span className={`text-sm font-medium ${sample.active ? 'text-cosmic-dark' : 'text-neuro-gold-light'}`}>
                {sample.name}
              </span>
            </div>
            
            {/* Volume Slider */}
            <div className="px-2">
              <Slider
                min={0}
                max={100}
                step={1}
                value={[sample.volume]}
                onValueChange={([value]) => handleVolumeChange(sample.id, value)}
                disabled={!isActive || !sample.active}
                className={(!isActive || !sample.active) ? 'opacity-50 cursor-not-allowed' : ''}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Beat Sequencer */}
      <div className="h-16 bg-cosmic-charcoal rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center text-neuro-gold-light opacity-50">
          {!isActive ? 'Activate module to use mixer' : 'Coming soon: Beat sequencer'}
        </div>
        {isActive && samples.some(s => s.active) && (
          <div className="absolute left-0 top-0 h-full w-1 bg-neuro-gold animate-[pulse_2s_ease-in-out_infinite]"></div>
        )}
      </div>
    </div>
  );
};

export default LofiMixer;
