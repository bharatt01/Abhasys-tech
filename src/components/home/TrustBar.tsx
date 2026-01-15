import { motion } from "framer-motion";

const clients = [
  { name: "TaxReps", initials: "TR", image: "/images/tr-logo.jpg" },
  { name: "CustomerDelight", initials: "CD", image: "/images/cd-logo.png" },
  { name: "SuperShape", initials: "SS", image: "/images/ss-logo.png" }, // no logo → initials
  { name: "CollabKaroo", initials: "CK", image: "/images/cl-logo.jpg" },
  { name: "SpiceVista", initials: "SV" , image: "/images/sv-logo.png" },
  { name: "VMIDAS", initials: "VM" },
  { name: "TathastuLearning", initials: "TL", image: "/images/tl-logo.png" },
  { name: "StarFoundation", initials: "SF", image: "/images/sf-logo.png" },
];

/* Solid color rotation */
const colorStyles = [
  {
    box: "bg-red-600",
    text: "text-red-600",
    iconText: "text-white",
  },
  {
    box: "bg-orange-500",
    text: "text-orange-500",
    iconText: "text-white",
  },
  {
    box: "bg-yellow-400",
    text: "text-yellow-500",
    iconText: "text-black",
  },
  {
    box: "bg-blue-600",
    text: "text-blue-600",
    iconText: "text-white",
  },
];

const TrustBar = () => {
  return (
    <section className="relative bg-white py-16 border-y border-border overflow-hidden z-20">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Trusted by 50+ Growing Companies
        </p>
      </div>

      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling Container */}
        <motion.div
          className="flex gap-14"
          animate={{ x: [0, -50 * clients.length * 2] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...clients, ...clients, ...clients, ...clients].map(
            (client, index) => {
              const colors = colorStyles[index % colorStyles.length];

              return (
                <div
                  key={`${client.name}-${index}`}
                  className="flex items-center gap-3 shrink-0"
                >
                  {/* Icon */}
                 <div
  className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden ${
    client.image ? "bg-white" : colors.box
  }`}
>
  {client.image ? (
    <img
      src={client.image}
      alt={client.name}
      className="w-full h-full object-contain p-1"
      loading="lazy"
      onError={(e) => {
        // fallback to initials if image fails to load
        e.currentTarget.style.display = "none";
      }}
    />
  ) : (
    <span className={`text-sm font-bold ${colors.iconText}`}>
      {client.initials}
    </span>
  )}
</div>

                  {/* Name */}
                  <span
                    className={`text-lg font-semibold whitespace-nowrap ${colors.text}`}
                  >
                    {client.name}
                  </span>
                </div>
              );
            }
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
