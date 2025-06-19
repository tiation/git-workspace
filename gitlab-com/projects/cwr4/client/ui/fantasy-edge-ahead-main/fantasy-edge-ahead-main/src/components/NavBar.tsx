
import { Button } from "@/components/ui/button";
import { Apple, Award, Book, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="h-8 w-8 text-primary" />
          <span className="font-display text-xl font-bold">AFL Fantasy Coach</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">Features</a>
          <a href="#tools" className="text-foreground/80 hover:text-primary transition-colors">Smart Tools</a>
          <a href="#alerts" className="text-foreground/80 hover:text-primary transition-colors">Live Alerts</a>
          <a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">Pricing</a>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm">Login</Button>
          <Button size="sm" className="gap-1">
            Download
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground p-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="px-2 py-2 hover:bg-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a 
              href="#tools" 
              className="px-2 py-2 hover:bg-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Smart Tools
            </a>
            <a 
              href="#alerts" 
              className="px-2 py-2 hover:bg-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Live Alerts
            </a>
            <a 
              href="#pricing" 
              className="px-2 py-2 hover:bg-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" size="sm" className="justify-center">
                Login
              </Button>
              <Button size="sm" className="justify-center gap-1">
                Download
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
