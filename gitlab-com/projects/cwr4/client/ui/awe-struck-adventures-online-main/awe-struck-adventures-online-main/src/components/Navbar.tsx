
import { useState } from "react";
import { Menu, X, Scroll, Map, Users, Book } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative z-50 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Scroll className="h-8 w-8 text-fantasy-purple-light" strokeWidth={1.5} />
          <a href="#" className="text-2xl font-bold text-white text-glow">
            <span className="text-fantasy-purple-light">Awe-Struck</span> Adventures
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <a href="#adventures" className="text-white hover:text-fantasy-purple-light transition-colors duration-300 flex items-center gap-2">
            <Map size={16} />
            <span>Adventures</span>
          </a>
          <a href="#classes" className="text-white hover:text-fantasy-purple-light transition-colors duration-300 flex items-center gap-2">
            <Users size={16} />
            <span>Classes</span>
          </a>
          <a href="#lore" className="text-white hover:text-fantasy-purple-light transition-colors duration-300 flex items-center gap-2">
            <Book size={16} />
            <span>Lore</span>
          </a>
          <button className="bg-gradient-to-r from-fantasy-purple to-fantasy-blue px-6 py-2 rounded-md text-white hover:shadow-lg hover:shadow-fantasy-purple/30 transition-all duration-300">
            Join Campaign
          </button>
        </div>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="lg:hidden text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 glass p-4 lg:hidden">
          <div className="flex flex-col space-y-4">
            <a href="#adventures" className="text-white hover:text-fantasy-purple-light transition-colors duration-300 flex items-center gap-2 py-2">
              <Map size={16} />
              <span>Adventures</span>
            </a>
            <a href="#classes" className="text-white hover:text-fantasy-purple-light transition-colors duration-300 flex items-center gap-2 py-2">
              <Users size={16} />
              <span>Classes</span>
            </a>
            <a href="#lore" className="text-white hover:text-fantasy-purple-light transition-colors duration-300 flex items-center gap-2 py-2">
              <Book size={16} />
              <span>Lore</span>
            </a>
            <button className="bg-gradient-to-r from-fantasy-purple to-fantasy-blue px-6 py-2 rounded-md text-white hover:shadow-lg hover:shadow-fantasy-purple/30 transition-all duration-300 mt-2">
              Join Campaign
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
