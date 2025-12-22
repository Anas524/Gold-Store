import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Our Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const baseLink =
    "text-[13px] font-medium tracking-wide transition hover:text-[#FCD56D]";
  const activeLink = "text-[#FCD56D]";

  return (
    <header className="navbar-header sticky top-0 z-50 border-b border-white/10">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="rounded-[10px] border border-[#F2C94C]/70 bg-gradient-to-b from-[#FFF2C2] to-[#F2C94C] px-3 py-1 shadow-softCard">
            <span className="block text-[10px] font-semibold tracking-[0.22em] text-slate-900">
              GOLD
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.22em] text-slate-900">
              STORE
            </span>
          </div>
          <span className="hidden md:inline text-[11px] text-white/70">
            Dubai&apos;s premium precious metals shop
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : "text-slate-200"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button className="h-9 w-9 rounded-full border border-slate-600 text-[14px] text-slate-100 hover:border-[#FCD56D] hover:text-[#FCD56D] transition flex items-center justify-center">
            <img
              src="/icons/login-avatar.png"
              alt="Login"
              className="h-4 w-4"
            />
          </button>
          <NavLink
            to="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#F2C94C] shadow-softCard hover:bg-[#E6B93D] transition"
          >
            <img
              src="/icons/shopping-bag.png"
              alt="Cart"
              className="h-4 w-4 brightness-0"
            />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
              0
            </span>
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-softInk"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-[#050509]">
          <div className="container py-3 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block text-[14px] py-1 ${isActive ? "text-[#FCD56D]" : "text-slate-200"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/cart"
              onClick={() => setOpen(false)}
              className="inline-flex mt-3 items-center gap-2 text-[13px] font-medium text-softInk"
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#F2C94C] shadow-softCard hover:bg-[#E6B93D] transition">
                <img
                  src="/icons/shopping-bag.png"
                  alt="Cart"
                  className="h-4 w-4 brightness-0"
                />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ink text-[9px] font-semibold text-gold-50">
                  0
                </span>
              </span>
              <span>Cart</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
