// ============================================
// SEJARAH INDONESIA — Timeline penting
// ============================================

const SEJARAH = [
  {
    period: 'Kebangkitan Nasional (1908-1928)',
    color: '#5F8AAA',
    events: [
      {
        year: '20 Mei 1908',
        title: 'Berdirinya Boedi Oetomo',
        body: 'Organisasi modern pertama Indonesia didirikan oleh Dr. Soetomo bersama para pelajar STOVIA di Jakarta. Diketuai oleh Dr. Wahidin Soedirohoesodo. Boedi Oetomo awalnya bergerak di bidang sosial budaya untuk kemajuan rakyat Jawa, kemudian berkembang menjadi organisasi politik. Tanggal berdirinya kemudian diperingati sebagai Hari Kebangkitan Nasional.'
      },
      {
        year: '10 September 1912',
        title: 'Berdirinya Indische Partij',
        body: 'Partai politik pertama di Indonesia didirikan oleh "Tiga Serangkai": E.F.E. Douwes Dekker (Multatuli), Dr. Tjipto Mangoenkoesoemo, dan Soewardi Soerjaningrat (Ki Hajar Dewantara). Indische Partij memperjuangkan kemerdekaan Indonesia secara terang-terangan. Karena dinilai berbahaya, partai ini dibubarkan Belanda pada 1913, dan ketiga pendirinya diasingkan ke Belanda.'
      },
      {
        year: '16 Oktober 1905',
        title: 'Berdirinya Sarekat Dagang Islam',
        body: 'Didirikan oleh Haji Samanhudi di Solo, awalnya untuk melindungi pedagang batik pribumi dari persaingan pedagang Tionghoa. Pada 1912, di bawah kepemimpinan H.O.S. Tjokroaminoto, organisasi ini berubah nama menjadi Sarekat Islam (SI) dan menjadi organisasi massa pertama dengan anggota mencapai 2,5 juta orang pada 1916.'
      },
      {
        year: '29 Maret 1909',
        title: 'Berdirinya Indische Vereeniging',
        body: 'Perhimpunan mahasiswa Indonesia di Belanda didirikan dengan nama Indische Vereeniging. Pada 1922 berubah nama menjadi Indonesische Vereeniging, dan pada 1925 menjadi Perhimpoenan Indonesia (PI). Tokoh-tokohnya antara lain Mohammad Hatta, Ali Sastroamidjojo, Soetan Sjahrir. PI adalah organisasi pertama yang secara tegas menyatakan cita-cita kemerdekaan Indonesia.'
      },
      {
        year: '31 Januari 1926',
        title: 'Berdirinya Nahdlatul Ulama',
        body: 'NU didirikan oleh K.H. Hasyim Asy\'ari, K.H. Wahab Hasbullah, dan ulama-ulama lain di Surabaya. NU bertujuan mempertahankan tradisi Islam Ahlusunnah wal Jamaah di Indonesia. NU adalah organisasi Islam terbesar di Indonesia hingga saat ini, dengan estimasi anggota mencapai lebih dari 90 juta orang.'
      },
      {
        year: '4 Juli 1927',
        title: 'Berdirinya Partai Nasional Indonesia',
        body: 'PNI didirikan oleh Ir. Soekarno dan tokoh-tokoh muda seperti Iskaq Tjokrohadisoerjo, Sartono, Boediarto, dan Soenarjo di Bandung. PNI mempropagandakan kemerdekaan Indonesia secara terbuka. Soekarno menjadi orator yang sangat berpengaruh. PNI dibubarkan Belanda pada 1931 setelah Soekarno ditangkap pada 1929.'
      },
      {
        year: '28 Oktober 1928',
        title: 'Sumpah Pemuda',
        body: 'Pada Kongres Pemuda II yang diadakan di Jakarta (Gedung Indonesische Clubgebouw, Jalan Kramat Raya 106 — sekarang Museum Sumpah Pemuda), para pemuda dari berbagai daerah dan organisasi bersumpah: (1) Bertumpah darah satu, Tanah Air Indonesia, (2) Berbangsa satu, bangsa Indonesia, (3) Menjunjung bahasa persatuan, bahasa Indonesia. Pada acara ini juga pertama kali diperdengarkan lagu Indonesia Raya ciptaan Wage Rudolf Supratman.'
      }
    ]
  },
  {
    period: 'Pendudukan Jepang & Persiapan Kemerdekaan (1942-1945)',
    color: '#9B6B45',
    events: [
      {
        year: '8 Maret 1942',
        title: 'Penyerahan Belanda kepada Jepang',
        body: 'Belanda menyerah kepada Jepang di Kalijati, Subang. Gubernur Jenderal Tjarda van Starkenborgh Stachouwer menandatangani perjanjian penyerahan dengan Letnan Jenderal Hitoshi Imamura. Dengan ini, Hindia Belanda berakhir dan dimulailah pendudukan Jepang di Indonesia selama 3,5 tahun.'
      },
      {
        year: '1 Maret 1945',
        title: 'Pembentukan BPUPKI',
        body: 'Jepang mengumumkan pembentukan Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia (BPUPKI) sebagai bagian dari janji kemerdekaan. BPUPKI diresmikan pada 29 April 1945 dengan ketua Dr. K.R.T. Radjiman Wedyodiningrat. Anggotanya 67 orang (63 Indonesia + 7 Jepang tanpa hak suara). BPUPKI mengadakan dua sidang.'
      },
      {
        year: '29 Mei - 1 Juni 1945',
        title: 'Sidang BPUPKI I',
        body: 'Sidang merumuskan dasar negara. Tiga tokoh menyampaikan pidato: Mr. Mohammad Yamin (29 Mei), Dr. Soepomo (31 Mei), dan Ir. Soekarno (1 Juni). Soekarno mengusulkan lima dasar yang ia namai "Pancasila". Tanggal 1 Juni kemudian diperingati sebagai Hari Lahir Pancasila.'
      },
      {
        year: '22 Juni 1945',
        title: 'Piagam Jakarta',
        body: 'Panitia Sembilan (Soekarno, Hatta, A.A. Maramis, Abikoesno Tjokrosoejoso, Abdoel Kahar Moezakir, H. Agus Salim, Achmad Soebardjo, K.H. Wahid Hasjim, Mohammad Yamin) berhasil merumuskan kompromi tentang dasar negara dalam dokumen yang disebut Piagam Jakarta (Jakarta Charter). Sila pertama berbunyi "Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya".'
      },
      {
        year: '10-17 Juli 1945',
        title: 'Sidang BPUPKI II',
        body: 'Sidang membahas dan menyusun rancangan UUD. Panitia Perancang UUD dipimpin Ir. Soekarno, sedangkan teks UUD disusun oleh Panitia Kecil yang diketuai Dr. Soepomo. Sidang ini menghasilkan rancangan Pembukaan dan Batang Tubuh UUD yang nantinya menjadi UUD 1945.'
      },
      {
        year: '6 Agustus 1945',
        title: 'Bom Hiroshima',
        body: 'Amerika Serikat menjatuhkan bom atom di Hiroshima, Jepang. Tiga hari kemudian, 9 Agustus 1945, bom atom kedua dijatuhkan di Nagasaki. Peristiwa ini mempercepat keruntuhan Jepang dalam Perang Dunia II.'
      },
      {
        year: '7 Agustus 1945',
        title: 'Pembentukan PPKI',
        body: 'Jepang membentuk Panitia Persiapan Kemerdekaan Indonesia (PPKI atau Dokuritsu Junbi Iinkai) sebagai pengganti BPUPKI yang dibubarkan. Ketua: Ir. Soekarno, Wakil Ketua: Drs. Moh. Hatta, dengan 21 anggota. Tugas PPKI adalah mempersiapkan kemerdekaan Indonesia.'
      },
      {
        year: '9 Agustus 1945',
        title: 'Pertemuan Dalat',
        body: 'Soekarno, Hatta, dan Radjiman Wedyodiningrat dipanggil ke Dalat, Vietnam, oleh Marsekal Terauchi (Panglima Tertinggi tentara Jepang di Asia Tenggara). Terauchi menjanjikan kemerdekaan Indonesia "secepatnya". Mereka kembali ke Indonesia pada 14 Agustus.'
      },
      {
        year: '15 Agustus 1945',
        title: 'Jepang Menyerah',
        body: 'Jepang resmi menyerah kepada Sekutu setelah Kaisar Hirohito menyampaikan pidato penyerahan di radio. Berita ini didengar para pemuda Indonesia (terutama melalui radio bawah tanah). Ini menciptakan kekosongan kekuasaan (vacuum of power) di Indonesia.'
      },
      {
        year: '16 Agustus 1945',
        title: 'Peristiwa Rengasdengklok',
        body: 'Golongan muda (Sukarni, Wikana, Chairul Saleh, dkk.) mendesak Soekarno-Hatta untuk segera memproklamasikan kemerdekaan tanpa menunggu Jepang. Untuk mengamankan agar tidak terpengaruh Jepang, golongan muda "menculik" Soekarno-Hatta (bersama Fatmawati dan Guntur) ke Rengasdengklok, Karawang. Setelah perundingan, mereka kembali ke Jakarta malam harinya.'
      },
      {
        year: '17 Agustus 1945',
        title: 'Proklamasi Kemerdekaan',
        body: 'Pukul 10.00 WIB di Jl. Pegangsaan Timur No. 56, Jakarta, Soekarno didampingi Hatta membacakan teks Proklamasi Kemerdekaan Indonesia. Teks diketik Sayuti Melik dari konsep tulisan tangan Soekarno yang dibuat di rumah Laksamana Maeda. Bendera Merah Putih (dijahit Fatmawati) dikibarkan oleh Latief Hendraningrat dan Suhud. Lagu Indonesia Raya dinyanyikan.'
      },
      {
        year: '18 Agustus 1945',
        title: 'Sidang PPKI I',
        body: 'Tiga keputusan penting: (1) Mengesahkan UUD 1945 sebagai konstitusi negara, (2) Memilih Ir. Soekarno sebagai Presiden dan Drs. Moh. Hatta sebagai Wakil Presiden, (3) Membentuk Komite Nasional untuk membantu presiden. Pada sidang ini juga "tujuh kata" sila pertama Piagam Jakarta diubah menjadi "Yang Maha Esa" atas usul Hatta setelah mendengar keberatan dari perwakilan Indonesia Timur.'
      },
      {
        year: '19 Agustus 1945',
        title: 'Sidang PPKI II',
        body: 'Menetapkan 12 kementerian dan membagi wilayah Indonesia menjadi 8 provinsi: Sumatera (Teuku Mohammad Hasan), Jawa Barat (Sutardjo), Jawa Tengah (R. Panji Soeroso), Jawa Timur (R.A. Soerjo), Sunda Kecil/Nusa Tenggara (I Goesti Ketut Poedja), Maluku (J. Latuharhary), Sulawesi (Sam Ratulangi), dan Kalimantan (Pangeran Mohammad Noor).'
      },
      {
        year: '22 Agustus 1945',
        title: 'Sidang PPKI III',
        body: 'Membentuk Partai Nasional Indonesia (yang nantinya tidak jadi karena dianggap mirip otoriter), membentuk Komite Nasional Indonesia (KNI) dan Badan Keamanan Rakyat (BKR). BKR adalah cikal bakal TKR (5 Oktober 1945), TRI (Tentara Republik Indonesia), dan TNI.'
      }
    ]
  },
  {
    period: 'Mempertahankan Kemerdekaan (1945-1949)',
    color: '#6E9C6E',
    events: [
      {
        year: '5 Oktober 1945',
        title: 'Pembentukan TKR',
        body: 'Tentara Keamanan Rakyat (TKR) dibentuk untuk menggantikan BKR. Panglima Besar pertama dipilih Letjen Soeprijadi (tidak hadir), kemudian pada 12 November 1945 Sudirman terpilih sebagai Panglima Besar TKR melalui pemilihan di Yogyakarta. Tanggal 5 Oktober kemudian menjadi Hari TNI/HUT TNI.'
      },
      {
        year: '10 November 1945',
        title: 'Pertempuran Surabaya',
        body: 'Pertempuran besar antara arek-arek Suroboyo melawan pasukan Sekutu (Inggris) dipicu oleh tewasnya Brigadir Jenderal A.W.S. Mallaby pada 30 Oktober 1945. Sekutu mengultimatum agar rakyat Surabaya menyerah pada 9 November pukul 18.00. Rakyat menolak. Bung Tomo berpidato membakar semangat melalui radio. Pertempuran berlangsung 3 minggu dengan korban besar di pihak Indonesia. Tanggal 10 November ditetapkan sebagai Hari Pahlawan.'
      },
      {
        year: '12-15 Desember 1945',
        title: 'Pertempuran Ambarawa',
        body: 'Pasukan TKR di bawah Kolonel Sudirman bertempur melawan Sekutu (Inggris) di Ambarawa. Sudirman menggunakan taktik "supit udang" (pengepungan dari dua sisi). Pertempuran berakhir dengan kemenangan TKR yang berhasil mengusir Sekutu ke Semarang. Tanggal 15 Desember diperingati sebagai Hari Juang Kartika TNI AD.'
      },
      {
        year: '23 Maret 1946',
        title: 'Bandung Lautan Api',
        body: 'Untuk mencegah kota Bandung jatuh ke tangan Sekutu, rakyat Bandung dengan komando Kolonel A.H. Nasution membakar kota mereka sendiri dan mengungsi ke selatan. Sekitar 200.000 jiwa meninggalkan kota. Mohammad Toha gugur saat meledakkan gudang amunisi Belanda di Dayeuhkolot. Peristiwa ini diabadikan dalam lagu "Halo Halo Bandung".'
      },
      {
        year: '21 Juli 1947',
        title: 'Agresi Militer Belanda I',
        body: 'Belanda melanggar Perjanjian Linggarjati (yang ditandatangani 25 Maret 1947) dengan melancarkan operasi militer untuk menguasai kembali Indonesia. Belanda menyebutnya "Aksi Polisional Pertama". PBB (Dewan Keamanan) turun tangan dan dibentuk Komisi Tiga Negara (Australia, Belgia, Amerika Serikat) untuk menengahi.'
      },
      {
        year: '17 Januari 1948',
        title: 'Perjanjian Renville',
        body: 'Ditandatangani di atas kapal USS Renville, Indonesia diwakili oleh Amir Sjarifuddin, Belanda oleh Abdul Kadir Wijoyoatmodjo. Hasilnya merugikan Indonesia: wilayah RI dibatasi hanya Jawa Tengah, Yogyakarta, dan Sumatera saja. Garis Van Mook menjadi batas. Pasukan RI di wilayah Belanda harus hijrah ke wilayah RI (Divisi Siliwangi hijrah ke Yogyakarta).'
      },
      {
        year: '19 Desember 1948',
        title: 'Agresi Militer Belanda II',
        body: 'Belanda melanggar Perjanjian Renville dengan menyerang ibukota RI di Yogyakarta. Soekarno, Hatta, Sjahrir, dan tokoh lain ditangkap dan diasingkan ke Bangka. Sebelum ditangkap, Soekarno memberi mandat kepada Mr. Sjafruddin Prawiranegara di Bukittinggi untuk membentuk Pemerintah Darurat Republik Indonesia (PDRI), sehingga RI tidak hilang. Jenderal Sudirman memimpin perang gerilya dari hutan ke hutan selama 7 bulan dalam kondisi sakit.'
      },
      {
        year: '1 Maret 1949',
        title: 'Serangan Umum 1 Maret',
        body: 'Untuk membuktikan kepada dunia bahwa TNI masih ada, Letnan Kolonel Soeharto memimpin serangan umum ke Yogyakarta. Serangan berhasil menduduki Yogyakarta selama 6 jam. Berita ini disiarkan melalui radio PDRI di Bukittinggi dan diteruskan ke India, kemudian PBB. Dampaknya besar: dunia melihat RI masih bertahan dan Belanda berbohong tentang sudah menguasai Indonesia.'
      },
      {
        year: '7 Mei 1949',
        title: 'Perjanjian Roem-Royen',
        body: 'Mohammad Roem (RI) dan Dr. J.H. van Royen (Belanda) menandatangani perjanjian: RI bersedia menghentikan perang gerilya dan ikut KMB, Belanda bersedia mengembalikan pemerintahan RI ke Yogyakarta dan membebaskan para pemimpin RI.'
      },
      {
        year: '23 Agustus - 2 November 1949',
        title: 'Konferensi Meja Bundar (KMB)',
        body: 'Konferensi di Den Haag, Belanda. Delegasi RI dipimpin Mohammad Hatta, Belanda oleh Mr. van Maarseveen, BFO (negara federal bentukan Belanda) oleh Sultan Hamid II. Hasil: (1) Belanda mengakui kedaulatan RIS, (2) Status Irian Barat ditangguhkan, (3) RIS-Belanda bergabung dalam Uni Indonesia-Belanda, (4) RIS akan menanggung utang Hindia Belanda.'
      },
      {
        year: '27 Desember 1949',
        title: 'Pengakuan Kedaulatan',
        body: 'Belanda secara resmi menyerahkan kedaulatan kepada Republik Indonesia Serikat (RIS) di dua tempat sekaligus: di Den Haag (Ratu Juliana ke Hatta) dan di Yogyakarta (Wakil Tinggi Mahkota Belanda ke Sri Sultan Hamengkubuwono IX). Soekarno dilantik sebagai Presiden RIS dan Hatta menjadi Perdana Menteri.'
      },
      {
        year: '17 Agustus 1950',
        title: 'Kembali ke NKRI',
        body: 'Setelah berbagai pergolakan, RIS bubar dan Indonesia kembali ke bentuk Negara Kesatuan (NKRI) pada 17 Agustus 1950. UUD yang dipakai adalah UUDS 1950 (sementara). UUD 1945 baru kembali diberlakukan setelah Dekrit Presiden 5 Juli 1959.'
      }
    ]
  },
  {
    period: 'Demokrasi Liberal & Terpimpin (1950-1965)',
    color: '#BF9343',
    events: [
      {
        year: '17 Agustus 1950',
        title: 'NKRI Kembali Berbentuk Kesatuan',
        body: 'Indonesia kembali ke bentuk negara kesatuan setelah berbagai pergolakan di negara-negara bagian RIS. Sistem pemerintahan parlementer dengan UUDS 1950.'
      },
      {
        year: '18-24 April 1955',
        title: 'Konferensi Asia-Afrika',
        body: 'Konferensi Asia-Afrika diadakan di Gedung Merdeka, Bandung. Dihadiri 29 negara Asia dan Afrika. Diprakarsai oleh 5 negara: Indonesia (Ali Sastroamidjojo), India (Nehru), Pakistan (Mohammed Ali Bogra), Sri Lanka/Ceylon (John Kotelawala), dan Burma (U Nu). KAA menghasilkan Dasasila Bandung yang menjadi cikal bakal Gerakan Non-Blok. Bahasa resmi: Inggris, Prancis, Arab.'
      },
      {
        year: '29 September 1955',
        title: 'Pemilu Pertama Indonesia',
        body: 'Pemilu pertama untuk memilih anggota DPR. Empat partai besar pemenang: PNI (8,4 juta suara), Masyumi (7,9 juta), Nahdlatul Ulama (6,9 juta), dan PKI (6,2 juta). Pemilu untuk Konstituante diadakan 15 Desember 1955.'
      },
      {
        year: '5 Juli 1959',
        title: 'Dekrit Presiden',
        body: 'Karena Konstituante gagal menyusun UUD baru selama 3 tahun, Soekarno mengeluarkan Dekrit Presiden: (1) Bubar Konstituante, (2) UUD 1945 kembali berlaku, (3) UUDS 1950 tidak berlaku lagi, (4) Pembentukan MPRS dan DPAS. Dekrit ini menandai dimulainya era Demokrasi Terpimpin.'
      },
      {
        year: '17 Agustus 1960',
        title: 'Pemutusan Hubungan Diplomatik dengan Belanda',
        body: 'Indonesia memutus hubungan diplomatik dengan Belanda karena masalah Irian Barat. Pada 19 Desember 1961, Soekarno mencanangkan Tri Komando Rakyat (Trikora) untuk merebut Irian Barat.'
      },
      {
        year: '15 Agustus 1962',
        title: 'Perjanjian New York',
        body: 'Perjanjian antara Indonesia dan Belanda tentang Irian Barat. Belanda menyerahkan Irian Barat kepada UNTEA (PBB), kemudian pada 1 Mei 1963 PBB menyerahkan kepada Indonesia. Pada 1969, melalui PEPERA (Penentuan Pendapat Rakyat), Irian Barat resmi menjadi bagian Indonesia.'
      },
      {
        year: '30 September 1965',
        title: 'G30S/PKI',
        body: 'Gerakan 30 September yang dituduhkan kepada PKI. Pada dini hari 1 Oktober 1965, 6 jenderal TNI AD dan 1 perwira pertama dibunuh: Letjen A. Yani, Mayjen S. Parman, Mayjen Suprapto, Mayjen Haryono, Brigjen DI Pandjaitan, Brigjen Sutoyo, Lettu Pierre Tendean (ajudan Nasution). Jenderal A.H. Nasution lolos namun putrinya Ade Irma gugur. Mayjen Soeharto memimpin operasi penumpasan. Tanggal 1 Oktober ditetapkan sebagai Hari Kesaktian Pancasila.'
      }
    ]
  },
  {
    period: 'Orde Baru (1966-1998)',
    color: '#9B6BC4',
    events: [
      {
        year: '11 Maret 1966',
        title: 'Supersemar',
        body: 'Soekarno mengeluarkan Surat Perintah 11 Maret (Supersemar) kepada Mayjen Soeharto untuk mengamankan situasi. Dengan Supersemar, Soeharto membubarkan PKI dan ormas-ormasnya pada 12 Maret 1966.'
      },
      {
        year: '12 Maret 1967',
        title: 'Pengangkatan Soeharto sebagai Pejabat Presiden',
        body: 'Melalui Sidang Istimewa MPRS, Soeharto dilantik sebagai Pejabat Presiden menggantikan Soekarno. Soekarno dicabut kekuasaannya melalui TAP MPRS No. XXXIII/1967.'
      },
      {
        year: '27 Maret 1968',
        title: 'Soeharto Resmi Presiden',
        body: 'Soeharto resmi dilantik sebagai Presiden RI ke-2 melalui Sidang Umum MPRS V/1968. Dimulailah era Orde Baru dengan fokus pada stabilitas politik dan pembangunan ekonomi.'
      },
      {
        year: '5 Juli 1971',
        title: 'Pemilu Pertama Orde Baru',
        body: 'Pemilu pertama Orde Baru diikuti 10 partai. Pemenang: Golkar (62,8%), NU (18,7%), Parmusi (5,4%), PNI (6,9%). Golkar mendominasi pemilu-pemilu selanjutnya hingga 1997.'
      },
      {
        year: '5 Januari 1973',
        title: 'Fusi Partai',
        body: 'Partai-partai dipaksa berfusi: 4 partai Islam menjadi PPP (Partai Persatuan Pembangunan), 5 partai nasionalis dan Kristen-Katolik menjadi PDI (Partai Demokrasi Indonesia). Hanya 3 partai diizinkan sepanjang Orde Baru: Golkar, PPP, PDI.'
      },
      {
        year: '21-22 Mei 1998',
        title: 'Mundurnya Soeharto',
        body: 'Setelah krisis moneter 1997, demonstrasi mahasiswa besar-besaran, tragedi Trisakti (12 Mei, 4 mahasiswa gugur), dan kerusuhan Mei, Soeharto akhirnya mundur pada 21 Mei 1998 pukul 09.00 WIB di Istana Merdeka. Wakil Presiden B.J. Habibie dilantik menjadi Presiden RI ke-3. Berakhirlah era Orde Baru setelah 32 tahun.'
      }
    ]
  },
  {
    period: 'Reformasi (1998-Sekarang)',
    color: '#C76D45',
    events: [
      {
        year: '21 Mei 1998',
        title: 'Mulainya Era Reformasi',
        body: 'B.J. Habibie dilantik sebagai Presiden RI ke-3. Era Reformasi dimulai dengan agenda: (1) Amandemen UUD 1945, (2) Kebebasan pers, (3) Otonomi daerah, (4) Pemilu yang demokratis, (5) Penghapusan dwifungsi ABRI, (6) Penegakan hukum dan HAM.'
      },
      {
        year: '7 Juni 1999',
        title: 'Pemilu Reformasi Pertama',
        body: 'Pemilu paling demokratis sejak 1955, diikuti 48 partai. Pemenang: PDI-P (33,7%), Golkar (22,4%), PPP (10,7%), PKB (12,6%), PAN (7,1%). Ini adalah pemilu pertama setelah jatuhnya Orde Baru.'
      },
      {
        year: '20 Oktober 1999',
        title: 'Abdurrahman Wahid (Gus Dur) Presiden',
        body: 'K.H. Abdurrahman Wahid (Gus Dur) terpilih sebagai Presiden RI ke-4 oleh MPR, mengalahkan Megawati Soekarnoputri. Megawati menjadi Wakil Presiden. Gus Dur mengakui Konghucu sebagai agama resmi dan menetapkan Imlek sebagai hari libur nasional.'
      },
      {
        year: '19 Oktober 1999',
        title: 'Amandemen UUD 1945 ke-1',
        body: 'Amandemen pertama UUD 1945 oleh MPR. Membatasi kekuasaan presiden, terutama pembatasan masa jabatan presiden maksimal 2 periode dan penegasan fungsi DPR.'
      },
      {
        year: '23 Juli 2001',
        title: 'Megawati Presiden',
        body: 'Setelah Gus Dur diberhentikan oleh MPR karena Memorandum I dan II tidak ditanggapi, Megawati Soekarnoputri (putri Soekarno) dilantik sebagai Presiden RI ke-5. Hamzah Haz menjadi Wakil Presiden. Megawati adalah presiden perempuan pertama Indonesia.'
      },
      {
        year: '2000-2002',
        title: 'Amandemen UUD 1945 ke-2, 3, dan 4',
        body: 'Amandemen ke-2 (Agustus 2000): tambahan Bab tentang HAM (Pasal 28A-28J), pemerintahan daerah, hak warga negara. Amandemen ke-3 (November 2001): perubahan kelembagaan, pemilu langsung presiden, MK, KY. Amandemen ke-4 (Agustus 2002): perubahan kelembagaan tinggi negara, penambahan TNI dan Polri, pendidikan, perekonomian, lambang negara.'
      },
      {
        year: '5 Juli 2004',
        title: 'Pemilihan Presiden Langsung Pertama',
        body: 'Untuk pertama kali presiden dipilih langsung oleh rakyat. SBY (Susilo Bambang Yudhoyono) dan Jusuf Kalla menang dalam dua putaran (putaran kedua 20 September 2004), mengalahkan Megawati-Hasyim. SBY menjadi Presiden RI ke-6.'
      },
      {
        year: '8 Juli 2009',
        title: 'Pilpres Putaran 1 Cukup',
        body: 'SBY-Boediono menang satu putaran dengan 60,8% suara, mengalahkan Mega-Prabowo dan JK-Wiranto. SBY menjabat 2 periode (2004-2014).'
      },
      {
        year: '20 Oktober 2014',
        title: 'Jokowi Presiden',
        body: 'Ir. H. Joko Widodo (Jokowi) dan Drs. H. M. Jusuf Kalla dilantik sebagai Presiden RI ke-7 dan Wakil Presiden. Jokowi adalah presiden Indonesia pertama yang bukan berasal dari elite politik atau militer.'
      },
      {
        year: '20 Oktober 2019',
        title: 'Jokowi Periode Kedua',
        body: 'Jokowi dilantik untuk periode kedua bersama Wakil Presiden K.H. Ma\'ruf Amin, setelah menang Pilpres 2019 dengan 55,5% suara mengalahkan Prabowo-Sandi.'
      },
      {
        year: '20 Oktober 2024',
        title: 'Prabowo Presiden',
        body: 'Prabowo Subianto dan Gibran Rakabuming Raka dilantik sebagai Presiden dan Wakil Presiden RI setelah memenangi Pilpres 14 Februari 2024 dengan 58,6% suara di putaran pertama.'
      }
    ]
  }
];

if (typeof window !== 'undefined') window.SEJARAH = SEJARAH;
