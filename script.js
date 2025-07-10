console.log("Hello, Dark Fantasy Journey!");

// ========== TOAST NOTIFICATION ==========
function showToast(message = "Too many requests — please wait.") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 4000);
}

// ========== NAVIGATION TOGGLE ==========
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const navLinks = document.getElementById("navLinks");
      if (navLinks) navLinks.classList.toggle("hidden");
    });
  }

  // Show More Button (Homepage only)
  const showMoreBtn = document.getElementById("showMoreBtn");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      const more = document.getElementById("moreContent");
      if (more) more.classList.toggle("hidden");
    });
  }

  // Lazy reveal animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("article, div.card").forEach(el => observer.observe(el));

  // Load page-specific data
  const booksSection = document.getElementById("darkTowerGrid");
  const characterSection = document.getElementById("characterGrid");

  if (booksSection && window.location.pathname.includes("books")) {
    fetchBooks();
  }

  if (characterSection && window.location.pathname.includes("characters")) {
    loadCharacters();
  }
});

// ========== BOOKS FROM API ==========
async function fetchBooks() {
  const grid = document.getElementById("darkTowerGrid");
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

    const data = await res.json(); // <-- only now is data available
    console.log("Book data from API:", data); // <-- move this HERE

    grid.innerHTML = data.docs.slice(0, 10).map(book => `
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
