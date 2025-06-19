
import { GithubIcon, Twitter, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-white">
              <span className="text-fantasy-purple-light">Awe-Struck</span> Adventures
            </h3>
            <p className="text-sm text-gray-400 mt-1">Epic Dungeons & Dragons campaigns</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <GithubIcon size={18} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            Made with <Heart size={12} className="text-fantasy-purple-light" /> for adventurers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
