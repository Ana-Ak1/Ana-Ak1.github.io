const paletteGrid = document.getElementById("paletteGrid");
const copyStatus = document.getElementById("copyStatus");
const randomPaletteBtn = document.getElementById("randomPaletteBtn");
const copyPaletteBtn = document.getElementById("copyPaletteBtn");
const snippetButtons = document.querySelectorAll(".copy-snippet");
const snippetStatus = document.getElementById("snippetStatus");

const palettes = [
  [
    { name: "Primary Dark", color: "#0F172A" },
    { name: "Surface", color: "#1E293B" },
    { name: "Muted Dark", color: "#334155" },
    { name: "Border", color: "#E2E8F0" },
    { name: "Background", color: "#F8FAFC" },
    { name: "Accent", color: "#DC2626" }
  ],
  [
    { name: "Navy", color: "#172554" },
    { name: "Blue", color: "#1D4ED8" },
    { name: "Sky", color: "#60A5FA" },
    { name: "Soft", color: "#DBEAFE" },
    { name: "Light", color: "#EFF6FF" },
    { name: "Warm", color: "#EA580C" }
  ],
  [
    { name: "Graphite", color: "#111827" },
    { name: "Gray", color: "#374151" },
    { name: "Muted", color: "#6B7280" },
    { name: "Soft Gray", color: "#D1D5DB" },
    { name: "White", color: "#F9FAFB" },
    { name: "Action", color: "#2563EB" }
  ]
];

let currentPalette = palettes[0];

function renderPalette(colors) {
  currentPalette = colors;
  paletteGrid.innerHTML = colors
    .map(
      (item) => `
      <div class="col-6 col-md-4 col-xl-2">
        <button class="color-card w-100" data-color="${item.color}">
          <span class="color-card__swatch" style="background:${item.color};"></span>
          <span class="color-card__name">${item.name}</span>
          <span class="color-card__hex">${item.color}</span>
        </button>
      </div>
    `
    )
    .join("");
}

paletteGrid.addEventListener("click", async (e) => {
  const button = e.target.closest(".color-card");
  if (!button) return;

  const color = button.dataset.color;

  try {
    await navigator.clipboard.writeText(color);
    copyStatus.textContent = `Скопировано: ${color}`;
    copyStatus.className = "alert alert-success border mt-4 mb-0";
  } catch {
    copyStatus.textContent = "Не удалось скопировать цвет.";
    copyStatus.className = "alert alert-danger border mt-4 mb-0";
  }
});

randomPaletteBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * palettes.length);
  renderPalette(palettes[randomIndex]);
  copyStatus.textContent = "Палитра обновлена.";
  copyStatus.className = "alert alert-light border mt-4 mb-0";
});

copyPaletteBtn.addEventListener("click", async () => {
  const text = currentPalette.map((item) => `${item.name}: ${item.color}`).join("\n");

  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "Вся палитра скопирована.";
    copyStatus.className = "alert alert-success border mt-4 mb-0";
  } catch {
    copyStatus.textContent = "Не удалось скопировать палитру.";
    copyStatus.className = "alert alert-danger border mt-4 mb-0";
  }
});

snippetButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.previousElementSibling.innerText;

    try {
      await navigator.clipboard.writeText(code);
      snippetStatus.textContent = "Фрагмент кода скопирован.";
      snippetStatus.className = "alert alert-success mt-3 mb-0";
      snippetStatus.classList.remove("d-none");

      setTimeout(() => {
        snippetStatus.classList.add("d-none");
      }, 1500);
    } catch {
      snippetStatus.textContent = "Не удалось скопировать фрагмент.";
      snippetStatus.className = "alert alert-danger mt-3 mb-0";
      snippetStatus.classList.remove("d-none");
    }
  });
});