import React, { useState, useEffect, useRef } from 'react';
import CosmicBackground from '@/components/cosmic/CosmicBackground';
import AppHeader from '@/components/layout/AppHeader';
import RelaxationTimer from '@/components/modules/RelaxationTimer';
import BinauralBeats from '@/components/modules/BinauralBeats';
import GuidedMeditation from '@/components/modules/GuidedMeditation';
import LofiMixer from '@/components/modules/LofiMixer';
import HealingScripts from '@/components/modules/HealingScripts';

import { ModuleState, ModuleType, initializeModuleState, toggleActiveModule } from '@/utils/moduleState';
import { createAudioContext, createBinauralBeat, loadAndPlaySample } from '@/utils/audio';

const SAMPLE_BASE_URL = '/samples/';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [modules, setModules] = useState<ModuleState[]>(initializeModuleState());
  
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
      
      const activeModule = modules.find(m => m.isActive);
      if (activeModule) {
        startModuleAudio(activeModule.id);
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
  
  const handleModuleChange = (moduleId: ModuleType) => {
    setModules(prev => toggleActiveModule(prev, moduleId));
    
    if (binauralRef.current) {
      binauralRef.current.stop();
    }
    
    Object.values(samplePlayersRef.current).forEach((player: any) => {
      if (player && player.stop) {
        player.stop();
      }
    });
    
    if (isPlaying) {
      startModuleAudio(moduleId);
    }
  };
  
  const startModuleAudio = (moduleId: ModuleType) => {
    if (!audioContextRef.current) return;
    
    switch (moduleId) {
      case 'binaural':
        binauralRef.current = createBinauralBeat(
          audioContextRef.current,
          200,
          10,
          volume / 100
        );
        binauralRef.current.start();
        break;
        
      case 'relaxation':
      case 'meditation':
      case 'lofi':
      case 'healing':
        console.log(`Starting ${moduleId} audio`);
        break;
    }
  };
  
  const handleBinauralFrequencyChange = (baseFreq: number, beatFreq: number) => {
    if (binauralRef.current) {
      binauralRef.current.updateFrequency(baseFreq, beatFreq);
    }
  };
  
  const handleSampleToggle = async (sampleId: string, active: boolean) => {
    if (!audioContextRef.current || !isPlaying) return;
    
    if (active) {
      try {
        const sampleUrl = `${SAMPLE_BASE_URL}${sampleId}.mp3`;
        console.log(`Playing sample: ${sampleId}`);
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
  
  const handleRelaxationStart = (duration: number) => {
    console.log(`Starting relaxation timer for ${duration} minutes`);
  };
  
  const handleRelaxationEnd = () => {
    console.log('Relaxation timer ended');
  };
  
  const handleMeditationPlay = (sessionId: string) => {
    console.log(`Playing meditation session: ${sessionId}`);
  };
  
  const handleMeditationPause = () => {
    console.log('Paused meditation session');
  };

  const activeModule = modules.find(m => m.isActive);
  
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(module.id)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  module.isActive
                    ? 'bg-neuro-gold shadow-gold-glow text-cosmic-dark'
                    : 'bg-neuro-green/20 hover:bg-neuro-green/40 text-white'
                }`}
              >
                <h3 className={`text-sm font-medium ${
                  module.isActive 
                    ? 'text-shadow-gold-neon' 
                    : ''
                }`}>
                  {module.name}
                </h3>
              </button>
            ))}
          </div>
          
          <div className="mb-8">
            {activeModule && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-2xl font-heading">
                    {activeModule.name}
                  </h2>
                  <div className="text-sm text-cosmic-purple-light">
                    {activeModule.description}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {activeModule.id === 'relaxation' && (
                    <RelaxationTimer 
                      onStart={handleRelaxationStart} 
                      onEnd={handleRelaxationEnd}
                      isActive={activeModule.isActive && isPlaying}
                    />
                  )}
                  
                  {activeModule.id === 'meditation' && (
                    <GuidedMeditation 
                      onPlay={handleMeditationPlay}
                      onPause={handleMeditationPause}
                      isActive={activeModule.isActive && isPlaying}
                    />
                  )}
                  
                  {activeModule.id === 'binaural' && (
                    <BinauralBeats 
                      onFrequencyChange={handleBinauralFrequencyChange}
                      isActive={activeModule.isActive && isPlaying}
                    />
                  )}
                  
                  {activeModule.id === 'lofi' && (
                    <LofiMixer 
                      onSampleToggle={handleSampleToggle}
                      isActive={activeModule.isActive && isPlaying}
                    />
                  )}
                  
                  {activeModule.id === 'healing' && (
                    <HealingScripts
                      isActive={activeModule.isActive && isPlaying}
                    />
                  )}
                  
                  <div className="cosmic-panel flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl font-heading mb-4 text-shadow-neon">Visualization</h3>
                      <div className="h-40 flex items-center justify-center">
                        {!isPlaying ? (
                          <div className="text-cosmic-purple-light">
                            Press play to start visualization
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="relative w-40 h-40">
                              <div className="absolute inset-0 bg-cosmic-purple/20 rounded-full animate-pulse"></div>
                              <div className="absolute inset-4 bg-cosmic-purple/30 rounded-full animate-[pulse_2s_ease-in-out_infinite_0.5s]"></div>
                              <div className="absolute inset-8 bg-cosmic-purple/40 rounded-full animate-[pulse_2s_ease-in-out_infinite_1s]"></div>
                              <div className="absolute inset-12 bg-cosmic-purple/50 rounded-full animate-[pulse_2s_ease-in-out_infinite_1.5s]"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-heading mb-6 text-center text-shadow-neon">Wall of Love</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { text: "Looma Mix helps me focus during my workday.", author: "Alex" },
                { text: "The binaural beats have improved my meditation practice significantly.", author: "Maya" },
                { text: "I use the lo-fi mixer to create personal soundtracks while coding. Brilliant!", author: "Jayden" },
                { text: "These guided meditations help me fall asleep every night.", author: "Sophia" },
                { text: "Perfect balance of science and spirituality.", author: "Ethan" },
                { text: "My new favorite ambient sound generator!", author: "Olivia" }
              ].map((testimonial, i) => (
                <div 
                  key={i} 
                  className="cosmic-card hover:shadow-neon-glow transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <p className="mb-4">{testimonial.text}</p>
                  <p className="text-cosmic-purple text-sm">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
