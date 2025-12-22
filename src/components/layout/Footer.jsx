export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-slate-200 bg-surface">
      <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-[11px] text-softInk">
          © {new Date().getFullYear()} Gold Store. All rights reserved.
        </p>
        <p className="text-[11px] text-softInk">
          Hallmarked gold • Insured delivery • Secure checkout
        </p>
      </div>
    </footer>
  );
}
