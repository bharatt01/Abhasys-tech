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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ScrollOverlapSlides/>

        <TrustBar />
        <CenterExpandReveal />
        
        <ServicesPreview />
        <CurtainReveal />
        <DepthZoomReveal />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
