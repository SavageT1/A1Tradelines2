/*
 * PageHero.tsx — Reusable page hero banner with background image and overlay.
 * Static markup keeps the hero lightweight and crawlable.
 */

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20 bg-background">
      {/* Background - Fixed/Static */}
      <div className="fixed inset-0 -z-10">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto w-full">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-[0.05em]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
