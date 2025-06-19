
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatarSrc?: string;
  initials: string;
}

const Testimonial = ({ quote, author, role, avatarSrc, initials }: TestimonialProps) => {
  return (
    <Card className="bg-card/60 backdrop-blur-sm hover:shadow-md transition-shadow overflow-hidden border border-border/50 h-full flex flex-col">
      <CardContent className="pt-6 pb-8 flex-1 flex flex-col">
        <div className="mb-4 text-primary">
          <Quote className="h-6 w-6" />
        </div>
        <p className="text-foreground/80 mb-6 flex-1">{quote}</p>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={avatarSrc} alt={author} />
            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{author}</p>
            <p className="text-sm text-foreground/60">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "This app changed my fantasy season. The captain suggestions alone have added hundreds of points to my total.",
      author: "James Wilson",
      role: "3rd Year Fantasy Coach",
      initials: "JW"
    },
    {
      quote: "The trade analyzer saved me from making terrible decisions multiple times. Worth every penny for the edge it gives.",
      author: "Sarah Thompson",
      role: "League Champion 2024",
      initials: "ST"
    },
    {
      quote: "I went from middle of the pack in my league to top 3% overall ranking after using this app for just one season.",
      author: "Mark Roberts",
      role: "Top 1000 Coach",
      initials: "MR"
    },
    {
      quote: "The rookie alerts are unmatched - I've picked up breakout players before anyone else in my league even noticed them.",
      author: "David Chen",
      role: "Draft League Champion",
      initials: "DC"
    },
    {
      quote: "Loop planning feature is brilliant. Makes trade strategy so much easier to visualize and execute.",
      author: "Emma Rodriguez",
      role: "5-Year Fantasy Veteran",
      initials: "ER"
    },
    {
      quote: "Never making another captain decision without consulting the app first. It's like having a professional analyst on call.",
      author: "Thomas Walker",
      role: "Cash League Winner",
      initials: "TW"
    },
  ];

  return (
    <section className="py-20 px-4 md:px-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Loved by Fantasy Coaches</h2>
          <p className="text-foreground/70 text-lg">
            Don't just take our word for it. Here's what our users are saying about AFL Fantasy Coach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              initials={testimonial.initials}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
