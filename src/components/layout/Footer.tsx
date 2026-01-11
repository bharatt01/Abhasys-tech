import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">
                Apex<span className="text-accent">Growth</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Transforming Indian businesses through innovative technology and strategic growth solutions.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Services", "Case Studies", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-primary-foreground/70 text-sm hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {["Web Development", "App Development", "SEO & Marketing", "Physical Branding"].map((item) => (
                <li key={item}>
                  <Link
                    to="/services"
                    className="text-primary-foreground/70 text-sm hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                hello@apexgrowth.in
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span>Cyber Hub, Gurugram<br />Haryana, India 122002</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {currentYear} ApexGrowth. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-primary-foreground/50 text-sm hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/50 text-sm hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
