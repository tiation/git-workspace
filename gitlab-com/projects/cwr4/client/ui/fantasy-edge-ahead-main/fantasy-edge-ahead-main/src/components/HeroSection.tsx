
import { Button } from "@/components/ui/button";
import { Apple, ChevronRight, Download, MessageSquare, Smartphone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 mb-4 text-sm font-medium bg-background/50 backdrop-blur-sm">
              <span className="text-primary">New Version 3.0</span>
              <span className="mx-2 h-1 w-1 rounded-full bg-primary"></span>
              <span className="text-foreground/70">Now with AI Coach</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display">
              The Ultimate AFL Fantasy Coach in Your Pocket
            </h1>
            
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto lg:mx-0">
              Not just another fantasy companion — your personal assistant coach, powered by AI and live data. Get every edge to stay two steps ahead.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="gap-2 px-6 py-6 text-base font-medium w-full sm:w-auto animate-bounce-subtle">
                Download Now
                <Download className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="gap-2 px-6 py-6 text-base font-medium w-full sm:w-auto">
                Watch Demo
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-3 mt-8">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-background flex items-center justify-center text-xs font-medium">JD</div>
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-background flex items-center justify-center text-xs font-medium">MR</div>
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-background flex items-center justify-center text-xs font-medium">TS</div>
              </div>
              <div className="text-sm text-foreground/70">
                <span className="font-semibold">500+</span> coaches joined this week
              </div>
            </div>
          </div>
          
          {/* App Preview Image */}
          <div className="flex-1 hidden lg:block">
            <div className="relative mx-auto w-[280px] h-[570px] bg-primary/5 rounded-[40px] border-4 border-foreground/10 shadow-xl overflow-hidden">
              <div className="absolute top-0 w-40 h-6 bg-foreground/10 rounded-b-xl left-1/2 transform -translate-x-1/2"></div>
              <div className="absolute inset-5 bg-primary rounded-[28px] overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-foreground/10 to-transparent"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="h-3 w-16 bg-white/20 rounded-full"></div>
                      <div className="h-4 w-24 bg-white/40 rounded-full mt-1"></div>
                    </div>
                    <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white/70" />
                    </div>
                  </div>
                  {/* Dashboard Preview */}
                  <div className="space-y-3">
                    <div className="h-20 bg-white/10 rounded-xl p-3">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="h-3 w-20 bg-white/30 rounded-full"></div>
                          <div className="h-4 w-28 bg-white/40 rounded-full"></div>
                          <div className="h-2 w-16 bg-white/20 rounded-full"></div>
                        </div>
                        <div className="h-12 w-12 bg-accent/30 rounded-lg"></div>
                      </div>
                    </div>
                    <div className="h-20 bg-white/10 rounded-xl"></div>
                    <div className="h-20 bg-white/10 rounded-xl"></div>
                    <div className="h-10 bg-accent/20 rounded-xl mt-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
