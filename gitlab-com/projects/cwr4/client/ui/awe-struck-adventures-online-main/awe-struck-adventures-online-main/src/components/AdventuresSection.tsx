
import { useState } from "react";
import { ArrowRight, Flame, Mountain, Castle, Skull, Gem } from "lucide-react";

const adventures = [
  {
    id: 1,
    title: "The Crimson Catacombs",
    level: "3-5",
    duration: "8-10 hours",
    description: "Descend into ancient tombs beneath the Bloodmist Mountains where forgotten kings and terrible secrets lie waiting.",
    icon: <Skull className="w-5 h-5" />,
    difficulty: "Challenging",
    tags: ["Dungeon", "Undead", "Traps"]
  },
  {
    id: 2,
    title: "Frost Dragon's Lair",
    level: "7-9",
    duration: "12-15 hours",
    description: "Journey to the frozen north to confront an ancient white dragon terrorizing settlements across the tundra.",
    icon: <Mountain className="w-5 h-5" />,
    difficulty: "Deadly",
    tags: ["Dragons", "Wilderness", "Epic"]
  },
  {
    id: 3,
    title: "Curse of Castle Ravenloft",
    level: "5-7",
    duration: "20+ hours",
    description: "A gothic horror campaign set in the mist-shrouded land of Barovia, ruled by the vampire Count Strahd von Zarovich.",
    icon: <Castle className="w-5 h-5" />,
    difficulty: "Hard",
    tags: ["Horror", "Vampire", "Mystery"]
  },
  {
    id: 4,
    title: "The Ember Archives",
    level: "1-3",
    duration: "4-6 hours",
    description: "Protect a magical library from elemental forces trying to burn the world's knowledge to cinders.",
    icon: <Flame className="w-5 h-5" />,
    difficulty: "Moderate",
    tags: ["Magic", "Elemental", "Beginner-friendly"]
  },
  {
    id: 5,
    title: "Lost Mines of Phandelver",
    level: "1-5",
    duration: "20+ hours",
    description: "Explore a mysterious abandoned mine and the dangerous magical forge hidden within.",
    icon: <Gem className="w-5 h-5" />,
    difficulty: "Beginner",
    tags: ["Classic", "Goblinoids", "Exploration"]
  }
];

interface Adventure {
  id: number;
  title: string;
  level: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  difficulty: string;
  tags: string[];
}

interface DifficultyBadgeProps {
  difficulty: string;
}

const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const getColor = () => {
    switch (difficulty) {
      case "Beginner": return "bg-green-400/20 border-green-400/30 text-green-300";
      case "Moderate": return "bg-blue-400/20 border-blue-400/30 text-blue-300";
      case "Challenging": return "bg-yellow-400/20 border-yellow-400/30 text-yellow-300";
      case "Hard": return "bg-orange-400/20 border-orange-400/30 text-orange-300";
      case "Deadly": return "bg-red-400/20 border-red-400/30 text-red-300";
      default: return "bg-gray-400/20 border-gray-400/30 text-gray-300";
    }
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${getColor()}`}>
      {difficulty}
    </span>
  );
};

interface AdventureCardProps {
  adventure: Adventure;
}

const AdventureCard = ({ adventure }: AdventureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-fantasy-purple-light/30 transition-all duration-300 group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-fantasy-purple/10 to-fantasy-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'animate-magic-sparkle' : ''}`}></div>
      
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-fantasy-purple-dark/30 border border-fantasy-purple-light/20 flex items-center justify-center shrink-0">
          {adventure.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{adventure.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-400">Level {adventure.level}</span>
            <span className="text-gray-600">•</span>
            <span className="text-xs text-gray-400">{adventure.duration}</span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-300 mb-4">{adventure.description}</p>
      
      <div className="flex items-center justify-between">
        <DifficultyBadge difficulty={adventure.difficulty} />
        
        <button className="text-fantasy-purple-light text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
          <span>View Details</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {adventure.tags.map((tag, index) => (
          <span key={index} className="text-xs bg-white/5 px-2 py-1 rounded-md text-gray-400">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const AdventuresSection = () => {
  return (
    <section id="adventures" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white text-glow">
            Epic <span className="text-fantasy-blue">Quests</span> Await
          </h2>
          <p className="text-gray-300">
            From treacherous dungeons to mystical realms, choose your next adventure and write your legend 
            in the annals of history. Are you brave enough to face what awaits in the shadows?
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adventures.map(adventure => (
            <AdventureCard key={adventure.id} adventure={adventure} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-fantasy-purple to-fantasy-blue rounded-lg text-white font-medium hover:shadow-lg hover:shadow-fantasy-purple/30 transition-all duration-300">
            Browse All Adventures
          </button>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-fantasy-purple/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-fantasy-blue/10 rounded-full blur-[120px]" />
    </section>
  );
};

export default AdventuresSection;
