// ============================================
// GLOSSARIUM PPKn — Istilah penting & definisinya
// ============================================

const GLOSSARIUM = [
  { term: 'Pancasila', def: 'Dasar negara Indonesia yang terdiri dari lima sila, ditetapkan pertama kali oleh Ir. Soekarno pada 1 Juni 1945. Berasal dari bahasa Sanskerta: panca (lima) + sila (asas).', tag: 'pancasila' },
  { term: 'Piagam Jakarta', def: 'Dokumen rumusan dasar negara hasil Panitia Sembilan tanggal 22 Juni 1945. Sila pertama awalnya berbunyi "Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya", diubah menjadi "Yang Maha Esa" pada 18 Agustus 1945.', tag: 'pancasila' },
  { term: 'BPUPKI', def: 'Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia. Dibentuk Jepang 29 April 1945, diketuai Dr. K.R.T. Radjiman Wedyodiningrat. Mengadakan dua sidang: 29 Mei–1 Juni 1945 dan 10–17 Juli 1945.', tag: 'pancasila' },
  { term: 'PPKI', def: 'Panitia Persiapan Kemerdekaan Indonesia. Dibentuk 7 Agustus 1945, diketuai Soekarno. Mengesahkan UUD 1945, memilih Soekarno-Hatta, dan membentuk Komite Nasional pada sidang 18 Agustus 1945.', tag: 'uud' },
  { term: 'Proklamasi', def: 'Pernyataan kemerdekaan Indonesia, dibacakan oleh Soekarno didampingi Hatta pada Jumat 17 Agustus 1945 pukul 10.00 WIB di Jl. Pegangsaan Timur 56, Jakarta. Teks diketik oleh Sayuti Melik.', tag: 'nkri' },
  { term: 'UUD 1945', def: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945. Disahkan PPKI pada 18 Agustus 1945. Telah diamandemen 4 kali pada tahun 1999, 2000, 2001, dan 2002.', tag: 'uud' },
  { term: 'Amandemen', def: 'Perubahan pada konstitusi. UUD 1945 telah diamandemen 4 kali oleh MPR pada masa reformasi (1999–2002). Yang tidak boleh diubah: Pembukaan UUD 1945 dan bentuk negara kesatuan.', tag: 'uud' },
  { term: 'Pembukaan UUD 1945', def: 'Bagian awal UUD 1945 yang terdiri dari 4 alinea. Memuat dasar pembentukan negara, tujuan negara, dan dasar negara Pancasila. Tidak dapat diubah karena merupakan kaidah pokok negara.', tag: 'uud' },
  { term: 'MPR', def: 'Majelis Permusyawaratan Rakyat. Lembaga negara yang terdiri dari anggota DPR dan DPD. Berwenang mengubah & menetapkan UUD, melantik Presiden/Wapres, serta memberhentikan Presiden/Wapres dalam masa jabatannya.', tag: 'uud' },
  { term: 'DPR', def: 'Dewan Perwakilan Rakyat. Memiliki tiga fungsi utama: legislasi (membuat UU), anggaran (menyetujui APBN), dan pengawasan terhadap pemerintah.', tag: 'uud' },
  { term: 'DPD', def: 'Dewan Perwakilan Daerah. Anggota dipilih dari tiap provinsi (4 orang per provinsi). Mewakili kepentingan daerah dalam pembentukan UU yang berkaitan dengan otonomi daerah.', tag: 'uud' },
  { term: 'MK', def: 'Mahkamah Konstitusi. Berwenang menguji UU terhadap UUD, memutus sengketa kewenangan lembaga negara, memutus pembubaran parpol, memutus sengketa hasil pemilu, dan putusan impeachment.', tag: 'uud' },
  { term: 'MA', def: 'Mahkamah Agung. Lembaga peradilan tertinggi di Indonesia. Mengadili pada tingkat kasasi, menguji peraturan di bawah UU terhadap UU.', tag: 'uud' },
  { term: 'KY', def: 'Komisi Yudisial. Berwenang mengusulkan pengangkatan hakim agung dan menjaga kehormatan, keluhuran martabat, serta perilaku hakim.', tag: 'uud' },
  { term: 'BPK', def: 'Badan Pemeriksa Keuangan. Lembaga negara yang bebas dan mandiri, bertugas memeriksa pengelolaan dan tanggung jawab keuangan negara.', tag: 'uud' },
  { term: 'NKRI', def: 'Negara Kesatuan Republik Indonesia. Bentuk negara Indonesia berdasarkan Pasal 1 ayat (1) UUD 1945: negara kesatuan berbentuk republik. Tidak bisa diubah melalui amandemen.', tag: 'nkri' },
  { term: 'Wawasan Nusantara', def: 'Cara pandang dan sikap bangsa Indonesia mengenai diri dan lingkungannya berdasarkan Pancasila dan UUD 1945. Memandang Indonesia sebagai satu kesatuan politik, ekonomi, sosial budaya, dan hankam.', tag: 'nkri' },
  { term: 'Deklarasi Djuanda', def: 'Deklarasi 13 Desember 1957 yang menetapkan laut antar pulau adalah wilayah Indonesia. Mengubah pandangan Indonesia sebagai negara kepulauan dengan laut sebagai pemersatu, diakui internasional melalui UNCLOS 1982.', tag: 'nkri' },
  { term: 'Otonomi Daerah', def: 'Hak, wewenang, dan kewajiban daerah otonom untuk mengatur dan mengurus sendiri urusan pemerintahan sesuai peraturan. Diatur dalam UU No. 23 Tahun 2014. Asasnya: desentralisasi, dekonsentrasi, tugas pembantuan.', tag: 'nkri' },
  { term: 'Bhinneka Tunggal Ika', def: 'Semboyan negara Indonesia: "Berbeda-beda tetap satu jua". Berasal dari Kitab Sutasoma karya Mpu Tantular (abad ke-14). Ditetapkan dalam UUD 1945 Pasal 36A.', tag: 'bhinneka' },
  { term: 'Sutasoma', def: 'Kitab karya Mpu Tantular dari masa Kerajaan Majapahit (sekitar 1365–1389 M). Pada Pupuh 139 bait 5 tertulis "Bhinneka Tunggal Ika, Tan Hana Dharma Mangrwa".', tag: 'bhinneka' },
  { term: 'Sumpah Pemuda', def: 'Ikrar pemuda Indonesia pada 28 Oktober 1928 dalam Kongres Pemuda II: satu nusa, satu bangsa, satu bahasa Indonesia. Lagu Indonesia Raya pertama kali diperdengarkan pada acara ini.', tag: 'bhinneka' },
  { term: 'Garuda Pancasila', def: 'Lambang negara Indonesia yang dirancang oleh Sultan Hamid II, ditetapkan 11 Februari 1950. Jumlah bulunya melambangkan 17-8-1945: sayap 17, ekor 8, pangkal ekor 19, leher 45.', tag: 'pancasila' },
  { term: 'HAM', def: 'Hak Asasi Manusia. Diatur khusus dalam UUD 1945 Bab XA Pasal 28A–28J. Pasal 28I memuat hak yang tidak dapat dikurangi (non-derogable rights) seperti hak hidup, tidak disiksa, kebebasan beragama.', tag: 'uud' },
  { term: 'Sishankamrata', def: 'Sistem Pertahanan dan Keamanan Rakyat Semesta. Diatur Pasal 30 UUD 1945. Setiap warga negara berhak dan wajib ikut dalam usaha pertahanan dan keamanan negara.', tag: 'nkri' },
  { term: 'TNI', def: 'Tentara Nasional Indonesia. Alat negara di bidang pertahanan, terdiri dari TNI AD, TNI AL, dan TNI AU. Dipisah dari Polri berdasarkan TAP MPR No. VI/MPR/2000.', tag: 'nkri' },
  { term: 'Sila Pertama', def: 'Ketuhanan Yang Maha Esa. Simbol: bintang emas dengan latar hitam. Bermakna pengakuan akan Tuhan, kebebasan beragama, dan toleransi antar umat.', tag: 'pancasila' },
  { term: 'Sila Kedua', def: 'Kemanusiaan yang Adil dan Beradab. Simbol: rantai berbentuk persegi (laki-laki) dan lingkaran (perempuan). Menjunjung harkat dan martabat manusia.', tag: 'pancasila' },
  { term: 'Sila Ketiga', def: 'Persatuan Indonesia. Simbol: pohon beringin (akar tunggang melambangkan kesatuan). Cinta tanah air, rela berkorban demi bangsa.', tag: 'pancasila' },
  { term: 'Sila Keempat', def: 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan. Simbol: kepala banteng. Kedaulatan di tangan rakyat, musyawarah mufakat.', tag: 'pancasila' },
  { term: 'Sila Kelima', def: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia. Simbol: padi dan kapas (sandang pangan). Pemerataan kesejahteraan, keseimbangan hak dan kewajiban.', tag: 'pancasila' },
  { term: 'Pasal 1 UUD 1945', def: 'Mengatur bentuk dan kedaulatan negara. Ayat (1): NKRI berbentuk republik. Ayat (2): kedaulatan di tangan rakyat dilaksanakan menurut UUD. Ayat (3): Indonesia negara hukum.', tag: 'uud' },
  { term: 'Pasal 27', def: 'Mengatur persamaan kedudukan dalam hukum dan pemerintahan. Setiap warga negara wajib menjunjung hukum dan pemerintahan tanpa kecuali. Berhak atas pekerjaan dan kehidupan yang layak.', tag: 'uud' },
  { term: 'Pasal 29', def: 'Mengatur agama. Ayat (1): negara berdasar Ketuhanan YME. Ayat (2): negara menjamin kemerdekaan tiap penduduk untuk memeluk agamanya masing-masing dan beribadat menurut agama dan kepercayaannya.', tag: 'uud' },
  { term: 'Pasal 31', def: 'Mengatur pendidikan. Setiap warga negara berhak mendapat pendidikan. Pemerintah mengusahakan sistem pendidikan nasional. Anggaran pendidikan minimal 20% dari APBN dan APBD.', tag: 'uud' },
  { term: 'Pasal 33', def: 'Mengatur perekonomian. Disusun atas asas kekeluargaan. Cabang-cabang produksi yang penting bagi negara dan menguasai hajat hidup orang banyak dikuasai oleh negara.', tag: 'uud' },
  { term: 'Pasal 36A', def: 'Lambang Negara ialah Garuda Pancasila dengan semboyan Bhinneka Tunggal Ika. Hasil Amandemen ke-2 tahun 2000.', tag: 'bhinneka' },
  { term: 'TAP MPR', def: 'Ketetapan Majelis Permusyawaratan Rakyat. Beberapa TAP MPR penting: No. I/MPR/2003 menegaskan Pancasila sebagai dasar negara, No. VI/MPR/2000 memisahkan TNI dan Polri.', tag: 'uud' },
  { term: 'Pemilu', def: 'Pemilihan Umum. Diatur dalam Pasal 22E UUD 1945. Asasnya: langsung, umum, bebas, rahasia, jujur, dan adil (LUBER JURDIL). Dilaksanakan setiap 5 tahun untuk memilih anggota DPR, DPD, DPRD, Presiden/Wapres.', tag: 'uud' },
  { term: 'KPU', def: 'Komisi Pemilihan Umum. Lembaga penyelenggara pemilu yang bersifat nasional, tetap, dan mandiri. Diatur dalam Pasal 22E ayat (5) UUD 1945.', tag: 'uud' }
];

if (typeof window !== 'undefined') window.GLOSSARIUM = GLOSSARIUM;
