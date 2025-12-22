// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import GoldPriceSection from "../components/GoldPriceSection";
import GoldMarketSection from "../components/GoldMarketSection";
import GoldHistorySection from "../components/GoldHistorySection";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Background only (unclickable) */}
      <div className="home-hero" />

      {/* Foreground content (clickable) */}
      <section className="relative z-10 flex items-start min-h-screen pt-24 md:pt-28">
        <div className="container relative z-10 -translate-y-6 md:-translate-y-10 grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
          {/* Left content */}
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#FCD56D] mb-3 hero-title-shadow">
              DUBAI&apos;S PREMIER PRECIOUS METALS SHOP
            </p>

            <h1 className="text-3xl md:text-5xl leading-tight font-display text-white mb-4 hero-title-shadow">
              Trusted seller of{" "}
              <span className="text-[#FCD56D]">gold</span> &amp;{" "}
              <span className="text-slate-100/90">silver</span>{" "}
              investment products
            </h1>

            <p className="text-sm md:text-[15px] text-slate-100 max-w-xl mb-8 hero-subtitle-shadow">
              We specialise in hallmarked gold and silver bars and coins with
              transparent pricing, insured delivery and secure storage-friendly
              formats for investors in the UAE and beyond. No jewellery – only
              investment-grade bullion.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/shop")}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-2.5 text-sm font-semibold text-slate-900 shadow-softCard hover:bg-gold-300 transition"
              >
                Browse Our Shop
                <span>➜</span>
              </button>

              <button className="inline-flex items-center text-[13px] font-medium from-gold-300 hover:text-gold-500 transition">
                View Certifications
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-[11px] text-slate-100">
              <div>
                <p className="font-semibold text-white hero-subtitle-shadow">
                  100% Hallmarked
                </p>
                <p className="hero-subtitle-shadow">
                  LBMA–compliant and certified products only.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white hero-subtitle-shadow">
                  Insured delivery
                </p>
                <p className="hero-subtitle-shadow">
                  Secure, tracked and fully insured shipments.
                </p>
              </div>
            </div>
          </div>

          {/* Right: product preview card */}
          <div>
            <div className="hero-product-shell relative isolate z-30 rounded-[28px] bg-[#fdf9f0] shadow-softCard border border-slate-200 overflow-hidden">

              {/* Top glow header */}
              <div className="relative h-28 z-0">
                <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,#f6d47a,transparent_55%),radial-gradient(circle_at_top_right,#f2dfb0,transparent_60%)] opacity-90" />
                <div className="pointer-events-none absolute left-1/2 top-6 z-0 h-16 w-44 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
              </div>

              {/* Content (FORCED ABOVE overlays) */}
              <div className="relative z-10 -mt-14 px-6 pb-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-black font-medium mb-4">
                  Signature collection
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6 relative z-20">
                  {/* Gold bar */}
                  <div className="relative z-20 rounded-2xl bg-white border border-gold-500/40 p-4 flex flex-col items-center justify-between shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
                    <div className="h-20 w-16 mb-3">
                      <img
                        src="/images/products/gold-bar.png"
                        alt="24K gold bar"
                        className="w-full h-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.25)]"
                      />
                    </div>
                    <p className="text-[11px] font-medium text-ink mb-1">24K Gold Bar</p>
                    <p className="text-[11px] text-gold-700">1g • 999.9</p>
                  </div>

                  {/* Gold coin */}
                  <div className="relative z-20 rounded-2xl bg-white border border-gold-500/40 p-4 flex flex-col items-center justify-between shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
                    <div className="h-20 w-20 mb-3">
                      <img
                        src="/images/products/gold-coin.png"
                        alt="24K gold coin"
                        className="w-full h-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.25)]"
                      />
                    </div>
                    <p className="text-[11px] font-medium text-ink mb-1">24K Gold Coin</p>
                    <p className="text-[11px] text-gold-700">1g • 999.9</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-softInk">
                  <div>
                    <p className="uppercase text-slate-400">Starting from</p>
                    <p className="text-ink font-semibold">AED 500</p>
                  </div>
                  <p>Check our shop for latest pricing &amp; availability.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL LAYER – moves over the fixed hero */}
      <div className="relative z-10">
        {/* sections that scroll over the hero */}
        <GoldPriceSection />
        <GoldMarketSection />
        <GoldHistorySection />
      </div>
    </div>
  );
}
