
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Crown, Repeat, Smartphone, Zap } from "lucide-react";

const ToolsSection = () => {
  return (
    <section id="tools" className="py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4" variant="outline">SMART TOOLS</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Powerful Decision Support</h2>
          <p className="text-foreground/70 text-lg">
            Let our AI-powered tools guide your fantasy decisions with live advice tailored to your team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Captain Optimizer */}
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-10 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Crown className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold font-display">Captain Optimizer</h3>
            </div>
            
            <p className="text-foreground/70 mb-6">
              Never miss out on captain points again. Our optimizer analyzes player data, 
              matchups, venue stats, and historical performances to identify your best 
              captain choices each round.
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                "Suggests top 3 captain choices",
                "Provides confidence rating for each pick",
                "Updates based on late team changes",
                "Shows historical scoring vs opponent"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="mr-3 mt-1 h-5 w-5 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            
            <Button className="gap-2" variant="outline">
              Learn More <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Trade Analyzer */}
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-10 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Repeat className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold font-display">Trade Analyzer</h3>
            </div>
            
            <p className="text-foreground/70 mb-6">
              Make smarter trades with our AI-powered analyzer that evaluates every potential trade 
              based on player projections, breakevens, upcoming fixtures, and injury risk.
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                "Analyzes risk/reward of each trade",
                "Considers short and long-term value",
                "Highlights opportunity cost",
                "Suggests alternative trade targets"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="mr-3 mt-1 h-5 w-5 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            
            <Button className="gap-2" variant="outline">
              Learn More <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Loop Planner */}
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-10 shadow-lg lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display">Loop Planner</h3>
                <Badge className="bg-accent text-accent-foreground mt-1">NEW</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-foreground/70 mb-6">
                  Plan your trades and moves weeks in advance with our intuitive loop planning tool. 
                  Visualize complex trade strategies, loopholes, and optimize your cash generation 
                  and team value with forward-looking analytics.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Visually plan multi-week trade strategies",
                    "Optimize cash generation from rookies",
                    "Identify ideal timing for upgrades",
                    "Maximize your bench scoring options",
                    "Sync with fixture analysis for best results"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-3 mt-1 h-5 w-5 text-primary">
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="gap-2">
                  Try Loop Planner <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="hidden lg:block">
                <div className="rounded-xl bg-primary/10 p-4 h-full relative overflow-hidden">
                  {/* Simple Loop Planner UI Illustration */}
                  <div className="absolute top-4 right-4 flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                  </div>
                  <div className="h-8 w-32 bg-primary/20 rounded-md mb-6"></div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-md bg-primary/20"></div>
                      <div className="h-4 w-28 bg-primary/30 rounded-md"></div>
                      <div className="h-4 w-16 ml-auto bg-primary/20 rounded-md"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-md bg-primary/20"></div>
                      <div className="h-4 w-24 bg-primary/30 rounded-md"></div>
                      <div className="h-4 w-16 ml-auto bg-primary/20 rounded-md"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-md bg-primary/20"></div>
                      <div className="h-4 w-32 bg-accent/40 rounded-md"></div>
                      <div className="h-4 w-16 ml-auto bg-primary/20 rounded-md"></div>
                    </div>
                    <div className="h-px w-full bg-primary/10 my-4"></div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-md bg-primary/20"></div>
                      <div className="h-4 w-28 bg-primary/30 rounded-md"></div>
                      <div className="h-4 w-16 ml-auto bg-accent/40 rounded-md"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-md bg-primary/20"></div>
                      <div className="h-4 w-24 bg-primary/30 rounded-md"></div>
                      <div className="h-4 w-16 ml-auto bg-primary/20 rounded-md"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <div className="h-8 w-20 bg-accent/40 rounded-md"></div>
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

export default ToolsSection;
