
import { Button } from "@/components/ui/button";
import { Apple, ChevronRight, Download } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-secondary/20 -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-1/5 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-1/5 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
              Ready to Transform Your Fantasy Season?
            </h2>
            <p className="text-foreground/70 text-lg mb-10">
              Smart. Fast. Ruthless. You pick the team — the app handles everything else.
              Join thousands of coaches gaining the edge every week.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8 py-6 text-base font-medium w-full sm:w-auto">
                Download Now
                <Download className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="gap-2 px-8 py-6 text-base font-medium w-full sm:w-auto">
                See All Features
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-secondary border-2 border-background"></div>
                  <div className="w-6 h-6 rounded-full bg-secondary border-2 border-background"></div>
                  <div className="w-6 h-6 rounded-full bg-secondary border-2 border-background"></div>
                </div>
                <div className="ml-2 text-sm text-foreground/70">
                  <span className="font-medium">4.8/5</span> from 2,000+ reviews
                </div>
              </div>
              
              <div className="text-sm text-foreground/70">
                <span className="font-medium">50,000+</span> active coaches
              </div>
            </div>
            
            <div className="mt-10 text-sm text-foreground/60">
              Available on iOS and Android. Free to download with in-app purchases.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
