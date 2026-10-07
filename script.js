/*
=========================================================
CARA MENAMBAHKAN FOTO TEMAN
=========================================================

1. Masukkan foto ke folder:
   photos/

2. Contoh:
   photos/arga.jpg
   photos/budi.jpg

3. Pada data awards di bawah, isi:
   photo: "photos/arga.jpg"

4. Nama file harus sama persis dengan file foto.

Jika photo dikosongkan (photo: ""), website akan
menampilkan ikon orang sebagai pengganti foto.
=========================================================
*/

const awards = [
  {
    icon: "😂",
    category: "THE COMEDIAN",
    name: "Nama Teman 1",
    description: "Orang yang selalu berhasil membuat suasana kelas menjadi lebih hidup.",
    photo: "photos/teman1.jpg"
  },
  {
    icon: "😴",
    category: "THE SLEEPYHEAD",
    name: "Nama Teman 2",
    description: "Punya bakat luar biasa untuk tetap mengantuk di hampir setiap kesempatan.",
    photo: "photos/teman2.jpg"
  },
  {
    icon: "🕐",
    category: "THE LATE ONE",
    name: "Nama Teman 3",
    description: "Datang terlambat bukan kebiasaan, tapi sepertinya sudah menjadi tradisi.",
    photo: "photos/teman3.jpg"
  },
  {
    icon: "🤝",
    category: "THE HELPER",
    name: "Nama Teman 4",
    description: "Selalu siap membantu ketika teman sedang membutuhkan pertolongan.",
    photo: "photos/teman4.jpg"
  },
  {
    icon: "📢",
    category: "THE LOUDEST",
    name: "Nama Teman 5",
    description: "Kalau kelas tiba-tiba ramai, kemungkinan besar dia ada di baliknya.",
    photo: "photos/teman5.jpg"
  },
  {
    icon: "🎮",
    category: "THE GAMER",
    name: "Nama Teman 6",
    description: "Sepertinya selalu punya satu game yang siap dimainkan kapan saja.",
    photo: "photos/teman6.jpg"
  },
  {
    icon: "📚",
    category: "THE GENIUS",
    name: "Nama Teman 7",
    description: "Teman yang sering menjadi penyelamat ketika tugas atau pelajaran mulai sulit.",
    photo: "photos/teman7.jpg"
  },
  {
    icon: "🍜",
    category: "THE FOOD HUNTER",
    name: "Nama Teman 8",
    description: "Kalau ada makanan, orang ini biasanya akan menjadi salah satu yang pertama tahu.",
    photo: "photos/teman8.jpg"
  },
  {
    icon: "🧘",
    category: "THE CALM ONE",
    name: "Nama Teman 9",
    description: "Tetap tenang ketika seisi kelas sudah mulai kehilangan ketenangan.",
    photo: "photos/teman9.jpg"
  },
  {
    icon: "❤️",
    category: "THE KINDEST",
    name: "Nama Teman 10",
    description: "Sosok yang membuat kelas terasa lebih hangat dengan kebaikannya.",
    photo: "photos/teman10.jpg"
  }
];

const $ = id => document.getElementById(id);

const home = $("home");
const award = $("award");
const final = $("final");
const startBtn = $("startBtn");
const nextBtn = $("nextBtn");
const restartBtn = $("restartBtn");

const category = $("category");
const icon = $("icon");
const countdown = $("countdown");
const reveal = $("reveal");
const winnerPhoto = $("winnerPhoto");
const photoFallback = $("photoFallback");
const winnerName = $("winnerName");
const description = $("description");
const progress = $("progress");

let current = 0;
let countdownTimer;

function screenTo(target) {
  [home, award, final].forEach(s => s.classList.remove("active"));
  target.classList.add("active");
}

function renderAward() {
  const item = awards[current];

  category.textContent = item.category;
  icon.textContent = item.icon;
  winnerName.textContent = item.name;
  description.textContent = item.description;
  progress.textContent =
    `${String(current + 1).padStart(2, "0")} / ${String(awards.length).padStart(2, "0")}`;

  winnerPhoto.onload = () => {
    winnerPhoto.style.display = "block";
    photoFallback.style.display = "none";
  };

  winnerPhoto.onerror = () => {
    winnerPhoto.style.display = "none";
    photoFallback.style.display = "grid";
  };

  if (item.photo) {
    winnerPhoto.src = item.photo;
  } else {
    winnerPhoto.removeAttribute("src");
    winnerPhoto.style.display = "none";
    photoFallback.style.display = "grid";
  }

  reveal.classList.add("hidden");
  reveal.classList.remove("show");
  nextBtn.classList.add("hidden");
  countdown.classList.remove("hidden");
  countdown.textContent = "3";

  clearInterval(countdownTimer);

  let number = 3;
  countdownTimer = setInterval(() => {
    number--;

    if (number > 0) {
      countdown.textContent = number;
    } else {
      clearInterval(countdownTimer);
      countdown.classList.add("hidden");
      reveal.classList.remove("hidden");
      reveal.classList.add("show");
      nextBtn.classList.remove("hidden");
      makeConfetti();
    }
  }, 900);
}

startBtn.addEventListener("click", () => {
  current = 0;
  screenTo(award);
  renderAward();
});

nextBtn.addEventListener("click", () => {
  if (current < awards.length - 1) {
    current++;
    renderAward();
  } else {
    screenTo(final);
    makeConfetti();
  }
});

restartBtn.addEventListener("click", () => {
  screenTo(home);
});

function makeConfetti() {
  const box = $("confetti");
  box.innerHTML = "";

  for (let i = 0; i < 90; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDelay = Math.random() * .9 + "s";
    piece.style.background = `hsl(${Math.random() * 360}, 70%, 65%)`;
    box.appendChild(piece);
  }

  setTimeout(() => box.innerHTML = "", 4000);
}
