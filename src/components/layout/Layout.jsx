import Navbar from "./Navbar";
import Footer from "./Footer";
import SpotTickerBar from "./SpotTickerBar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />
      <SpotTickerBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
