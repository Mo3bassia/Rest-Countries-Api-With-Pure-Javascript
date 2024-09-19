let allCountries = [];
let countriesAllowed = 15;
let allCountriesList = [];
let currentIndex = 0;
let currentList = 1;
let total = 0;
let currentListIndex = 1;
let totalEl = document.querySelector(".pagination-desc .total");
let current = document.querySelector(".pagination-desc .current");
let countries = document.querySelector(".countries");
let previousBtn = document.querySelector(".previous-btn");
let nextBtn = document.querySelector(".next-btn");
let checkInput = document.querySelector(".switch input");

if (!localStorage.getItem("current-index")) {
  currentListIndex = 1;
} else {
  currentListIndex = localStorage.getItem("current-index");
}

async function getData() {
  let json = await fetch("data.json");
  let result = await json.json();
  result.forEach((element) => {
    allCountries.push(element);
  });
  totalEl.textContent = Math.ceil(result.length / countriesAllowed);
  total = Math.ceil(result.length / countriesAllowed);
  current.textContent = currentList;

  for (let i = 0; i < total; i++) {
    getFullList();
  }
  showCountries();
  checkFirstorLast();
}

function getFullList() {
  if (currentIndex < allCountries.length) {
    allCountriesList.push([]);
    for (let i = currentIndex; i < currentIndex + countriesAllowed; i++) {
      if (i == allCountries.length) break;
      allCountriesList[currentList - 1].push(allCountries[i]);
    }
  }
  currentIndex += countriesAllowed;
  currentList++;
}

function showCountries() {
  countries.innerHTML = "";

  allCountriesList[currentListIndex - 1].forEach((item, index) => {
    let country = document.createElement("div");
    country.classList.add("country-box");
    countries.append(country);

    let flag = document.createElement("img");
    flag.src = allCountriesList[currentListIndex - 1][index].flags.svg;
    flag.alt = allCountriesList[currentListIndex - 1][index].name;
    country.append(flag);

    let description = document.createElement("div");
    description.classList.add("description");
    country.append(description);

    let title = document.createElement("h3");
    title.classList.add("title");
    title.textContent = allCountriesList[currentListIndex - 1][index].name;
    description.append(title);

    let ul = document.createElement("ul");
    description.append(ul);

    let population = document.createElement("li");
    let spanPopulation = document.createElement("span");
    spanPopulation.textContent = "Population: ";
    ul.append(population);
    population.append(spanPopulation);
    population.innerHTML +=
      allCountriesList[currentListIndex - 1][index].population;

    let capital = document.createElement("li");
    let spanCapital = document.createElement("span");
    spanCapital.textContent = "Capital: ";
    ul.append(capital);
    capital.append(spanCapital);
    capital.innerHTML += allCountriesList[currentListIndex - 1][index].capital;

    let region = document.createElement("li");
    let spanRegion = document.createElement("span");
    spanRegion.textContent = "Region: ";
    ul.append(region);
    region.append(spanRegion);
    region.innerHTML += allCountriesList[currentListIndex - 1][index].region;
  });
  current.textContent = currentListIndex;
}

getData();

function checkFirstorLast() {
  if (currentListIndex === 1) {
    previousBtn.classList.add("disabled");
    previousBtn.setAttribute("disabled", "disabled");
  } else if (currentListIndex === total) {
    nextBtn.classList.add("disabled");
    nextBtn.setAttribute("disabled", "disabled");
  } else {
    nextBtn.classList.remove("disabled");
    nextBtn.removeAttribute("disabled", "disabled");
    previousBtn.classList.remove("disabled");
    previousBtn.removeAttribute("disabled", "disabled");
  }
}

nextBtn.onclick = function () {
  currentListIndex += 1;
  showCountries();
  checkFirstorLast();
};
previousBtn.onclick = function () {
  currentListIndex -= 1;
  showCountries();
  checkFirstorLast();
};

window.onload = function () {
  if (!localStorage.getItem("website-mode")) {
    localStorage.setItem("website-mode", "light-mode");
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.remove("light-mode");
    document.body.classList.add(localStorage.getItem("website-mode"));
    if (localStorage.getItem("website-mode") == "dark-mode") {
      checkInput.checked = true;
    }
  }
};

checkInput.addEventListener("change", function () {
  if (checkInput.checked) {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    localStorage.setItem("website-mode", "dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    localStorage.setItem("website-mode", "light-mode");
  }
});
