

 // console.log(fetch("https://www.omdbapi.com/?s=marvel&apikey=9fcd4d84"));


// function getData(page, value) {
//   fetch(`https://www.omdbapi.com/?apikey=9fcd4d84&s=${inputValue}&page=${page}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);

//       elLoader.style.display = "none";
//       working(data.Search);
//     });

//   function working(array) {
//     array.forEach((element) => {
//       renderFilms(element);
//     });
//   }
// }


// elNext.addEventListener("click", nextPage);
// function nextPage() {
//   elFilmsList.innerHTML = "";
//   page++;
//   getData(page, inputValue);
// }

// elPrev.addEventListener('click', prevPage);
// function prevPage() {
//   elFilmsList.innerHTML = "";
//   if (page>1) {
//     page--;
//   }
//   getData(page, inputValue);
// }

// getData(page, inputValue);

// =========================================

const elLoader = document.querySelector(".js-loader");
const elSearchForm = document.querySelector(".js-search-form");
const elSearchInput = elSearchForm.querySelector(".js-search-input");
const elFilmsList = document.querySelector(".js-films-list");
const elPrev = document.querySelector(".js-prev");
const elNext = document.querySelector(".js-next");

let page = 1;

elLoader.style.display = "none";

elSearchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  elFilmsList.innerHTML = "";

  elLoader.style.display = "block";
  const inputValue = elSearchInput.value.trim();

  getData(page, inputValue);
});

function getData(page, value) {
  fetch(`https://www.omdbapi.com/?apikey=d83224c7&s=${value}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.totalResults);
      if (page <= 1) {
        elPrev.disabled = true;
      }
      if (page > 1) {
        elPrev.disabled = false;
      }
      if (page == Math.ceil(data.totalResults / 10)) {
        elNext.disabled = true;
      }
      if (page < Math.ceil(data.totalResults / 10)) {
        elNext.disabled = false;
      }
      if (Math.ceil(data.totalResults / 10) < 2) {
        elPrev.disabled = true;
        elNext.disabled = true;
      }

      elLoader.style.display = "none";
      turnFilms(data.Search);
    });

  function turnFilms(array) {
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

function nextPage() {
  page = page + 1;

  elPrev.disabled = false;
  elFilmsList.innerHTML = "";
  elLoader.style.display = "block";
  const inputValue = elSearchInput.value.trim();
  getData(page, inputValue);
}
elNext.addEventListener("click", nextPage);

function prevPage() {
  page = page - 1;

  elFilmsList.innerHTML = "";
  elLoader.style.display = "block";
  const inputValue = elSearchInput.value.trim();
  getData(page, inputValue);
}
elPrev.addEventListener("click", prevPage);


