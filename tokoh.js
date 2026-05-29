// ============================================
// TOKOH BANGSA — Biografi pahlawan & tokoh penting
// ============================================

const TOKOH = [
  {
    id: 'soekarno',
    name: 'Ir. Soekarno',
    title: 'Proklamator & Presiden RI ke-1',
    birth: '6 Juni 1901, Surabaya',
    death: '21 Juni 1970, Jakarta',
    tag: 'proklamator',
    color: '#C76D45',
    summary: 'Bapak Proklamator, presiden pertama Indonesia, dan tokoh yang mengusulkan istilah Pancasila pertama kali pada 1 Juni 1945.',
    bio: 'Soekarno lahir dengan nama Koesno Sosrodihardjo di Surabaya pada 6 Juni 1901. Ayahnya, Raden Soekemi Sosrodihardjo, seorang guru di Surabaya, dan ibunya, Ida Ayu Nyoman Rai, berasal dari Buleleng, Bali. Karena sering sakit, namanya diganti menjadi Soekarno mengikuti nama tokoh dalam epos Mahabharata, Karna. Soekarno menempuh pendidikan di Europeesche Lagere School (ELS) Mojokerto, kemudian melanjutkan ke Hogere Burger School (HBS) di Surabaya, di mana ia tinggal di rumah H.O.S. Tjokroaminoto, tokoh Sarekat Islam yang sangat berpengaruh terhadap pemikirannya. Pada 1921, Soekarno melanjutkan ke Technische Hoogeschool te Bandoeng (sekarang ITB) dan lulus sebagai insinyur sipil pada 1926. Selama kuliah, ia aktif dalam pergerakan kemandirian, mendirikan Algemeene Studie Club di Bandung pada 1926 yang menjadi cikal-bakal Partai Nasional Indonesia (PNI). Pada 4 Juli 1927, ia bersama Iskaq Tjokrohadisoerjo, Sartono, dan tokoh-tokoh lain mendirikan PNI dengan tujuan kemerdekaan Indonesia. Karena aktivitas politiknya, Soekarno ditangkap Belanda pada 29 Desember 1929 dan diadili di Landraad Bandung. Pada sidang inilah ia menyampaikan pleidoi terkenal berjudul "Indonesia Menggugat" pada 1930.',
    contributions: [
      'Mendirikan Partai Nasional Indonesia (PNI) tahun 1927',
      'Menyampaikan pleidoi "Indonesia Menggugat" tahun 1930',
      'Mengusulkan istilah Pancasila pada pidato 1 Juni 1945 di sidang BPUPKI',
      'Anggota Panitia Sembilan yang merumuskan Piagam Jakarta (22 Juni 1945)',
      'Memproklamasikan Kemerdekaan Indonesia bersama Mohammad Hatta pada 17 Agustus 1945',
      'Presiden pertama RI (1945-1967)',
      'Penggagas Gerakan Non-Blok (KAA Bandung 1955)',
      'Penyusun konsep Trisakti, Manipol-USDEK, Nasakom'
    ],
    quote: '"Berikan aku 1.000 orang tua, niscaya akan kucabut Semeru. Berikan aku 10 pemuda, niscaya akan kuguncangkan dunia."'
  },
  {
    id: 'hatta',
    name: 'Drs. Mohammad Hatta',
    title: 'Proklamator & Wakil Presiden RI ke-1',
    birth: '12 Agustus 1902, Bukittinggi',
    death: '14 Maret 1980, Jakarta',
    tag: 'proklamator',
    color: '#5F8AAA',
    summary: 'Bapak Proklamator, Bapak Koperasi Indonesia, dan tokoh yang mengusulkan penggantian sila pertama Piagam Jakarta menjadi "Yang Maha Esa".',
    bio: 'Mohammad Hatta lahir di Bukittinggi, Sumatera Barat, pada 12 Agustus 1902. Ayahnya, Haji Mohammad Djamil, meninggal saat Hatta berusia 8 bulan, dan ia dibesarkan oleh ibunya bersama keluarga besar dari Minangkabau yang terkenal kuat agama dan budayanya. Hatta menempuh pendidikan di Europeesche Lagere School (ELS) Bukittinggi, lalu Meer Uitgebreid Lager Onderwijs (MULO) Padang, dan Prins Hendrik School di Batavia. Pada 1921, Hatta melanjutkan ke Handels Hoogeschool (Sekolah Tinggi Ekonomi) di Rotterdam, Belanda. Di sana ia aktif di Perhimpoenan Indonesia (PI), bahkan menjadi ketuanya. Hatta bersama tokoh-tokoh PI seperti Ali Sastroamidjojo, Nazir Pamoentjak, dan Abdulmadjid Djojoadiningrat ditangkap pada 1927 atas tuduhan menghasut. Di pengadilan Den Haag, Hatta menyampaikan pleidoi terkenal "Indonesia Vrij" (Indonesia Merdeka). Setelah dibebaskan, ia menyelesaikan studinya dan pulang ke Indonesia pada 1932. Hatta dikenal sebagai sosok yang sederhana, taat agama, dan sangat berpegang teguh pada prinsip. Hatta tidak pernah menikah hingga usia 43 tahun karena bersumpah hanya akan menikah setelah Indonesia merdeka.',
    contributions: [
      'Ketua Perhimpoenan Indonesia di Belanda (1926-1930)',
      'Pidato pembelaan "Indonesia Vrij" di pengadilan Den Haag (1928)',
      'Mengusulkan penggantian sila pertama Piagam Jakarta pada 18 Agustus 1945',
      'Memproklamasikan Kemerdekaan Indonesia bersama Soekarno',
      'Wakil Presiden RI pertama (1945-1956)',
      'Penandatangan KMB di Den Haag (1949)',
      'Bapak Koperasi Indonesia (diresmikan 17 Juli 1953)',
      'Penyusun banyak buku tentang ekonomi kerakyatan'
    ],
    quote: '"Indonesia merdeka bukanlah tujuan akhir, melainkan jembatan emas menuju cita-cita yang lebih besar: keadilan sosial."'
  },
  {
    id: 'yamin',
    name: 'Mr. Mohammad Yamin',
    title: 'Tokoh Sumpah Pemuda & Pengusul Dasar Negara',
    birth: '24 Agustus 1903, Sawahlunto',
    death: '17 Oktober 1962, Jakarta',
    tag: 'pendiri',
    color: '#BF9343',
    summary: 'Sastrawan, sejarawan, dan politisi yang mengusulkan lima dasar negara pada sidang BPUPKI 29 Mei 1945 dan memperkenalkan semboyan Bhinneka Tunggal Ika.',
    bio: 'Mohammad Yamin lahir di Talawi, Sawahlunto, Sumatera Barat, pada 24 Agustus 1903. Ia berasal dari keluarga Minangkabau yang menghargai pendidikan dan kebudayaan. Yamin menempuh pendidikan di Hollandsch-Inlandsche School (HIS) Palembang, kemudian Algemeene Middelbare School (AMS) di Yogyakarta. Ia melanjutkan studi hukum di Rechts Hogeschool (RHS) Batavia dan meraih gelar Meester in de Rechten (Mr.) pada 1932. Sejak muda, Yamin aktif di pergerakan pemuda. Pada Kongres Pemuda I (1926), ia sudah aktif dan menjadi salah satu tokoh utama. Pada Kongres Pemuda II di Jakarta 28 Oktober 1928, Yamin berperan penting merumuskan teks Sumpah Pemuda. Kontribusinya yang sangat penting adalah ketika sebagai anggota BPUPKI, pada 29 Mei 1945 ia menyampaikan pidato pertama tentang dasar negara, mengusulkan lima asas: peri kebangsaan, peri kemanusiaan, peri ketuhanan, peri kerakyatan, dan kesejahteraan rakyat. Yamin juga yang memperkenalkan kembali ungkapan "Bhinneka Tunggal Ika" dari kakawin Sutasoma Mpu Tantular kepada Bung Karno dan Bung Hatta.',
    contributions: [
      'Tokoh Kongres Pemuda I dan II, perumus Sumpah Pemuda 1928',
      'Pengusul lima dasar negara pada sidang BPUPKI 29 Mei 1945',
      'Memperkenalkan semboyan Bhinneka Tunggal Ika',
      'Menteri Pendidikan, Pengajaran dan Kebudayaan (1953-1955)',
      'Menteri Kehakiman (1951-1952)',
      'Sastrawan: penulis "Tanah Air" (1922), "Indonesia, Tumpah Darahku"',
      'Sejarawan: penulis "6000 Tahun Sang Saka Merah Putih"'
    ],
    quote: '"Kami putera dan puteri Indonesia, mengaku bertumpah darah yang satu, tanah air Indonesia."'
  },
  {
    id: 'soepomo',
    name: 'Dr. Soepomo',
    title: 'Bapak Konstitusi Indonesia',
    birth: '22 Januari 1903, Sukoharjo',
    death: '12 September 1958, Jakarta',
    tag: 'pendiri',
    color: '#6E9C6E',
    summary: 'Ahli hukum, arsitek utama UUD 1945, dan tokoh yang menyampaikan konsep dasar negara "negara integralistik" pada sidang BPUPKI 31 Mei 1945.',
    bio: 'Soepomo lahir di Sukoharjo, Surakarta, pada 22 Januari 1903. Ia berasal dari keluarga ningrat Jawa, putra Raden Tumenggung Wignyodipuro. Soepomo menempuh pendidikan dasar di Sekolah Boedi Oetomo, lalu ke MULO Solo, dan AMS Yogyakarta. Bakat hukumnya mengantarkannya ke Rechts Hogeschool Batavia, lulus 1923. Soepomo kemudian melanjutkan studi doktoral di Universitas Leiden, Belanda, dan meraih gelar doktor hukum dengan disertasi tentang reorganisasi agraria di Surakarta. Sekembalinya ke Indonesia, Soepomo menjadi ahli hukum adat ternama. Saat menjadi anggota BPUPKI, pada 31 Mei 1945 ia menyampaikan pidato kedua tentang dasar negara, mengusulkan teori negara integralistik yang melihat negara sebagai satu kesatuan organis dengan rakyat — bukan negara individualis maupun negara kelas. Kontribusi terbesar Soepomo adalah perannya sebagai arsitek utama UUD 1945. Ia memimpin Panitia Kecil Perancang UUD yang merumuskan teks final konstitusi yang disahkan PPKI pada 18 Agustus 1945. Karena perannya ini, Soepomo dijuluki "Bapak Konstitusi Indonesia".',
    contributions: [
      'Arsitek utama UUD 1945',
      'Menyampaikan konsep "negara integralistik" pada BPUPKI 31 Mei 1945',
      'Anggota Panitia Sembilan perumus Piagam Jakarta',
      'Menteri Kehakiman pertama (1945-1947)',
      'Pakar hukum adat terkemuka di Indonesia',
      'Dosen dan rektor Universitas Indonesia',
      'Anggota delegasi KMB di Den Haag (1949)'
    ],
    quote: '"Negara, menurut pikiran integralistik bangsa Indonesia, adalah suatu susunan masyarakat yang integral, yaitu segala golongan, segala bagiannya, segala anggotanya berhubung erat satu sama lain."'
  },
  {
    id: 'kartini',
    name: 'R.A. Kartini',
    title: 'Pahlawan Emansipasi Wanita',
    birth: '21 April 1879, Jepara',
    death: '17 September 1904, Rembang',
    tag: 'kebangkitan',
    color: '#B96BC4',
    summary: 'Pelopor emansipasi wanita Indonesia, pendiri sekolah perempuan, dan inspirasi melalui surat-suratnya yang dikumpulkan dalam buku "Habis Gelap Terbitlah Terang".',
    bio: 'Raden Ajeng Kartini lahir di Jepara, Jawa Tengah, pada 21 April 1879. Ia putri Raden Mas Adipati Ario Sosroningrat, Bupati Jepara, dengan istri pertamanya M.A. Ngasirah. Kartini berasal dari keluarga bangsawan Jawa terpandang, namun ia sendiri mengalami diskriminasi gender yang kala itu lumrah dalam budaya feodal. Kartini menempuh pendidikan di Europeesche Lagere School (ELS), satu-satunya pribumi perempuan di sekolah tersebut. Di sekolah ini ia mahir berbahasa Belanda. Setelah berusia 12 tahun, Kartini harus menjalani "pingitan" — tradisi mengurung anak perempuan di dalam rumah sampai dilamar. Selama pingitan, Kartini banyak membaca buku-buku Eropa dan berkorespondensi dengan sahabat-sahabatnya di Belanda, terutama Rosa Abendanon dan Estella Zeehandelaar. Surat-suratnya berisi pemikiran tentang emansipasi wanita, pendidikan untuk perempuan pribumi, dan kritik terhadap tradisi feodal. Pada 12 November 1903, Kartini dinikahkan dengan Raden Adipati Joyodiningrat, Bupati Rembang. Meski sudah menikah, semangatnya tidak padam. Ia mendirikan sekolah perempuan di Rembang. Sayang, Kartini meninggal muda pada 17 September 1904, empat hari setelah melahirkan putra sulungnya. Setelah kematiannya, surat-suratnya dikumpulkan dan diterbitkan oleh Mr. J.H. Abendanon dengan judul "Door Duisternis tot Licht" (Habis Gelap Terbitlah Terang) pada 1911. Buku ini menjadi inspirasi gerakan emansipasi wanita di Indonesia.',
    contributions: [
      'Pelopor emansipasi wanita Indonesia',
      'Mendirikan sekolah perempuan di Rembang',
      'Penulis surat-surat yang dibukukan menjadi "Habis Gelap Terbitlah Terang"',
      'Menginspirasi pendirian Sekolah Kartini di berbagai kota',
      'Hari lahirnya diperingati sebagai Hari Kartini (21 April) sejak 1964',
      'Pahlawan Nasional berdasarkan Keppres No. 108 Tahun 1964'
    ],
    quote: '"Habis gelap terbitlah terang. Setelah duka mengembara dalam hidup, akhirnya kita akan menemui kebahagiaan."'
  },
  {
    id: 'diponegoro',
    name: 'Pangeran Diponegoro',
    title: 'Pemimpin Perang Jawa',
    birth: '11 November 1785, Yogyakarta',
    death: '8 Januari 1855, Makassar',
    tag: 'perjuangan',
    color: '#9B6B45',
    summary: 'Putra Sultan Hamengkubuwono III, pemimpin Perang Diponegoro (1825-1830) yang menjadi salah satu perlawanan terbesar melawan Belanda di abad ke-19.',
    bio: 'Pangeran Diponegoro lahir di Yogyakarta pada 11 November 1785 dengan nama Bendara Raden Mas Antawirya. Ia putra sulung Sultan Hamengkubuwono III dari seorang selir, Raden Ayu Mangkarawati. Sejak kecil, Diponegoro dididik di lingkungan pesantren oleh neneknya, Ratu Ageng, yang membentuk karakternya menjadi religius dan sederhana. Diponegoro menolak gaya hidup mewah keraton dan lebih banyak tinggal di Tegalrejo, sebuah desa di pinggiran Yogyakarta. Ia tertarik dengan kehidupan rakyat dan mendalami agama Islam. Pemicu Perang Jawa (1825-1830) adalah tindakan Belanda yang memasang patok jalan di tanah milik Diponegoro di Tegalrejo tanpa izin. Diponegoro mencabut patok-patok itu dan memimpin perlawanan. Perang Diponegoro berlangsung selama 5 tahun dan menewaskan sekitar 200.000 jiwa di pihak Jawa, serta 15.000 tentara Belanda. Ini adalah perang termahal yang pernah dijalani Belanda di Hindia Belanda, menghabiskan 20 juta gulden. Diponegoro berhasil ditangkap melalui tipu muslihat dalam perundingan di Magelang pada 28 Maret 1830 oleh Letnan Jenderal de Kock. Ia kemudian diasingkan ke Manado, lalu Makassar, dan wafat dalam pengasingan pada 8 Januari 1855.',
    contributions: [
      'Memimpin Perang Diponegoro / Perang Jawa (1825-1830)',
      'Membangkitkan semangat perlawanan dengan slogan "Sabilillah"',
      'Membuat Belanda menderita kerugian terbesar di abad 19',
      'Inspirasi nasionalisme Indonesia',
      'Pahlawan Nasional berdasarkan Keppres No. 87 Tahun 1973',
      'Lukisan "Penangkapan Pangeran Diponegoro" karya Raden Saleh menjadi ikon'
    ],
    quote: '"Sumpah saya, akan menyingsingkan lengan baju, mengangkat senjata, demi nusa, bangsa, dan agama."'
  },
  {
    id: 'kihajar',
    name: 'Ki Hajar Dewantara',
    title: 'Bapak Pendidikan Nasional',
    birth: '2 Mei 1889, Yogyakarta',
    death: '26 April 1959, Yogyakarta',
    tag: 'kebangkitan',
    color: '#7BA8C8',
    summary: 'Pendiri Taman Siswa (1922), pencetus konsep pendidikan nasional, dan tokoh dengan filosofi "Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, Tut Wuri Handayani".',
    bio: 'Ki Hajar Dewantara lahir dengan nama Raden Mas Soewardi Soerjaningrat di Yogyakarta pada 2 Mei 1889. Ia putra dari Pakualaman IV. Soewardi menempuh pendidikan di Europeesche Lagere School (ELS), lalu School tot Opleiding van Inlandsche Artsen (STOVIA), sekolah kedokteran Belanda di Batavia, namun tidak menyelesaikannya karena sakit. Soewardi aktif sebagai wartawan di koran-koran seperti Sediotomo, Midden Java, De Express, Oetoesan Hindia, dan lain-lain. Tulisannya yang paling terkenal adalah "Als ik eens Nederlander was" (Andaikan Aku Seorang Belanda) yang dimuat di De Express pada 13 Juli 1913. Tulisan ini mengkritik keras Belanda yang merayakan kemerdekaan dari Prancis di tanah jajahannya. Karena tulisan itu, Soewardi diasingkan ke Belanda bersama dua tokoh lain, Dr. Tjipto Mangoenkoesoemo dan E.F.E. Douwes Dekker — dikenal sebagai "Tiga Serangkai". Di Belanda, Soewardi memperdalam ilmu pendidikan. Sekembalinya ke Indonesia, ia mendirikan Perguruan Nasional Taman Siswa di Yogyakarta pada 3 Juli 1922. Taman Siswa menjadi pelopor pendidikan nasional yang menanamkan nilai-nilai keindonesiaan. Pada usia 40 tahun, Soewardi mengganti namanya menjadi Ki Hajar Dewantara, melepas gelar kebangsawanan agar lebih dekat dengan rakyat. Setelah Indonesia merdeka, ia diangkat menjadi Menteri Pendidikan, Pengajaran, dan Kebudayaan yang pertama (1945).',
    contributions: [
      'Mendirikan Perguruan Nasional Taman Siswa (3 Juli 1922)',
      'Mencetuskan filosofi pendidikan "Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, Tut Wuri Handayani"',
      'Menteri Pendidikan, Pengajaran, dan Kebudayaan pertama RI',
      'Hari lahirnya (2 Mei) diperingati sebagai Hari Pendidikan Nasional',
      'Anggota "Tiga Serangkai" bersama Tjipto dan Douwes Dekker',
      'Penulis "Als ik eens Nederlander was" (1913)',
      'Pahlawan Nasional berdasarkan Keppres No. 305 Tahun 1959'
    ],
    quote: '"Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, Tut Wuri Handayani — Di depan memberi teladan, di tengah membangun semangat, di belakang memberi dorongan."'
  },
  {
    id: 'sudirman',
    name: 'Jenderal Sudirman',
    title: 'Panglima Besar TNI Pertama',
    birth: '24 Januari 1916, Purbalingga',
    death: '29 Januari 1950, Magelang',
    tag: 'perjuangan',
    color: '#6E9C6E',
    summary: 'Panglima Besar TKR yang memimpin perang gerilya melawan Belanda saat Agresi Militer II (1948-1949) meski dalam keadaan sakit parah.',
    bio: 'Sudirman lahir di Bodaskarangjati, Rembang, Purbalingga, Jawa Tengah, pada 24 Januari 1916. Ia putra dari Karsid Kartowirodji, seorang buruh pabrik gula, dan Siyem. Sudirman dibesarkan oleh pamannya, Raden Tjokrosoenarjo, seorang asisten wedana yang kemudian mengangkatnya sebagai anak. Sudirman menempuh pendidikan di HIS Cilacap, lalu MULO Wiworotomo, dan Kweekschool Muhammadiyah Solo. Setelah lulus, ia menjadi guru di HIS Muhammadiyah Cilacap pada 1936. Pada masa pendudukan Jepang, Sudirman mengikuti pelatihan Pembela Tanah Air (PETA) di Bogor pada 1944, dan menjadi komandan batalyon di Kroya. Setelah proklamasi, ia membentuk Badan Keamanan Rakyat (BKR) di Banyumas. Sudirman terlibat dalam Pertempuran Ambarawa (12-15 Desember 1945) melawan tentara Sekutu, di mana ia memimpin pasukan dengan taktik supit udang dan berhasil mengusir Sekutu dari Ambarawa. Pertempuran ini menjadi cikal-bakal Hari Juang Kartika TNI AD (15 Desember). Pada 12 November 1945, Sudirman terpilih sebagai Panglima Besar TKR (Tentara Keamanan Rakyat) melalui pemilihan di Yogyakarta. Saat Belanda melancarkan Agresi Militer II (19 Desember 1948), Sudirman dalam kondisi sakit parah tuberkulosis hanya dengan satu paru-paru, namun memilih memimpin perang gerilya dari atas tandu selama 7 bulan keliling Jawa, daripada menyerah. Aksi ini membuktikan TNI masih ada dan berjuang. Sudirman wafat pada 29 Januari 1950 di Magelang karena penyakit yang dideritanya.',
    contributions: [
      'Panglima Besar TKR/TNI pertama (1945-1950)',
      'Pemimpin Pertempuran Ambarawa (12-15 Desember 1945)',
      'Memimpin perang gerilya selama 7 bulan dalam keadaan sakit (1948-1949)',
      'Inspirasi semangat juang prajurit Indonesia',
      'Hari Pertempuran Ambarawa = Hari Juang Kartika TNI AD',
      'Pahlawan Nasional berdasarkan Keppres No. 314 Tahun 1964'
    ],
    quote: '"Tidak peduli berapa banyak luka yang kuderita, tubuhku boleh hancur, tetapi semangatku tidak akan pernah padam selama Indonesia masih ada."'
  },
  {
    id: 'tjut-meutia',
    name: 'Cut Nyak Meutia',
    title: 'Pahlawan Aceh',
    birth: '1870, Pirak, Aceh Utara',
    death: '24 Oktober 1910, Alue Kurieng',
    tag: 'perjuangan',
    color: '#C76D45',
    summary: 'Pejuang wanita Aceh yang melanjutkan perlawanan suaminya Teuku Muhammad melawan Belanda hingga gugur di hutan.',
    bio: 'Cut Nyak Meutia lahir di Pirak, Keureutoe, Aceh Utara, pada 1870. Ia berasal dari keluarga uleebalang (bangsawan) Aceh. Cut Meutia menikah dengan Teuku Muhammad, atau dikenal sebagai Teuku Tjik Tunong, seorang pejuang Aceh yang gigih melawan kolonialisme Belanda. Bersama suaminya, Cut Meutia aktif dalam perlawanan terhadap Belanda yang berusaha menguasai Aceh sejak Perang Aceh dimulai (1873). Pada 1905, suaminya Teuku Muhammad tertangkap dan dieksekusi mati di Lhokseumawe. Sebelum meninggal, suaminya berpesan agar Cut Meutia menikahi sahabat suaminya, Pang Nanggroe, untuk melanjutkan perjuangan. Cut Meutia melaksanakan pesan tersebut dan bersama Pang Nanggroe terus melawan Belanda dengan strategi gerilya di pedalaman Aceh. Pada 26 September 1910, Pang Nanggroe gugur dalam pertempuran melawan Marechaussee (pasukan elit Belanda) di Paya Cicem. Meski kehilangan suami kedua, Cut Meutia tetap memimpin perlawanan bersama sekitar 45 anak buahnya. Pada 24 Oktober 1910, pasukan Belanda berhasil mengepung Cut Meutia di Alue Kurieng. Dalam pertempuran terakhir, Cut Meutia gugur dengan senjata rencong di tangan, melawan hingga peluru terakhir. Tubuhnya ditemukan dengan beberapa luka tembak. Sebelum gugur, ia sempat menerjang lawan dengan rencong meski sudah terluka.',
    contributions: [
      'Pejuang wanita Aceh dalam Perang Aceh',
      'Memimpin perlawanan gerilya di pedalaman Aceh (1905-1910)',
      'Gugur dalam pertempuran dengan senjata rencong di tangan',
      'Simbol keberanian wanita Aceh dan Indonesia',
      'Pahlawan Nasional berdasarkan Keppres No. 107 Tahun 1964',
      'Namanya diabadikan menjadi nama jalan dan kapal Republik Indonesia (KRI Cut Nyak Meutia)'
    ],
    quote: '"Kemerdekaan adalah hak setiap rakyat — kami akan berjuang sampai titik darah penghabisan."'
  },
  {
    id: 'imam-bonjol',
    name: 'Tuanku Imam Bonjol',
    title: 'Pemimpin Perang Padri',
    birth: '1772, Bonjol, Sumatera Barat',
    death: '6 November 1864, Minahasa',
    tag: 'perjuangan',
    color: '#BF9343',
    summary: 'Ulama dan pemimpin Perang Padri (1803-1838) melawan Belanda yang berusaha menguasai Minangkabau.',
    bio: 'Tuanku Imam Bonjol lahir dengan nama Muhammad Syahab di Bonjol, Pasaman, Sumatera Barat, pada 1772. Ia berasal dari keluarga ulama Minangkabau. Setelah belajar agama Islam dan mendalami berbagai ilmu, ia diberi gelar "Tuanku Imam" dan tinggal di Bonjol, sehingga dikenal sebagai Tuanku Imam Bonjol. Perang Padri awalnya adalah konflik internal di Minangkabau antara kaum Padri (kaum agama yang ingin memurnikan Islam dari kebiasaan-kebiasaan yang dianggap menyimpang seperti judi, sabung ayam, minum tuak) dengan kaum Adat (kaum yang mempertahankan tradisi adat istiadat). Kaum Padri dipimpin oleh tiga ulama yang dikenal sebagai "Harimau nan Salapan" — Tuanku Mensiangan, Tuanku Imam Bonjol, dan Tuanku Pasaman, dan lainnya. Pada awalnya, Tuanku Imam Bonjol berperan sebagai pemimpin kaum Padri. Namun, ketika Belanda intervensi dengan membantu kaum Adat pada 1821, konflik berubah menjadi perang melawan kolonialisme. Tuanku Imam Bonjol kemudian bersatu dengan kaum Adat melawan Belanda. Perang Padri berlangsung 35 tahun (1803-1838) dan menjadi salah satu perang terlama melawan Belanda. Imam Bonjol berhasil ditangkap melalui tipu daya pada 25 Oktober 1837 oleh Belanda di bawah pimpinan Kolonel Michiels. Ia diasingkan ke Cianjur, lalu Ambon, dan akhirnya Minahasa, di mana ia wafat pada 6 November 1864.',
    contributions: [
      'Pemimpin Perang Padri (1803-1838) melawan Belanda',
      'Tokoh kaum Padri yang berusaha memurnikan praktik Islam di Minangkabau',
      'Mengkonsolidasikan persatuan kaum Padri dan Adat melawan kolonialisme',
      'Inspirasi pejuang Islam Indonesia',
      'Pahlawan Nasional berdasarkan Keppres No. 87 Tahun 1973',
      'Namanya diabadikan menjadi nama universitas dan bandara'
    ],
    quote: '"Tegakkan agama, junjung tinggi tanah air, dan lawan penindasan dengan segenap jiwa raga."'
  },
  {
    id: 'agus-salim',
    name: 'H. Agus Salim',
    title: 'Diplomat & Tokoh Pergerakan',
    birth: '8 Oktober 1884, Kota Gadang',
    death: '4 November 1954, Jakarta',
    tag: 'pendiri',
    color: '#5F8AAA',
    summary: 'Diplomat ulung, anggota Panitia Sembilan, dan tokoh Sarekat Islam yang menguasai 9 bahasa asing.',
    bio: 'Haji Agus Salim lahir dengan nama Mashudul Haq di Kota Gadang, Bukittinggi, Sumatera Barat, pada 8 Oktober 1884. Ayahnya, Sutan Mohammad Salim, adalah seorang jaksa. Agus Salim adalah anak yang sangat cerdas — ia menguasai 9 bahasa: Arab, Inggris, Belanda, Jerman, Prancis, Jepang, Turki, dan beberapa bahasa daerah. Agus Salim menempuh pendidikan di Hogere Burger School (HBS) Batavia dan lulus sebagai siswa terbaik. Ia sempat ingin melanjutkan ke kedokteran di Belanda namun beasiswanya ditolak, sehingga ia menjadi penerjemah di Konsulat Belanda di Jeddah, Arab Saudi (1906-1911). Di Mekah, ia belajar agama dengan pamannya, Syeikh Ahmad Khatib al-Minangkabawi, ulama Indonesia yang menjadi imam di Masjidil Haram. Sekembalinya ke Indonesia, Agus Salim bergabung dengan Sarekat Islam (SI) pada 1915. Ia kemudian menjadi salah satu pemimpin SI bersama H.O.S. Tjokroaminoto. Agus Salim aktif sebagai jurnalis dan editor di berbagai surat kabar. Sebagai anggota BPUPKI dan Panitia Sembilan, ia ikut merumuskan Piagam Jakarta pada 22 Juni 1945. Setelah merdeka, Agus Salim menjadi Menteri Muda Luar Negeri (1947), kemudian Menteri Luar Negeri (1947-1949). Ia menjadi diplomat ulung yang berhasil mendapatkan pengakuan internasional untuk Indonesia, terutama dari negara-negara Arab seperti Mesir dan Saudi Arabia.',
    contributions: [
      'Anggota Panitia Sembilan perumus Piagam Jakarta',
      'Menteri Luar Negeri RI (1947-1949)',
      'Diplomat yang mendapatkan pengakuan negara Arab atas RI',
      'Tokoh Sarekat Islam',
      'Menguasai 9 bahasa asing',
      'Penandatangan KMB di Den Haag (1949)',
      'Pahlawan Nasional berdasarkan Keppres No. 657 Tahun 1961',
      'Dikenal sebagai "The Grand Old Man" oleh diplomat asing'
    ],
    quote: '"Memimpin adalah menderita. Pemimpin yang baik adalah yang pertama maju dalam kesulitan dan terakhir menikmati hasil."'
  },
  {
    id: 'wahid-hasjim',
    name: 'K.H. Wahid Hasjim',
    title: 'Anggota Panitia Sembilan',
    birth: '1 Juni 1914, Jombang',
    death: '19 April 1953, Cimahi',
    tag: 'pendiri',
    color: '#6E9C6E',
    summary: 'Ulama, putra K.H. Hasyim Asy\'ari pendiri NU, anggota Panitia Sembilan, dan Menteri Agama pertama RI.',
    bio: 'Wahid Hasjim lahir di Tebuireng, Jombang, Jawa Timur, pada 1 Juni 1914 — tanggal yang sama dengan kelahiran Pancasila kelak. Ia putra K.H. Hasyim Asy\'ari, pendiri Nahdlatul Ulama (NU) dan tokoh pesantren terkemuka. Wahid Hasjim juga ayah dari K.H. Abdurrahman Wahid (Gus Dur), presiden RI ke-4. Sejak kecil, Wahid Hasjim mendapat pendidikan agama yang kuat di Pesantren Tebuireng. Ia juga belajar di Mekah pada 1932-1933. Sekembalinya, ia memperbarui sistem pendidikan pesantren dengan memasukkan pelajaran umum. Wahid Hasjim aktif di NU sejak muda, dan pada usia 24 tahun sudah menjadi pengurus pusat NU. Pada masa pendudukan Jepang, ia menjadi anggota Chuo Sangi-In (Dewan Penasihat Pusat). Sebagai anggota BPUPKI, Wahid Hasjim termasuk dalam Panitia Sembilan yang merumuskan Piagam Jakarta pada 22 Juni 1945. Ia juga termasuk yang menerima kompromi Mohammad Hatta untuk mengganti "tujuh kata" sila pertama pada 18 Agustus 1945 demi persatuan bangsa. Setelah merdeka, Wahid Hasjim menjadi Menteri Negara di kabinet pertama (1945), kemudian Menteri Agama dalam tiga kabinet berbeda (1949-1952). Sebagai Menteri Agama, ia mendirikan Perguruan Tinggi Agama Islam Negeri (PTAIN), cikal-bakal UIN/IAIN.',
    contributions: [
      'Anggota Panitia Sembilan perumus Piagam Jakarta',
      'Menteri Agama pertama RI (1945) dan kembali (1949-1952)',
      'Mendirikan PTAIN, cikal-bakal IAIN/UIN',
      'Memperbarui sistem pendidikan pesantren modern',
      'Ayah Presiden Abdurrahman Wahid (Gus Dur)',
      'Pahlawan Nasional berdasarkan Keppres No. 206 Tahun 1964'
    ],
    quote: '"Pendidikan agama harus berjalan seiring dengan pendidikan umum agar umat Islam tidak tertinggal dalam ilmu pengetahuan modern."'
  }
];

if (typeof window !== 'undefined') window.TOKOH = TOKOH;
