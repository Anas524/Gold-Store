// src/components/GoldMarketSection.jsx
import { useEffect, useMemo, useState } from "react";

const dataSets = {
    "1D": [271.2, 271.0, 271.4, 271.6, 271.3, 271.9],
    "1W": [268.5, 269.4, 270.2, 269.8, 271.1, 272.4, 272.0],
    "1M": [262.3, 263.8, 264.9, 266.4, 267.8, 269.5, 270.2, 268.9, 269.7, 271.0, 272.4],
    "1Y": [225, 235, 245, 255, 260, 240, 252, 263, 270, 268, 275, 272],
    Max: [120, 150, 180, 210, 240, 270],
};

const labels = {
    "1D": "Today’s intraday movement",
    "1W": "Last 7 days in AED",
    "1M": "Last 30 days trend",
    "1Y": "Last 12 months overview",
    Max: "Longer-term performance view",
};

export default function GoldMarketSection() {
    const [range, setRange] = useState("1M");
    const [live24k, setLive24k] = useState(null);

    const [now, setNow] = useState(() => new Date());

    // Fetch live 24K price once + refresh every 60s (same backend)
    useEffect(() => {
        async function fetchLive() {
            try {
                const res = await fetch("http://localhost:5001/api/rates");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();

                if (data?.rates?.gold_g_aed != null) {
                    setLive24k(data.rates.gold_g_aed);
                }
            } catch (err) {
                console.error("Failed to fetch gold market rate", err);
            }
        }

        fetchLive();
        const id = setInterval(fetchLive, 60_000);
        return () => clearInterval(id);
    }, []); // run once

    // prices now depend on range + live24k
    const prices = useMemo(() => {
        const base = dataSets[range];
        if (!live24k) return base; // before first fetch, just show demo data

        const lastBase = base[base.length - 1] || 1;
        const factor = live24k / lastBase;

        return base.map((v) => v * factor);
    }, [range, live24k]);

    // "update time every 30s" effect stays BELOW this
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 30_000);
        return () => clearInterval(id);
    }, []);

    const formattedTime = now.toLocaleTimeString("en-AE", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const { points, min, max, change, isUp } = useMemo(() => {
        const max = Math.max(...prices);
        const min = Math.min(...prices);
        const diff = max - min || 1;

        const pts = prices
            .map((p, idx) => {
                const x =
                    (prices.length === 1 ? 0 : (idx / (prices.length - 1)) * 100);
                // y axis (inverted), with a bit of padding top/bottom
                const norm = (p - min) / diff;
                const y = 5 + (1 - norm) * 30; // 0–40 viewBox (we leave top=5, bottom=35)
                return `${x.toFixed(2)},${y.toFixed(2)}`;
            })
            .join(" ");

        const first = prices[0];
        const last = prices[prices.length - 1];
        const change = last - first;
        const isUp = change >= 0;

        return { points: pts, min, max, change, isUp };
    }, [prices]);

    const lastPrice = prices[prices.length - 1];

    return (
        <section className="relative z-[1] bg-page pb-14 md:pb-20">
            <div className="container">
                <div className="rounded-[28px] bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200 shadow-softCard px-6 py-6 md:px-8 md:py-7">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div>
                            <p className="text-[11px] tracking-[0.22em] uppercase text-gold-700 mb-1">
                                Market overview
                            </p>
                            <h2 className="text-lg md:text-xl font-display text-ink">
                                Gold price movement in AED
                            </h2>
                            <p className="text-[12px] text-softInk mt-1">
                                {labels[range]}
                            </p>
                        </div>

                        {/* Range pills */}
                        <div className="inline-flex rounded-full bg-page border border-slate-200 p-1 text-[11px]">
                            {["1D", "1W", "1M", "1Y", "Max"].map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setRange(key)}
                                    className={
                                        "px-3 py-1 rounded-full transition " +
                                        (range === key
                                            ? "bg-gradient-to-r from-gold-500 to-gold-300 text-ink shadow-softCard"
                                            : "text-softInk hover:text-ink")
                                    }
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main layout: chart + stats */}
                    <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,0.9fr)] items-stretch">
                        {/* Chart */}
                        <div className="relative rounded-2xl bg-slate-900/95 overflow-hidden p-4 md:p-5">
                            {/* subtle gradient overlay */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40" />

                            {/* grid lines */}
                            <svg
                                viewBox="0 0 100 40"
                                className="relative z-[1] h-52 w-full text-slate-500/40"
                                preserveAspectRatio="none"
                            >
                                {/* horizontal grid */}
                                {[0, 1, 2, 3].map((i) => (
                                    <line
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={i}
                                        x1="0"
                                        x2="100"
                                        y1={8 + i * 10}
                                        y2={8 + i * 10}
                                        stroke="currentColor"
                                        strokeWidth="0.3"
                                    />
                                ))}

                                {/* gradient stroke */}
                                <defs>
                                    <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#FACC15" />
                                        <stop offset="50%" stopColor="#F97316" />
                                        <stop offset="100%" stopColor="#22C55E" />
                                    </linearGradient>

                                    <linearGradient id="goldArea" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#FACC15" stopOpacity="0.45" />
                                        <stop offset="75%" stopColor="#0F172A" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* area fill */}
                                <path
                                    d={`M 0,40 L ${points} L 100,40 Z`}
                                    fill="url(#goldArea)"
                                    stroke="none"
                                />

                                {/* line */}
                                <polyline
                                    points={points}
                                    fill="none"
                                    stroke="url(#goldLine)"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                />

                                {/* last point dot */}
                                {(() => {
                                    const pts = points.split(" ");
                                    const last = pts[pts.length - 1];
                                    const [lx, ly] = last.split(",");
                                    return (
                                        <g>
                                            <circle
                                                cx={lx}
                                                cy={ly}
                                                r="1.8"
                                                fill="#0F172A"
                                                stroke="#FACC15"
                                                strokeWidth="1.1"
                                            />
                                            <circle
                                                cx={lx}
                                                cy={ly}
                                                r="4.5"
                                                fill="none"
                                                stroke="#FACC15"
                                                strokeOpacity="0.45"
                                                strokeWidth="0.6"
                                            />
                                        </g>
                                    );
                                })()}
                            </svg>

                            {/* axes labels */}
                            <div className="relative z-[1] mt-2 flex items-center justify-between text-[10px] text-slate-400">
                                <span>
                                    Low&nbsp;
                                    <span className="text-slate-100 font-medium">
                                        AED {min.toFixed(1)}
                                    </span>
                                </span>

                                <span className="flex flex-col items-center text-center">
                                    <span className="uppercase tracking-[0.18em] text-slate-500">
                                        Time • UAE
                                    </span>
                                    <span className="text-slate-100 font-medium">
                                        {formattedTime}
                                    </span>
                                </span>

                                <span className="text-right">
                                    High&nbsp;
                                    <span className="text-slate-100 font-medium">
                                        AED {max.toFixed(1)}
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Stats panel */}
                        <div className="rounded-2xl bg-page border border-slate-200 px-5 py-5 flex flex-col gap-4 justify-between">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.2em] text-softInk mb-1">
                                    Current {range} close
                                </p>
                                <div className="flex items-end gap-1 mb-2">
                                    <span className="text-sm text-softInk mb-1">AED</span>
                                    <span className="text-3xl font-semibold tabular-nums text-ink">
                                        {lastPrice.toFixed(2)}
                                    </span>
                                </div>

                                <div className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium bg-slate-100 text-ink">
                                    <span
                                        className={
                                            "mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full " +
                                            (isUp
                                                ? "bg-emerald-500/10 text-emerald-500"
                                                : "bg-red-500/10 text-red-500")
                                        }
                                    >
                                        {isUp ? "↗" : "↘"}
                                    </span>
                                    {isUp ? "Price rising" : "Price easing"} ·{" "}
                                    <span
                                        className={
                                            "ml-1 " +
                                            (isUp ? "text-emerald-600" : "text-red-600")
                                        }
                                    >
                                        {change >= 0 ? "+" : ""}
                                        {change.toFixed(2)} AED
                                    </span>
                                </div>
                            </div>

                            <ul className="mt-3 space-y-1 text-[11px] text-softInk">
                                <li>• Live gold price curve for precise market insight.</li>
                                <li>• Monitor upward and downward movements instantly.</li>
                                <li>• Designed for investors who track gold trends closely.</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
