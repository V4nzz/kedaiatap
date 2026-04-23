"use client";
import { useState, useEffect, useRef } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { CATEGORY_LABELS } from "@/lib/types";

interface Article {
  id: string;
  judul: string;
  kategori: string;
  kategoriLabel: string;
  tanggal: string;
  ringkasan: string;
  gambar: string;
  isi: string;
}

function formatDate() {
  return new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (u: User) => void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ERROR_MSGS: Record<string, string> = {
    "auth/user-not-found": "Email tidak ditemukan.",
    "auth/wrong-password": "Password salah.",
    "auth/invalid-email": "Format email tidak valid.",
    "auth/invalid-credential": "Email atau password salah.",
    "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi nanti.",
  };

  async function handleLogin() {
    if (!email || !pass) {
      setError("Email dan password wajib diisi.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      onLogin(cred.user);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || "";
      setError(ERROR_MSGS[code] || "Login gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.loginWrap}>
      <div style={styles.loginCard}>
        <div style={styles.loginLogo}>KEDAI<br />ATAP</div>
        <div style={styles.loginSub}>Panel Admin</div>
        <div style={styles.loginForm}>
          <div>
            <label style={styles.lbl}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kedaiatap.com"
              style={styles.inp}
              autoComplete="email"
            />
          </div>
          <div>
            <label style={styles.lbl}>Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              style={styles.inp}
              autoComplete="current-password"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          {error && <div style={styles.errorBox}>{error}</div>}
          <button
            style={{ ...styles.btnLogin, opacity: loading ? 0.6 : 1 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </div>
        <p style={styles.loginNote}>Akses terbatas untuk admin Kedai Atap.</p>
      </div>
    </div>
  );
}

// ── Article Modal ─────────────────────────────────────────────────────────────
function ArticleModal({
  editId,
  editData,
  onClose,
  onSaved,
}: {
  editId: string | null;
  editData: Article | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [judul, setJudul] = useState(editData?.judul ?? "");
  const [kategori, setKategori] = useState(editData?.kategori ?? "kopi");
  const [tanggal, setTanggal] = useState(editData?.tanggal ?? formatDate());
  const [ringkasan, setRingkasan] = useState(editData?.ringkasan ?? "");
  const [gambar, setGambar] = useState(editData?.gambar ?? "");
  const [imgPreview, setImgPreview] = useState(editData?.gambar ?? "");
  const [saving, setSaving] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editData?.isi) {
      editorRef.current.innerHTML = editData.isi;
    }
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [editData, onClose]);

  function execCmd(cmd: string, val?: string) {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!judul || !ringkasan || !gambar || !editorRef.current?.innerHTML.trim()) {
      alert("Semua field wajib diisi.");
      return;
    }
    setSaving(true);
    const data = {
      judul: judul.trim(),
      kategori,
      kategoriLabel: CATEGORY_LABELS[kategori] ?? kategori,
      tanggal: tanggal.trim() || formatDate(),
      ringkasan: ringkasan.trim(),
      gambar: gambar.trim(),
      isi: editorRef.current.innerHTML.trim(),
      updatedAt: serverTimestamp(),
    };
    try {
      if (editId) {
        await updateDoc(doc(db, "articles", editId), data);
      } else {
        await addDoc(collection(db, "articles"), { ...data, createdAt: serverTimestamp() });
      }
      onSaved();
      onClose();
    } catch (err: unknown) {
      alert("Gagal menyimpan: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={styles.modalCard}>
        <div style={styles.modalHdr}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800 }}>{editId ? "Edit Artikel" : "Tambah Artikel"}</h2>
          <button style={styles.btnClose} onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSave} style={styles.artForm} noValidate>
          <div style={styles.formGroup}>
            <label style={styles.formLbl}>Judul Artikel *</label>
            <input style={styles.formInp} type="text" value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Masukkan judul artikel..." required />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
            <div style={styles.formGroup}>
              <label style={styles.formLbl}>Kategori *</label>
              <select style={styles.formInp} value={kategori} onChange={(e) => setKategori(e.target.value)}>
                <option value="kopi">☕ Kopi</option>
                <option value="ruang">🏠 Ruang</option>
                <option value="komunitas">🤝 Komunitas</option>
                <option value="tips">💡 Tips</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLbl}>Tanggal</label>
              <input style={styles.formInp} type="text" value={tanggal} onChange={(e) => setTanggal(e.target.value)} placeholder="e.g. 27 April 2026" />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLbl}>Ringkasan * <small style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "#888" }}>— 1-2 kalimat untuk preview card</small></label>
            <textarea style={{ ...styles.formInp, resize: "vertical" }} rows={2} value={ringkasan} onChange={(e) => setRingkasan(e.target.value)} placeholder="Tulis ringkasan singkat artikel..." required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLbl}>URL Gambar *</label>
            <input style={styles.formInp} type="url" value={gambar} onChange={(e) => setGambar(e.target.value)} onBlur={() => setImgPreview(gambar)} placeholder="https://images.unsplash.com/..." required />
            {imgPreview && <img src={imgPreview} alt="Preview" style={{ marginTop: "0.5rem", maxHeight: "140px", objectFit: "cover", width: "100%", border: "2px solid #ddd" }} />}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLbl}>Isi Artikel *</label>
            <div style={styles.editorWrap}>
              <div style={styles.editorToolbar}>
                {[
                  { label: <b>B</b>, cmd: "bold" },
                  { label: <i>I</i>, cmd: "italic" },
                  { label: <u>U</u>, cmd: "underline" },
                ].map((btn, i) => (
                  <button key={i} type="button" style={styles.edBtn} onMouseDown={(e) => { e.preventDefault(); execCmd(btn.cmd); }}>{btn.label}</button>
                ))}
                <div style={styles.edSep} />
                <button type="button" style={{ ...styles.edBtn, fontSize: "0.75rem" }} onMouseDown={(e) => { e.preventDefault(); execCmd("formatBlock", "h3"); }}>Sub</button>
                <button type="button" style={styles.edBtn} onMouseDown={(e) => { e.preventDefault(); execCmd("formatBlock", "p"); }}>Aa</button>
                <div style={styles.edSep} />
                <button type="button" style={styles.edBtn} onMouseDown={(e) => { e.preventDefault(); execCmd("insertUnorderedList"); }}>• List</button>
                <div style={styles.edSep} />
                <button type="button" style={{ ...styles.edBtn, color: "#888" }} onMouseDown={(e) => { e.preventDefault(); if (confirm("Reset semua isi artikel?") && editorRef.current) editorRef.current.innerHTML = ""; }}>✕ Reset</button>
              </div>
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                style={styles.editorContent}
                data-placeholder="Tulis isi artikel di sini..."
              />
            </div>
          </div>
          <div style={styles.formActions}>
            <button type="button" style={styles.btnSec} onClick={onClose}>Batal</button>
            <button type="submit" style={{ ...styles.btnPrimary, opacity: saving ? 0.6 : 1 }} disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Artikel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Admin Panel ───────────────────────────────────────────────────────────────
function AdminPanel({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Article | null>(null);

  async function loadArticles() {
    setLoadingList(true);
    try {
      const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => { loadArticles(); }, []);

  function openNew() { setEditId(null); setEditData(null); setModalOpen(true); }
  function openEdit(a: Article) { setEditId(a.id); setEditData(a); setModalOpen(true); }
  async function handleDelete(id: string, judul: string) {
    if (!confirm(`Hapus artikel "${judul}"?\n\nTindakan ini tidak bisa dibatalkan.`)) return;
    try { await deleteDoc(doc(db, "articles", id)); await loadArticles(); }
    catch (err: unknown) { alert("Gagal menghapus: " + (err as Error).message); }
  }

  return (
    <div style={{ minHeight: "100vh", flexDirection: "column", display: "flex", background: "#F3F3F0" }}>
      {/* Nav */}
      <nav style={styles.aNaV}>
        <div style={styles.aNavBrand}>KEDAI ATAP <span style={{ color: "#555", fontSize: "0.7rem", fontWeight: 400, marginLeft: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Admin Panel</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.7rem", color: "#6a7580" }}>{user.email}</span>
          <a href="/" style={styles.btnSm}>← Website</a>
          <button style={{ ...styles.btnSm, borderColor: "#c0392b", color: "#e57373" }} onClick={onLogout}>Logout</button>
        </div>
      </nav>

      {/* Main */}
      <main style={{ padding: "2rem 2.5rem", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <div style={styles.aHeader}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800 }}>
            Artikel & Cerita <span style={{ fontSize: "0.7rem", color: "#888", fontWeight: 400 }}>({articles.length} artikel)</span>
          </h1>
          <button style={styles.btnPrimary} onClick={openNew}>+ Tambah Artikel</button>
        </div>

        {loadingList ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#888", fontSize: "0.88rem" }}>Memuat artikel...</div>
        ) : articles.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#888" }}>
            <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>Belum ada artikel. Mulai tambahkan sekarang!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {articles.map((a, i) => (
              <div key={a.id} style={{ ...styles.aItem, borderBottom: i === articles.length - 1 ? "3px solid #141515" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1, minWidth: 0 }}>
                  <span style={styles.aCatTag}>{a.kategoriLabel}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={a.judul}>{a.judul}</span>
                  <span style={{ fontSize: "0.68rem", color: "#888", whiteSpace: "nowrap" }}>{a.tanggal}</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, marginLeft: "1rem" }}>
                  <button style={styles.btnEdit} onClick={() => openEdit(a)}>Edit</button>
                  <button style={styles.btnDel} onClick={() => handleDelete(a.id, a.judul)}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {modalOpen && (
        <ArticleModal
          editId={editId}
          editData={editData}
          onClose={() => setModalOpen(false)}
          onSaved={loadArticles}
        />
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Force default cursor in admin panel
    document.body.classList.add("admin-body");
    return () => {
      document.body.classList.remove("admin-body");
    };
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthChecked(true);
    });
    return unsub;
  }, []);

  async function handleLogout() {
    await signOut(auth);
  }

  if (!authChecked) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#141515", color: "#F3F3F0", fontFamily: "Poppins, sans-serif" }}>Memeriksa sesi...</div>;
  }

  if (!user) return <LoginScreen onLogin={setUser} />;
  return <AdminPanel user={user} onLogout={handleLogout} />;
}

// ── Styles ────────────────────────────────────────────────────────────────────
const B = "3px solid #141515";
const SH = "5px 5px 0 #141515";
const SHL = "8px 8px 0 #141515";

const styles: Record<string, React.CSSProperties> = {
  loginWrap: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#141515", fontFamily: "Poppins, sans-serif" },
  loginCard: { background: "#F3F3F0", border: B, boxShadow: SHL, padding: "3rem 3.5rem", textAlign: "center", maxWidth: "400px", width: "90%" },
  loginLogo: { fontSize: "3rem", fontWeight: 800, letterSpacing: "0.04em", lineHeight: 1, marginBottom: "0.2rem", color: "#D7792B" },
  loginSub: { fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#666", marginBottom: "2rem" },
  loginForm: { display: "flex", flexDirection: "column", gap: "0.8rem", textAlign: "left" },
  lbl: { display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#555", marginBottom: "0.3rem" },
  inp: { width: "100%", padding: "0.75rem 1rem", border: B, background: "#F3F3F0", fontSize: "0.9rem", fontFamily: "Poppins, sans-serif" },
  errorBox: { fontSize: "0.72rem", color: "#c0392b", background: "#fff0f0", border: "1.5px solid #c0392b", padding: "0.6rem 0.9rem" },
  btnLogin: { width: "100%", padding: "0.9rem", marginTop: "0.4rem", background: "#141515", color: "#F3F3F0", border: "none", fontSize: "0.82rem", fontWeight: 700, fontFamily: "Poppins, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", boxShadow: SH },
  loginNote: { fontSize: "0.65rem", color: "#aaa", marginTop: "1rem", textAlign: "center" },
  aNaV: { position: "sticky", top: 0, zIndex: 100, background: "#141515", borderBottom: B, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", height: "60px", fontFamily: "Poppins, sans-serif" },
  aNavBrand: { color: "#D7792B", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "0.04em" },
  btnSm: { padding: "0.4rem 1rem", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", border: "2px solid #F3F3F0", color: "#F3F3F0", background: "transparent", cursor: "pointer", fontFamily: "Poppins, sans-serif", textDecoration: "none" },
  aHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", borderBottom: B, paddingBottom: "1.5rem" },
  btnPrimary: { background: "#D7792B", color: "#141515", border: B, padding: "0.7rem 1.6rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", boxShadow: SH, fontFamily: "Poppins, sans-serif" },
  aItem: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 1.5rem", border: B, fontFamily: "Poppins, sans-serif" },
  aCatTag: { fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0.15rem 0.5rem", border: "1.5px solid #141515", whiteSpace: "nowrap", background: "#141515", color: "#F3F3F0" },
  btnEdit: { padding: "0.35rem 0.9rem", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", border: "2px solid #141515", cursor: "pointer", background: "#F3F3F0", fontFamily: "Poppins, sans-serif" },
  btnDel: { padding: "0.35rem 0.9rem", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", border: "2px solid #c0392b", cursor: "pointer", background: "#F3F3F0", color: "#c0392b", fontFamily: "Poppins, sans-serif" },
  modalOverlay: { display: "flex", position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 900, alignItems: "flex-start", justifyContent: "center", padding: "1.5rem 1rem", overflowY: "auto", fontFamily: "Poppins, sans-serif" },
  modalCard: { background: "#F3F3F0", border: B, boxShadow: SHL, maxWidth: "780px", width: "100%", margin: "auto", animation: "fadeUp 0.2s ease" },
  modalHdr: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.2rem 1.8rem", borderBottom: B, background: "#141515", color: "#F3F3F0" },
  btnClose: { background: "transparent", border: "none", color: "#F3F3F0", fontSize: "1.3rem", cursor: "pointer", lineHeight: 1, padding: "0 0.3rem" },
  artForm: { padding: "1.8rem", display: "flex", flexDirection: "column", gap: "1.2rem" },
  formGroup: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  formLbl: { fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" },
  formInp: { width: "100%", padding: "0.65rem 0.9rem", border: B, background: "#F3F3F0", fontSize: "0.88rem", color: "#141515", fontFamily: "Poppins, sans-serif" },
  formActions: { display: "flex", justifyContent: "flex-end", gap: "1rem", paddingTop: "1rem", borderTop: "2px solid #e5e5e2" },
  btnSec: { padding: "0.65rem 1.4rem", background: "transparent", border: B, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", fontFamily: "Poppins, sans-serif" },
  editorWrap: { border: B, background: "#F3F3F0" },
  editorToolbar: { display: "flex", gap: "0.3rem", flexWrap: "wrap", padding: "0.5rem 0.6rem", background: "#f0f0ec", borderBottom: B },
  edBtn: { padding: "0.28rem 0.55rem", minWidth: "30px", textAlign: "center", background: "#F3F3F0", border: "1.5px solid #aaa", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", lineHeight: 1.4, fontFamily: "Poppins, sans-serif" },
  edSep: { width: "1px", background: "#ccc", margin: "0.2rem 0.1rem", alignSelf: "stretch" },
  editorContent: { minHeight: "220px", maxHeight: "400px", padding: "1rem 1.1rem", overflowY: "auto", fontSize: "0.9rem", lineHeight: 1.85, outline: "none", color: "#141515", fontFamily: "Poppins, sans-serif" },
};
