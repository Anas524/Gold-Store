// src/components/layout/SpotTickerBar.jsx
import { useEffect, useState } from "react";

function useTrendValue(initial) {
    const [value, setValue] = useState(initial);
    const [prev, setPrev] = useState(initial);
    const [trend, setTrend] = useState("flat");

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
    const [lastUpdated, setLastUpdated] = useState(null);
    const [statusText, setStatusText] = useState("Loading live spot prices…");

    // initial fallback values – will be replaced by API on first load
    const gold = useTrendValue(271.5);
    const silver = useTrendValue(3.45);

    useEffect(() => {
        async function fetchSpot() {
            try {
                // show "Updating..." while fetching
                setStatusText("Updating live spot prices…");

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

                const res = await fetch("http://localhost:5001/api/rates", {
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = await res.json();

                const goldPrice =
                    data?.rates?.gold_g_aed != null ? data.rates.gold_g_aed : gold.value;

                const silverPrice =
                    data?.rates?.silver_g_aed != null ? data.rates.silver_g_aed : silver.value;

                gold.update(goldPrice);
                silver.update(silverPrice);

                const now = new Date();
                setLastUpdated(now);
                setStatusText("Updated");
            } catch (err) {
                console.error("Failed to fetch spot prices", err);

                // IMPORTANT: still show current UAE time even if API fails
                const now = new Date();
                setLastUpdated(now);
                setStatusText("Last checked");
            }
        }

        fetchSpot();
        const id = setInterval(fetchSpot, 60_000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatTime =
        lastUpdated &&
        lastUpdated.toLocaleTimeString("en-AE", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const renderChip = (label, value, trend) => {
        const isUp = trend === "up";
        const isDown = trend === "down";

        const trendColor = isUp
            ? "text-emerald-400"
            : isDown
                ? "text-rose-400"
                : "text-slate-300";

        const icon = isUp ? "▲" : isDown ? "▼" : "■";

        return (
            <div
                className="inline-flex items-center gap-2 rounded-full
                 bg-neutral-900/80 backdrop-blur-sm
                 px-3 py-1.5 text-[11px] text-slate-100
                 border border-neutral-700/70"
            >
                <span className="uppercase tracking-[0.18em] text-[#FCD56D]">
                    {label}
                </span>
                <span className="font-semibold tabular-nums">
                    AED {value.toFixed(2)}
                </span>
                <span className={`inline-flex items-center gap-1 ${trendColor}`}>
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

                <div className="text-[10px] text-white/70">
                    {lastUpdated ? (
                        <>
                            {statusText}{" "}
                            <span className="text-white/90">{formatTime}</span>{" "}
                            UAE time
                        </>
                    ) : (
                        "Loading live spot prices…"
                    )}
                </div>
            </div>
        </div>
    );
}
