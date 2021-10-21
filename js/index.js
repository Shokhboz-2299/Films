const elLoader = document.querySelector(".js-loader");
const elFilmsList = document.querySelector(".js-films-list");
const elPrev = document.querySelector(".js-prev");
const elNext = document.querySelector(".js-next");
const elFormSearch = document.querySelector(".form-js");
const elInputSearch = elFormSearch.querySelector(".js-input-search");

let page = 1;

// console.log(fetch("http://www.omdbapi.com/?s=marvel&apikey=9fcd4d84"));
// elFormSearch.addEventListener("submit", function() {
//   const inputValue = elInputSearch.value.trim();
//   elFilmsList.innerHTML = "";

  var film = prompt("Qaysi filmni izladiz", "Home Alone").trim();

function getData(page) {
  fetch(`https://www.omdbapi.com/?apikey=9fcd4d84&s=${film}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      elLoader.style.display = "none";
      working(data.Search);
    });

  function working(array) {
    array.forEach((element) => {
      renderFilms(element);
    });
  }
}

function renderFilms(object) {
  const newLi = document.createElement("li");
  const newImg = document.createElement("img");
  const newTilte = document.createElement("h4");
  const newYear = document.createElement("p");
  newYear.textContent = object.Year;
  newYear.setAttribute("class", "movies-year");
  newTilte.textContent = object.Title;
  newTilte.setAttribute("class", "movies-title mt-3");
  // newImg.classList = "new-img-js";
  newImg.setAttribute("class", "new-img-js mt-2 d-inline-block");
  newImg.src = object.Poster;
  newImg.width =280;
  newImg.height = 280;

  newLi.setAttribute("class", "new-list-item");

  newLi.appendChild(newImg);
  newLi.appendChild(newTilte);
  newLi.appendChild(newYear);
  elFilmsList.appendChild(newLi);
}

elNext.addEventListener("click", nextPage);
function nextPage() {
  elFilmsList.innerHTML = "";
  page++;
  getData(page);
}

elPrev.addEventListener('click', prevPage);
function prevPage() {
  elFilmsList.innerHTML = "";
  if (page>1) {
    page--;
  }
  getData(page);
}

getData(page);

// });