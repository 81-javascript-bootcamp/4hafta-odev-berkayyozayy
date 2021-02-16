import data from "./data.js";
import { searchMovieByTitle, makeBgActive } from "./helpers.js";

class MoviesApp {
  constructor(options) {
    const {
      root,
      searchInput,
      searchForm,
      yearHandler,
      yearSubmitter
    } = options;
    this.$tableEl = document.getElementById(root);
    this.$tbodyEl = this.$tableEl.querySelector("tbody");

    this.$searchInput = document.getElementById(searchInput);
    this.$searchForm = document.getElementById(searchForm);

    this.yearHandler = yearHandler;
    this.$yearSubmitter = document.getElementById(yearSubmitter);
    this.$yearBox = document.getElementById("year-box");
  }

  createMovieEl(movie) {
    const { image, title, genre, year, id } = movie;
    return `<tr data-id="${id}"><td><img src="${image}"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`;
  }

  yearCount(year) {
    return data.filter((movie) => movie.year == year).length;
  }

  createYearBoxHTML(type, id, name, value, count) {
    return `<div class="form-check" id='year-box'>
      <input class="form-check-input" type="${type}" name="${name}" id="${name}" value="${value}">
      <label class="form-check-label" for="${name}${id}">
      ${value} (${count})
      </label>
  </div>
      `;
  }

  createYearRadioBtn(movie) {
    const { year, id } = movie;
    let count = this.yearCount(year);
    return this.createYearBoxHTML("radio", id, this.yearHandler, year, count);
  }

  fillTable() {
    /* const moviesHTML = data.reduce((acc, cur) => {
            return acc + this.createMovieEl(cur);
        }, "");*/
    const moviesArr = data
      .map((movie) => {
        return this.createMovieEl(movie);
      })
      .join("");
    this.$tbodyEl.innerHTML = moviesArr;
  }

  fillYearBox() {
    let years = data.map((o) => o.year);
    let filtered = data.filter(
      ({ year }, index) => !years.includes(year, index + 1)
    );
    let yearsInHTML = filtered
      .map((movie) => {
        return this.createYearRadioBtn(movie);
      })
      .join("");
    this.$yearBox.innerHTML = yearsInHTML;
  }

  reset() {
    this.$tbodyEl.querySelectorAll("tr").forEach((item) => {
      item.style.background = "transparent";
    });
  }

  handleSearch() {
    this.$searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.reset();
      const searchValue = this.$searchInput.value;
      const matchedMovies = data
        .filter((movie) => {
          return searchMovieByTitle(movie, searchValue);
        })
        .forEach(makeBgActive);
    });
  }

  handleYearFilter() {
    this.$yearSubmitter.addEventListener("click", () => {
      this.reset();
      const selectedYear = document.querySelector(
        `input[name='${this.yearHandler}']:checked`
      ).value;
      const matchedMovies = data
        .filter((movie) => {
          return movie.year === selectedYear;
        })
        .forEach(makeBgActive);
    });
  }

  init() {
    this.fillTable();
    this.handleSearch();
    this.handleYearFilter();
    this.fillYearBox();
  }
}

let myMoviesApp = new MoviesApp({
  root: "movies-table",
  searchInput: "searchInput",
  searchForm: "searchForm",
  yearHandler: "year",
  yearSubmitter: "yearSubmitter",
});

myMoviesApp.init();
