
import React, { useState } from 'react';

interface HealingScriptCategory {
  id: string;
  name: string;
}

interface HealingScript {
  id: string;
  title: string;
  categoryId: string;
  isFavorite: boolean;
}

interface HealingScriptsProps {
  isActive: boolean;
}

const HealingScripts: React.FC<HealingScriptsProps> = ({ isActive }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const categories: HealingScriptCategory[] = [
    { id: 'all', name: 'All' },
    { id: 'affirmations', name: 'Affirmations' },
    { id: 'hypnosis', name: 'Self-Hypnosis' },
    { id: 'sleep', name: 'Sleep Stories' }
  ];
  
  const scripts: HealingScript[] = [
    { id: 'aff1', title: 'Daily Confidence Boost', categoryId: 'affirmations', isFavorite: true },
    { id: 'aff2', title: 'Abundance Mindset', categoryId: 'affirmations', isFavorite: false },
    { id: 'hyp1', title: 'Breaking Bad Habits', categoryId: 'hypnosis', isFavorite: false },
    { id: 'hyp2', title: 'Anxiety Release', categoryId: 'hypnosis', isFavorite: true },
    { id: 'sleep1', title: 'Journey Through the Stars', categoryId: 'sleep', isFavorite: false },
    { id: 'sleep2', title: 'Ocean Waves Lullaby', categoryId: 'sleep', isFavorite: true }
  ];
  
  const toggleFavorite = (scriptId: string) => {
    // In a real implementation, this would update a state or make an API call
    console.log('Toggle favorite for', scriptId);
  };
  
  const filteredScripts = scripts.filter(script => {
    const matchesCategory = selectedCategory === 'all' || script.categoryId === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      script.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="cosmic-panel">
      <h3 className="text-xl font-heading mb-4 text-shadow-neon">Healing Scripts Library</h3>
      
      {/* Search & Filter */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search scripts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={!isActive}
          className={`cosmic-input w-full ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => isActive && setSelectedCategory(category.id)}
              disabled={!isActive}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-cosmic-purple text-white shadow-neon-glow'
                  : 'bg-cosmic-charcoal text-cosmic-purple-light hover:bg-cosmic-purple/20'
              } ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Script List */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cosmic-purple/20 scrollbar-track-cosmic-charcoal/20">
        {filteredScripts.length === 0 ? (
          <div className="text-center py-8 text-cosmic-purple-light">
            No scripts found
          </div>
        ) : (
          filteredScripts.map((script) => (
            <div
              key={script.id}
              className="p-3 bg-cosmic-charcoal rounded-lg flex justify-between items-center hover:bg-cosmic-purple/10 transition-colors"
            >
              <span>{script.title}</span>
              <button
                onClick={() => isActive && toggleFavorite(script.id)}
                disabled={!isActive}
                className={`p-1 rounded-full ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {script.isFavorite ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#9b87f5" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HealingScripts;
