export interface Article {
  id: string;
  judul: string;
  kategori: "kopi" | "ruang" | "komunitas" | "tips";
  kategoriLabel: string;
  tanggal: string;
  ringkasan: string;
  gambar: string;
  isi: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export const CATEGORY_LABELS: Record<string, string> = {
  kopi: "☕ Kopi",
  ruang: "🏠 Ruang",
  komunitas: "🤝 Komunitas",
  tips: "💡 Tips",
};

export const FALLBACK_ARTICLES: Article[] = [
  {
    id: "kenapa-kopi-single-origin",
    judul: "Kenapa Kopi Single Origin Itu Beda?",
    kategori: "kopi",
    kategoriLabel: "☕ Kopi",
    tanggal: "20 Maret 2026",
    ringkasan:
      "Banyak yang tanya, apa bedanya kopi single origin dengan blend biasa? Jawabannya ada di sini — dan lebih dalam dari yang kamu kira.",
    gambar: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    isi: [
      "<p>Kalau kamu pernah duduk di Kedai Atap dan memesan V60, barista kami pasti pernah bilang: ",
      "\"Ini single origin dari Flores.\" Dan mungkin kamu mengangguk sambil dalam hati bertanya-tanya — ",
      "<em>emangnya bedanya apa sih?</em></p>",
      "<h3>Apa Itu Single Origin?</h3>",
      "<p>Single origin artinya kopi berasal dari satu lokasi spesifik — bisa satu perkebunan, satu desa, ",
      "bahkan satu petani. Berbeda dengan blend yang menggabungkan berbagai biji, single origin merayakan ",
      "keunikan tempat asalnya.</p>",
      "<p>Tanah, iklim, ketinggian, hingga cara petani memproses cherry kopi — semuanya berbicara melalui ",
      "cangkir kamu. Kopi Gayo dari Aceh punya karakter earthy dan full-body. Kopi Flores cenderung lebih ",
      "manis dengan sentuhan cokelat. Kopi Toraja? Fruity, kompleks, dan selalu bikin penasaran.</p>",
      "<h3>Kenapa Ini Penting?</h3>",
      "<p>Di Kedai Atap, kami percaya meminum kopi bukan hanya soal kafein. Ini soal <strong>koneksi</strong> ",
      "— dengan petani yang menanamnya, tanah yang merawatnya, dan cerita panjang di balik setiap biji.</p>",
      "<h3>Tips Menikmatinya</h3>",
      "<ul>",
      "<li>Minum tanpa gula dulu — rasakan kompleksitasnya</li>",
      "<li>Tanya barista soal origin dan processing method-nya</li>",
      "<li>Bandingkan dua origin berbeda di satu sesi — itu pengalaman yang seru</li>",
      "</ul>",
    ].join(""),
  },
  {
    id: "cafe-produktif-vs-cafe-estetik",
    judul: "Café Produktif vs Café Estetik: Mana yang Kamu Butuhkan?",
    kategori: "ruang",
    kategoriLabel: "🏠 Ruang",
    tanggal: "15 Maret 2026",
    ringkasan:
      "Ada dua tipe café yang populer sekarang. Yang satu bikin foto bagus, yang satu bikin kerjaan kelar. Kedai Atap ada di mana?",
    gambar: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80",
    isi: [
      "<p>Scroll Instagram sebentar, dan kamu akan menemukan dua jenis café: yang punya dinding estetik penuh ",
      "tumbuhan dengan lighting hangat yang bikin foto kamu terlihat mahal. Dan yang satu lagi — tidak terlalu ",
      "fotogenik, tapi WiFi-nya kencang dan kursinya nyaman.</p>",
      "<h3>Masalahnya...</h3>",
      "<p>Kebanyakan café memilih salah satu. Yang estetik sering kali ramai, berisik, dan musiknya terlalu ",
      "keras untuk fokus kerja. Yang \"produktif\" sering terasa seperti kantor murah yang menyajikan kopi.</p>",
      "<h3>Ruang yang Punya Karakter</h3>",
      "<p>Kedai Atap dirancang untuk manusia yang punya pekerjaan nyata — dan juga menghargai estetika yang ",
      "tidak dibuat-buat. Dinding kami punya cerita. Meja kami cukup luas untuk laptop dan buku. ",
      "Stop kontak ada di mana-mana (beneran).</p>",
      "<p>Tapi kami juga sangat serius soal kopi. Karena ruang yang bagus tanpa kopi yang serius, itu setengah solusi.</p>",
    ].join(""),
  },
  {
    id: "komunitas-lahir-dari-sudut-ruangan",
    judul: "Komunitas Lahir dari Sudut Ruangan",
    kategori: "komunitas",
    kategoriLabel: "🤝 Komunitas",
    tanggal: "10 Maret 2026",
    ringkasan:
      "Bagaimana sebuah meja pojok di Kedai Atap menjadi tempat lahirnya tiga proyek startup, dua band lokal, dan satu komunitas buku.",
    gambar: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
    isi: [
      "<p>Ada sebuah meja di sudut barat Kedai Atap. Tidak ada yang spesial dari meja itu — kayu tua, dua kursi, ",
      "pemandangan ke arah jalanan. Tapi setahun terakhir, meja itu sudah menjadi saksi bisu dari banyak hal ",
      "yang tidak kami rencanakan.</p>",
      "<h3>Pertemuan-pertemuan yang Tidak Disengaja</h3>",
      "<p>Alifia dan Raka bertemu di meja itu karena stopkontak terdekat kebetulan ada di bawahnya. Dua bulan ",
      "kemudian, mereka meluncurkan platform edukasi lokal yang sekarang sudah dipakai oleh 500+ pelajar di Lampung.</p>",
      "<p>Komunitas buku \"Buku Tanpa Sampul\" lahir dari percakapan antara tiga pelanggan yang duduk bersebelahan ",
      "karena tempat duduk lain penuh pada malam Rabu.</p>",
      "<h3>Kami Bukan yang Membuatnya Terjadi</h3>",
      "<p>Yang kami lakukan hanya menyediakan ruang yang nyaman, kopi yang bagus, dan suasana yang tidak membuat ",
      "orang merasa terburu-buru pulang. Selebihnya? Itu kreativitas manusia-manusia luar biasa yang datang ke sini.</p>",
    ].join(""),
  },
  {
    id: "tips-order-manual-brew",
    judul: "5 Tips Supaya Order Manual Brew Kamu Tidak Gagal",
    kategori: "tips",
    kategoriLabel: "💡 Tips",
    tanggal: "5 Maret 2026",
    ringkasan:
      "Manual brew itu pengalaman, bukan sekadar pesanan. Ini yang perlu kamu tahu sebelum minta V60 ke barista kami.",
    gambar: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    isi: [
      "<p>Manual brew bukan kopi yang bisa kamu minta sambil lalu. Ini pengalaman yang butuh sedikit pengetahuan ",
      "— dan barista yang bisa diajak ngobrol.</p>",
      "<h3>1. Tanya Origin-nya Dulu</h3>",
      "<p>Sebelum order, tanya ke barista biji apa yang sedang tersedia hari itu. Single origin bisa berganti setiap minggu.</p>",
      "<h3>2. Ceritakan Preferensi Rasa Kamu</h3>",
      "<p>Jangan malu bilang \"saya suka yang tidak terlalu pahit\" atau \"boleh yang ada rasa cokelatnya?\" ",
      "Barista kami akan menyesuaikan metode dan rasio brew-nya.</p>",
      "<h3>3. Minta Waktu</h3>",
      "<p>Manual brew butuh 4-6 menit. Jangan order ini kalau kamu buru-buru. Nikmati prosesnya.</p>",
      "<h3>4. Minum Selagi Panas</h3>",
      "<p>Manual brew dirancang untuk dinikmati panas. Profil rasanya akan berubah seiring suhu turun.</p>",
      "<h3>5. Jangan Tambah Gula Dulu</h3>",
      "<p>Coba seruput pertama tanpa penambahan apapun. Kalau masih terasa kurang, baru minta gula ke barista.</p>",
    ].join(""),
  },
  {
    id: "playlist-kerja-kedai-atap",
    judul: "Di Balik Playlist Kerja Kedai Atap",
    kategori: "ruang",
    kategoriLabel: "🏠 Ruang",
    tanggal: "28 Feb 2026",
    ringkasan:
      "Kami pilih musik dengan teliti — bukan asal pasang. Ini filosofi di balik setiap lagu yang kamu dengar saat bekerja di sini.",
    gambar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    isi: [
      "<p>Pernah masuk ke café dan langsung terganggu karena musiknya terlalu keras atau terlalu mainstream? ",
      "Kami pernah merasakannya juga. Dan itu yang mendorong kami untuk sangat serius soal playlist di Kedai Atap.</p>",
      "<h3>Aturan Sederhana Kami</h3>",
      "<p>Musik tidak boleh mendistraksi. Artinya tidak ada lagu yang liriknya terlalu kuat sehingga kamu ",
      "tidak bisa tidak menyanyi dalam kepala. Tidak ada beat yang terlalu keras.</p>",
      "<h3>Genre yang Kami Putarkan</h3>",
      "<p>Lo-fi hip hop di pagi hari. Jazz contemporer di siang. Indie folk yang tenang di sore. Dan kadang ",
      "— kalau suasana sedang tepat — sedikit bossa nova Brasil yang halus.</p>",
      "<h3>Volume Adalah Segalanya</h3>",
      "<p>Volume kami set di titik di mana kamu bisa mendengar musiknya, tapi tetap bisa mendengar percakapan ",
      "meja sebelah tanpa harus berteriak.</p>",
    ].join(""),
  },
  {
    id: "sejarah-kedai-atap",
    judul: "Dari Atap Kost ke Café Komunitas: Cerita Awal Kedai Atap",
    kategori: "komunitas",
    kategoriLabel: "🤝 Komunitas",
    tanggal: "1 Feb 2026",
    ringkasan:
      "Kedai Atap lahir dari kebutuhan yang sederhana — tempat yang nyaman untuk ngobrol panjang dan kopi yang jujur. Ini ceritanya.",
    gambar: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80",
    isi: [
      "<p>Tahun 2024. Sebuah lantai atas sebuah kost di Kedaton, Bandar Lampung. Tidak ada neon sign, tidak ada ",
      "menu yang dicetak cantik, tidak ada mesin espresso yang mahal. Hanya sebuah meja, beberapa kursi, dan ",
      "keinginan yang kuat untuk membuat ruang yang <em>berbeda</em>.</p>",
      "<h3>Akarnya Bukan Bisnis</h3>",
      "<p>Kedai Atap tidak lahir dari hitungan bisnis yang matang. Ia lahir dari frustrasi — karena tidak ada ",
      "tempat di sekitar yang bisa dipakai untuk ngobrol panjang tanpa dilirik karena terlalu lama duduk.</p>",
      "<h3>Atap Sebagai Metafora</h3>",
      "<p>\"Atap\" bukan hanya lokasi — ini metafora. Atap adalah perlindungan. Atap adalah tempat orang berkumpul. ",
      "Atap adalah titik tertinggi dari sebuah bangunan — tempat yang punya perspektif berbeda dari yang di bawah.</p>",
      "<h3>Sekarang</h3>",
      "<p>Empat tahun kemudian, Kedai Atap sudah menjadi rumah bagi ratusan pelanggan tetap, puluhan kolaborator, ",
      "dan komunitas yang terus tumbuh. Terima kasih sudah menjadi bagian dari cerita ini.</p>",
    ].join(""),
  },
];
