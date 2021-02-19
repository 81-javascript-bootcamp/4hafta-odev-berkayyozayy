import data from './data.js';
import { searchMovieByTitle, makeBgActive, clearInput, createFilterBox } from './helpers.js';

class MoviesApp {
	constructor(options) {
		const { root, searchInput, searchForm, yearHandler, yearSubmitter, genreHandler, genreSubmitter } = options;
		this.$tableEl = document.getElementById(root);
		this.$tbodyEl = this.$tableEl.querySelector('tbody');

		this.$searchInput = document.getElementById(searchInput);
		this.$searchForm = document.getElementById(searchForm);

		this.yearHandler = yearHandler;
		this.$yearSubmitter = document.getElementById(yearSubmitter);
		this.$yearBox = document.getElementById('year-box');

		this.genreHandler = genreHandler;
		this.$genreSubmitter = document.getElementById(genreSubmitter);
		this.$genreBox = document.getElementById('genre-box');
	}

	createMovieEl(movie) {
		const { image, title, genre, year, id } = movie;
		return `<tr data-id="${id}"><td><img src="${image}"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`;
	}

	yearCount(year) {
		return data.filter((movie) => movie.year == year).length;
	}

	genreCount(genre) {
		return data.filter((movie) => movie.genre == genre).length;
	}

	createYearRadioBtn(movie) {
		const { year, id } = movie;
		let count = this.yearCount(year);
		return createFilterBox('radio', id, this.yearHandler, year, count);
	}

	createCheckBox(movie) {
		const { genre, id } = movie;
		let count = this.genreCount(genre);
		return createFilterBox('checkbox', id, this.genreHandler, genre, count);
	}

	fillTable() {
		/* const moviesHTML = data.reduce((acc, cur) => {
                return acc + this.createMovieEl(cur);
            }, "");*/
		const moviesArr = data
			.map((movie) => {
				return this.createMovieEl(movie);
			})
			.join('');
		this.$tbodyEl.innerHTML = moviesArr;
	}

	fillYearBox() {
		let years = data.map((o) => o.year);
		let filtered = data.filter(({ year }, index) => !years.includes(year, index + 1));
		let yearsInHTML = filtered
			.map((movie) => {
				return this.createYearRadioBtn(movie);
			})
			.join('');
		this.$yearBox.innerHTML = yearsInHTML;
	}

	fillGenreBox() {
		let genres = data.map((o) => o.genre);
		// console.log(genres)
		let filtered = data.filter(({ genre }, index) => !genres.includes(genre, index + 1));
		let genresInHTML = filtered
			.map((movie) => {
				return this.createCheckBox(movie);
			})
			.join('');
		this.$genreBox.innerHTML = genresInHTML;
	}

	reset() {
		this.$tbodyEl.querySelectorAll('tr').forEach((item) => {
			item.style.background = 'transparent';
		});
	}

	handleSearch() {
		this.$searchForm.addEventListener('submit', (event) => {
			event.preventDefault();
			this.reset();
			const searchValue = this.$searchInput.value;
			const matchedMovies = data
				.filter((movie) => {
					return searchMovieByTitle(movie, searchValue);
				})
				.forEach(makeBgActive);
			clearInput();
		});
	}

	handleYearFilter() {
		this.$yearSubmitter.addEventListener('click', () => {
			this.reset();
			const selectedYear = document.querySelector(`input[name='${this.yearHandler}']:checked`).value;
			const matchedMovies = data
				.filter((movie) => {
					return movie.year === selectedYear;
				})
				.forEach(makeBgActive);
		});
	}

	handleGenreFilter() {
		this.$genreSubmitter.addEventListener('click', () => {
			this.reset();
			const selectedGenre = [...document.querySelectorAll(`input[name='${this.genreHandler}']:checked`) ].map(
				(genre) => genre.value
			);
			// console.log(selectedGenre);
			const matchedGenres = data
				.filter((movie) => {
					return selectedGenre.includes(movie.genre);
				})
				.forEach(makeBgActive);
		});
	}

	init() {
		this.fillTable();
		this.handleSearch();
		this.handleYearFilter();
		this.fillYearBox();
		this.fillGenreBox();
		this.handleGenreFilter();
	}
}

let myMoviesApp = new MoviesApp({
	root: 'movies-table',
	searchInput: 'searchInput',
	searchForm: 'searchForm',
	yearHandler: 'year',
	yearSubmitter: 'yearSubmitter',
	genreHandler: 'genreHandler',
	genreSubmitter: 'genreSubmitter',
	genreBox: 'genreBox'
});

myMoviesApp.init();
