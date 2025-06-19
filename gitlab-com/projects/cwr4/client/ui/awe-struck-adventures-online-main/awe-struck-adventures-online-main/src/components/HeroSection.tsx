
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  // State to control animation of title elements
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      {/* Particle overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgc3Ryb2tlPSIjOWI4N2Y1IiBzdHJva2Utb3BhY2l0eT0iLjMiIGN4PSIxMCIgY3k9IjEwIiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiM5Yjg3ZjUiIGZpbGwtb3BhY2l0eT0iLjIiIGN4PSI5NSIgY3k9IjEwMCIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMzNDM0YwIiBmaWxsLW9wYWNpdHk9Ii4yIiBjeD0iMTgwIiBjeT0iMzAiIHI9IjEuNSIvPjxjaXJjbGUgc3Ryb2tlPSIjMzNDM0YwIiBzdHJva2Utb3BhY2l0eT0iLjIiIGN4PSIxMjAiIGN5PSIxNzAiIHI9IjEuNSIvPjxjaXJjbGUgc3Ryb2tlPSIjOWI4N2Y1IiBzdHJva2Utb3BhY2l0eT0iLjMiIGN4PSIxODAiIGN5PSIxMjAiIHI9IjEuNSIvPjwvZz48L3N2Zz4=')] opacity-40" />
      
      {/* Purple light effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-fantasy-purple/20 blur-[100px] animate-pulse-gentle" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-fantasy-blue/20 blur-[80px] animate-pulse-gentle" />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 transform 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <span className="text-fantasy-gold text-glow-strong">Epic Adventures</span>{" "}
            <span className="text-white">Await</span>
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 transform
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            Embark on legendary quests through mystical realms. Battle fearsome beasts, discover ancient artifacts, and forge your destiny in immersive Dungeons & Dragons campaigns.
          </p>
          
          <div 
            className={`flex flex-col md:flex-row justify-center gap-4 mt-8 transition-all duration-1000 delay-500 transform
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <button className="px-8 py-3 bg-gradient-to-r from-fantasy-purple to-fantasy-blue rounded-lg text-white font-medium hover:shadow-lg hover:shadow-fantasy-purple/30 transition-all duration-300 transform hover:-translate-y-1">
              Begin Your Journey
            </button>
            <button className="px-8 py-3 bg-transparent border border-fantasy-purple-light/50 rounded-lg text-white font-medium hover:bg-fantasy-purple-light/10 transition-all duration-300">
              Watch Trailer
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#adventures" className="text-fantasy-purple-light block">
            <ChevronDown size={32} strokeWidth={1} />
          </a>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-10 h-10 rounded-full bg-fantasy-purple/30 animate-float hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-6 h-6 rounded-full bg-fantasy-blue/20 animate-float animation-delay-2000 hidden lg:block" />
    </section>
  );
};

export default HeroSection;
