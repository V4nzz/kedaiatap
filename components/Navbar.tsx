"use client";
import { useState, useEffect } from "react";
import HeroLogoSVG from "./HeroLogoSVG";

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const PAGES = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "lokasi", label: "Lokasi" },
  { id: "kontak", label: "Kontak" },
  { id: "kolaborasi", label: "Kolaborasi" },
  { id: "artikel", label: "Artikel" },
];

function useOpenStatus() {
  const [status, setStatus] = useState<{ isOpen: boolean }>({ isOpen: true });
  useEffect(() => {
    function check() {
      const now = new Date();
      const wib = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
      const day = wib.getDay();
      const mins = wib.getHours() * 60 + wib.getMinutes();
      const openMins = 10 * 60;
      const closeMins = day === 0 || day === 6 ? 24 * 60 : 23 * 60;
      setStatus({ isOpen: mins >= openMins && mins < closeMins });
    }
    check();
    const t = setInterval(check, 60000);
    return () => clearInterval(t);
  }, []);
  return status;
}

export default function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen } = useOpenStatus();

  return (
    <>
      <nav className="main-nav">
        <a
          href="#home"
          className="n-logo"
          onClick={(e) => { e.preventDefault(); onNavigate("home"); setMenuOpen(false); }}
          aria-label="Kedai Atap"
        >
          <span className="nav-logo-img">
            <HeroLogoSVG />
          </span>
        </a>

        <div className="n-links">
          {PAGES.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className={`n-link${activePage === p.id ? " act" : ""}`}
              onClick={(e) => { e.preventDefault(); onNavigate(p.id); }}
            >
              {p.label}
            </a>
          ))}
        </div>

        <div className="n-right">
          <div className={`n-status${!isOpen ? " closed" : ""}`}>
            <div className="s-dot" />
            <span>{isOpen ? "Open Now" : "Closed"}</span>
          </div>
        </div>

        <button className="n-ham" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          <div className="ham-ic">
            <span /><span /><span />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mob-menu${menuOpen ? " open" : ""}`}>
        {PAGES.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className={`mob-link${activePage === p.id ? " act" : ""}`}
            onClick={(e) => { e.preventDefault(); onNavigate(p.id); setMenuOpen(false); }}
          >
            {p.label}
          </a>
        ))}
      </div>
    </>
  );
}
