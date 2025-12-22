import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const tabs = [
  { id: "all", label: "All" },
  { id: "gold-bar", label: "Gold Bar" },
  { id: "gold-coin", label: "Gold Coin" },
  { id: "silver-bar", label: "Silver Bar" },
  { id: "silver-coin", label: "Silver Coin" },
];

export default function Shop() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "gold-bar":
        return products.filter(
          (p) => p.metal === "gold" && p.type === "bar"
        );
      case "gold-coin":
        return products.filter(
          (p) => p.metal === "gold" && p.type === "coin"
        );
      case "silver-bar":
        return products.filter(
          (p) => p.metal === "silver" && p.type === "bar"
        );
      case "silver-coin":
        return products.filter(
          (p) => p.metal === "silver" && p.type === "coin"
        );
      default:
        return products;
    }
  }, [activeTab]);

  return (
    <section className="py-10">
      <div className="container">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-display text-ink mb-1">
              Shop Gold &amp; Silver
            </h1>
            <p className="text-sm text-softInk">
              Browse investment-grade gold and silver bars and coins with
              transparent pricing and fully insured delivery. We are bullion
              sellers – not manufacturers or jewellers.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] text-softInk">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={
                  "px-3 py-1 rounded-full border transition " +
                  (activeTab === tab.id
                    ? "border-gold-500 bg-surface shadow-softCard text-ink"
                    : "border-slate-200 hover:border-gold-400")
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
