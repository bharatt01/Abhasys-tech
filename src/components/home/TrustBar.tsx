import { motion } from "framer-motion";

const clients = [
  { name: "TechCorp", initials: "TC" },
  { name: "InnovateLabs", initials: "IL" },
  { name: "GrowthStack", initials: "GS" },
  { name: "DigitalFirst", initials: "DF" },
  { name: "ScaleUp", initials: "SU" },
  { name: "NextGen", initials: "NG" },
  { name: "FutureTech", initials: "FT" },
  { name: "BrandWise", initials: "BW" },
];

const TrustBar = () => {
  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Trusted by 150+ Growing Brands
        </p>
      </div>

      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling Container */}
        <motion.div
          className="flex gap-12"
          animate={{ x: [0, -50 * clients.length * 2] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Duplicate logos for seamless loop */}
          {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <span className="text-sm font-bold text-muted-foreground">
                  {client.initials}
                </span>
              </div>
              <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
