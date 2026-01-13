import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ScrollOverlapSlides from "@/components/home/StackedSlides";
import Stats from "@/components/home/Stats";
import TrustBar from "@/components/home/TrustBar";
import ServicesPreview from "@/components/home/ServicesPreview";
import CTA from "@/components/home/CTA";
import CenterExpandReveal from "@/components/home/CenterExpandReveal";
import CurtainReveal from "@/components/home/CurtainReveal";
import DepthZoomReveal from "@/components/home/DepthZoomReveal";
import CapabilitiesShowcase from "@/components/home/MomentumSection";
import FocusServices from "@/components/home/MomentumSection";
import MomentumSection from "@/components/home/MomentumSection";
import SelectedWork from "@/components/home/SelectedWork";
import ImpactProcess from "@/components/home/ImpactProcess";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <div className="relative z-20">
        <Stats />
        <SelectedWork />
        <ScrollOverlapSlides/>

        <TrustBar />
        <ImpactProcess />
        <CenterExpandReveal />
        
        <ServicesPreview />
        <CurtainReveal />
        <MomentumSection   />
        
        <CTA />
        </div>
      </main>
      <Footer />
      
    </div>
  );
};

export default Index;
