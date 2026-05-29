// ============================================
// ILUSTRASI — SVG inline untuk lambang Pancasila & simbol negara
// ============================================

const ILUSTRASI = {
  garuda: {
    title: 'Garuda Pancasila',
    desc: 'Lambang negara Indonesia, dirancang oleh Sultan Hamid II dan ditetapkan 11 Februari 1950. Bulu Garuda melambangkan tanggal proklamasi 17-8-1945.',
    svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="ilus-svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D9A968"/>
          <stop offset="50%" stop-color="#BF9343"/>
          <stop offset="100%" stop-color="#9E7A35"/>
        </linearGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#E8B760"/>
          <stop offset="100%" stop-color="#B58438"/>
        </linearGradient>
      </defs>
      <!-- Outer wings -->
      <g transform="translate(200 200)">
        <!-- Left wing -->
        <g>
          <path d="M-30 -10 L-180 -50 L-170 -30 L-30 0 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 0 L-180 -30 L-175 -10 L-30 10 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 10 L-180 -10 L-175 10 L-30 20 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 20 L-175 10 L-170 30 L-30 30 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 30 L-170 30 L-160 50 L-30 40 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 40 L-160 50 L-145 70 L-30 50 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 50 L-145 70 L-125 88 L-30 60 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
        </g>
        <!-- Right wing (mirror) -->
        <g transform="scale(-1 1)">
          <path d="M-30 -10 L-180 -50 L-170 -30 L-30 0 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 0 L-180 -30 L-175 -10 L-30 10 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 10 L-180 -10 L-175 10 L-30 20 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 20 L-175 10 L-170 30 L-30 30 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 30 L-170 30 L-160 50 L-30 40 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 40 L-160 50 L-145 70 L-30 50 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-30 50 L-145 70 L-125 88 L-30 60 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
        </g>
        <!-- Tail feathers -->
        <g>
          <path d="M-25 70 L-35 150 L-15 145 L-10 75 Z" fill="url(#bodyGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M-10 75 L-15 145 L 0 148 L 0 75 Z" fill="url(#bodyGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M 0 75 L 0 148 L 15 145 L 10 75 Z" fill="url(#bodyGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
          <path d="M 10 75 L 15 145 L 35 150 L 25 70 Z" fill="url(#bodyGrad)" stroke="#7A5A1F" stroke-width="1.5"/>
        </g>
        <!-- Body / chest shield -->
        <rect x="-45" y="-15" width="90" height="100" rx="12" fill="#FFFCF4" stroke="#7A5A1F" stroke-width="2.5"/>
        <!-- Shield internal cross -->
        <line x1="-45" y1="35" x2="45" y2="35" stroke="#7A5A1F" stroke-width="2"/>
        <line x1="0" y1="-15" x2="0" y2="35" stroke="#7A5A1F" stroke-width="2"/>
        <!-- Star (sila 1) top center -->
        <polygon points="0,5 4,18 17,18 7,26 11,38 0,30 -11,38 -7,26 -17,18 -4,18" fill="#FFD700" stroke="#7A5A1F" stroke-width="1"/>
        <!-- Chain (sila 2) top-left -->
        <circle cx="-25" cy="10" r="6" fill="none" stroke="#7A5A1F" stroke-width="2"/>
        <rect x="-32" y="20" width="14" height="10" fill="none" stroke="#7A5A1F" stroke-width="1.8"/>
        <!-- Banyan tree (sila 3) top-right -->
        <circle cx="25" cy="15" r="10" fill="#2D5A2D"/>
        <rect x="22" y="20" width="6" height="14" fill="#5C3A1F"/>
        <!-- Banteng (sila 4) bottom-left -->
        <circle cx="-22" cy="55" r="8" fill="#2D2A23"/>
        <path d="M-30 50 L-22 45 L-14 50" stroke="#2D2A23" stroke-width="2" fill="none"/>
        <!-- Padi-kapas (sila 5) bottom-right -->
        <g stroke="#5C3A1F" stroke-width="1.5" fill="none">
          <line x1="20" y1="50" x2="20" y2="65"/>
          <line x1="20" y1="52" x2="14" y2="55"/>
          <line x1="20" y1="56" x2="14" y2="59"/>
          <line x1="20" y1="60" x2="14" y2="63"/>
          <circle cx="28" cy="58" r="3" fill="#FFFCF4"/>
        </g>
        <!-- Head -->
        <ellipse cx="0" cy="-30" rx="22" ry="20" fill="url(#bodyGrad)" stroke="#7A5A1F" stroke-width="2"/>
        <!-- Beak -->
        <path d="M-2 -28 L-18 -22 L-2 -18 Z" fill="#7A5A1F" stroke="#5C3A1F" stroke-width="1"/>
        <!-- Eye -->
        <circle cx="5" cy="-32" r="3" fill="#2D2A23"/>
        <circle cx="6" cy="-33" r="1" fill="#FFFCF4"/>
        <!-- Crest feathers on head -->
        <path d="M-8 -45 L-12 -55 L-4 -50 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1"/>
        <path d="M 0 -48 L 0 -60 L 6 -52 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1"/>
        <path d="M 8 -45 L 12 -55 L 14 -48 Z" fill="url(#goldGrad)" stroke="#7A5A1F" stroke-width="1"/>
        <!-- Talons (claws holding banner) -->
        <g transform="translate(0 100)">
          <path d="M-30 0 L-20 10 L-10 0" stroke="#7A5A1F" stroke-width="2" fill="none"/>
          <path d="M-15 0 L-10 12 L-5 0" stroke="#7A5A1F" stroke-width="2" fill="none"/>
          <path d="M 10 0 L 5 12 L 0 0" stroke="#7A5A1F" stroke-width="2" fill="none"/>
          <path d="M 30 0 L 20 10 L 10 0" stroke="#7A5A1F" stroke-width="2" fill="none"/>
          <!-- Banner -->
          <path d="M-65 18 Q -60 28, -45 25 L 45 25 Q 60 28, 65 18 L 50 10 L 50 18 L -50 18 L -50 10 Z" fill="#FFFCF4" stroke="#7A5A1F" stroke-width="2"/>
          <text x="0" y="22" text-anchor="middle" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#7A5A1F" letter-spacing="0.5">BHINNEKA TUNGGAL IKA</text>
        </g>
      </g>
    </svg>`
  },
  sila1: {
    title: 'Sila Pertama',
    name: 'Ketuhanan Yang Maha Esa',
    desc: 'Simbol: bintang emas berlatar hitam. Bermakna cahaya rohani yang menerangi bangsa, pengakuan akan adanya Tuhan, kebebasan beragama, dan toleransi.',
    color: '#1A1814',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="ilus-svg">
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF4B8"/>
          <stop offset="50%" stop-color="#FFD700"/>
          <stop offset="100%" stop-color="#D9A968"/>
        </radialGradient>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#2A2520"/>
          <stop offset="100%" stop-color="#0F0E0A"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#bgGlow)" stroke="#7A5A1F" stroke-width="3"/>
      <g transform="translate(100 100)">
        <!-- Outer star -->
        <polygon points="0,-65 15,-22 60,-22 23,5 38,50 0,22 -38,50 -23,5 -60,-22 -15,-22"
                 fill="url(#starGlow)" stroke="#7A5A1F" stroke-width="2"/>
        <!-- Inner star detail -->
        <polygon points="0,-30 7,-10 28,-10 11,2 18,22 0,10 -18,22 -11,2 -28,-10 -7,-10"
                 fill="#FFFFFF" opacity="0.4"/>
        <!-- Center bright -->
        <circle cx="0" cy="0" r="5" fill="#FFFFFF"/>
      </g>
      <!-- Rays around -->
      <g transform="translate(100 100)" opacity="0.3">
        <line x1="0" y1="-80" x2="0" y2="-72" stroke="#FFD700" stroke-width="2"/>
        <line x1="56" y1="-56" x2="51" y2="-51" stroke="#FFD700" stroke-width="2"/>
        <line x1="80" y1="0" x2="72" y2="0" stroke="#FFD700" stroke-width="2"/>
        <line x1="56" y1="56" x2="51" y2="51" stroke="#FFD700" stroke-width="2"/>
        <line x1="0" y1="80" x2="0" y2="72" stroke="#FFD700" stroke-width="2"/>
        <line x1="-56" y1="56" x2="-51" y2="51" stroke="#FFD700" stroke-width="2"/>
        <line x1="-80" y1="0" x2="-72" y2="0" stroke="#FFD700" stroke-width="2"/>
        <line x1="-56" y1="-56" x2="-51" y2="-51" stroke="#FFD700" stroke-width="2"/>
      </g>
    </svg>`
  },
  sila2: {
    title: 'Sila Kedua',
    name: 'Kemanusiaan yang Adil dan Beradab',
    desc: 'Simbol: rantai berbentuk persegi (laki-laki) dan lingkaran (perempuan). Mata rantai 17 saling kait, menggambarkan hubungan manusia yang setara dan saling membantu.',
    color: '#C76D45',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="ilus-svg">
      <defs>
        <radialGradient id="bgRed" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#E8794B"/>
          <stop offset="100%" stop-color="#A14F2F"/>
        </radialGradient>
        <linearGradient id="chainGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFE066"/>
          <stop offset="50%" stop-color="#D9A968"/>
          <stop offset="100%" stop-color="#9E7A35"/>
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#bgRed)" stroke="#7A5A1F" stroke-width="3"/>
      <!-- Chain pattern: alternating circle and square -->
      <g transform="translate(100 100)">
        <!-- Top circle -->
        <circle cx="0" cy="-55" r="12" fill="none" stroke="url(#chainGold)" stroke-width="5"/>
        <!-- Upper-right square -->
        <rect x="34" y="-50" width="20" height="20" fill="none" stroke="url(#chainGold)" stroke-width="5" transform="rotate(45 44 -40)"/>
        <!-- Right circle -->
        <circle cx="55" cy="0" r="12" fill="none" stroke="url(#chainGold)" stroke-width="5"/>
        <!-- Lower-right square -->
        <rect x="34" y="30" width="20" height="20" fill="none" stroke="url(#chainGold)" stroke-width="5" transform="rotate(45 44 40)"/>
        <!-- Bottom circle -->
        <circle cx="0" cy="55" r="12" fill="none" stroke="url(#chainGold)" stroke-width="5"/>
        <!-- Lower-left square -->
        <rect x="-54" y="30" width="20" height="20" fill="none" stroke="url(#chainGold)" stroke-width="5" transform="rotate(45 -44 40)"/>
        <!-- Left circle -->
        <circle cx="-55" cy="0" r="12" fill="none" stroke="url(#chainGold)" stroke-width="5"/>
        <!-- Upper-left square -->
        <rect x="-54" y="-50" width="20" height="20" fill="none" stroke="url(#chainGold)" stroke-width="5" transform="rotate(45 -44 -40)"/>
      </g>
    </svg>`
  },
  sila3: {
    title: 'Sila Ketiga',
    name: 'Persatuan Indonesia',
    desc: 'Simbol: pohon beringin. Akar tunggang yang kuat melambangkan kesatuan yang kokoh, dan banyaknya sulur menggambarkan keberagaman suku bangsa Indonesia yang tetap bersatu.',
    color: '#FFFFFF',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="ilus-svg">
      <defs>
        <radialGradient id="bgGreen" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#E0E0E0"/>
        </radialGradient>
        <linearGradient id="treeGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3D7A3D"/>
          <stop offset="100%" stop-color="#1F4A1F"/>
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#bgGreen)" stroke="#7A5A1F" stroke-width="3"/>
      <!-- Tree canopy -->
      <ellipse cx="100" cy="80" rx="60" ry="35" fill="url(#treeGreen)" stroke="#1A3A1A" stroke-width="2"/>
      <ellipse cx="80" cy="70" rx="35" ry="22" fill="#4D8B4D" opacity="0.7"/>
      <ellipse cx="120" cy="68" rx="32" ry="20" fill="#4D8B4D" opacity="0.7"/>
      <ellipse cx="100" cy="60" rx="40" ry="18" fill="#5C9C5C" opacity="0.6"/>
      <!-- Trunk -->
      <path d="M85 110 L80 165 L120 165 L115 110 Z" fill="#6B4423" stroke="#3D2810" stroke-width="2"/>
      <!-- Aerial roots -->
      <line x1="75" y1="100" x2="72" y2="150" stroke="#3D2810" stroke-width="3"/>
      <line x1="95" y1="115" x2="92" y2="155" stroke="#3D2810" stroke-width="3"/>
      <line x1="108" y1="115" x2="111" y2="155" stroke="#3D2810" stroke-width="3"/>
      <line x1="125" y1="100" x2="128" y2="150" stroke="#3D2810" stroke-width="3"/>
      <line x1="140" y1="95" x2="142" y2="145" stroke="#3D2810" stroke-width="2"/>
      <line x1="60" y1="95" x2="58" y2="145" stroke="#3D2810" stroke-width="2"/>
      <!-- Ground -->
      <ellipse cx="100" cy="170" rx="55" ry="6" fill="#8B6F47" opacity="0.5"/>
    </svg>`
  },
  sila4: {
    title: 'Sila Keempat',
    name: 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan',
    desc: 'Simbol: kepala banteng. Banteng adalah binatang sosial yang suka berkumpul, melambangkan musyawarah dalam memutuskan sesuatu.',
    color: '#C76D45',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="ilus-svg">
      <defs>
        <radialGradient id="bgRedFour" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#E8794B"/>
          <stop offset="100%" stop-color="#A14F2F"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#bgRedFour)" stroke="#7A5A1F" stroke-width="3"/>
      <!-- Banteng head -->
      <g transform="translate(100 100)">
        <!-- Horns -->
        <path d="M-55 -30 Q -65 -45, -50 -55 Q -40 -45, -32 -30" fill="#FFFFFF" stroke="#2D2A23" stroke-width="3"/>
        <path d="M 55 -30 Q 65 -45, 50 -55 Q 40 -45, 32 -30" fill="#FFFFFF" stroke="#2D2A23" stroke-width="3"/>
        <!-- Head -->
        <ellipse cx="0" cy="0" rx="40" ry="38" fill="#2D2A23" stroke="#000" stroke-width="2"/>
        <!-- Ears -->
        <ellipse cx="-32" cy="-15" rx="10" ry="14" fill="#2D2A23" stroke="#000" stroke-width="2" transform="rotate(-30 -32 -15)"/>
        <ellipse cx="32" cy="-15" rx="10" ry="14" fill="#2D2A23" stroke="#000" stroke-width="2" transform="rotate(30 32 -15)"/>
        <!-- Snout -->
        <ellipse cx="0" cy="22" rx="18" ry="14" fill="#1A1814" stroke="#000" stroke-width="2"/>
        <!-- Nostrils -->
        <ellipse cx="-7" cy="25" rx="2.5" ry="3" fill="#000"/>
        <ellipse cx="7" cy="25" rx="2.5" ry="3" fill="#000"/>
        <!-- Eyes -->
        <ellipse cx="-15" cy="-5" rx="4" ry="5" fill="#FFFFFF"/>
        <ellipse cx="15" cy="-5" rx="4" ry="5" fill="#FFFFFF"/>
        <circle cx="-14" cy="-4" r="2" fill="#000"/>
        <circle cx="16" cy="-4" r="2" fill="#000"/>
        <!-- White mark on forehead -->
        <path d="M-3 -25 L 0 -15 L 3 -25 Z" fill="#FFFFFF"/>
      </g>
    </svg>`
  },
  sila5: {
    title: 'Sila Kelima',
    name: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia',
    desc: 'Simbol: padi dan kapas. Padi melambangkan pangan (makanan pokok), kapas melambangkan sandang (pakaian). Keduanya kebutuhan dasar manusia yang harus dipenuhi secara adil.',
    color: '#FFFFFF',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="ilus-svg">
      <defs>
        <radialGradient id="bgWhite" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#E0E0E0"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#bgWhite)" stroke="#7A5A1F" stroke-width="3"/>
      <!-- Padi (rice) on left -->
      <g transform="translate(75 100)">
        <line x1="0" y1="-50" x2="0" y2="50" stroke="#8B6F23" stroke-width="2.5"/>
        <!-- Rice grains -->
        <g fill="#D9A968" stroke="#7A5A1F" stroke-width="1">
          <ellipse cx="-8" cy="-40" rx="3.5" ry="6" transform="rotate(-30 -8 -40)"/>
          <ellipse cx="8" cy="-35" rx="3.5" ry="6" transform="rotate(30 8 -35)"/>
          <ellipse cx="-10" cy="-25" rx="3.5" ry="6" transform="rotate(-30 -10 -25)"/>
          <ellipse cx="10" cy="-20" rx="3.5" ry="6" transform="rotate(30 10 -20)"/>
          <ellipse cx="-11" cy="-10" rx="3.5" ry="6" transform="rotate(-30 -11 -10)"/>
          <ellipse cx="11" cy="-5" rx="3.5" ry="6" transform="rotate(30 11 -5)"/>
          <ellipse cx="-12" cy="5" rx="3.5" ry="6" transform="rotate(-30 -12 5)"/>
          <ellipse cx="12" cy="10" rx="3.5" ry="6" transform="rotate(30 12 10)"/>
          <ellipse cx="-12" cy="20" rx="3.5" ry="6" transform="rotate(-30 -12 20)"/>
          <ellipse cx="12" cy="25" rx="3.5" ry="6" transform="rotate(30 12 25)"/>
          <ellipse cx="-11" cy="35" rx="3.5" ry="6" transform="rotate(-30 -11 35)"/>
          <ellipse cx="11" cy="40" rx="3.5" ry="6" transform="rotate(30 11 40)"/>
        </g>
      </g>
      <!-- Kapas (cotton) on right -->
      <g transform="translate(125 100)">
        <line x1="0" y1="-50" x2="0" y2="50" stroke="#3D7A3D" stroke-width="2.5"/>
        <!-- Cotton bolls (white fluffy circles) -->
        <g fill="#FFFFFF" stroke="#6B4423" stroke-width="1.5">
          <circle cx="-7" cy="-40" r="7"/>
          <circle cx="9" cy="-30" r="7"/>
          <circle cx="-9" cy="-18" r="7"/>
          <circle cx="9" cy="-5" r="7"/>
          <circle cx="-9" cy="8" r="7"/>
          <circle cx="9" cy="22" r="7"/>
          <circle cx="-7" cy="35" r="7"/>
        </g>
        <!-- Leaves -->
        <ellipse cx="-12" cy="-40" rx="6" ry="3" fill="#3D7A3D" transform="rotate(-30 -12 -40)"/>
        <ellipse cx="14" cy="-30" rx="6" ry="3" fill="#3D7A3D" transform="rotate(30 14 -30)"/>
        <ellipse cx="-14" cy="-18" rx="6" ry="3" fill="#3D7A3D" transform="rotate(-30 -14 -18)"/>
        <ellipse cx="14" cy="-5" rx="6" ry="3" fill="#3D7A3D" transform="rotate(30 14 -5)"/>
      </g>
    </svg>`
  },
  bendera: {
    title: 'Sang Saka Merah Putih',
    desc: 'Bendera Nasional Indonesia. Merah (warna keberanian) di atas, putih (warna kesucian) di bawah. Pertama dikibarkan saat Proklamasi 17 Agustus 1945, dijahit oleh Ibu Fatmawati.',
    svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" class="ilus-svg">
      <defs>
        <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FF1F1F"/>
          <stop offset="100%" stop-color="#C42020"/>
        </linearGradient>
        <linearGradient id="poleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8B6F47"/>
          <stop offset="50%" stop-color="#B5926A"/>
          <stop offset="100%" stop-color="#6B4423"/>
        </linearGradient>
      </defs>
      <!-- Pole -->
      <rect x="38" y="10" width="6" height="180" fill="url(#poleGrad)" stroke="#3D2810" stroke-width="1"/>
      <circle cx="41" cy="10" r="6" fill="#D9A968" stroke="#7A5A1F" stroke-width="1"/>
      <!-- Flag -->
      <g>
        <!-- Red part (top) -->
        <path d="M44 22 Q 150 18, 250 32 L 250 88 Q 150 84, 44 92 Z" fill="url(#redGrad)" stroke="#7A1818" stroke-width="1"/>
        <!-- White part (bottom) -->
        <path d="M44 92 Q 150 84, 250 88 L 250 154 Q 150 156, 44 162 Z" fill="#FFFFFF" stroke="#888" stroke-width="1"/>
        <!-- Subtle wave shading -->
        <path d="M50 30 Q 100 28, 150 32 Q 200 35, 245 34" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3"/>
        <path d="M50 100 Q 100 98, 150 102 Q 200 105, 245 104" fill="none" stroke="#E0E0E0" stroke-width="1" opacity="0.5"/>
      </g>
    </svg>`
  },
  peta: {
    title: 'Peta NKRI',
    desc: 'Negara Kesatuan Republik Indonesia. Membentang dari Sabang (Aceh) hingga Merauke (Papua), dari Miangas hingga Pulau Rote. Negara kepulauan terbesar di dunia dengan 17.000+ pulau.',
    svg: `<svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg" class="ilus-svg">
      <defs>
        <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#A8C8E0"/>
          <stop offset="100%" stop-color="#7BA8C8"/>
        </linearGradient>
        <linearGradient id="islandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#9BC09B"/>
          <stop offset="100%" stop-color="#6E9C6E"/>
        </linearGradient>
      </defs>
      <!-- Sea background -->
      <rect width="600" height="250" fill="url(#seaGrad)"/>
      <!-- Sumatera -->
      <path d="M40 90 L 60 70 L 75 85 L 90 95 L 110 130 L 125 165 L 135 180 L 120 195 L 95 175 L 80 145 L 60 120 Z"
            fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.5"/>
      <!-- Java -->
      <path d="M165 175 L 200 165 L 240 168 L 280 172 L 300 175 L 285 188 L 240 192 L 200 188 L 175 185 Z"
            fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.5"/>
      <!-- Bali -->
      <ellipse cx="315" cy="190" rx="8" ry="5" fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.2"/>
      <!-- Kalimantan -->
      <path d="M195 70 L 240 55 L 285 65 L 310 90 L 305 130 L 285 145 L 250 150 L 215 135 L 200 110 Z"
            fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.5"/>
      <!-- Sulawesi (K-shape) -->
      <path d="M340 70 L 360 65 L 370 90 L 385 110 L 400 105 L 410 130 L 395 145 L 380 155 L 365 145 L 355 130 L 345 110 L 340 90 Z"
            fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.5"/>
      <!-- Nusa Tenggara -->
      <ellipse cx="340" cy="200" rx="10" ry="4" fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.2"/>
      <ellipse cx="365" cy="205" rx="12" ry="5" fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.2"/>
      <ellipse cx="395" cy="208" rx="10" ry="4" fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.2"/>
      <ellipse cx="420" cy="210" rx="14" ry="5" fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.2"/>
      <!-- Maluku -->
      <ellipse cx="455" cy="120" rx="6" ry="10" fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.2"/>
      <ellipse cx="475" cy="140" rx="5" ry="8" fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.2"/>
      <ellipse cx="465" cy="170" rx="8" ry="6" fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.2"/>
      <!-- Papua -->
      <path d="M495 100 L 540 90 L 575 110 L 580 140 L 555 165 L 520 170 L 500 150 L 490 125 Z"
            fill="url(#islandGrad)" stroke="#3D5A3D" stroke-width="1.5"/>
      <!-- Labels -->
      <text x="80" y="240" font-family="Inter" font-size="9" fill="#2D2A23" font-weight="600">SUMATERA</text>
      <text x="225" y="160" font-family="Inter" font-size="9" fill="#2D2A23" font-weight="600">JAWA</text>
      <text x="250" y="100" font-family="Inter" font-size="9" fill="#2D2A23" font-weight="600">KALIMANTAN</text>
      <text x="370" y="115" font-family="Inter" font-size="9" fill="#2D2A23" font-weight="600">SULAWESI</text>
      <text x="525" y="135" font-family="Inter" font-size="9" fill="#2D2A23" font-weight="600">PAPUA</text>
      <!-- From Sabang to Merauke arrows -->
      <circle cx="48" cy="78" r="3" fill="#C76D45"/>
      <text x="38" y="68" font-family="Inter" font-size="8" fill="#C76D45" font-weight="700">SABANG</text>
      <circle cx="568" cy="142" r="3" fill="#C76D45"/>
      <text x="540" y="190" font-family="Inter" font-size="8" fill="#C76D45" font-weight="700">MERAUKE</text>
      <!-- Dashed connection line -->
      <line x1="48" y1="78" x2="568" y2="142" stroke="#C76D45" stroke-width="1" stroke-dasharray="3 3" opacity="0.4"/>
    </svg>`
  }
};

if (typeof window !== 'undefined') window.ILUSTRASI = ILUSTRASI;
