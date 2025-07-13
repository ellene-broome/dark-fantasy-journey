console.log("Hello, Dark Fantasy Journey!");




// ========== NAVIGATION TOGGLE ==========
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });
}
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navLinks");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");
    });
  }

// Quote section
  const quotes = ["Ka is a wheel. Its one purpose is to turn, and in the end it always comes back to the place where it started. -The Gunslinger", "Ka...it means duty, destiny, and doom - and sometimes all three at once. -The Drawing of the Three", "Go then. There are other worlds than these. -The Gunslinger", "The man in black fled across the desert, and the gunslinger followed. -The Gunslinger", "The world has moved on, and so must you. -The Gunslinger", "Time is a face on the water. -The Drawing of the Three", "There are other worlds than these. -The Gunslinger", "The tower stands at the center of all worlds. -The Dark Tower", "Time's the thief of memory, and memory's the thief of time. -The Drawing of the Three", "The gunslinger is true to his word, but he is not bound by it. -The Gunslinger","Death is not for you, gunslinger. Never for you. -The Gunslinger"

  ];
  
  // function for quote button
  

function pickRandom() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

window.myFunction = function () {
  const quoteBox = document.getElementById("quotes");
  if (!quoteBox) return;
  quoteBox.innerText = pickRandom();
};

  myFunction(); // show quote on load

// Load page-specific data
  const booksSection = document.getElementById("darkTowerGrid");
  const characterSection = document.getElementById("characterGrid");

console.log("***** Current path:", window.location.pathname);

if (booksSection && window.location.pathname.includes("books")) {
  console.log("📘 Loading books...");
  fetchBooks();
}

if (characterSection && window.location.pathname.includes("characters")) {
  console.log("***** Loading characters...");
  loadCharacters();
}
  // Add fade-in animation to quotes
  const quoteElement = document.getElementById("quotes");
  if (quoteElement) {
    quoteElement.classList.add("animate-fadeInUp");
  }
});



// ========== BOOKS FROM API ==========
async function fetchBooks() {
  const grid = document.getElementById("darkTowerGrid");

  console.log("Fetching books...");
  console.log("Grid element:", grid); // Debugging line

  if (!grid) return;

  grid.innerHTML = `<p class="text-center text-white">Loading...</p>`;

  try {
    const res = await fetch("https://openlibrary.org/search.json?q=dark+tower");

    if (res.status === 429) {
      showToast("Too many requests — please wait.");
      return;
    }

    if (!res.ok) {
      showToast(`Error ${res.status}: ${res.statusText}`);
      return;
    }

    const data = await res.json(); // data available
    console.log("Book data from API:", data); // Debugging line

    const books = data.docs.slice(0, 8);
    console.log("Books to display:", books); // Debugging line

    grid.innerHTML = data.docs.slice(0, 8).map(book => `
      <div class="bg-slate-800 p-4 rounded shadow hover:shadow-lg">
        <h2 class="text-xl font-bold text-blue-300">${book.title}</h2>
        <p class="text-gray-300">Author: ${book.author_name?.[0] || "Unknown"}</p>
        <p class="text-gray-500 text-sm">Published: ${book.first_publish_year || "N/A"}</p>
      </div>
    `).join("");

  } catch (err) {
    console.error("Error loading books:", err);
    showToast("Something went wrong!");
  }
}

// ========== CHARACTERS FROM JSON ==========
async function loadCharacters() {
  const container = document.getElementById("characterGrid");
  if (!container) return;

  try {
    const res = await fetch("characters.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    data.forEach(char => {
      const card = document.createElement("div");
      card.className = "bg-slate-800 p-4 rounded-lg shadow-lg";

      card.innerHTML = `
        <h2 class="text-xl font-bold text-rose-300 mb-2">${char.name}</h2>
        ${char.aliases ? `<p class="text-sm text-amber-400 mb-1"><strong>Aliases:</strong> ${char.aliases.join(", ")}</p>` : ""}
        <p class="text-slate-300">${char.description}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load characters:", err);
    showToast("Character data could not be loaded.");
  }
}
