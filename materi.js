// ============================================
// MATERI RINGKASAN — 4 Pilar Kebangsaan
// Konten ringkasan untuk peserta baca sebelum/sesudah quiz
// ============================================

const MATERI = {
  pancasila: {
    title: 'Pancasila',
    subtitle: 'Dasar Negara & Ideologi Bangsa Indonesia',
    icon: '⬢',
    accent: '#C76D45',
    sections: [
      {
        heading: 'Lahirnya Pancasila',
        body: 'Pancasila lahir pada 1 Juni 1945 ketika Ir. Soekarno menyampaikan pidatonya di sidang Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia (BPUPKI). Kata "Pancasila" berasal dari bahasa Sanskerta: "panca" (lima) dan "sila" (asas/dasar). BPUPKI dibentuk Jepang pada 29 April 1945 dan diketuai oleh Dr. K.R.T. Radjiman Wedyodiningrat. Sidang BPUPKI berlangsung dua kali: 29 Mei – 1 Juni 1945 (merumuskan dasar negara) dan 10 – 17 Juli 1945 (merumuskan UUD). Tiga tokoh yang menyampaikan usulan dasar negara: Mohammad Yamin (29 Mei 1945), Soepomo (31 Mei 1945), dan Ir. Soekarno (1 Juni 1945). Soekarno-lah yang pertama kali mengusulkan istilah "Pancasila".'
      },
      {
        heading: 'Piagam Jakarta',
        body: 'Piagam Jakarta (Jakarta Charter) dirumuskan oleh Panitia Sembilan pada 22 Juni 1945. Panitia Sembilan terdiri dari: Ir. Soekarno (ketua), Drs. Moh. Hatta, Mr. A.A. Maramis, Abikoesno Tjokrosoejoso, Abdoel Kahar Moezakir, Haji Agus Salim, Mr. Achmad Soebardjo, K.H. Wahid Hasjim, dan Mr. Muhammad Yamin. Sila pertama dalam Piagam Jakarta berbunyi: "Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya". Atas usul Mohammad Hatta setelah mendengar keberatan dari perwakilan Indonesia Timur (disampaikan A.A. Maramis), pada 18 Agustus 1945 (sidang PPKI), tujuh kata tersebut diganti menjadi "Yang Maha Esa".'
      },
      {
        heading: 'Lima Sila Pancasila',
        body: '1) Ketuhanan Yang Maha Esa — pengakuan akan adanya Tuhan, kebebasan beragama, dan toleransi antar umat. Simbol: bintang emas dengan latar hitam. 2) Kemanusiaan yang Adil dan Beradab — menjunjung harkat dan martabat manusia, persamaan derajat. Simbol: rantai berbentuk persegi (laki-laki) dan lingkaran (perempuan). 3) Persatuan Indonesia — cinta tanah air, rela berkorban demi bangsa, menjaga keutuhan NKRI. Simbol: pohon beringin (akar tunggang melambangkan kesatuan). 4) Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan — kedaulatan di tangan rakyat, musyawarah mufakat. Simbol: kepala banteng (musyawarah). 5) Keadilan Sosial bagi Seluruh Rakyat Indonesia — pemerataan kesejahteraan, keseimbangan hak dan kewajiban. Simbol: padi dan kapas (sandang pangan).'
      },
      {
        heading: 'Garuda Pancasila',
        body: 'Lambang negara Garuda Pancasila dirancang oleh Sultan Hamid II dari Pontianak dan ditetapkan sebagai lambang negara pada 11 Februari 1950. Jumlah bulu Garuda mengandung makna proklamasi 17-8-1945: sayap kanan dan kiri masing-masing 17 helai, ekor 8 helai, pangkal ekor 19 helai, dan leher 45 helai. Cengkeraman Garuda memegang pita bertuliskan "Bhinneka Tunggal Ika". Pada perisai di dada Garuda terdapat lima ruang yang melambangkan kelima sila Pancasila. Warna emas pada Garuda melambangkan keagungan.'
      },
      {
        heading: 'Pancasila sebagai Dasar Negara dan Ideologi',
        body: 'Pancasila berkedudukan sebagai dasar negara (philosophische grondslag), pandangan hidup bangsa (way of life), ideologi nasional, jiwa dan kepribadian bangsa, perjanjian luhur bangsa Indonesia, serta sumber dari segala sumber hukum. Pancasila adalah ideologi terbuka, artinya nilai-nilainya bersifat aktual, dinamis, dan dapat menyesuaikan perkembangan zaman tanpa mengubah nilai dasarnya. Pancasila memiliki tiga nilai: nilai dasar (lima sila), nilai instrumental (UUD, undang-undang), dan nilai praksis (penerapan nyata dalam kehidupan). Hari Kesaktian Pancasila diperingati setiap 1 Oktober, sedangkan Hari Lahir Pancasila pada 1 Juni.'
      },
      {
        heading: 'Pengamalan Pancasila',
        body: 'Mengamalkan Pancasila berarti menerapkan nilai-nilainya dalam keseharian. Sila 1: beribadah sesuai agama, menghormati pemeluk agama lain. Sila 2: tidak diskriminatif, membantu sesama tanpa membedakan suku/agama, berani membela kebenaran. Sila 3: bangga produk Indonesia, ikut menjaga lingkungan, tidak mendukung perpecahan. Sila 4: musyawarah dalam keputusan, menghargai pendapat berbeda, ikut pemilu. Sila 5: bergotong royong, peduli pada yang membutuhkan, bekerja keras secara adil. TAP MPR No. I/MPR/2003 menegaskan bahwa Pancasila tetap berlaku sebagai dasar negara.'
      }
    ]
  },
  uud: {
    title: 'UUD NRI 1945',
    subtitle: 'Konstitusi & Hukum Dasar Tertulis Indonesia',
    icon: '✻',
    accent: '#5F8AAA',
    sections: [
      {
        heading: 'Pengesahan UUD 1945',
        body: 'UUD 1945 disahkan oleh Panitia Persiapan Kemerdekaan Indonesia (PPKI) pada 18 Agustus 1945, satu hari setelah Proklamasi Kemerdekaan. Ketua PPKI adalah Ir. Soekarno dengan wakil Drs. Moh. Hatta. PPKI dibentuk Jepang pada 7 Agustus 1945 sebagai pengganti BPUPKI. Pada sidang pertama PPKI 18 Agustus 1945, tiga keputusan penting diambil: (1) mengesahkan UUD 1945, (2) memilih Soekarno-Hatta sebagai Presiden dan Wakil Presiden, (3) membentuk Komite Nasional untuk membantu presiden sebelum DPR/MPR terbentuk. Pada sidang 19 Agustus 1945, PPKI menetapkan 12 kementerian dan membagi wilayah Indonesia menjadi 8 provinsi.'
      },
      {
        heading: 'Sistematika UUD 1945',
        body: 'UUD 1945 setelah amandemen terdiri dari Pembukaan (4 alinea), Batang Tubuh (16 bab, 37 pasal, 194 ayat), dan tidak lagi memiliki Penjelasan. Pembukaan memuat dasar pembentukan negara, terdiri 4 alinea. Alinea I — pernyataan kemerdekaan hak segala bangsa; Alinea II — perjuangan kemerdekaan; Alinea III — pernyataan kemerdekaan; Alinea IV — tujuan negara, dasar negara (Pancasila), dan bentuk negara. Empat tujuan negara dalam Alinea IV: melindungi segenap bangsa, memajukan kesejahteraan umum, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia.'
      },
      {
        heading: 'Empat Kali Amandemen',
        body: 'UUD 1945 telah diamandemen empat kali oleh MPR pada masa reformasi: Amandemen ke-1 (19 Oktober 1999, Sidang Umum MPR), Amandemen ke-2 (18 Agustus 2000, Sidang Tahunan MPR), Amandemen ke-3 (10 November 2001, Sidang Tahunan MPR), dan Amandemen ke-4 (10 Agustus 2002, Sidang Tahunan MPR). Sebelum amandemen, UUD 1945 terdiri 37 pasal, 49 ayat. Setelah amandemen, menjadi 37 pasal dengan 194 ayat, 16 bab, 3 pasal aturan peralihan, dan 2 pasal aturan tambahan. Hal yang tidak boleh diubah adalah Pembukaan UUD 1945 dan bentuk negara kesatuan (NKRI).'
      },
      {
        heading: 'Lembaga Negara',
        body: 'Pasca amandemen, lembaga-lembaga negara terdiri dari: Lembaga Legislatif — MPR (gabungan DPR + DPD), DPR (memiliki fungsi legislasi, anggaran, pengawasan), DPD (perwakilan daerah, 4 dari tiap provinsi); Lembaga Eksekutif — Presiden dan Wakil Presiden (dipilih langsung sejak 2004, masa jabatan 5 tahun, maksimal 2 periode); Lembaga Yudikatif — Mahkamah Agung (peradilan tertinggi), Mahkamah Konstitusi (uji UU terhadap UUD, sengketa kewenangan, pembubaran parpol, sengketa pemilu, putusan impeachment), dan Komisi Yudisial (mengusulkan hakim agung, menjaga martabat hakim). Lembaga lain: BPK (audit keuangan negara), KPU (pemilu).'
      },
      {
        heading: 'Hak Asasi Manusia dalam UUD 1945',
        body: 'HAM diatur khusus dalam Bab XA UUD 1945, Pasal 28A–28J (hasil Amandemen ke-2 tahun 2000). Pasal 28A: hak hidup. Pasal 28B: hak berkeluarga dan keturunan, hak anak. Pasal 28C: hak mengembangkan diri. Pasal 28D: hak atas kepastian hukum dan pekerjaan. Pasal 28E: hak beragama dan memilih kewarganegaraan. Pasal 28F: hak komunikasi dan informasi. Pasal 28G: hak rasa aman. Pasal 28H: hak hidup sejahtera dan lingkungan baik. Pasal 28I: hak yang tidak dapat dikurangi (non-derogable rights). Pasal 28J: kewajiban menghormati HAM orang lain. Selain itu, hak juga termuat di Pasal 27 (kesamaan dalam hukum), Pasal 29 (kebebasan beragama), Pasal 31 (pendidikan).'
      },
      {
        heading: 'Pasal Penting',
        body: 'Pasal 1 ayat (1): Negara Indonesia adalah negara kesatuan berbentuk republik. Pasal 1 ayat (2): Kedaulatan di tangan rakyat dan dilaksanakan menurut UUD. Pasal 1 ayat (3): Indonesia adalah negara hukum. Pasal 27 ayat (1): persamaan kedudukan dalam hukum dan pemerintahan. Pasal 29 ayat (1): negara berdasar Ketuhanan YME. Pasal 30: pertahanan negara (sistem hankamrata). Pasal 31: pendidikan (anggaran minimum 20% APBN). Pasal 33: perekonomian (asas kekeluargaan, cabang produksi penting dikuasai negara). Pasal 34: fakir miskin dipelihara negara. Pasal 36A: lambang negara Garuda Pancasila. Pasal 36B: lagu kebangsaan Indonesia Raya.'
      }
    ]
  },
  nkri: {
    title: 'NKRI',
    subtitle: 'Negara Kesatuan Republik Indonesia',
    icon: '◈',
    accent: '#6E9C6E',
    sections: [
      {
        heading: 'Proklamasi Kemerdekaan',
        body: 'Proklamasi Kemerdekaan Indonesia dibacakan oleh Ir. Soekarno didampingi Drs. Moh. Hatta pada hari Jumat, 17 Agustus 1945 pukul 10.00 WIB di Jalan Pegangsaan Timur No. 56, Jakarta (sekarang Jalan Proklamasi). Teks Proklamasi diketik oleh Sayuti Melik atas perintah Soekarno. Naskah ditulis tangan pertama kali oleh Soekarno di rumah Laksamana Maeda. Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945, ketika golongan muda (Sukarni, Wikana, Chairul Saleh, dkk.) "mengamankan" Soekarno-Hatta ke Rengasdengklok untuk mendesak proklamasi segera. Bendera Merah Putih pertama dijahit oleh Fatmawati dan dikibarkan oleh Latief Hendraningrat dan Suhud setelah pembacaan proklamasi.'
      },
      {
        heading: 'Bentuk Negara dan Pemerintahan',
        body: 'Indonesia adalah negara kesatuan (unitary state) berbentuk republik. Negara kesatuan berarti kedaulatan tidak terbagi-bagi seperti negara federal — pemerintah pusat memegang kekuasaan tertinggi, meski ada otonomi daerah. Bentuk pemerintahan republik berarti kepala negara dipilih (bukan turun-temurun seperti monarki). Indonesia menganut sistem pemerintahan presidensial: presiden adalah kepala negara sekaligus kepala pemerintahan, dipilih langsung oleh rakyat untuk 5 tahun (sejak 2004), maksimal 2 periode. Pasal 18 UUD 1945 mengatur otonomi daerah: NKRI dibagi atas provinsi, kabupaten, dan kota yang berhak mengatur urusan pemerintahannya sendiri sesuai prinsip otonomi.'
      },
      {
        heading: 'Wilayah NKRI',
        body: 'Wilayah Indonesia membentang dari Sabang (paling barat, Aceh) hingga Merauke (paling timur, Papua), dari Miangas (utara) hingga Pulau Rote (selatan). Indonesia adalah negara kepulauan (archipelagic state) terbesar di dunia dengan lebih dari 17.000 pulau. Lima pulau besar: Sumatera, Jawa, Kalimantan, Sulawesi, dan Papua. Letak astronomis: 6° LU – 11° LS dan 95° BT – 141° BT. Letak geografis: di antara benua Asia dan Australia, serta Samudra Hindia dan Pasifik. Indonesia memiliki tiga zona waktu: WIB, WITA, dan WIT. Deklarasi Djuanda (13 Desember 1957) menetapkan bahwa laut antar pulau adalah wilayah Indonesia, kemudian diakui internasional melalui UNCLOS 1982.'
      },
      {
        heading: 'Wawasan Nusantara',
        body: 'Wawasan Nusantara adalah cara pandang dan sikap bangsa Indonesia mengenai diri dan lingkungannya berdasarkan Pancasila dan UUD 1945. Konsep ini melihat Indonesia sebagai satu kesatuan utuh: politik, ekonomi, sosial budaya, dan pertahanan keamanan. Lima asas: kepentingan yang sama, keadilan, kejujuran, solidaritas, dan kesetiaan terhadap kesepakatan. Tujuannya adalah mewujudkan persatuan dan kesatuan dalam keberagaman. Wawasan Nusantara mengubah pandangan teritorial dari "wilayah daratan dengan laut sebagai pemisah" menjadi "negara kepulauan dengan laut sebagai pemersatu". Ini menjadi dasar Deklarasi Djuanda.'
      },
      {
        heading: 'Pertahanan dan Keamanan',
        body: 'Sistem Pertahanan dan Keamanan Rakyat Semesta (Sishankamrata) diatur dalam Pasal 30 UUD 1945. Setiap warga negara berhak dan wajib ikut serta dalam usaha pertahanan dan keamanan negara. Komponen utama: TNI (Tentara Nasional Indonesia) sebagai alat negara di bidang pertahanan, terdiri dari TNI AD, TNI AL, dan TNI AU. Komponen Polri (Kepolisian Negara Republik Indonesia) sebagai alat negara di bidang keamanan dan ketertiban. Komponen pendukung adalah rakyat. TNI dan Polri dipisah berdasarkan TAP MPR No. VI/MPR/2000. Bela negara tidak hanya angkat senjata, tapi juga belajar tekun, taat hukum, melestarikan lingkungan, dan menjaga persatuan.'
      },
      {
        heading: 'Otonomi Daerah',
        body: 'Otonomi daerah adalah hak, wewenang, dan kewajiban daerah otonom untuk mengatur dan mengurus sendiri urusan pemerintahan dan kepentingan masyarakat setempat sesuai peraturan perundang-undangan (UU No. 23 Tahun 2014). Asas-asasnya: desentralisasi (penyerahan kewenangan), dekonsentrasi (pelimpahan dari pusat), dan tugas pembantuan. Daerah otonom: provinsi, kabupaten, dan kota. Kepala daerah (gubernur, bupati, wali kota) dipilih langsung oleh rakyat untuk 5 tahun. Beberapa urusan tetap menjadi kewenangan pusat: pertahanan, keamanan, politik luar negeri, agama, yustisi, moneter dan fiskal nasional. Aceh, Yogyakarta, DKI Jakarta, dan Papua memiliki status keistimewaan/khusus.'
      }
    ]
  },
  bhinneka: {
    title: 'Bhinneka Tunggal Ika',
    subtitle: 'Semboyan Persatuan dalam Keberagaman',
    icon: '✦',
    accent: '#BF9343',
    sections: [
      {
        heading: 'Asal-usul Bhinneka Tunggal Ika',
        body: 'Bhinneka Tunggal Ika berasal dari kitab "Sutasoma" karya Mpu Tantular, seorang pujangga pada masa Kerajaan Majapahit di abad ke-14 (sekitar tahun 1365–1389 M). Frasa lengkapnya: "Bhinneka Tunggal Ika, Tan Hana Dharma Mangrwa" yang berarti "Berbeda-beda tetap satu jua, tak ada kebenaran yang mendua". Frasa ini terdapat dalam Pupuh 139 bait 5 Kakawin Sutasoma. Konteks aslinya adalah toleransi antara umat Hindu (Siwa) dan Buddha pada masa Majapahit, namun kemudian dijadikan semboyan nasional Indonesia karena maknanya yang universal tentang persatuan dalam perbedaan.'
      },
      {
        heading: 'Penetapan sebagai Semboyan Negara',
        body: 'Bhinneka Tunggal Ika ditetapkan sebagai semboyan negara melalui Peraturan Pemerintah Nomor 66 Tahun 1951 tentang Lambang Negara, yang mengatur lambang Garuda Pancasila dengan semboyan Bhinneka Tunggal Ika pada pita yang dicengkeram. Penetapan ini lalu dikukuhkan dalam UUD 1945 Pasal 36A (hasil Amandemen ke-2 tahun 2000): "Lambang Negara ialah Garuda Pancasila dengan semboyan Bhinneka Tunggal Ika". Mohammad Yamin disebut sebagai tokoh yang memperkenalkan semboyan ini kepada Soekarno dan Bung Hatta untuk dijadikan motto bangsa.'
      },
      {
        heading: 'Keberagaman Indonesia',
        body: 'Indonesia adalah negara dengan keberagaman luar biasa: lebih dari 1.300 suku bangsa (data BPS 2010), 718 bahasa daerah (data Kemendikbud), enam agama yang diakui (Islam, Kristen Protestan, Katolik, Hindu, Buddha, Konghucu), dan ratusan kepercayaan/adat istiadat. Suku terbesar: Jawa, Sunda, Batak, Madura, Betawi, Minangkabau, Bugis, Melayu, Banjar, dan Bali. Bahasa daerah dengan penutur terbanyak: Jawa, Sunda, Madura. Walau Konghucu sempat dilarang pada masa Orde Baru (Inpres No. 14/1967), pengakuan kembali diberikan melalui Keppres No. 6/2000 oleh Presiden Abdurrahman Wahid (Gus Dur). Hari Raya Imlek menjadi hari libur nasional sejak 2003 (Keppres No. 19/2002).'
      },
      {
        heading: 'Toleransi & Persatuan',
        body: 'Toleransi adalah sikap saling menghargai dan menghormati perbedaan tanpa kehilangan jati diri. Sumpah Pemuda (28 Oktober 1928) merupakan tonggak persatuan: "Satu nusa, satu bangsa, satu bahasa: Indonesia". Tiga ikrar Sumpah Pemuda: bertumpah darah satu Tanah Air Indonesia, berbangsa satu bangsa Indonesia, dan menjunjung bahasa persatuan bahasa Indonesia. Kongres Pemuda II diadakan di Jakarta, di Gedung Indonesische Clubgebouw Kramat Raya 106 (sekarang Museum Sumpah Pemuda). Lagu Indonesia Raya ciptaan W.R. Supratman pertama kali diperdengarkan pada Kongres Pemuda II. Persatuan tidak berarti seragam — keberagaman tetap dijaga dengan menghargai perbedaan.'
      },
      {
        heading: 'Sikap dalam Keberagaman',
        body: 'Sikap positif dalam keberagaman: menghargai perbedaan agama (tidak memaksakan keyakinan), menghormati budaya daerah lain (tidak meremehkan tradisi), menggunakan bahasa Indonesia yang baik dalam komunikasi nasional sambil melestarikan bahasa daerah, ikut serta dalam kegiatan lintas budaya, tidak menyebar SARA (Suku, Agama, Ras, Antargolongan), serta menghindari stereotip dan prasangka. Konflik dapat dicegah dengan dialog, edukasi, dan penegakan hukum yang adil. Indonesia memiliki UU No. 40 Tahun 2008 tentang Penghapusan Diskriminasi Ras dan Etnis. Multikulturalisme di Indonesia bukan sekadar koeksistensi, tapi interaksi aktif yang saling memperkaya.'
      },
      {
        heading: 'Empat Pilar Kebangsaan',
        body: 'Empat Pilar Kebangsaan Indonesia adalah konsep yang dikemukakan oleh Taufiq Kiemas (mantan Ketua MPR 2009-2014) untuk memperkokoh kesadaran berbangsa. Empat pilar tersebut: (1) Pancasila sebagai dasar negara dan ideologi, (2) UUD NRI 1945 sebagai konstitusi, (3) NKRI sebagai bentuk negara, dan (4) Bhinneka Tunggal Ika sebagai semboyan persatuan dalam keberagaman. Keempat pilar ini saling melengkapi dan tidak terpisahkan. Tanpa Pancasila, bangsa kehilangan arah. Tanpa UUD, tidak ada aturan main. Tanpa NKRI, tidak ada wadah. Tanpa Bhinneka Tunggal Ika, keberagaman menjadi sumber konflik. MPR rutin mengadakan sosialisasi Empat Pilar untuk menjangkau seluruh lapisan masyarakat.'
      }
    ]
  }
};

// Make available globally
if (typeof window !== 'undefined') window.MATERI = MATERI;
