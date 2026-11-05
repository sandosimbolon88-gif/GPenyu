/*
 * ISI GAME (teks, fakta, angka capaian)
 * ------------------------------------------------------------
 * File ini sengaja dipisah dari kode supaya tim Bakti BCA / BSTF
 * bisa mengubah teks dan angka tanpa menyentuh logika game.
 * Cukup edit teks di antara tanda kutip, simpan, lalu muat ulang browser.
 *
 * PENTING: angka dan fakta di bawah diambil dari pemberitaan media dan
 * publikasi kampus/mitra (lihat docs/PLAN.md). Mohon diverifikasi oleh
 * tim Bakti BCA dan Banyuwangi Sea Turtle Foundation sebelum pameran.
 */
window.PB_DATA = {
  judul: 'Pulang ke Banyuwangi',
  subjudul: 'Bantu tukik tumbuh besar, lalu pulang ke pantai kelahirannya untuk bertelur.',
  labelProgram: 'Bakti Lingkungan · Bakti BCA',

  /* ---------- 4 jenis penyu yang bertelur di Banyuwangi ---------- */
  spesies: [
    {
      id: 'lekang',
      nama: 'Penyu Lekang',
      latin: 'Lepidochelys olivacea',
      iucn: 'VU', iucnLabel: 'Rentan',
      ukuran: 'Cangkang ±60–70 cm',
      makanan: 'Udang, kepiting, ubur-ubur',
      gaya: 'Paling kecil dan lincah. Cepat tumbuh, tapi badannya tidak sebesar penyu lain.',
      fakta: 'Penyu lekang adalah penyu yang paling sering ditangani BSTF di pantai-pantai Banyuwangi.',
      faktaRemaja: 'Penyu lekang adalah omnivora: ia memakan udang, kepiting, kerang, dan ubur-ubur.',
      warna: { shell: '#8a9a56', shellDark: '#4d5a2a', skin: '#a3ab72', skinDark: '#5f6a3c', belly: '#ece4b9', accent: '#b9c47c' },
      stat: { speed: 1.12, accel: 1.15, growth: 1.22, size: 0.86, breath: 1.0 },
      dietRemaja: ['udang', 'kepiting', 'ubur'],
      dietLaut: 'ubur'
    },
    {
      id: 'hijau',
      nama: 'Penyu Hijau',
      latin: 'Chelonia mydas',
      iucn: 'EN', iucnLabel: 'Terancam',
      ukuran: 'Cangkang ±80–120 cm',
      makanan: 'Lamun dan alga',
      gaya: 'Seimbang. Saat remaja ia merumput lamun dan alga yang mudah ditemukan.',
      fakta: 'Namanya berasal dari warna lemak tubuhnya yang kehijauan, bukan dari warna cangkangnya.',
      faktaRemaja: 'Penyu hijau dewasa memakan lamun dan alga, sehingga padang lamun tetap sehat.',
      warna: { shell: '#7a6a3e', shellDark: '#45391c', skin: '#9c9a6a', skinDark: '#5b5a37', belly: '#efe6c2', accent: '#b8a46a' },
      stat: { speed: 1.0, accel: 1.0, growth: 1.05, size: 1.0, breath: 1.0 },
      dietRemaja: ['lamun', 'alga'],
      dietLaut: 'alga'
    },
    {
      id: 'sisik',
      nama: 'Penyu Sisik',
      latin: 'Eretmochelys imbricata',
      iucn: 'CR', iucnLabel: 'Kritis',
      ukuran: 'Cangkang ±60–90 cm',
      makanan: 'Spons di terumbu karang',
      gaya: 'Gesit dan cepat berbelok. Paruhnya yang runcing pas untuk mengambil spons di dasar karang.',
      fakta: 'Paruhnya runcing seperti paruh elang. Cangkangnya yang indah sering diburu, padahal penyu sisik dilindungi.',
      faktaRemaja: 'Penyu sisik memakan spons di terumbu karang dan ikut menjaga terumbu tetap sehat.',
      warna: { shell: '#b27a32', shellDark: '#5c3510', skin: '#b0905a', skinDark: '#6b5130', belly: '#f3e2b0', accent: '#e0a84e' },
      stat: { speed: 1.02, accel: 1.5, growth: 1.08, size: 0.94, breath: 1.0 },
      dietRemaja: ['spons', 'spons', 'ubur'],
      dietLaut: 'ubur'
    },
    {
      id: 'belimbing',
      nama: 'Penyu Belimbing',
      latin: 'Dermochelys coriacea',
      iucn: 'VU', iucnLabel: 'Rentan',
      ukuran: 'Cangkang ±1,5–1,8 m (terbesar)',
      makanan: 'Ubur-ubur',
      gaya: 'Terbesar, tercepat, dan napasnya paling panjang. Tapi hati-hati: kantong plastik mirip sekali dengan ubur-ubur!',
      fakta: 'Cangkangnya bukan sisik keras, melainkan kulit tebal dengan 7 alur memanjang, mirip buah belimbing.',
      faktaRemaja: 'Penyu belimbing hampir hanya memakan ubur-ubur. Karena itu ia sering tertipu kantong plastik.',
      warna: { shell: '#2f3a4a', shellDark: '#151b24', skin: '#3c4757', skinDark: '#1b222c', belly: '#d9dde3', accent: '#e8edf2' },
      stat: { speed: 1.16, accel: 0.9, growth: 1.0, size: 1.18, breath: 0.6 },
      dietRemaja: ['ubur'],
      dietLaut: 'ubur',
      plastikEkstra: 1.45
    }
  ],

  /* ---------- Metode penetasan = tingkat kesulitan ---------- */
  catatanPenetasan: 'Hasil penetasan sangat bergantung pada kondisi pantai dan cara pengelolaannya.',
  penetasan: [
    {
      id: 'intan',
      tingkat: 'Mudah',
      nama: 'Intan Box',
      nyawa: 4,
      pengali: 1.0,
      tingkatPenetasan: 'Sekitar 85–90%',
      penjelasan: 'Inkubator tanpa pasir buatan Banyuwangi Sea Turtle Foundation (BSTF) yang didukung Bakti BCA. Suhu dan kelembapannya diatur.',
      peran: 'Jenis kelamin tukik ditentukan suhu sarang. Pasir yang makin hangat menghasilkan lebih banyak betina. Intan Box menjaga suhu sekitar 27,4–29,5°C agar perbandingan jantan dan betina tetap seimbang.',
      diGame: 'Petugas melepas tukik di bibir pantai. Perjalanan ke laut pendek.'
    },
    {
      id: 'semi',
      tingkat: 'Sedang',
      nama: 'Semi Alami',
      nyawa: 3,
      pengali: 1.15,
      tingkatPenetasan: 'Sekitar 50–96% (bervariasi)',
      penjelasan: 'Telur dipindahkan ke sarang buatan di area penetasan yang dijaga, misalnya di Pantai Boom dan Pantai Cemara, Banyuwangi.',
      peran: 'Telur dipindahkan ke area penetasan yang dijaga bila sarangnya terancam abrasi, pasang air laut, predator, atau pencurian telur.',
      diGame: 'Jarak ke laut cukup dekat, dan relawan ikut menjaga.'
    },
    {
      id: 'alami',
      tingkat: 'Sulit',
      nama: 'Alami',
      nyawa: 2,
      pengali: 1.3,
      tingkatPenetasan: 'Sekitar 36–81% (bervariasi)',
      penjelasan: 'Telur dibiarkan di sarang aslinya di pantai. Tantangannya predator, pasang air laut, suhu, dan gangguan manusia.',
      peran: 'Sarang alami adalah cara alam. Memindahkan telur adalah pilihan terakhir, hanya bila sarang alami tidak bisa dilindungi.',
      diGame: 'Perjalanan jauh ke laut: hindari kepiting hantu, burung, dan cahaya lampu.'
    }
  ],

  /* ---------- Teks pembuka tiap tahap ---------- */
  tahap: {
    menetas: {
      intan: 'Petugas melepas tukik di bibir pantai. Ayo merangkak ke laut!',
      semi: 'Relawan menjaga area penetasan. Merangkaklah ke laut dan hindari kepiting hantu!',
      alami: 'Merangkaklah ke laut! Hindari kepiting hantu dan bayangan burung, dan jangan ikuti cahaya lampu.'
    },
    kartu: [
      null,
      {
        label: 'Tahap 1', nama: 'Tukik', lokasi: 'Laut lepas',
        teks: 'Kamu berhasil sampai ke laut! Makan plankton, telur ikan, dan ubur-ubur kecil supaya tumbuh.',
        tips: ['Ikuti jari atau mouse untuk berenang.', 'Bersembunyilah di rumput laut cokelat yang mengapung agar aman dari burung.', 'Naik ke permukaan untuk bernapas.'],
        fakta: 'Tukik menghabiskan tahun-tahun pertamanya terapung di laut lepas, sering berlindung di antara rumput laut yang mengapung.'
      },
      {
        label: 'Tahap 2', nama: 'Remaja', lokasi: 'Terumbu karang & padang lamun',
        teks: 'Badanmu makin besar! Sekarang kamu pindah ke perairan dekat pantai.',
        tips: ['Makananmu sekarang: {makanan}.', 'Predator yang bertanda merah berbahaya. Begitu badanmu lebih besar, sebagian predator tidak bisa memangsamu lagi.'],
        fakta: '{faktaRemaja}'
      },
      {
        label: 'Tahap 3', nama: 'Dewasa', lokasi: 'Laut lepas',
        teks: 'Kamu sudah dewasa! Laut lepas penuh tantangan: hiu macan, baling-baling kapal, dan jaring hantu.',
        tips: ['Tersangkut jaring? Ketuk berulang-ulang untuk melepaskan diri!', 'Hati-hati saat naik bernapas kalau ada kapal lewat.'],
        fakta: 'Jaring hantu adalah jaring ikan yang hilang atau dibuang di laut. Jaring ini terus menjerat penyu dan hewan laut lainnya.'
      },
      {
        label: 'Tahap 4', nama: 'Pulang', lokasi: 'Menuju Banyuwangi',
        teks: 'Saatnya pulang! Penyu betina kembali ke pantai tempat ia menetas untuk bertelur. Ikuti arus dan hindari sampah.',
        tips: ['Geser ke atas dan ke bawah untuk menghindar.', 'Makan sesekali untuk menjaga kesehatan.'],
        fakta: 'Penyu bisa menemukan jalan pulang ke pantai kelahirannya dengan bantuan medan magnet bumi.'
      },
      {
        label: 'Tahap 5', nama: 'Bertelur', lokasi: 'Pantai Banyuwangi, malam hari',
        teks: 'Kamu sampai di Banyuwangi! Merangkaklah ke pasir dekat pandan laut, lalu gali sarang untuk bertelur.',
        tips: ['Hindari cahaya lampu dan senter.', 'Sampai di area bertelur, ketuk berulang untuk menggali.'],
        fakta: 'Hanya penyu betina yang naik ke darat untuk bertelur. Cahaya dan keramaian bisa membuatnya batal bertelur dan kembali ke laut.'
      }
    ]
  },

  /* ---------- Pesan saat nyawa berkurang ---------- */
  pesan: {
    saudara: 'Saudaramu melanjutkan perjalanan!',
    kepiting: 'Tukik dimangsa kepiting hantu!',
    burung: 'Tukik disambar burung!',
    lampu: 'Tukik tersesat mengikuti cahaya lampu!',
    dimangsa: 'Dimangsa predator yang lebih besar!',
    jaring: 'Terjerat jaring hantu terlalu lama!',
    kapal: 'Tertabrak baling-baling kapal!',
    sehat: 'Kesehatanmu habis karena plastik dan kurang napas.',
    plastik: 'Plastik tertelan! Kenyang palsu',
    plastikTips: 'Plastik membuat penyu merasa kenyang palsu, padahal tidak ada gizinya.',
    napas: 'Napasmu hampir habis! Naik ke permukaan.',
    sembunyi: 'Bersembunyi',
    terganggu: 'Penyu terganggu dan kembali ke laut!',
    gali: 'Ketuk berulang untuk menggali sarang!',
    lepasJaring: 'Ketuk berulang untuk lepas!',
    relawan: 'Relawan konservasi akan memantau dan menjaga sarangmu. Siklus kehidupan berlanjut!'
  },

  /* ---------- Bank fakta "Tahukah Kamu?" ---------- */
  fakta: [
    'Di dunia ada 7 jenis penyu, dan 6 di antaranya hidup di perairan Indonesia.',
    'Banyuwangi menjadi tempat bertelur bagi 4 jenis penyu: penyu hijau, sisik, lekang, dan belimbing.',
    'Dari sekitar 1.000 tukik yang menetas, diperkirakan hanya sekitar 1 yang bertahan hingga dewasa.',
    'Jenis kelamin tukik ditentukan oleh suhu sarang. Pasir yang lebih hangat menghasilkan lebih banyak tukik betina.',
    'Masa inkubasi telur penyu sekitar 50 sampai 60-an hari.',
    'Satu sarang penyu hijau bisa berisi sekitar 50 sampai 150-an butir telur.',
    'Penyu sering mengira kantong plastik sebagai ubur-ubur. Plastik yang lama di laut bahkan berbau seperti makanan.',
    'Plastik di perut membuat penyu merasa kenyang palsu, kekurangan gizi, dan lemas.',
    'Penyu betina kembali bertelur ke pantai tempat ia dulu menetas, dipandu medan magnet bumi.',
    'Hanya penyu betina yang naik ke darat. Penyu jantan menghabiskan seluruh hidupnya di laut.',
    'Tukik menuju laut dengan mengikuti cahaya paling terang di cakrawala. Lampu pantai bisa membuat mereka tersesat.',
    'Penyu bernapas dengan paru-paru, jadi ia harus naik ke permukaan untuk mengambil udara.',
    'Penyu belimbing adalah penyu terbesar. Cangkangnya berupa kulit tebal, bukan sisik keras.',
    'Penyu sisik memakan spons dan ikut menjaga terumbu karang tetap sehat.',
    'Penyu hijau dewasa memakan lamun dan alga, sehingga padang lamun tetap sehat.',
    'Petugas konservasi biasanya memakai senter berwarna merah karena cahaya merah tidak terlalu mengganggu penyu.',
    'Semua jenis penyu di Indonesia dilindungi undang-undang. Memperdagangkan telur, daging, atau cangkangnya dilarang.'
  ],

  /* ---------- Kuis di akhir permainan ---------- */
  kuisJumlah: 3,
  kuisBonus: 300,
  kuis: [
    { t: 'Apa yang sering dikira ubur-ubur oleh penyu?', p: ['Kantong plastik', 'Batu karang', 'Kerang'], j: 0 },
    { t: 'Apa yang menentukan jenis kelamin tukik?', p: ['Warna pasir', 'Suhu sarang', 'Bentuk telur'], j: 1 },
    { t: 'Penyu bernapas menggunakan...', p: ['Insang', 'Kulit', 'Paru-paru'], j: 2 },
    { t: 'Ke mana penyu betina pergi untuk bertelur?', p: ['Pantai tempat ia dulu menetas', 'Pantai mana saja yang terdekat', 'Dasar laut'], j: 0 },
    { t: 'Berapa jenis penyu yang bertelur di Banyuwangi?', p: ['2 jenis', '4 jenis', '7 jenis'], j: 1 },
    { t: 'Makanan utama penyu belimbing adalah...', p: ['Lamun', 'Spons', 'Ubur-ubur'], j: 2 },
    { t: 'Makanan utama penyu sisik adalah...', p: ['Spons', 'Ubur-ubur', 'Udang'], j: 0 },
    { t: 'Mengapa lampu di pantai berbahaya bagi tukik?', p: ['Lampu membuat pasir panas', 'Tukik bisa tersesat mengikuti cahaya', 'Lampu menarik hiu'], j: 1 },
    { t: 'Diperkirakan berapa tukik yang bertahan hingga dewasa?', p: ['Sekitar 1 dari 10', 'Hampir semuanya', 'Sekitar 1 dari 1.000'], j: 2 },
    { t: 'Apa itu Intan Box?', p: ['Inkubator telur penyu tanpa pasir', 'Kotak makanan penyu', 'Kapal patroli laut'], j: 0 },
    { t: 'Apa yang bisa kamu lakukan untuk membantu penyu?', p: ['Membeli suvenir dari cangkang penyu', 'Mengurangi plastik sekali pakai', 'Menyalakan lampu terang di pantai'], j: 1 },
    { t: 'Penyu hijau dewasa terutama memakan...', p: ['Ikan', 'Kepiting', 'Lamun dan alga'], j: 2 },
    { t: 'Penyu mana yang naik ke darat untuk bertelur?', p: ['Hanya penyu betina', 'Hanya penyu jantan', 'Jantan dan betina'], j: 0 }
  ],

  /* ---------- Ajakan Bakti BCA (gaya bahasa siaran pers) ---------- */
  ajakan: {
    judulSelesai: 'Terima kasih telah mengantar penyumu pulang ke Banyuwangi.',
    judulGagal: 'Terima kasih telah menemani perjalanan penyumu.',
    paragraf: [
      'Di alam, diperkirakan hanya 1 dari 1.000 tukik yang bertahan hingga dewasa. Karena itu, setiap telur yang terselamatkan sangat berarti.',
      'Sejak 2016, melalui pilar Bakti Lingkungan, BCA berkolaborasi dengan Banyuwangi Sea Turtle Foundation mendukung pelepasliaran lebih dari 63.000 tukik dan relokasi lebih dari 900 sarang telur penyu di Banyuwangi, Yogyakarta, dan Bali, termasuk melalui inovasi penetasan Intan Box dan Intan Ruang.'
    ],
    angka: [
      { nilai: '63.000+', label: 'tukik dilepasliarkan' },
      { nilai: '900+', label: 'sarang telur direlokasi' },
      { nilai: '2016', label: 'awal kolaborasi dengan BSTF' }
    ],
    penutup: 'Langkah kecil yang konsisten akan membawa dampak besar. Mari bersama Bakti BCA menjaga keanekaragaman hayati Indonesia untuk generasi mendatang.',
    aksiJudul: 'Langkah kecil yang bisa kamu lakukan:',
    aksi: [
      'Kurangi plastik sekali pakai.',
      'Jangan membeli produk dari telur, daging, atau cangkang penyu.',
      'Redupkan lampu di pantai saat musim bertelur.',
      'Ikut pelepasliaran tukik bersama lembaga konservasi resmi.'
    ],
    tagar: '#BaktiBCA',
    qrLabel: 'Pindai untuk mengenal program Konservasi Penyu Bakti BCA',
    /* Ubah ke true bila di booth ada kegiatan pengumpulan botol plastik */
    tampilkanBooth: false,
    teksBooth: 'Bawa 10 botol plastik bekasmu ke booth ini untuk mendukung 1 tukik kembali ke laut.'
  }
};
