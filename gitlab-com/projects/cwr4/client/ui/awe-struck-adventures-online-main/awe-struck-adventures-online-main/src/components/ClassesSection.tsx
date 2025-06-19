
import { useState } from "react";
import { Shield, Swords, Wand, BookOpen, Hammer, Crosshair, Leaf } from "lucide-react";

const classData = [
  {
    id: 1,
    name: "Paladin",
    icon: <Shield className="w-8 h-8" />,
    description: "Holy warriors who channel divine magic and righteous fury. Masters of protection and healing magic.",
    abilities: ["Divine Smite", "Lay on Hands", "Aura of Protection"],
    color: "from-blue-600 to-blue-400"
  },
  {
    id: 2,
    name: "Fighter",
    icon: <Swords className="w-8 h-8" />,
    description: "Skilled warriors and weapon masters who excel in combat through superior training and technique.",
    abilities: ["Action Surge", "Second Wind", "Combat Superiority"],
    color: "from-red-600 to-red-400"
  },
  {
    id: 3,
    name: "Wizard",
    icon: <Wand className="w-8 h-8" />,
    description: "Scholars of arcane magic who wield powerful spells through careful study and preparation.",
    abilities: ["Arcane Recovery", "Spell Mastery", "Arcane Tradition"],
    color: "from-fantasy-purple to-fantasy-purple-light"
  },
  {
    id: 4,
    name: "Cleric",
    icon: <BookOpen className="w-8 h-8" />,
    description: "Divine spellcasters who serve deities and channel their power to heal and protect.",
    abilities: ["Channel Divinity", "Divine Intervention", "Divine Domain"],
    color: "from-yellow-500 to-amber-300"
  },
  {
    id: 5,
    name: "Barbarian",
    icon: <Hammer className="w-8 h-8" />,
    description: "Fierce warriors who channel primal rage to enhance their physical might in battle.",
    abilities: ["Rage", "Reckless Attack", "Brutal Critical"],
    color: "from-orange-600 to-orange-400"
  },
  {
    id: 6,
    name: "Ranger",
    icon: <Crosshair className="w-8 h-8" />,
    description: "Skilled hunters and trackers who blend martial prowess with nature magic.",
    abilities: ["Favored Enemy", "Natural Explorer", "Primeval Awareness"],
    color: "from-emerald-600 to-emerald-400"
  },
  {
    id: 7,
    name: "Druid",
    icon: <Leaf className="w-8 h-8" />,
    description: "Nature's guardians who wield elemental magic and can transform into beasts.",
    abilities: ["Wild Shape", "Nature's Sanctuary", "Beast Spells"],
    color: "from-green-600 to-green-400"
  }
];

interface ClassData {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  abilities: string[];
  color: string;
}

interface ClassCardProps {
  characterClass: ClassData;
  isActive: boolean;
  onClick: () => void;
}

const ClassCard = ({ characterClass, isActive, onClick }: ClassCardProps) => {
  const { name, icon, description, abilities, color } = characterClass;
  
  return (
    <div 
      className={`rounded-xl magical-border glass p-6 cursor-pointer transition-all duration-300 transform ${
        isActive ? 'scale-105' : 'hover:scale-102 hover:shadow-fantasy-purple/20'
      }`}
      onClick={onClick}
    >
      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4 mx-auto`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-center mb-2 text-white">{name}</h3>
      
      {isActive && (
        <div className="mt-4 animate-fade-in">
          <p className="text-gray-300 mb-4 text-sm">{description}</p>
          <div className="space-y-1">
            <p className="text-xs font-medium text-fantasy-purple-light">KEY ABILITIES</p>
            <ul className="text-xs text-gray-300">
              {abilities.map((ability, index) => (
                <li key={index} className="flex items-center gap-1 mb-1">
                  <div className="w-1 h-1 rounded-full bg-fantasy-purple-light"></div>
                  {ability}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const ClassesSection = () => {
  const [activeClass, setActiveClass] = useState(3);

  const handleClassClick = (id) => {
    setActiveClass(id);
  };

  return (
    <section id="classes" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white text-glow">
            Choose Your <span className="text-fantasy-purple-light">Class</span>
          </h2>
          <p className="text-gray-300">
            Every hero's journey begins with a choice. Will you master arcane spells, divine healing, 
            stealthy precision, or brute force? Your class defines your abilities and approach to adventure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {classData.map(characterClass => (
            <ClassCard 
              key={characterClass.id}
              characterClass={characterClass} 
              isActive={characterClass.id === activeClass}
              onClick={() => handleClassClick(characterClass.id)}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-fantasy-purple/30 border border-fantasy-purple-light/40 rounded-lg text-white font-medium hover:bg-fantasy-purple/40 transition-all duration-300">
            Create Character
          </button>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-fantasy-blue/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-fantasy-purple/10 rounded-full blur-[120px]" />
    </section>
  );
};

export default ClassesSection;
