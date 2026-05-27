# Quiz Konstitusi PPKn

Website kuis interaktif 4 pilar kebangsaan untuk lomba sekolah.
Dibuat untuk peserta bimbingan **Bapak Egit Wahyu Nugraha, S.Pd., Gr.**

---

## 📦 Isi Folder

| File | Fungsi |
|---|---|
| `index.html` | Halaman utama |
| `styles.css` | Styling glassmorphism + cartoon wiggle |
| `script.js` | Logika quiz + Firebase sync |
| `questions.js` | 400 soal (100 per materi) |
| `config.js` | Firebase config |

---

## ✨ Fitur Utama

- **400 soal** PPKn: Pancasila, UUD 1945, NKRI, Bhinneka Tunggal Ika
- Setiap materi: **50 soal mudah + 25 medium + 25 hard**
- 2 mode: **Latihan** (pembahasan instan) & **Ujian** (akhir)
- **10 profil peserta** + 1 guru pembimbing (Pak Egit)
- **Cloud sync** via Firebase Realtime Database — riwayat tersimpan lintas device
- **Cartoon wiggle hover** — efek geter playful di kartu jawaban
- **Pemilihan jawaban yang sangat jelas** — checkmark + ring tebal
- 3 jenis pemilihan soal: acak, urut, atau campur antarmateri

---

## ⚠️ PENTING — Setup Firebase Security Rules

Sebelum dipakai teman-teman, **wajib publish security rules** di Firebase Console agar history bisa tersinkronisasi:

1. Buka: https://console.firebase.google.com/project/mpr4-259f6/database/mpr4-259f6-default-rtdb/rules

2. Ganti seluruh isi rules dengan:

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

3. Klik **Publish**.

Setelah itu, semua riwayat akan otomatis tersimpan di cloud dan bisa diakses dari device manapun.

---

## 🚀 Cara Deploy ke GitHub Pages

1. Push semua file ke repo `quiz-konstitusi` di GitHub
2. **Settings** → **Pages** → Source: `main` branch, `/` (root)
3. Tunggu 1-2 menit, link Pages akan muncul (biasanya: `https://adamshaadiqtaufik.github.io/quiz-konstitusi/`)
4. Share link ke teman-teman lomba 🎉

---

## 👤 Daftar Peserta (sudah tertanam)

1. A. Mahdiah S Fakhirah Asriadi
2. Adam Shaadiq Taufik
3. Aiman Daffano Baihaque
4. Alisya Nur Alifah Haryanto
5. Amirah Zakiyyah Ramadhani
6. Christian Javiery Chandranegara
7. Kanaya Tabita
8. Muhammad Aqil R.
9. Nur Azizah Rizky Budiarti
10. Sang Gede Surya Dharma

**Guru Pembimbing:** Egit Wahyu Nugraha, S.Pd., Gr.

---

## 🛠️ Cara Pakai Lokal

Buka `index.html` di browser. Atau pakai server lokal:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve
```

Lalu buka `http://localhost:8000`

---

Semoga sukses lomba-nya, Adam! 🚀
