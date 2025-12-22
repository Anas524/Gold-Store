// src/components/GoldPriceSection.jsx
import { useEffect, useRef, useState } from "react";

function useNumberSpinner(targetValue, duration = 800) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const start = prevRef.current;
    const end = targetValue;
    const diff = end - start;
    const startTime = performance.now();

    let frameId;

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = start + diff * eased;
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        prevRef.current = end;
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [targetValue, duration]);

  return displayValue;
}

export default function GoldPriceSection() {
  // fallback demo prices
  const fallback24K = 271.5;
  const fallback22K = 251.0;

  const [prices, setPrices] = useState({
    "24K": fallback24K,
    "22K": fallback22K,
  });
  const [activeKarat, setActiveKarat] = useState("24K");
  const [trend, setTrend] = useState("flat"); // "up" | "down" | "flat"
  const [history, setHistory] = useState([
    { t: Date.now() - 60_000, price24: fallback24K - 0.3, price22: (fallback24K - 0.3) * 22 / 24 },
    { t: Date.now(), price24: fallback24K, price22: fallback24K * 22 / 24 },
  ]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [silverPrice, setSilverPrice] = useState(null);

  // ---------- LIVE FETCH from your backend ----------
  useEffect(() => {
    async function fetchLivePrices() {
      try {
        setIsLoading(true);

        // Call your Node backend
        const res = await fetch("http://localhost:5001/api/rates");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        // 24K from API (AED per gram)
        const live24 =
          data?.rates?.gold_g_aed != null
            ? data.rates.gold_g_aed
            : fallback24K;

        // derive 22K from 24K (approx 91.67% of 24K)
        const live22 = (live24 * 22) / 24;

        // SILVER from backend
        if (data?.rates?.silver_g_aed != null) {
          setSilverPrice(data.rates.silver_g_aed);
        }

        setPrices((prev) => {
          const prevValue = prev[activeKarat];
          const next = { "24K": live24, "22K": live22 };

          if (live24 > prevValue + 0.05) setTrend("up");
          else if (live24 < prevValue - 0.05) setTrend("down");
          else setTrend("flat");

          return next;
        });

        setHistory((prev) => {
          const next = [
            ...prev,
            { t: Date.now(), price24: live24, price22: live22 },
          ];
          // keep last 30 points
          return next.slice(-30);
        });

        setLastUpdated(new Date());
      } catch (e) {
        console.error("Failed to fetch live gold prices", e);
      } finally {
        setIsLoading(false);
      }
    }

    // initial fetch + poll every 60s
    fetchLivePrices();
    const id = setInterval(fetchLivePrices, 60_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  const targetValue = prices[activeKarat];
  const animatedValue = useNumberSpinner(targetValue, 900);

  // ---------- MINI CHART POINTS ----------
  const chartValues = history.map((h) =>
    activeKarat === "24K" ? h.price24 : h.price22
  );
  const maxPoints = 20;
  const lastPoints = chartValues.slice(-maxPoints);

  let chartPoints = "";
  if (lastPoints.length > 1) {
    const min = Math.min(...lastPoints);
    const max = Math.max(...lastPoints);
    const range = max - min || 1;
    const width = 120;
    const height = 40;

    chartPoints = lastPoints
      .map((v, idx) => {
        const x =
          (idx / (lastPoints.length - 1 || 1)) *
          width;
        const y =
          height -
          ((v - min) / range) * 28 -
          6; // margin top/bottom
        return `${x},${y}`;
      })
      .join(" ");
  }

  const trendLabel =
    trend === "up"
      ? "Price rising"
      : trend === "down"
        ? "Price falling"
        : "Stable";
  const trendColor =
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
        ? "text-red-500"
        : "text-slate-500";
  const trendIcon =
    trend === "up" ? "▲" : trend === "down" ? "▼" : "■";

  return (
    <section className="relative z-[1] bg-page pt-10 pb-12 md:pt-14 md:pb-16">
      <div className="container">
        <div className="rounded-[28px] bg-surface shadow-softCard border border-slate-200 px-6 py-6 md:px-8 md:py-7 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">

          {/* Left */}
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold-700 mb-2">
              Live gold rate – UAE
            </p>

            <h2 className="text-xl md:text-2xl font-display text-ink mb-2">
              Today&rsquo;s gold price
            </h2>

            <p className="text-[13px] text-softInk mb-4 max-w-md">
              Indicative retail price per gram in AED for 24K and 22K gold. Rates refresh
              regularly and may differ slightly from the final checkout price.
            </p>

            {/* Toggle */}
            <div className="inline-flex rounded-full bg-slate-100/80 p-1 border border-slate-200 mb-3">
              <button
                type="button"
                onClick={() => setActiveKarat("24K")}
                className={`px-5 py-2 text-[12px] rounded-full transition font-medium ${activeKarat === "24K"
                  ? "bg-gradient-to-r from-gold-500 to-gold-300 text-slate-900 shadow-softCard"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                24K
              </button>

              <button
                type="button"
                onClick={() => setActiveKarat("22K")}
                className={`px-5 py-2 text-[12px] rounded-full transition font-medium ${activeKarat === "22K"
                  ? "bg-gradient-to-r from-gold-500 to-gold-300 text-slate-900 shadow-softCard"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                22K
              </button>
            </div>

            <p className="text-[11px] text-slate-500">
              Unit: AED / gram •{" "}
              {isLoading
                ? "Refreshing…"
                : lastUpdated
                  ? `Last updated ${lastUpdated.toLocaleTimeString()}`
                  : "Waiting for first update"}
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center justify-center">
            <div className="inline-flex flex-col items-center rounded-2xl bg-slate-50 border border-slate-200 px-7 py-5 w-full max-w-xs">
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-600 mb-1">
                {activeKarat} price
              </span>

              <div className="flex items-end gap-1">
                <span className="text-sm text-slate-600 mb-1">AED</span>
                <span className="text-3xl md:text-4xl font-semibold tabular-nums text-slate-900">
                  {animatedValue.toFixed(2)}
                </span>
              </div>

              <span className="mt-1 text-[11px] text-slate-600">
                per gram • indicative rate
              </span>

              {/* Trend chip */}
              <div className="mt-3 text-[11px] flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border border-slate-200 ${trendColor}`}
                >
                  <span className="text-[10px]">{trendIcon}</span>
                  <span>{trendLabel}</span>
                </span>
              </div>

              {/* Mini line chart */}
              <div className="mt-3 w-full">
                {chartPoints ? (
                  <>
                    <svg viewBox="0 0 120 40" className="w-full h-16 overflow-visible">
                      <polyline
                        fill="none"
                        stroke={trend === "down" ? "#dc2626" : "#16a34a"}
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        points={chartPoints}
                      />
                    </svg>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Recent intraday movement (illustrative)
                    </p>
                  </>
                ) : (
                  <>
                    {/* placeholder */}
                    <div className="h-16 w-full rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-500">
                      Collecting chart data…
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Recent intraday movement (illustrative)
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
