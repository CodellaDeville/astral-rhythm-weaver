
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

// Mock URL for sample data
const SAMPLE_BASE_URL = '/samples/';

const Index = () => {
  // Global audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [modules, setModules] = useState<ModuleState[]>(initializeModuleState());
  
  // Audio hooks
  const audioContextRef = useRef<any>(null);
  const binauralRef = useRef<any>(null);
  const samplePlayersRef = useRef<{[key: string]: any}>({});
  
  // Initialize audio context
  useEffect(() => {
    // Create AudioContext only on first user interaction
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
    
    // Listen for user interaction
    const handleInteraction = () => {
      initAudio();
      // Remove listeners after first interaction
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
  
  // Handle global play/pause
  const handlePlayPause = () => {
    if (!audioContextRef.current) return;
    
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    
    if (newPlayingState) {
      // Resume audio context if suspended
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      
      // Start active module's audio
      const activeModule = modules.find(m => m.isActive);
      if (activeModule) {
        startModuleAudio(activeModule.id);
      }
    } else {
      // Pause all audio
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
  
  // Handle volume change
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    const normalizedVolume = value / 100;
    
    // Update binaural volume
    if (binauralRef.current) {
      binauralRef.current.setVolume(normalizedVolume);
    }
    
    // Update sample players volume
    Object.values(samplePlayersRef.current).forEach((player: any) => {
      if (player && player.setVolume) {
        player.setVolume(normalizedVolume);
      }
    });
  };
  
  // Switch active module
  const handleModuleChange = (moduleId: ModuleType) => {
    setModules(prev => toggleActiveModule(prev, moduleId));
    
    // Stop all current audio
    if (binauralRef.current) {
      binauralRef.current.stop();
    }
    
    Object.values(samplePlayersRef.current).forEach((player: any) => {
      if (player && player.stop) {
        player.stop();
      }
    });
    
    // If currently playing, start the new module's audio
    if (isPlaying) {
      startModuleAudio(moduleId);
    }
  };
  
  // Start audio for a specific module
  const startModuleAudio = (moduleId: ModuleType) => {
    if (!audioContextRef.current) return;
    
    switch (moduleId) {
      case 'binaural':
        // Initialize binaural with default frequencies
        binauralRef.current = createBinauralBeat(
          audioContextRef.current,
          200,  // base frequency
          10,   // beat frequency
          volume / 100  // normalized volume
        );
        binauralRef.current.start();
        break;
        
      case 'relaxation':
      case 'meditation':
      case 'lofi':
      case 'healing':
        // These would load and play appropriate samples
        // Implementation would depend on available samples
        console.log(`Starting ${moduleId} audio`);
        break;
    }
  };
  
  // Handle binaural frequency change
  const handleBinauralFrequencyChange = (baseFreq: number, beatFreq: number) => {
    if (binauralRef.current) {
      binauralRef.current.updateFrequency(baseFreq, beatFreq);
    }
  };
  
  // Handle lofi sample toggle
  const handleSampleToggle = async (sampleId: string, active: boolean) => {
    if (!audioContextRef.current || !isPlaying) return;
    
    if (active) {
      // Load and play the sample
      try {
        // This would connect to actual sample files in a real implementation
        const sampleUrl = `${SAMPLE_BASE_URL}${sampleId}.mp3`;
        
        // Mock the loading and playing
        console.log(`Playing sample: ${sampleId}`);
        
        // In a real implementation, we would:
        // const player = await loadAndPlaySample(audioContextRef.current, sampleUrl, true);
        // player.play();
        // samplePlayersRef.current[sampleId] = player;
      } catch (error) {
        console.error(`Failed to load sample ${sampleId}:`, error);
      }
    } else {
      // Stop the sample
      if (samplePlayersRef.current[sampleId]) {
        samplePlayersRef.current[sampleId].stop();
        delete samplePlayersRef.current[sampleId];
      }
    }
  };
  
  // Handle relaxation timer
  const handleRelaxationStart = (duration: number) => {
    console.log(`Starting relaxation timer for ${duration} minutes`);
    // Here we would start the ambient sounds
  };
  
  const handleRelaxationEnd = () => {
    console.log('Relaxation timer ended');
    // Here we would fade out the ambient sounds
  };
  
  // Handle meditation session
  const handleMeditationPlay = (sessionId: string) => {
    console.log(`Playing meditation session: ${sessionId}`);
    // Here we would load and play the guided meditation
  };
  
  const handleMeditationPause = () => {
    console.log('Paused meditation session');
    // Here we would pause the guided meditation
  };

  // Find the active module
  const activeModule = modules.find(m => m.isActive);
  
  return (
    <div className="cosmic-container">
      {/* Cosmic Background */}
      <CosmicBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <AppHeader 
          isPlaying={isPlaying} 
          onPlayPause={handlePlayPause} 
          volume={volume}
          onVolumeChange={handleVolumeChange} 
        />
        
        <main className="flex-grow p-6 md:p-8 max-w-6xl mx-auto w-full">
          {/* Module Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(module.id)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  module.isActive
                    ? 'bg-cosmic-purple shadow-neon-glow'
                    : 'bg-cosmic-charcoal hover:bg-cosmic-purple/20'
                }`}
              >
                <h3 className="text-sm font-medium">{module.name}</h3>
              </button>
            ))}
          </div>
          
          {/* Active Module Display */}
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
                
                {/* Module Content */}
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
                  
                  {/* Visualization Panel - shown for all modules */}
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
                            {/* Placeholder for visualization - would be replaced with actual visuals */}
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
          
          {/* Footer Content - Wall of Love */}
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
