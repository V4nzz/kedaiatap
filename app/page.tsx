"use client";
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingMascot from "@/components/FloatingMascot";
import CustomCursor from "@/components/CustomCursor";
import { Article, FALLBACK_ARTICLES, CATEGORY_LABELS } from "@/lib/types";
import NavLogoSVG from "@/components/NavLogoSVG";
import HeroLogoSVG from "@/components/HeroLogoSVG";

// ─── Page META ───────────────────────────────────────────────────────────────
const PAGE_META: Record<string, { t: string; d: string }> = {
  home: { t: "KEDAI ATAP — Café & Ruang Kolaborasi Bandar Lampung", d: "Kopi specialty di Kedaton, Bandar Lampung." },
  menu: { t: "Menu — KEDAI ATAP", d: "Menu lengkap Kedai Atap: kopi specialty, non-kopi, makanan, dan cemilan." },
  lokasi: { t: "Lokasi & Jam Buka — KEDAI ATAP", d: "Temukan Kedai Atap di Jl. Bumi Manti IV, Kedaton, Bandar Lampung." },
  kontak: { t: "Kontak — KEDAI ATAP", d: "Hubungi Kedai Atap via WhatsApp atau Instagram." },
  kolaborasi: { t: "Kolaborasi — KEDAI ATAP", d: "Open collaboration: pop-up event, art exhibition, live music, workshop." },
  artikel: { t: "Artikel & Cerita — KEDAI ATAP", d: "Baca cerita, tips, dan inspirasi dari dapur dan ruang Kedai Atap." },
};

const TICKER_ITEMS = ["☕ Kopi Segar Setiap Hari", "⚡ WiFi 100Mbps", "🔌 Banyak Stopkontak", "🎵 Playlist Tidak Annoying", "📦 Open Collaboration", "🌱 Bahan Lokal Pilihan"];
const TICKER_DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS];

const MENU_MASCOT_POSES = [
  "/maskot/garabot-angkat.png",
  "/maskot/garabot-senyum.png",
  "/maskot/garabot-kesal.png",
  "/maskot/garabot-serius.png",
];

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function SectionHome({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <>
      <section className="hero">
        <div className="h-left">
          <p className="eyebrow h-eyebrow">Est. 2024 · Kedaton, Bandar Lampung</p>
          <div className="h-title-logo">
            <HeroLogoSVG />
          </div>
          <p className="h-tag">
            Kopi yang jujur. Ruang yang berani.<br />Percakapan yang tidak basa-basi.
          </p>
          <div className="h-cta">
            <a href="#menu" className="btn btn-yel" onClick={(e) => { e.preventDefault(); onNavigate("menu"); }}>Lihat Menu →</a>
            <a href="#lokasi" className="btn btn-gho" onClick={(e) => { e.preventDefault(); onNavigate("lokasi"); }}>Kunjungi Kami</a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/maskot/ozzy-marah.png" alt="Ozzy" className="hero-mascot" />
        </div>
        <div className="h-right" style={{ position: "relative", overflow: "hidden" }}>
          <div className="h-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/home1.webp" alt="Interior Kedai Atap" loading="eager" />
          </div>
          <div className="h-bar">
            <div className="h-cell">
              <div className="lbl">Jam Buka</div>
              <div className="val">10.00 – 23.00</div>
            </div>
            <div className="h-cell">
              <div className="lbl">Lokasi</div>
              <div className="val">Kedaton, Lampung</div>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="t-track">
          {TICKER_DOUBLED.map((item, i) => (
            <span key={i} className="t-item">{item}<span className="t-sep"> ✦ </span></span>
          ))}
        </div>
      </div>

      <div className="pillars">
        <div className="pillar">
          <div className="p-num">17+</div>
          <h3>Pilihan Menu</h3>
          <p>Espresso klasik sampai makanan berat yang bikin kenyang seharian.</p>
        </div>
        <div className="pillar">
          <div className="p-num">3rd</div>
          <h3>Wave Coffee</h3>
          <p>Single origin, fresh roast setiap minggu. Kami tahu kopi kami dari mana.</p>
        </div>
        <div className="pillar">
          <div className="p-num">∞</div>
          <h3>Ruang Kerja</h3>
          <p>WiFi 100mbps, stopkontak banyak, suasana yang bikin produktif.</p>
        </div>
      </div>

      <div className="feat">
        <div className="f-text">
          <p className="eyebrow" style={{ color: "#659941" }}>// Kenapa Kedai Atap?</p>
          <h2 className="dtitle" style={{ color: "var(--white)" }}>BUKAN SEKADAR<br />TEMPAT NGOPI.</h2>
          <p>Kami percaya bahwa café yang baik adalah yang tumbuh bersama komunitasnya. Ruang kami dirancang untuk pekerjaan, kolaborasi, dan percakapan yang bermakna — bukan sekadar konten untuk story.</p>
          <a href="#kolaborasi" className="btn btn-yel" onClick={(e) => { e.preventDefault(); onNavigate("kolaborasi"); }}>Open Collaboration →</a>
        </div>
        <div className="f-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/home2.webp" alt="Suasana Kedai Atap" loading="lazy" />
        </div>
      </div>
    </>
  );
}

// ─── MENU PAGE ────────────────────────────────────────────────────────────────
function SectionMenu() {
  const [activeFilter, setActiveFilter] = useState("signature");
  const [menuMascotPose, setMenuMascotPose] = useState(0);
  const [mascotOpacity, setMascotOpacity] = useState(1);

  const handleFilter = (f: string, idx: number) => {
    setMascotOpacity(0);
    setTimeout(() => { setMenuMascotPose(idx); setMascotOpacity(1); }, 150);
    setActiveFilter(f);
  };

  const filters = [
    { id: "signature", label: "☕ Coffee Signature", idx: 0 },
    { id: "manual", label: "🫗 Manual Brew", idx: 1 },
    { id: "milkbased", label: "🥛 Milk Based", idx: 2 },
    { id: "makanan", label: "🍽️ Eat Signature", idx: 3 },
  ];

  return (
    <>
      <div className="ph">
        <div className="ph-num">02</div>
        <div className="ph-info">
          <p className="eyebrow">// Apa yang kami sajikan</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "1.5rem" }}>
            <h2 className="dtitle">MENU<br />LENGKAP</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MENU_MASCOT_POSES[menuMascotPose]} alt="Garabot" className="menu-title-mascot" style={{ opacity: mascotOpacity, transition: "opacity 0.15s" }} />
          </div>
        </div>
      </div>

      <div className="m-filters">
        {filters.map((f) => (
          <div key={f.id} className={`m-filter${activeFilter === f.id ? " act" : ""}`} onClick={() => handleFilter(f.id, f.idx)}>
            {f.label}
          </div>
        ))}
      </div>

      {/* Coffee Signature */}
      <div className={`m-cat${activeFilter === "signature" ? " act" : ""}`}>
        <div className="m-cat-hdr">
          <h3>COFFEE SIGNATURE</h3><span>5 Item · Rp 18K – 23K · Tersedia Cold & Hot</span>
        </div>
        <div className="m-grid">
          {[
            { name: "Kebouz", price: "18K", desc: "Espresso + susu + charcoal. Warna gelap, rasa bold yang unik.", badges: [["b-blk","Signature"],["b-grn","Cold / Hot"]] },
            { name: "Kenau", price: "18K", desc: "Espresso + gula aren. Manis alami dengan karakter kopi yang kuat.", badges: [["b-grn","Cold / Hot"]] },
            { name: "Kenauli", price: "20K", desc: "Espresso + gula aren + vanilla. Kombinasi klasik yang selalu pas.", badges: [["b-blk","Best Seller"],["b-grn","Cold / Hot"]] },
            { name: "Kenauli Spes", price: "23K", desc: "Espresso + gula aren + vanilla + foam. Versi spesial Kenauli dengan topping foam lembut.", badges: [["b-red","Spesial"],["b-grn","Cold / Hot"]] },
            { name: "Amerinano", price: "20K", desc: "Espresso + air + flavour pilihan. Americano versi Kedai Atap yang bisa dikustomisasi.", badges: [["b-grn","Cold / Hot"]] },
          ].map((item) => (
            <div key={item.name} className="m-card">
              <div className="m-card-top"><span className="m-card-name">{item.name}</span><span className="m-card-price">{item.price}</span></div>
              <p className="m-card-desc">{item.desc}</p>
              <div className="badges">{item.badges.map(([cls, label]) => <span key={label} className={`badge ${cls}`}>{label}</span>)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Brew */}
      <div className={`m-cat${activeFilter === "manual" ? " act" : ""}`}>
        <div className="m-cat-hdr"><h3>MANUAL BREW</h3><span>3 Item · Mulai 15K · Harga menyesuaikan biji kopi</span></div>
        <div className="m-grid">
          {[
            { name: "V60", price: "—", desc: "Pour over dengan teknik V60. Harga menyesuaikan pilihan single origin yang tersedia.", badges: [["b-blk","Ask Barista"]] },
            { name: "Japanese", price: "—", desc: "Metode seduh Jepang yang menghasilkan karakter floral dan bersih.", badges: [["b-blk","Ask Barista"]] },
            { name: "Vietnam Drip", price: "15K", desc: "Tetes demi tetes dari saringan khas Vietnam. Bold, pekat, dan nikmat disajikan dingin.", badges: [["b-grn","Favorit"]] },
          ].map((item) => (
            <div key={item.name} className="m-card">
              <div className="m-card-top"><span className="m-card-name">{item.name}</span><span className="m-card-price">{item.price}</span></div>
              <p className="m-card-desc">{item.desc}</p>
              <div className="badges">{item.badges.map(([cls, label]) => <span key={label} className={`badge ${cls}`}>{label}</span>)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Milk Based */}
      <div className={`m-cat${activeFilter === "milkbased" ? " act" : ""}`}>
        <div className="m-cat-hdr"><h3>MILK BASED</h3><span>7 Item · Rp 18K – 28K</span></div>
        <div className="m-grid">
          {[
            { name: "Matcha", price: "25K", desc: "Matcha + susu. Pahit yang menyenangkan, creamy yang pas.", badges: [["b-grn","Popular"]] },
            { name: "Matchstraw", price: "28K", desc: "Matcha + strawberry + susu. Perpaduan unik antara pahit matcha dan segarnya stroberi.", badges: [["b-red","Spesial"]] },
            { name: "Chocolate", price: "18K", desc: "Cokelat + susu. Klasik yang selalu bikin nyaman di segala suasana.", badges: [] },
            { name: "Cheesy", price: "18K", desc: "Keju + susu. Gurih, creamy, dan unexpectedly addictive.", badges: [["b-blk","Unik"]] },
            { name: "Cheestraw", price: "20K", desc: "Keju + strawberry + susu. Kombinasi bold yang bikin penasaran.", badges: [["b-red","Spesial"]] },
            { name: "Red Velvet", price: "20K", desc: "Red velvet + susu. Warna merah cantik, rasa yang lembut dan manis.", badges: [] },
            { name: "Secret Menu", price: "—", desc: "Menu rahasia yang hanya bisa kamu temukan kalau tanya langsung ke barista kami.", badges: [["b-blk","Ask Barista"]] },
          ].map((item) => (
            <div key={item.name} className="m-card">
              <div className="m-card-top"><span className="m-card-name">{item.name}</span><span className="m-card-price">{item.price}</span></div>
              <p className="m-card-desc">{item.desc}</p>
              {item.badges.length > 0 && <div className="badges">{item.badges.map(([cls, label]) => <span key={label} className={`badge ${cls}`}>{label}</span>)}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Eat Signature */}
      <div className={`m-cat${activeFilter === "makanan" ? " act" : ""}`}>
        <div className="m-cat-hdr"><h3>EAT SIGNATURE</h3><span>4 Item · Rp 12K – 15K</span></div>
        <div className="m-grid">
          {[
            { name: "Mie Bangladesh", price: "15K", desc: "Mie dengan bumbu khas ala Kedai Atap. Pedas, gurih, dan mengenyangkan.", badges: [["b-blk","Best Seller"]] },
            { name: "Mix Plate", price: "15K", desc: "Piring campur pilihan dapur. Cocok buat kamu yang lapar tapi bingung mau pesan apa.", badges: [["b-grn","Rekomendasi"]] },
            { name: "Roti Bakar", price: "12K", desc: "Roti bakar dengan topping pilihan. Simpel, hangat, dan selalu pas ditemani kopi.", badges: [] },
            { name: "Menu Rahasia", price: "—", desc: "Ada yang tersembunyi di dapur kami. Tanya langsung ke kasir untuk tau hari ini ada apa.", badges: [["b-red","Misteri"]] },
          ].map((item) => (
            <div key={item.name} className="m-card">
              <div className="m-card-top"><span className="m-card-name">{item.name}</span><span className="m-card-price">{item.price}</span></div>
              <p className="m-card-desc">{item.desc}</p>
              {item.badges.length > 0 && <div className="badges">{item.badges.map(([cls, label]) => <span key={label} className={`badge ${cls}`}>{label}</span>)}</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── LOKASI PAGE ──────────────────────────────────────────────────────────────
function SectionLokasi() {
  const [todayDay, setTodayDay] = useState<number>(-1);
  useEffect(() => { setTodayDay(new Date().getDay()); }, []);

  const hours = [
    { day: 1, label: "Senin", time: "10:00 – 23:00 WIB" },
    { day: 2, label: "Selasa", time: "10:00 – 23:00 WIB" },
    { day: 3, label: "Rabu", time: "10:00 – 23:00 WIB" },
    { day: 4, label: "Kamis", time: "10:00 – 23:00 WIB" },
    { day: 5, label: "Jumat", time: "10:00 – 23:00 WIB" },
    { day: 6, label: "Sabtu", time: "10:00 – 00:00 WIB" },
    { day: 0, label: "Minggu", time: "10:00 – 00:00 WIB" },
  ];

  return (
    <>
      <div className="ph">
        <div className="ph-num">03</div>
        <div className="ph-info">
          <p className="eyebrow">// Temukan kami</p>
          <h2 className="dtitle">LOKASI &<br />JAM BUKA</h2>
        </div>
      </div>
      <div className="lok-layout">
        <div className="lok-info">
          <div>
            <p className="eyebrow">// Alamat</p>
            <div className="dtitle" style={{ fontSize: "2rem", color: "var(--white)", margin: ".5rem 0 1rem" }}>KEDAI ATAP</div>
          </div>
          <div>
            <div className="ib-label">📍 Alamat Lengkap</div>
            <div className="ib-val">Kost Elvindo, Jl. Bumi Manti IV lantai atas<br />Kp. Baru, Kec. Kedaton<br />Kota Bandar Lampung, Lampung 35141</div>
          </div>
          <div>
            <div className="ib-label">🕐 Jam Operasional</div>
            {hours.map((h) => (
              <div key={h.day} className={`hr-row${todayDay === h.day ? " today" : ""}`}>
                <span className="day">{h.label}</span>
                <span className="time">{h.time}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="ib-label">📞 Hubungi Kami</div>
            <div className="ib-val">082282746298<br /><a href="mailto:katapkedaiatap@gmail.com">katapkedaiatap@gmail.com</a></div>
          </div>
          <a href="https://www.google.com/maps?q=-5.366425867462228,105.24930840857814" target="_blank" rel="noopener noreferrer" className="btn btn-yel" style={{ alignSelf: "flex-start" }}>
            Buka Google Maps ↗
          </a>
        </div>
        <div className="map-wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1670.1591714260467!2d105.24960298087854!3d-5.366481806751411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c5a60e869961%3A0x225c95de67639c34!2sKedai%20Atap!5e0!3m2!1sid!2ssg!4v1775815850079!5m2!1sid!2ssg"
            width="600" height="450"
            style={{ border: 0 }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Kedai Atap"
          />
        </div>
      </div>
      <div className="lok-extras">
        <div className="lok-extra"><div className="lok-extra-ico">🚗</div><h4>Parkir</h4><p>Tersedia parkir mobil dan motor luas di depan dan samping bangunan.</p></div>
        <div className="lok-extra"><div className="lok-extra-ico">🚇</div><h4>Transportasi Umum</h4><p>Dekat dengan jalur angkot dan terminal. Shelter ojol tersedia di depan pintu masuk.</p></div>
        <div className="lok-extra"><div className="lok-extra-ico">♿</div><h4>Aksesibilitas</h4><p>Ramah kursi roda. Tersedia ramp dan toilet berkebutuhan khusus.</p></div>
      </div>
    </>
  );
}

// ─── KONTAK PAGE ──────────────────────────────────────────────────────────────
function SectionKontak() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    { q: "Apakah bisa reservasi tempat duduk?", a: "Ya, bisa. Hubungi kami via WhatsApp minimal 2 jam sebelumnya. Untuk grup 10+ orang, disarankan reservasi H-1." },
    { q: "Apakah ada fasilitas meeting room?", a: "Tersedia 1 ruang meeting untuk kapasitas 8 orang, bisa disewa per jam. Hubungi kami untuk ketersediaan dan harga." },
    { q: "Apakah menerima custom order atau catering?", a: "Ya! Kami menerima pesanan catering untuk acara perusahaan dan komunitas. Minimum pesanan 20 pax, pemesanan H-3." },
    { q: "Metode pembayaran apa saja yang diterima?", a: "Tunai, semua kartu debit/kredit, QRIS, GoPay, OVO, Dana, dan ShopeePay. Tidak ada minimum pembelian untuk digital." },
  ];

  return (
    <>
      <div className="kon-hero">
        <div>
          <p className="eyebrow" style={{ color: "#D7792B" }}>// Hubungi kami</p>
          <h2 className="dtitle" style={{ color: "var(--white)" }}>AYO<br />NGOBROL.</h2>
          <p>Punya pertanyaan soal menu, reservasi, atau sekadar ingin tahu jam buka? Kami selalu siap membalas dengan cepat.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/maskot/garabot-wave.png" alt="Garabot" className="kon-mascot" />
          <div className="kon-btns">
            <a href="https://wa.me/6282282746298?text=Halo%20Kopi%20Brutal!" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "#25D366", borderColor: "var(--black)", color: "var(--black)", justifyContent: "center", padding: "1.1rem 2rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.558 4.143 1.538 5.883L.057 23.321a.75.75 0 0 0 .92.92l5.438-1.481A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 0 1-5.206-1.463l-.374-.222-3.876 1.056 1.056-3.876-.222-.374A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Chat di WhatsApp
            </a>
            <a href="https://instagram.com/katapkedaiatap" target="_blank" rel="noopener noreferrer" className="btn btn-blk" style={{ justifyContent: "center", padding: "1.1rem 2rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              Follow @katapkedaiatap
            </a>
          </div>
        </div>
      </div>

      <div className="kon-channels">
        <div className="kon-ch">
          <div className="ch-ico">💬</div>
          <div><div className="ch-name">WHATSAPP</div><div className="ch-handle">082282746298</div></div>
          <p className="ch-desc">Untuk reservasi meja, pertanyaan menu, atau pesanan catering. Aktif setiap hari selama jam buka.</p>
          <a href="https://wa.me/6282282746298" target="_blank" rel="noopener noreferrer" className="btn btn-blk" style={{ alignSelf: "flex-start" }}>Mulai Chat →</a>
        </div>
        <div className="kon-ch">
          <div className="ch-ico">📸</div>
          <div><div className="ch-name">INSTAGRAM</div><div className="ch-handle">@katapkedaiatap</div></div>
          <p className="ch-desc">Lihat foto menu terbaru, update event, dan behind-the-scenes dapur kami setiap harinya.</p>
          <a href="https://instagram.com/katapkedaiatap" target="_blank" rel="noopener noreferrer" className="btn btn-blk" style={{ alignSelf: "flex-start" }}>Buka Instagram →</a>
        </div>
      </div>

      <div className="faq-wrap">
        <div className="faq-hdr"><h3>PERTANYAAN YANG SERING DITANYAKAN</h3></div>
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <div className={`faq-q${openFaq === i ? " open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              {faq.q} <span className="faq-ico">+</span>
            </div>
            <div className={`faq-a${openFaq === i ? " open" : ""}`}><p>{faq.a}</p></div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── KOLABORASI PAGE ──────────────────────────────────────────────────────────
function SectionKolaborasi() {
  const types = [
    { ico: "☕", title: "Pop-up Event", desc: "Jadikan café kami sebagai venue pop-up brand atau event komunitas kamu." },
    { ico: "📸", title: "Photo & Video Shoot", desc: "Ruang estetik yang siap jadi backdrop konten brand dan campaign kamu." },
    { ico: "🎵", title: "Live Music", desc: "Pentas akustik atau live performance setiap akhir pekan. Terbuka untuk semua genre." },
    { ico: "🖼️", title: "Art Exhibition", desc: "Dinding kami terbuka untuk karya seni lokal — lukisan, fotografi, atau instalasi." },
    { ico: "📦", title: "Brand Activation", desc: "Reach audiens loyal kami melalui sampling, giveaway, atau brand activation." },
    { ico: "💼", title: "Workshop & Seminar", desc: "Sewa ruang untuk workshop, seminar kecil, atau kelas komunitas kamu." },
    { ico: "✍️", title: "Komunitas & Diskusi", desc: "Book club, forum diskusi, atau kopdar komunitas — kami siap jadi homebase." },
    { ico: "🤝", title: "Collab Menu", desc: "Co-create menu spesial bersama brand F&B atau produk lokal Indonesia." },
  ];

  return (
    <>
      <div className="kol-hero">
        <div className="kol-bg">KOLABORASI KOLABORASI KOLABORASI KOLABORASI</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/maskot/ozzy-cute.png" alt="Ozzy" className="kol-mascot" />
        <div className="kol-content">
          <p className="eyebrow" style={{ color: "#D7792B" }}>// Open Collaboration</p>
          <h2 className="dtitle">BANGUN<br />SESUATU<br />BERSAMA.</h2>
          <p>Kedai Atap bukan sekadar tempat ngopi. Kami percaya ruang yang baik tumbuh bersama komunitasnya. Punya ide, brand, atau proyek yang ingin berkolaborasi? Kami sangat terbuka.</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSe-GANTI-ID-FORM-KAMU/viewform" target="_blank" rel="noopener noreferrer" className="btn btn-yel" style={{ fontSize: "0.88rem", padding: "1rem 2.5rem" }}>
            Ajukan Kolaborasi →
          </a>
        </div>
      </div>

      <div className="kol-types">
        {types.map((t) => (
          <div key={t.title} className="kol-type">
            <div className="kol-type-ico">{t.ico}</div>
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="kol-cta">
        <div>
          <h3>SIAP MULAI<br />KOLABORASI?</h3>
          <p>Isi formulir singkat kami dan tim Kedai Atap akan menghubungi kamu dalam 1×24 jam.</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSe-GANTI-ID-FORM-KAMU/viewform" target="_blank" rel="noopener noreferrer" className="btn btn-blk" style={{ marginTop: "1.5rem" }}>
            Buka Formulir ↗
          </a>
        </div>
        <div className="kol-steps">
          {[
            { num: "01", title: "Isi Formulir", desc: "Ceritakan ide dan jenis kolaborasi yang kamu bayangkan." },
            { num: "02", title: "Kami Menghubungi", desc: "Tim kami akan balas dalam 1×24 jam untuk diskusi awal." },
            { num: "03", title: "Wujudkan Bersama", desc: "Sepakati detail, jadwal, dan mulai kolaborasi!" },
          ].map((s) => (
            <div key={s.num} className="kol-step">
              <div className="kol-snum">{s.num}</div>
              <div className="kol-stxt"><strong>{s.title}</strong><span>{s.desc}</span></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── ARTIKEL PAGE ─────────────────────────────────────────────────────────────
function SectionArtikel({ openArticle, setOpenArticle }: { openArticle: Article | null, setOpenArticle: (a: Article | null) => void }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("semua");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { fetchArticles } = await import("@/lib/articles");
        const data = await fetchArticles();
        setArticles(data.length > 0 ? data : FALLBACK_ARTICLES);
      } catch {
        setArticles(FALLBACK_ARTICLES);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = filter === "semua" ? articles : articles.filter((a) => a.kategori === filter);

  return (
    <>
      <div className="ph">
        <div className="ph-num">06</div>
        <div className="ph-info">
          <p className="eyebrow">// Cerita dari Kedai Atap</p>
          <h2 className="dtitle">ARTIKEL<br />& CERITA</h2>
        </div>
      </div>

      <div className="art-filters">
        {[{ id: "semua", label: "Semua" }, { id: "kopi", label: "☕ Kopi" }, { id: "ruang", label: "🏠 Ruang" }, { id: "komunitas", label: "🤝 Komunitas" }, { id: "tips", label: "💡 Tips" }].map((f) => (
          <div key={f.id} className={`art-filter${filter === f.id ? " act" : ""}`} onClick={() => setFilter(f.id)}>{f.label}</div>
        ))}
      </div>

      <div className="art-grid">
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", fontSize: "0.9rem", color: "#888" }}>Memuat artikel...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", fontSize: "0.9rem", color: "#888" }}>Belum ada artikel di kategori ini.</div>
        ) : filtered.map((a) => (
          <div key={a.id} className="art-card" onClick={() => setOpenArticle(a)} tabIndex={0} role="button" aria-label={`Baca artikel: ${a.judul}`} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpenArticle(a); }}>
            <div className="art-card-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.gambar} alt={a.judul} loading="lazy" />
            </div>
            <div className="art-card-body">
              <div className="art-card-meta">
                <span className="art-tag">{a.kategoriLabel}</span>
                <span className="art-date">{a.tanggal}</span>
              </div>
              <h3 className="art-card-title">{a.judul}</h3>
              <p className="art-card-excerpt">{a.ringkasan}</p>
              <span className="art-read">Baca Selengkapnya →</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── MAIN PAGE COMPONENT ──────────────────────────────────────────────────────
export default function HomePage() {
  const [activePage, setActivePage] = useState("home");
  const [openArticle, setOpenArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (openArticle) {
      document.body.style.overflow = "hidden";
      // Reset scroll position of the overlay
      const overlay = document.querySelector(".art-overlay");
      if (overlay) overlay.scrollTop = 0;
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [openArticle]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenArticle(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const navigate = useCallback((id: string) => {
    setActivePage(id);
    const meta = PAGE_META[id] || PAGE_META.home;
    document.title = meta.t;
    const descEl = document.querySelector("meta[name='description']");
    if (descEl) descEl.setAttribute("content", meta.d);
    history.pushState({ page: id }, meta.t, "#" + id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const hash = location.hash.replace("#", "") || "home";
    setActivePage(hash);

    const handlePop = (e: PopStateEvent) => {
      setActivePage((e.state?.page) || "home");
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  return (
    <>
      <CustomCursor />
      <FloatingMascot />
      <Navbar activePage={activePage} onNavigate={navigate} />

      <div id="app">
        <div className={`pg${activePage === "home" ? " act" : ""}`} id="pg-home">
          <SectionHome onNavigate={navigate} />
        </div>
        <div className={`pg${activePage === "menu" ? " act" : ""}`} id="pg-menu">
          <SectionMenu />
        </div>
        <div className={`pg${activePage === "lokasi" ? " act" : ""}`} id="pg-lokasi">
          <SectionLokasi />
        </div>
        <div className={`pg${activePage === "kontak" ? " act" : ""}`} id="pg-kontak">
          <SectionKontak />
        </div>
        <div className={`pg${activePage === "kolaborasi" ? " act" : ""}`} id="pg-kolaborasi">
          <SectionKolaborasi />
        </div>
        <div className={`pg${activePage === "artikel" ? " act" : ""}`} id="pg-artikel">
          <SectionArtikel openArticle={openArticle} setOpenArticle={setOpenArticle} />
        </div>
      </div>

      {/* Article Detail Overlay - Moved outside #app to avoid stacking context issues */}
      <div className={`art-overlay${openArticle ? " open" : ""}`} role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setOpenArticle(null); }}>
        {openArticle && (
          <div className="art-detail">
            <button className="art-close" onClick={() => setOpenArticle(null)} aria-label="Tutup artikel">✕</button>
            <div className="art-detail-inner">
              <div className="art-detail-banner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={openArticle.gambar} alt={openArticle.judul} />
              </div>
              <div className="art-detail-content">
                <div className="art-detail-meta">
                  <span className="art-tag">{openArticle.kategoriLabel}</span>
                  <span className="art-date">{openArticle.tanggal}</span>
                </div>
                <h2 className="art-detail-title">{openArticle.judul}</h2>
                <div className="art-detail-body" dangerouslySetInnerHTML={{ __html: openArticle.isi }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer onNavigate={navigate} />
    </>
  );
}
