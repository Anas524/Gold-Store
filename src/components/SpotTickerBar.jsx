// src/components/SpotTickerBar.jsx
import { useEffect, useState } from "react";

function useTrendValue(initial) {
  const [value, setValue] = useState(initial);
  const [prev, setPrev] = useState(initial);
  const [trend, setTrend] = useState("flat"); // "up" | "down" | "flat"

  const update = (next) => {
    setPrev(value);
    setValue(next);

    if (next > value + 0.01) setTrend("up");
    else if (next < value - 0.01) setTrend("down");
    else setTrend("flat");
  };

  return { value, trend, update };
}

export default function SpotTickerBar() {
  // fallback demo values – per gram AED
  const [lastUpdated, setLastUpdated] = useState(null);

  const gold = useTrendValue(271.5);
  const silver = useTrendValue(3.45);

  // ---- LIVE FETCH (plug into your backend/API later) ----
  useEffect(() => {
    async function fetchSpot() {
      try {
        // TODO: replace this with your backend endpoint:
        // const res = await fetch("/api/spot-prices");
        // const data = await res.json();
        // const goldPrice = data.gold.price_aed_per_g;
        // const silverPrice = data.silver.price_aed_per_g;

        // For now: tiny random jitter to simulate movement
        const jitter = (base) => base + (Math.random() - 0.5) * 0.4;

        const goldPrice = jitter(gold.value);
        const silverPrice = jitter(silver.value);

        gold.update(goldPrice);
        silver.update(silverPrice);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Failed to fetch spot prices", err);
      }
    }

    // first fetch immediately
    fetchSpot();
    // refresh every 60s
    const id = setInterval(fetchSpot, 60_000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatTime =
    lastUpdated &&
    lastUpdated.toLocaleTimeString("en-AE", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const renderChip = (label, value, trend) => {
    const isUp = trend === "up";
    const isDown = trend === "down";

    const colorClass = isUp
      ? "text-emerald-400"
      : isDown
      ? "text-rose-400"
      : "text-softInk";

    const icon = isUp ? "▲" : isDown ? "▼" : "■";

    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-page/90 backdrop-blur-sm px-3 py-1.5 text-[11px] text-slate-100 border border-slate-800/70">
        <span className="uppercase tracking-[0.18em] text-gold-500">
          {label}
        </span>
        <span className="font-semibold tabular-nums">
          AED {value.toFixed(2)}
        </span>
        <span className={`inline-flex items-center gap-1 ${colorClass}`}>
          <span className="text-[10px]">{icon}</span>
          <span className="hidden sm:inline">
            {isUp ? "Up" : isDown ? "Down" : "Stable"}
          </span>
        </span>
      </div>
    );
  };

  return (
    <div className="spot-ticker-bar">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {renderChip("Gold spot / g", gold.value, gold.trend)}
          {renderChip("Silver spot / g", silver.value, silver.trend)}
        </div>

        <div className="text-[10px] text-softInk">
          {lastUpdated ? (
            <>
              Updated <span className="text-slate-200">{formatTime}</span> UAE
              time
            </>
          ) : (
            "Loading live spot prices…"
          )}
        </div>
      </div>
    </div>
  );
}
