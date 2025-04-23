
/**
 * Utilities for managing module state
 */

export type ModuleType = 
  | 'relaxation'
  | 'meditation'
  | 'binaural'
  | 'lofi'
  | 'healing';

export interface ModuleState {
  id: ModuleType;
  isActive: boolean;
  name: string;
  description: string;
}

// Initialize all modules state
export const initializeModuleState = (): ModuleState[] => {
  return [
    {
      id: 'relaxation',
      isActive: true,
      name: 'Relaxation Timer',
      description: 'Ambient pads with customizable timer'
    },
    {
      id: 'meditation',
      isActive: false,
      name: 'Guided Meditation',
      description: 'Voice-led sessions with ambient sounds'
    },
    {
      id: 'binaural',
      isActive: false,
      name: 'Binaural Beats',
      description: 'Frequency-based brain entrainment'
    },
    {
      id: 'lofi',
      isActive: false,
      name: 'Lo-Fi Mixer',
      description: 'Create custom lo-fi hip hop beats'
    },
    {
      id: 'healing',
      isActive: false,
      name: 'Healing Scripts',
      description: 'AI-generated affirmations and stories'
    }
  ];
};

// Function to toggle active module, ensuring only one is active at a time
export const toggleActiveModule = (
  modules: ModuleState[],
  moduleId: ModuleType
): ModuleState[] => {
  return modules.map((module) => ({
    ...module,
    isActive: module.id === moduleId
  }));
};
