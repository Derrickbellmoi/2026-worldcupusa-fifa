var yearEl = document.querySelector("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const teamGrid = document.getElementById("teamGrid");
const playerGrid = document.getElementById("playerGrid");
const stadiumGrid = document.getElementById("stadiumGrid");

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
if (menuBtn) menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

const langSelect = document.getElementById("languageSelect");
let currentLang = localStorage.getItem("wc2026Lang") || "en";
if (!translations[currentLang]) currentLang = "en";

const teamImages = [
  "Canada", "USA", "Mexico", "Argentina", "Brazil", "France", "England",
  "Germany", "Spain", "Australia", "Algeria", "Austria", "Belgium",
  "Cape Verde", "Bosnia and Herzegovina", "Colombia", "Congo DR",
  "Ivory Coast", "Croatia", "Curaçao", "Czech Republic", "Ecuador",
  "Egypt", "Ghana", "Haiti", "Iran", "Iraq", "Japan", "Jordan",
  "South Korea", "Morocco", "Netherlands", "New Zealand", "Norway",
  "Panama", "Paraguay", "Portugal", "Qatar", "Saudi Arabia", "Scotland",
  "Senegal", "South Africa", "Sweden", "Switzerland", "Tunisia",
  "Turkey", "Uruguay","Uzbekistan"
];

const playerData = [
  { name: "Lionel Messi", image: "Lionel Messi.jpg", team: "Argentina" },
  { name: "Kylian Mbappé", image: "Kylian Mbappe.jpg", team: "France" },
  { name: "Lamine Yamal", image: "Lamine Yamal.jpg", team: "Spain" },
  { name: "Christian Pulisic", image: "Christian Pulisic.jpg", team: "United States" },
  { name: "Alphonso Davies", image: "Alphonso Davies.jpg", team: "Canada" },
  { name: "Santiago Giménez", image: "Santiago Giménez.jpg", team: "Mexico" },
  { name: "Mohammed Kudus", image: "Mohammed Kudus.jpg", team: "Ghana" },
  { name: "Achraf Hakimi", image: "Achraf Hakimi.jpg", team: "Morocco" },
  { name: "Son Heung-min", image: "Son Heung-min.jpg", team: "South Korea" },
  { name: "Vinícius Júnior", image: "Vinícius Júnior.jpg", team: "Brazil" },
  { name: "Jude Bellingham", image: "Jude Bellingham.jpg", team: "England" },
  { name: "Erling Haaland", image: "Erling Haaland.jpg", team: "Norway" },
  { name: "Cristiano Ronaldo", image: "Cristiano Ronaldo.jpg", team: "Portugal" }
];

function renderTeams() {
  if (!teamGrid) return;

  teamGrid.innerHTML = teamImages.map(team => `
    <article class="card team-card">
      <img src="assets/images/${team}.jpg" alt="${team}">
      <h3>${team}</h3>
    </article>
  `).join("");
} 

function renderPlayers() {
  if (!playerGrid) return;

  playerGrid.innerHTML = playerData.map(player => `
    <article class="card player-card">
      <div class="player-photo">
        <img src="assets/images/${player.image}" alt="${player.name}">
      </div>
      <h3>${player.name}</h3>
      <p>${player.team}</p>
    </article>
  `).join("");
}

function renderStadiums() {
  if (!stadiumGrid) return;

  const cityIndex =
    currentLang === "fr" ? 2 :
    currentLang === "es" ? 3 : 1;

  stadiumGrid.innerHTML = stadiums.map(s => `
    <article class="card stadium-card">
      <img src="assets/images/${s[4]}" alt="${s[0]}" class="stadium-image">
      <h3>${s[0]}</h3>
      <p>${s[cityIndex]}</p>
    </article>
  `).join("");
}

function applyTranslations() {
  const t = translations[currentLang];

  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });

  if (langSelect) langSelect.value = currentLang;

  renderTeams();
  renderPlayers();
  renderStadiums();
}

if (langSelect) {
  langSelect.addEventListener("change", e => {
    currentLang = e.target.value;
    localStorage.setItem("wc2026Lang", currentLang);
    applyTranslations();
  });
}

applyTranslations(); 