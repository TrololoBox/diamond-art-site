console.log("✅ Скрипт запущен");
// 💎 Создание canvas для падающих стразиков
const canvas = document.createElement('canvas');
canvas.id = 'sparkleCanvas';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 999;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const sparkles = [];

function createSparkle() {
  return {
    x: Math.random() * canvas.width,
    y: -20,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 1 + 0.5,
    alpha: Math.random() * 0.5 + 0.5
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (sparkles.length < 100) {
    sparkles.push(createSparkle());
  }

  for (let i = 0; i < sparkles.length; i++) {
    const s = sparkles[i];
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 182, 193, ${s.alpha})`;
    ctx.fill();
    s.y += s.speed;

    if (s.y > canvas.height) {
      sparkles[i] = createSparkle();
    }
  }

  requestAnimationFrame(animate);
}

animate();

// 🧚 Переключение отображения стразиков
document.getElementById("toggleSparkles")?.addEventListener("change", (e) => {
  canvas.style.display = e.target.checked ? "block" : "none";
});

// 🎨 Фильтрация галереи по категориям
document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    document.querySelectorAll(".filter-button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll(".gallery-item").forEach(item => {
      const category = item.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

// 🖼️ Модалка при клике на карточку
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const title = item.querySelector("h4")?.textContent;
    const price = item.querySelector("p")?.textContent;

    document.getElementById("modal-image").src = img.src;
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-price").textContent = price;
    document.getElementById("modal").style.display = "block";
  });
});

// ❌ Закрытие модалки
document.querySelector(".close-button")?.addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    document.getElementById("modal").style.display = "none";
  }
});
