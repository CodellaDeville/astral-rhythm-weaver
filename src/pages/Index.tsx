
import React, { useState, useEffect, useRef } from 'react';
import CosmicBackground from '@/components/cosmic/CosmicBackground';
import AppHeader from '@/components/layout/AppHeader';
import BinauralBeats from '@/components/modules/BinauralBeats';
import LofiMixer from '@/components/modules/LofiMixer';

import { createAudioContext, createBinauralBeat, loadAndPlaySample } from '@/utils/audio';

const SAMPLE_BASE_URL = '/samples/';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [activeModule, setActiveModule] = useState<'binaural' | 'ambient'>('binaural');
  
  const audioContextRef = useRef<any>(null);
  const binauralRef = useRef<any>(null);
  const samplePlayersRef = useRef<{[key: string]: any}>({});
  
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        try {
          audioContextRef.current = createAudioContext();
          console.log('AudioContext initialized');
        } catch (error) {
          console.error('Failed to initialize AudioContext:', error);
        }
      }
    };
    
    const handleInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
    
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);
  
  const handlePlayPause = () => {
    if (!audioContextRef.current) return;
    
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    
    if (newPlayingState) {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    } else {
      if (binauralRef.current) {
        binauralRef.current.stop();
      }
      
      Object.values(samplePlayersRef.current).forEach((player: any) => {
        if (player && player.stop) {
          player.stop();
        }
      });
    }
  };
  
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    const normalizedVolume = value / 100;
    
    if (binauralRef.current) {
      binauralRef.current.setVolume(normalizedVolume);
    }
    
    Object.values(samplePlayersRef.current).forEach((player: any) => {
      if (player && player.setVolume) {
        player.setVolume(normalizedVolume);
      }
    });
  };
  
  const handleBinauralFrequencyChange = (baseFreq: number, beatFreq: number) => {
    if (binauralRef.current) {
      binauralRef.current.updateFrequency(baseFreq, beatFreq);
    } else if (isPlaying && audioContextRef.current) {
      binauralRef.current = createBinauralBeat(
        audioContextRef.current,
        baseFreq,
        beatFreq,
        volume / 100
      );
      binauralRef.current.start();
    }
  };
  
  const handleSampleToggle = async (sampleId: string, active: boolean) => {
    if (!audioContextRef.current || !isPlaying) return;
    
    if (active) {
      try {
        const sampleUrl = `${SAMPLE_BASE_URL}${sampleId}.mp3`;
        console.log(`Playing sample: ${sampleId}`);
        
        // Simulate playing the sample - in a real app, you'd load actual audio files
        samplePlayersRef.current[sampleId] = {
          stop: () => { console.log(`Stopping sample: ${sampleId}`); },
          setVolume: (vol: number) => { console.log(`Setting ${sampleId} volume to ${vol}`); }
        };
      } catch (error) {
        console.error(`Failed to load sample ${sampleId}:`, error);
      }
    } else {
      if (samplePlayersRef.current[sampleId]) {
        samplePlayersRef.current[sampleId].stop();
        delete samplePlayersRef.current[sampleId];
      }
    }
  };
  
  return (
    <div className="cosmic-container bg-gradient-to-br from-neuro-green/20 via-neuro-blue/20 to-neuro-gold/20">
      <CosmicBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <AppHeader 
          isPlaying={isPlaying} 
          onPlayPause={handlePlayPause} 
          volume={volume}
          onVolumeChange={handleVolumeChange} 
        />
        
        <main className="flex-grow p-6 md:p-8 max-w-6xl mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-heading text-center mb-6 text-shadow-neon">
              Neuro Mix Music Box
            </h2>
            
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8">
              <button
                onClick={() => setActiveModule('binaural')}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  activeModule === 'binaural'
                    ? 'bg-neuro-gold shadow-gold-glow text-cosmic-dark'
                    : 'bg-neuro-green/20 hover:bg-neuro-green/40 text-white'
                }`}
              >
                <h3 className={`text-sm font-medium ${
                  activeModule === 'binaural' 
                    ? 'text-shadow-gold-neon' 
                    : ''
                }`}>
                  Binaural Beats
                </h3>
              </button>
              
              <button
                onClick={() => setActiveModule('ambient')}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  activeModule === 'ambient'
                    ? 'bg-neuro-gold shadow-gold-glow text-cosmic-dark'
                    : 'bg-neuro-green/20 hover:bg-neuro-green/40 text-white'
                }`}
              >
                <h3 className={`text-sm font-medium ${
                  activeModule === 'ambient' 
                    ? 'text-shadow-gold-neon' 
                    : ''
                }`}>
                  Ambient Mixer
                </h3>
              </button>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              <BinauralBeats 
                onFrequencyChange={handleBinauralFrequencyChange}
                isActive={isPlaying}
              />
              
              <LofiMixer 
                onSampleToggle={handleSampleToggle}
                isActive={isPlaying}
              />
            </div>
          </div>
          
          <div className="cosmic-panel mt-8">
            <h3 className="text-xl font-heading mb-4 text-shadow-neon">Visualization</h3>
            <div className="h-60 flex items-center justify-center">
              {!isPlaying ? (
                <div className="text-cosmic-purple-light">
                  Press play to start visualization
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative w-60 h-60">
                    <div className="absolute inset-0 bg-cosmic-purple/20 rounded-full animate-pulse"></div>
                    <div className="absolute inset-4 bg-cosmic-purple/30 rounded-full animate-[pulse_2s_ease-in-out_infinite_0.5s]"></div>
                    <div className="absolute inset-8 bg-cosmic-purple/40 rounded-full animate-[pulse_2s_ease-in-out_infinite_1s]"></div>
                    <div className="absolute inset-12 bg-cosmic-purple/50 rounded-full animate-[pulse_2s_ease-in-out_infinite_1.5s]"></div>
                    <div className="absolute inset-16 bg-neuro-gold/60 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-neuro-gold-light max-w-lg mx-auto">
              Combine binaural beats with ambient sounds to create your perfect meditation, focus, or sleep soundscape.
              Each session is unique - adjust the mix to match your current mood.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
