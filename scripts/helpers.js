export const searchMovieByTitle = (movie, searchValue) => {
  return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
};

export const makeBgActive = (movie) => {
  document.querySelector(`tr[data-id='${movie.id}']`).style.background =
    "#d7f0f7";
};

export const clearInput = () => {
  return searchInput.value = "";
};

export const createFilterBox = (type, id, name, value, count) => {
  return `
          <div class="form-check">
              <input
                  class="form-check-input"
                  type="${type}"
                  name="${name}"
                  value="${value}"
                  id="${name}${id}"
              />
              <label class="form-check-label" for="${name} ${id}">
                  ${value} (${count})
              </label>
          </div>  `;
}
