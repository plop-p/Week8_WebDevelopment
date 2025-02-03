document.addEventListener("DOMContentLoaded", () => {
  fetchTrendingAnime();
  fetchTrendingManga();
});

async function fetchTrendingAnime() {
  try {
      const response = await fetch("https://api.jikan.moe/v4/top/anime");
      const data = await response.json();
      displayItems(data.data, "animeResults");
  } catch (error) {
      console.error("Error fetching anime:", error);
  }
}

async function fetchTrendingManga() {
  try {
      const response = await fetch("https://api.jikan.moe/v4/top/manga");
      const data = await response.json();
      displayItems(data.data, "mangaResults");
  } catch (error) {
      console.error("Error fetching manga:", error);
  }
}

function displayItems(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  items.slice(0, 10).forEach(item => {
      const itemCard = `
          <div class="item-card">
              <h3>${item.title}</h3>
              <img src="${item.images.jpg.image_url}" alt="${item.title}">
              <p>⭐ Score: ${item.score}</p>
              <a href="${item.url}" target="_blank">View More</a>
          </div>
      `;
      container.innerHTML += itemCard;
  });
}

function showSection(section) {
  document.getElementById("animeSection").classList.add("hidden");
  document.getElementById("mangaSection").classList.add("hidden");
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));

  document.getElementById(`${section}Section`).classList.remove("hidden");
  document.querySelector(`button[onclick="showSection('${section}')"]`).classList.add("active");
}
