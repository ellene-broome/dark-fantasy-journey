console.log("Hello, Dark Fantasy Journey!");


// Initialize Tailwind CSS
    document.addEventListener("DOMContentLoaded", () => {
      const colorMap = {
        "blue-400": "text-blue-400",
        "green-400": "text-green-400",
        "yellow-400": "text-yellow-400",
        "red-400": "text-red-400"
      };
      // Array of Books
const darkTowerBooks = [
  {
    title: "The Gunslinger",
    year: 1982,
    summary: "Roland of Gilead pursues the mysterious Man in Black across a desolate world.",
    cover: "assets/images/gs.png",
    color: "blue-400"
  },
  {
    title: "The Drawing of the Three",
    year: 1987,
    summary: "Roland encounters three key figures from our world who will aid him on his quest.",
    cover: "assets/images/dot.png",
    color: "green-400"
  },
  {
    title: "The Waste Lands",
    year: 1991,
    summary: "Roland and his companions journey through a decaying city to reach the Dark Tower.",
    cover: "assets/images/wl.png",
    color: "yellow-400"
  },
  {
    title: "Wizard and Glass",
    year: 1997,
    summary: "A flashback to Roland's youth and his first love, Susan Delgado.",
    cover: "assets/images/w&g.png",
    color: "red-400"
  }
];

    const grid = document.getElementById("darkTowerGrid");

    darkTowerBooks.forEach(book => {
      const card = document.createElement("article");
      card.className = "bg-slate-700 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300";
      card.innerHTML = `
        <img src="${book.cover}" alt="${book.title} Cover" class="w-full rounded-lg">
      <h2 class="text-2xl font-bold ${colorMap[book.color]} mb-2">${book.title}</h2>
      <p class="text-gray-300 mb-2"><strong>Year:</strong> ${book.year}</p>
      <p class="text-gray-200">${book.summary}</p>
    `;
        grid.appendChild(card);
    });

    document.getElementById("showMoreBtn").addEventListener("click", () => {
        const moreContent = document.getElementById("moreContent");
        moreContent.classList.toggle("hidden");
    });
    });