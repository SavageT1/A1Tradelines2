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
    <section className="page-hero relative flex min-h-[38rem] items-center justify-center overflow-hidden border-b border-slate-200 bg-[#f4f5f7] pt-20 sm:min-h-[42rem]">
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover opacity-[0.12] grayscale"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(44,121,255,.17),transparent_28%),linear-gradient(90deg,rgba(244,245,247,.98)_0%,rgba(244,245,247,.88)_52%,rgba(244,245,247,.72)_100%)]" />
      </div>

      <div className="site-container relative z-10 py-20 text-left sm:py-28">
        <span className="mb-6 flex items-center gap-3 text-[11px] font-black uppercase tracking-[.2em] text-blue-700">
          <span className="h-px w-8 bg-lime-500" /> A1 Tradelines
        </span>
        <h1 className="max-w-4xl text-left font-display text-5xl font-black tracking-[-.035em] text-[#12213f] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
