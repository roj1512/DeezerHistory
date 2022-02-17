const params = new URLSearchParams(window.location.search);

for (const img of document.querySelectorAll("img")) {
  img.src = params.get("albumPhoto");
}

document.querySelector("#album").textContent = params.get("albumName");
document.querySelector("#artist").textContent = params.get("artist");
document.querySelector("#title").textContent = params.get("title");
document.querySelector("#user").textContent = params.get("user");
