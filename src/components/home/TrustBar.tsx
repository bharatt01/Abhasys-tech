import Marquee from "./Marquee";

const clients = [
  { name: "TaxReps", initials: "TR", image: "/images/tr-logo.jpg" },
  { name: "CustomerDelight", initials: "CD", image: "/images/cd-logo.png" },
  { name: "SuperShape", initials: "SS", image: "/images/ss-logo.png" },
  { name: "CollabKaroo", initials: "CK", image: "/images/cl-logo.jpg" },
  { name: "SpiceVista", initials: "SV", image: "/images/sv-logo.png" },
  { name: "VMIDAS", initials: "VM" },
  { name: "TathastuLearning", initials: "TL", image: "/images/tl-logo.png" },
  { name: "StarFoundation", initials: "SF", image: "/images/sf-logo.png" },
];

/* Solid color rotation */
const colorStyles = [
  { box: "bg-red-600", text: "text-red-600", iconText: "text-white" },
  { box: "bg-orange-500", text: "text-orange-500", iconText: "text-white" },
  { box: "bg-yellow-400", text: "text-yellow-500", iconText: "text-black" },
  { box: "bg-blue-600", text: "text-blue-600", iconText: "text-white" },
];

/* One half = the client list twice (16 items, divisible by 4 so colors line up across halves). */
const half = [...clients, ...clients];

const TrustBar = () => (
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

      {/* Duration = speed (bigger is slower). The loop is now seamless: the old one jumped back. */}
      <Marquee duration={80}>
        {[0, 1].map((h) =>
          half.map((client, index) => {
            const colors = colorStyles[index % colorStyles.length];

            return (
              <div
                key={`${h}-${client.name}-${index}`}
                className="flex items-center gap-3 shrink-0 pr-14"
              >
                <div
                  className={`w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden ${
                    client.image ? "bg-white" : colors.box
                  }`}
                >
                  {client.image ? (
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-full h-full object-contain p-1"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className={`text-sm font-bold ${colors.iconText}`}>{client.initials}</span>
                  )}
                </div>

                <span className={`text-lg font-semibold whitespace-nowrap ${colors.text}`}>
                  {client.name}
                </span>
              </div>
            );
          }),
        )}
      </Marquee>
    </div>
  </section>
);

export default TrustBar;