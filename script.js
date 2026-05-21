// ============================================================
//  script.js — tugasFarhan | Modul 10 JavaScript HTML DOM
//  Semua logic ambil data dari form + popup result ada disini
// ============================================================

// Set default tanggal ke hari ini pas halaman kebuka
document.getElementById('tanggal').value = new Date().toISOString().split('T')[0];

// Warna accent buat tiap baris data di popup (hex langsung biar aman)
var COLORS = {
  nama      : '#e84040',
  nim       : '#2563eb',
  peminatan : '#27a96c',
  alamat    : '#f07020',
  angkatan  : '#7c3aed',
  tanggal   : '#f5a800'
};

// ─────────────────────────────────────────
//  FUNGSI UTAMA: ambil data form → buka popup
// ─────────────────────────────────────────
function kirimData() {

  // === AMBIL DATA PAKE HTML DOM ===
  var nama      = document.getElementById('nama').value.trim();
  var nim       = document.getElementById('nim').value.trim();
  var peminatan = document.querySelector('input[name="peminatan"]:checked');
  var alamat    = document.getElementById('alamat').value.trim();
  var angkatan  = document.getElementById('angkatan').value;
  var tanggal   = document.getElementById('tanggal').value;

  // === VALIDASI — jangan sampe kosong bro ===
  if (!nama)      return showToast('Nama belum diisi bro!');
  if (!nim)       return showToast('NIM-nya mana? Jangan dikosongkan');
  if (!peminatan) return showToast('Pilih peminatan dulu dong bro!');
  if (!alamat)    return showToast('Alamat belum keisi nih');
  if (!angkatan)  return showToast('Angkatan belum dipilih!');
  if (!tanggal)   return showToast('Tanggal wajib diisi bro~');

  // === FORMAT TANGGAL biar enak dibaca ===
  var tglFormatted = new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  // === KUMPULIN DATA jadi array of object ===
  var rows = [
    { key: 'Nama',      val: nama,            color: COLORS.nama },
    { key: 'NIM',       val: nim,             color: COLORS.nim },
    { key: 'Peminatan', val: peminatan.value, color: COLORS.peminatan },
    { key: 'Alamat',    val: alamat,          color: COLORS.alamat },
    { key: 'Angkatan',  val: angkatan,        color: COLORS.angkatan },
    { key: 'Tanggal',   val: tglFormatted,    color: COLORS.tanggal },
  ];

  // === RENDER DATA ke dalam popup pake DOM ===
  buatIsiPopup(rows);

  // === TAMPILIN POPUP ===
  bukaPopup();
}

// ─────────────────────────────────────────
//  Bikin isi popup dinamis dari data form
// ─────────────────────────────────────────
function buatIsiPopup(rows) {
  var container = document.getElementById('modalBody');

  // Bersih-bersiin dulu isi lama
  container.innerHTML = '';

  // Loop tiap data, bikin elemen DOM-nya satu-satu
  rows.forEach(function(r) {

    // Wrapper row
    var rowEl = document.createElement('div');
    rowEl.className = 'data-row';

    // Bar warna di kiri
    var accent = document.createElement('div');
    accent.className = 'data-accent';
    accent.style.background = r.color;

    // Label (key)
    var keyEl = document.createElement('div');
    keyEl.className = 'data-key';
    keyEl.textContent = r.key;

    // Nilai (value)
    var valEl = document.createElement('div');
    valEl.className = 'data-val';
    valEl.textContent = r.val;

    // Rakit semua ke dalam row
    rowEl.appendChild(accent);
    rowEl.appendChild(keyEl);
    rowEl.appendChild(valEl);

    // Masukin row ke container
    container.appendChild(rowEl);
  });
}

// ─────────────────────────────────────────
//  Open & Close popup
// ─────────────────────────────────────────
function bukaPopup() {
  document.getElementById('modalWrap').classList.add('show');
}

function closeModal() {
  document.getElementById('modalWrap').classList.remove('show');
}

// Klik area gelap di luar popup = tutup juga
document.getElementById('modalWrap').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ─────────────────────────────────────────
//  Toast notif buat validasi error
// ─────────────────────────────────────────
function showToast(msg) {
  var toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');

  // Auto hilang setelah 3 detik
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function() {
    toast.classList.remove('show');
  }, 3000);
}