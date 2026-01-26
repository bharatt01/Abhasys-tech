import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Award, 
  Users, 
  Target, 
  Lightbulb,
  Linkedin,
  Twitter,
  Mail
} from "lucide-react";
import { User } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import ParallaxSection from "@/components/ui/ParallaxSection";
import ValuesPop from "@/components/home/Values";
import DepthZoomReveal from "@/components/home/DepthZoomReveal";
const timelineEvents = [
  {
    year: "2021",
    title: "The Beginning",
    description: "Founded in Faridabad with a vision to transform Indian businesses through technology and strategy.",
    highlight: "3 team members, 1 office",
  },
  {
    year: "2022",
    title: "First Major Win",
    description: "Secured our first enterprise client and expanded digital marketing services.",
    highlight: "50+ projects delivered",
  },
  {
    year: "2023",
    title: "Going Remote-First",
    description: "Pivoted to remote operations, expanded team across India, and launched SaaS maintenance vertical.",
    highlight: "100+ clients served",
  },
  {
    year: "2024",
    title: "Physical Marketing Launch",
    description: "Introduced BTL activations and offline branding services to offer 360° solutions.",
    highlight: "25 team members",
  },
  {
    year: "2025",
    title: "National Expansion",
    description: "Opened offices in Mumbai and Bangalore, launched consultancy services.",
    highlight: "300+ projects milestone",
  },
  {
    year: "2026",
    title: "AI Integration",
    description: "Integrated AI/LLM capabilities into our tech stack, pioneering AI-first solutions.",
    highlight: "500+ successful projects",
  },
];

const teamMembers = [
  
  {
    name: "Bharat Sharma",
    role: "Founder",
    image: "/images/Founder.jpg",
    bio: "Business development expert with deep enterprise sales experience.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Abhishek Rawat",
    role: "Web Developer",
    image: "/images/Technical-Head.jpg",
    bio: "Strategy consultant helping businesses optimize operations and scale.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Bhavesh Gupta",
    role: "Business Head",
    image: "/images/founder5.png",
    bio: "Award-winning designer specializing in brand identity and UX design.",
    linkedin: "#",
    twitter: "#",
  },
];

const iconStyles = [
  {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    hoverBg: "group-hover:bg-emerald-600",
  },
  {
    bg: "bg-orange-100",
    text: "text-orange-700",
    hoverBg: "group-hover:bg-orange-600",
  },
  {
    bg: "bg-purple-100",
    text: "text-purple-700",
    hoverBg: "group-hover:bg-purple-600",
  },
  {
    bg: "bg-rose-100",
    text: "text-rose-700",
    hoverBg: "group-hover:bg-rose-600",
  },
];

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We measure success by the impact we create for our clients' businesses.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We embrace cutting-edge technologies and creative approaches.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "We build lasting relationships based on trust and transparency.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We deliver quality in every project, big or small.",
  },
];

const TimelineItem = ({ 
  event, 
  index 
}: { 
  event: typeof timelineEvents[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
     
     className={`flex items-center gap-6 ${isEven ? "flex-row" : "flex-row-reverse"} mb-9 last:mb-0`}
>
      <div className={`flex-1 ${isEven ? "text-right" : "text-left"}`}>
        <div className={`inline-block p-6 rounded-3xl bg-card border border-border shadow-card hover:shadow-lift transition-all duration-300 ${isEven ? "ml-auto" : "mr-auto"}`}>
          <span className="text-4xl font-extrabold text-gradient">{event.year}</span>
          <h3 className="text-xl font-bold mt-2 mb-2">{event.title}</h3>
          <p className="text-muted-foreground mb-3">{event.description}</p>
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
            {event.highlight}
          </span>
        </div>
      </div>
     <div className="relative">
  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 shadow-[0_0_16px_rgba(168,85,247,0.6)] z-10 relative" />
  {index < timelineEvents.length - 1 && (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[2px] h-24 bg-gradient-to-b from-purple-400 to-transparent" />
  )}
</div>

      
      <div className="flex-1" />
    </motion.div>
  );
};

const TeamCard = ({ 
  member, 
  index 
}: { 
  member: typeof teamMembers[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-card hover:shadow-lift transition-all duration-500 hover:-translate-y-2">
    <div className="h-[380px] overflow-hidden">
  <div className="h-[380px] overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 relative">
  <img
    src={member.image}
    alt={member.name}
    onError={(e) => {
      e.currentTarget.style.display = "none";
      const icon = e.currentTarget.nextElementSibling as HTMLElement;
      if (icon) icon.style.display = "flex";
    }}
    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
  />

  {/* Fallback Icon */}
  <div className="hidden absolute inset-0 items-center justify-center">
    <User className="w-20 h-20 text-gray-400" />
  </div>
</div>


          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-primary-foreground/80 text-sm mb-4">{member.bio}</p>
            <div className="flex gap-3">
              <a href={member.linkedin} className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4 text-primary-foreground" />
              </a>
              <a href={member.twitter} className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4 text-primary-foreground" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary transition-colors">
                <Mail className="w-4 h-4 text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-bold">{member.name}</h3>
          <p className="text-primary font-medium">{member.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section ref={heroRef} className="container mx-auto px-4 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-lg font-semibold mb-6">
              About Us
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-heading mb-6">
              Building the Future of{" "}
              <span className="text-gradient">Business</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
           We are a technology and growth consultancy helping Indian businesses
build scalable digital products, high-converting websites, and
data-driven marketing systems that deliver measurable results.

            </p>
          </motion.div>
        </section>

        {/* Vision Cards */}
        <section className="container mx-auto px-4 mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            <ParallaxSection speed={0.1}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-full p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Our Mission</h2>
                <p className="text-lg text-primary-foreground/90 relative z-10 leading-relaxed">
               Our mission is to help Indian startups, SMEs, and enterprises adopt
modern technology, performance-driven marketing, and scalable systems
without complexity or unnecessary cost.

We focus on clarity, execution, and long-term growth — not short-term
tactics.

                </p>
              </motion.div>
            </ParallaxSection>

            <ParallaxSection speed={0.15}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative h-full p-8 md:p-12 rounded-3xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-foreground/10 rounded-full blur-3xl" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Our Vision</h2>
                <p className="text-lg text-accent-foreground/90 relative z-10 leading-relaxed">
           Our vision is to become India’s most reliable digital growth partner —
trusted by businesses for delivering strategy-led design, robust
technology, and sustainable growth outcomes across industries.

                </p>
              </motion.div>
            </ParallaxSection>
          </div>
        </section>

<DepthZoomReveal />
       {/* Values */}
       <ValuesPop />

        {/* Timeline */}
<section className="container mx-auto px-4 mb-16">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-4"
  >
    {/* <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2"> */}
   <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-lg font-semibold mb-6">
            
    Our  Journey
    </span>
    <h2 className="text-3xl md:text-5xl font-extrabold font-bold mb-2">
      From Startup to Industry Leader
    </h2>
    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
      From a small founding team to a nationally recognized technology and growth consultancy,
      our journey reflects consistent delivery, long-term client relationships,
      and continuous evolution.
    </p>
  </motion.div>

  {/* Desktop Timeline */}
  <div className="max-w-4xl mx-auto hidden md:block">
    {timelineEvents.map((event, index) => (
      <TimelineItem key={event.year} event={event} index={index} />
    ))}
  </div>

  {/* Mobile Timeline */}
  <div className="md:hidden space-y-1.5">
    {timelineEvents.map((event, index) => (
      <motion.div
        key={event.year}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="p-4 rounded-2xl bg-card border border-border"
      >
        <span className="text-2xl font-extrabold text-gradient">{event.year}</span>
        <h3 className="text-lg font-bold mt-1 mb-1">{event.title}</h3>
        <p className="text-muted-foreground mb-1.5">{event.description}</p>
        <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
          {event.highlight}
        </span>
      </motion.div>
    ))}
  </div>
</section>

        {/* Team Section */}
        <section className="container mx-auto px-4 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-lg font-semibold mb-4">
              Meet Our Team
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-bold mb-4">The Team Behind Your Success</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A diverse team of experts passionate about driving business growth.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 gradient-premium" />
            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Join Success Stories?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Let's discuss how we can help transform your business.
              </p>
              <Button asChild variant="secondary" size="xl">
                <Link to="/contact" className="gap-2">
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;