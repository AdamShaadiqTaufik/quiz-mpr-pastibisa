# Quiz Konstitusi PPKn

Website kuis interaktif 4 pilar kebangsaan untuk lomba sekolah.
Dibuat untuk peserta bimbingan **Bapak Egit Wahyu Nugraha, S.Pd., Gr.**

---

## ✨ 30+ Fitur Lengkap

### 🎨 Desain Modern
- Navbar floating pill cream/putih (match tema)
- Quiz card responsive grid 5 kolom (no horizontal scroll)
- Mode Gelap & Terang dengan toggle (Ctrl+D)
- Hover smooth elegant

### 📚 Belajar (400 Soal + Konten Tebal)
- **400 soal** Pancasila, UUD 1945, NKRI, Bhinneka
- **3 mode**: Ujian, Latihan, Flashcard (kartu flip 3D)
- **Tantangan Akbar** — card ke-5, soal acak gabungan
- 🎯 **Tantangan Harian** — 10 soal harian sama untuk semua
- 📖 **Ringkasan Materi** — bacaan 4 pilar
- 📔 **Glossarium PPKn** — 40 istilah searchable
- 🗂️ **Bank Soal** — telusuri 400 soal dengan filter

### 📂 File Pengetahuan Lengkap
- `materi.js` — ringkasan 4 pilar kebangsaan
- `glossarium.js` — 40 istilah penting PPKn
- `tokoh.js` — biografi 12 pahlawan/tokoh
- `sejarah.js` — timeline 1908-2024
- `ilustrasi.js` — SVG inline (Garuda, 5 sila, bendera, peta NKRI)
- `panduan.js` — strategi belajar 6 kategori
- `latihan-essay.js` — 15 soal essai + 40 kuis kilat
- `pidato.js` — 10 pidato bersejarah lengkap
- `uud-lengkap.js` — teks verbatim Pembukaan + 23 pasal kunci UUD 1945

### 🎯 Alat Cerdas
- Bookmark soal · Ulangi soal salah
- Catatan pribadi per soal + Bank Catatan
- 💡 Hint 50:50 (3x/hari, mode latihan)
- 🔊 Read-aloud TTS Bahasa Indonesia
- 📊 Statistik detail dengan grafik tren
- 👥 Perbandingan dengan sesi sebelumnya

### 🏆 Motivasi
- 🏆 Papan Peringkat antar peserta
- 🔥 Streak harian per individu
- 🏅 12 Achievement
- 🎉 Confetti + fanfare skor tinggi
- 💬 **Quote acak setiap 1 menit** — 60+ kutipan
  - **BJ Habibie (15 quotes)**
  - Soekarno, Hatta, Yamin, Ki Hajar
  - Gus Dur, Megawati, SBY, Jokowi
  - Sudirman, Agus Salim, Kartini, dll
- 🔢 Animasi skor count-up

### ⚙️ Kenyamanan
- Auto-save draft + resume banner
- A−/A/A+ ukuran teks
- Efek suara on/off
- 📜 Sertifikat PDF (modal in-page, printable)
- ⌨️ Keyboard shortcuts
- Mobile responsive penuh

### ☁️ Cloud
- Firebase Realtime Database
- 10 profil peserta + guru
- Data streak/history/achievement terpisah

---

## ⚠️ Setup Firebase Rules

https://console.firebase.google.com/project/mpr4-259f6/database/mpr4-259f6-default-rtdb/rules

```json
{
  "rules": {
    "history": {
      ".read": true,
      ".write": true,
      ".indexOn": ["participantId", "timestamp"]
    }
  }
}
```

Klik **Publish**. Tanpa ini, riwayat hanya tersimpan lokal.

---

## 🚀 Deploy GitHub Pages
1. Push semua file ke repo
2. Settings → Pages → Source: main / root
3. Tunggu 1-2 menit, share link 🎉

---

## ⌨️ Shortcuts
| Tombol | Fungsi |
|--------|--------|
| `1`–`4` | Pilih jawaban |
| `←` `→` | Navigasi soal |
| `Space` | Flip kartu (flashcard) |
| `B` | Bookmark |
| `?` | Bantuan |
| `Ctrl+D` | Tema |
| `Esc` | Tutup popup |

---

## 📦 Total 15 File

- `index.html` (24K) — halaman utama navbar cream
- `styles.css` (122K) — styling, animasi, responsive
- `script.js` (114K) — semua logika & 30+ fitur
- `questions.js` (105K) — 400 soal
- `materi.js` (18K) — ringkasan 4 pilar
- `glossarium.js` (9K) — 40 istilah PPKn
- `tokoh.js` (27K) — biografi 12 pahlawan
- `sejarah.js` (23K) — timeline 1908-2024
- `ilustrasi.js` (24K) — SVG Garuda + 5 sila
- `panduan.js` (16K) — strategi belajar
- `latihan-essay.js` (20K) — 15 essai + 40 kuis kilat
- `pidato.js` (12K) — 10 pidato bersejarah
- `uud-lengkap.js` (~30K) — teks UUD verbatim
- `config.js` (1.2K) — Firebase config
- `README.md` (3K) — dokumentasi

---

## 👤 Peserta
Mahdiah · Adam · Aiman · Alisya · Amirah · Christian · Kanaya · Aqil · Azizah · Surya

**Guru:** Egit Wahyu Nugraha, S.Pd., Gr.

---

## 🛠️ Lokal
```bash
python3 -m http.server 8000
```

Hapus data lokal lewat **Pengaturan → Hapus semua data lokal**.

Semoga sukses lombanya, tim! 🚀
