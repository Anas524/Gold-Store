import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const isGold = product.metal === "gold";

  return (
    <div
      className={
        "group rounded-2xl bg-surface border border-slate-200 shadow-sm transition overflow-hidden flex flex-col " +
        (isGold
          ? "hover:border-gold-500/70 hover:shadow-softCard"
          : "hover:border-slate-400 hover:shadow-softCard")
      }
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-page">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-contain transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={
              "absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold shadow-softCard " +
              (isGold
                ? "bg-gradient-to-r from-gold-500 to-gold-300 text-ink"
                : "bg-slate-200/90 text-slate-900")
            }
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <h3 className="text-sm md:text-[15px] font-semibold text-ink">
            {product.name}
          </h3>
          <span className="text-[11px] text-softInk">
            {product.karat} • {product.weight}
          </span>
        </div>

        <p className="text-[11px] text-softInk mb-1">
          {product.category} • Purity {product.purity}
        </p>
        <p className="text-[11px] text-softInk mb-4 capitalize">
          {product.metal} • {product.type}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase text-slate-400">Price</p>
            <p className="text-sm font-semibold text-ink">
              AED {product.price.toLocaleString()}
            </p>
          </div>

          <div className="flex gap-2">
            <button className="hidden sm:inline-flex items-center rounded-full border border-gold-500/70 px-3 py-1.5 text-[11px] font-medium text-gold-700 hover:bg-gold-500 hover:text-ink transition">
              Add to Cart
            </button>

            <Link
              to={`/product/${product.slug}`}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-gold-500 to-gold-300 px-3 py-1.5 text-[11px] font-semibold text-ink hover:from-gold-700 hover:to-gold-500 transition"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
