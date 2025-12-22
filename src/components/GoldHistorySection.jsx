// src/components/GoldHistorySection.jsx
import { useEffect, useState } from "react";

const historyImages = [
  "/images/history/gold-coin-redbackgrounded.png",
  "/images/history/bar-blue.jpg",
  "/images/history/coin-modal.jpg",
  "/images/history/invest-gold.jpg",
];

export default function GoldHistorySection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // auto-rotate, pause on hover
  useEffect(() => {
    if (isHovered) return;

    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % historyImages.length);
    }, 3000); // 3s per slide

    return () => clearInterval(id);
  }, [isHovered]);

  return (
    <section className="relative z-[1] bg-page pb-14 md:pb-20">
      <div className="container grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
        {/* Left copy */}
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-gold-700 mb-2">
            Gold price journey
          </p>
          <h2 className="text-xl md:text-2xl font-display text-ink mb-3">
            A history of rises, corrections and new highs
          </h2>
          <p className="text-[13px] text-softInk mb-4 max-w-xl">
            From breaking USD 1,000 in 2008 to testing new all-time highs above
            USD 2,000, gold has moved through macro cycles, crises and currency
            devaluations. Track how the metal has behaved in the past to
            understand today&apos;s market.
          </p>

          <ul className="space-y-2 text-[13px] text-softInk">
            <li>• See how gold responded to inflation and rate hikes.</li>
            <li>• Compare long-term trends with short-term corrections.</li>
            <li>• Use historic swings to frame your own entry strategy.</li>
          </ul>
        </div>

        {/* Right: stacked cards slider */}
        <div
          className="flex justify-center md:justify-end"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="gold-history-stack">
            <div className="gold-history-card-shell">
              {historyImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Gold history ${idx + 1}`}
                  className={
                    idx === current
                      ? "gold-history-slide is-active"
                      : "gold-history-slide"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
