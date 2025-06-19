
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingPlanProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const PricingPlan = ({ title, price, description, features, buttonText, isPopular }: PricingPlanProps) => {
  return (
    <Card className={`bg-card/60 backdrop-blur-sm border ${isPopular ? 'border-primary shadow-xl relative' : 'border-border/50'} h-full flex flex-col`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1">MOST POPULAR</Badge>
        </div>
      )}
      <CardHeader className={`pb-6 ${isPopular ? 'pt-8' : ''}`}>
        <CardTitle className="text-2xl font-display">{title}</CardTitle>
        <CardDescription className="mt-2">{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-foreground/60 ml-1">/season</span>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex">
              <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={isPopular ? "default" : "outline"}
          size="lg"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

const PricingSection = () => {
  const pricingPlans = [
    {
      title: "Free Kick",
      price: "Free",
      description: "Get started with the basics",
      features: [
        "Player price tracking",
        "Basic team management",
        "Breaking news updates",
        "Limited player stats",
        "Community access"
      ],
      buttonText: "Sign Up",
      isPopular: false
    },
    {
      title: "Premium Coach",
      price: "$7.99",
      description: "Everything you need to dominate",
      features: [
        "AI-powered Captain Optimizer",
        "Trade Analyzer with insights",
        "Complete player stats and projections",
        "Real-time injury and team selection alerts",
        "Unlimited team management",
        "Exclusive strategy content",
        "Priority support"
      ],
      buttonText: "Get Premium",
      isPopular: true
    },
    {
      title: "Elite League",
      price: "$12.99",
      description: "The ultimate fantasy advantage",
      features: [
        "All Premium Coach features",
        "Advanced Loop Planner",
        "Head-to-head league dominance tools",
        "Draft league analytics",
        "Opposition team analysis",
        "Custom scoring projections",
        "1-on-1 strategy consultations",
        "Early access to new features"
      ],
      buttonText: "Go Elite",
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4" variant="outline">PRICING</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Choose Your Coaching Level</h2>
          <p className="text-foreground/70 text-lg">
            Select the plan that matches your fantasy ambition. All plans include our core tracking features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingPlan 
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              buttonText={plan.buttonText}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <p className="text-foreground/60 text-sm max-w-2xl mx-auto">
            All subscriptions automatically renew for the following season unless cancelled. 
            You can cancel anytime from account settings. Special team discounts available for 
            groups of 5+ coaches.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
