/* ============================================
   FIREBASE CONFIGURATION
   ============================================
   Konfigurasi sudah diisi untuk project: mpr4-259f6
   Sinkronisasi history antar device sudah aktif.

   PENTING — Atur Security Rules sebelum dipakai oleh teman-teman!
   Buka:
   https://console.firebase.google.com/project/mpr4-259f6/database/mpr4-259f6-default-rtdb/rules

   Ganti seluruh isi rules dengan:

   {
     "rules": {
       "history": {
         ".read": true,
         ".write": true,
         ".indexOn": ["participantId", "timestamp"]
       }
     }
   }

   Klik "Publish". Setelah itu sinkronisasi cloud sudah aman dan cepat.
   ============================================ */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBAIVlIOo8qsrPbvuiY5L6jVP2pWnVd2MQ",
  authDomain: "mpr4-259f6.firebaseapp.com",
  databaseURL: "https://mpr4-259f6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mpr4-259f6",
  storageBucket: "mpr4-259f6.firebasestorage.app",
  messagingSenderId: "534553854684",
  appId: "1:534553854684:web:227d14d4b1b37797aaaa19",
  measurementId: "G-2VS7FBQRPP"
};

const FIREBASE_ENABLED = !!FIREBASE_CONFIG.apiKey;
