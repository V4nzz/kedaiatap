import NavLogoSVG from "./NavLogoSVG";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer>
      <div className="ft-col">
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", marginBottom: "0.5rem" }}>
          <span className="footer-logo-img" role="img" aria-label="Kedai Atap">
            <NavLogoSVG color="#D7792B" />
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/maskot/garabot-senyum.png" alt="Garabot" className="footer-mascot" />
        </div>
        <div className="ft-sub">Kedaton · Bandar Lampung · Since 2024</div>
        <div className="ft-copy">© {new Date().getFullYear()} Kedai Atap. All rights reserved.</div>
      </div>
      <div className="ft-col">
        <h4>Navigasi</h4>
        <ul className="ft-links">
          {[
            { id: "home", label: "Home" },
            { id: "menu", label: "Menu" },
            { id: "lokasi", label: "Lokasi & Jam Buka" },
            { id: "kontak", label: "Kontak" },
            { id: "kolaborasi", label: "Kolaborasi" },
            { id: "artikel", label: "Artikel" },
          ].map((p) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                onClick={(e) => { e.preventDefault(); onNavigate(p.id); }}
              >
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="ft-col">
        <h4>Kontak</h4>
        <ul className="ft-links">
          <li>
            <a href="https://wa.me/6282282746298" target="_blank" rel="noopener noreferrer">
              WhatsApp: 082282746298
            </a>
          </li>
          <li>
            <a href="https://instagram.com/katapkedaiatap" target="_blank" rel="noopener noreferrer">
              Instagram: @katapkedaiatap
            </a>
          </li>
          <li>
            <a>Jl. Bumi Manti IV, Kedaton, Bandar Lampung</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
