
/**
 * Utility functions for audio processing in Looma Mix
 */

interface AudioContext extends BaseAudioContext {
  resume(): Promise<void>;
}

// Create and manage the audio context
export const createAudioContext = (): AudioContext => {
  return new (window.AudioContext || (window as any).webkitAudioContext)() as AudioContext;
};

// Generate binaural beats
export const createBinauralBeat = (
  audioContext: AudioContext,
  baseFrequency: number,
  beatFrequency: number,
  volume: number = 0.5
): { start: () => void; stop: () => void; updateFrequency: (base: number, beat: number) => void; setVolume: (volume: number) => void } => {
  // Create oscillator for the left ear
  const leftOsc = audioContext.createOscillator();
  leftOsc.frequency.value = baseFrequency;
  leftOsc.type = 'sine';
  
  // Create oscillator for the right ear
  const rightOsc = audioContext.createOscillator();
  rightOsc.frequency.value = baseFrequency + beatFrequency;
  rightOsc.type = 'sine';
  
  // Create gain nodes for volume control
  const leftGain = audioContext.createGain();
  const rightGain = audioContext.createGain();
  leftGain.gain.value = volume;
  rightGain.gain.value = volume;
  
  // Create a stereo panner
  const leftPanner = audioContext.createStereoPanner();
  leftPanner.pan.value = -1; // Far left
  
  const rightPanner = audioContext.createStereoPanner();
  rightPanner.pan.value = 1; // Far right
  
  // Connect nodes
  leftOsc.connect(leftGain);
  leftGain.connect(leftPanner);
  leftPanner.connect(audioContext.destination);
  
  rightOsc.connect(rightGain);
  rightGain.connect(rightPanner);
  rightPanner.connect(audioContext.destination);
  
  // Control functions
  return {
    start: () => {
      // Resume AudioContext if it's suspended (browser autoplay policy)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      leftOsc.start();
      rightOsc.start();
    },
    
    stop: () => {
      leftOsc.stop();
      rightOsc.stop();
    },
    
    updateFrequency: (base: number, beat: number) => {
      leftOsc.frequency.value = base;
      rightOsc.frequency.value = base + beat;
    },
    
    setVolume: (newVolume: number) => {
      leftGain.gain.value = newVolume;
      rightGain.gain.value = newVolume;
    }
  };
};

// Load and play audio samples
export const loadAndPlaySample = async (
  audioContext: AudioContext,
  url: string,
  loop: boolean = false
): Promise<{ play: () => void; stop: () => void; setVolume: (volume: number) => void }> => {
  // Fetch audio file
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  
  // Decode audio data
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  // Create source node
  let source: AudioBufferSourceNode | null = null;
  let gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);
  
  return {
    play: () => {
      // Stop previous playback if any
      if (source) {
        source.stop();
      }
      
      // Resume AudioContext if needed
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      // Create new source
      source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = loop;
      
      // Connect and play
      source.connect(gainNode);
      source.start();
    },
    
    stop: () => {
      if (source) {
        source.stop();
        source = null;
      }
    },
    
    setVolume: (volume: number) => {
      gainNode.gain.value = volume;
    }
  };
};
