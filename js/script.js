// Auto Slide Banner
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 3000);
showSlide(currentSlide);

// Kalender custom pakai Pikaday
const picker = new Pikaday({
  field: document.getElementById("tanggalLahir"),
  format: "DD/MM/YYYY",
  toString(date, format) {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },
  parse(dateString, format) {
    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  },
});

// Form Validation
const form = document.getElementById("contactForm");
const outputNama = document.getElementById("outputNama");
const outputTanggal = document.getElementById("outputTanggal");
const outputGender = document.getElementById("outputGender");
const outputPesan = document.getElementById("outputPesan");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const tanggal = document.getElementById("tanggalLahir").value.trim();
  const pesan = document.getElementById("pesan").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');

  // Cek semua input
  if (!nama) {
    alert("Nama harus diisi!");
    return;
  }

  // Validasi format tanggal dd/mm/yyyy dengan regex
  const dateRegex = /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!tanggal || !dateRegex.test(tanggal)) {
    alert("Tanggal lahir harus diisi dan sesuai format dd/mm/yyyy!");
    return;
  }

  if (!gender) {
    alert("Jenis kelamin harus dipilih!");
    return;
  }

  if (!pesan) {
    alert("Pesan harus diisi!");
    return;
  }

  // Tampilkan output
  outputNama.textContent = "Nama: " + nama;
  outputTanggal.textContent = "Tanggal Lahir: " + tanggal;
  outputGender.textContent = "Jenis Kelamin: " + gender.value;
  outputPesan.textContent = "Pesan: " + pesan;

  form.reset();
});
