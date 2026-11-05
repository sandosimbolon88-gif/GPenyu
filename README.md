# gamesBaktiBCA
game edukasi untuk program Bakti Lingkungan Bakti BCA

- Plan & riset: [docs/PLAN.md](docs/PLAN.md)
- Game pertama: **Pulang ke Banyuwangi** (konservasi penyu) di [games/penyu/](games/penyu/)

## Cara memainkan

Game dibuat dengan HTML, CSS, dan JavaScript biasa: tanpa install, tanpa proses build, dan tanpa library dari internet.

**1. Lewat alamat web (paling praktis untuk banyak perangkat)**
Upload isi repo ini ke hosting statis apa pun, misalnya GitHub Pages, Netlify, atau server kantor. Cukup buka alamatnya di browser tablet, HP, laptop, atau TV sentuh.
Untuk GitHub Pages: buka *Settings → Pages*, pilih *Deploy from a branch*, pilih branch dan folder `/ (root)`. Alamatnya nanti seperti `https://<akun>.github.io/gamesBaktiBCA/`.
Setelah dibuka sekali, game tersimpan di perangkat dan tetap bisa dimainkan tanpa internet.

**2. Tanpa internet sama sekali**
Salin folder `games/penyu/` ke perangkat (flashdisk, kabel data), lalu buka `index.html` di Chrome, Edge, Safari, atau Firefox.

**3. Menjalankan di laptop untuk dites**
```bash
python3 -m http.server 8000
```
Lalu buka `http://localhost:8000/games/penyu/`.

## Kontrol

- **Layar sentuh:** sentuh dan geser, penyu mengikuti jari.
- **Mouse:** penyu mengikuti kursor.
- **Keyboard:** tombol panah atau WASD. Spasi/Enter untuk "ketuk berulang" (lepas dari jaring, menggali sarang). Esc atau P untuk jeda.

## Untuk operator pameran

- **Menu operator:** di layar judul, tahan tulisan *Bakti Lingkungan · Bakti BCA* di bagian bawah selama 1,5 detik (atau tekan huruf `O`). Isinya:
  - Mode Cepat (sesi sekitar 3 menit), matikan suara
  - Statistik perangkat: jumlah main, penyu dan tingkat yang paling sering dipilih, hasil kuis, rata-rata plastik tertelan
  - Unduh papan juara (CSV), reset papan hari ini, reset semua papan, reset statistik
- **Layar penuh:** tombol ⛶ di pojok kanan atas. Untuk kiosk di PC, jalankan Chrome dengan `--kiosk`.
- **Otomatis kembali ke judul:** setelah 45 detik tanpa sentuhan saat bermain, atau 60 detik di layar menu. Di layar judul, papan juara tampil bergantian sebagai mode *attract*.
- **Papan juara disimpan per perangkat.** Ada papan Hari Ini dan Sepanjang Pameran. Yang dicatat hanya nama panggilan (tanpa data pribadi). Kalau browser dibuka dalam mode samaran (incognito), skor hilang saat browser ditutup.

## Mengubah teks, fakta, dan angka

Semua teks ada di [`games/penyu/js/data.js`](games/penyu/js/data.js): data penyu, metode penetasan, kartu tiap tahap, bank fakta, kuis, dan teks ajakan Bakti BCA. Edit teksnya, simpan, lalu muat ulang browser.

- Untuk menampilkan ajakan *10 botol plastik untuk 1 tukik* di layar akhir, ubah `tampilkanBooth` menjadi `true`.
- Untuk mengganti alamat QR di layar ajakan:
  ```bash
  pip install qrcode
  python tools/buat_qr.py "https://alamat-baru"
  ```

> Angka capaian dan fakta di game diambil dari pemberitaan media dan publikasi kampus/mitra. Mohon diverifikasi oleh tim Bakti BCA dan Banyuwangi Sea Turtle Foundation sebelum pameran. Sumbernya ada di `docs/PLAN.md`.

## Mode uji

- `games/penyu/index.html?debug=1` → tombol `N` melompat ke tahap berikutnya, `K` mengurangi nyawa.
- `games/penyu/index.html?bot=1` → penyu bergerak sendiri (untuk mengetes alur dari awal sampai akhir).
