class SearchView {
  #parentElment = document.querySelector('.search');

  getQuery() {
    return this.#parentElment.querySelector('.search__field').value;
  }

  #clearField() {
    this.#parentElment.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentElment.addEventListener('submit', event => {
      event.preventDefault();
      handler();
      this.#clearField();
    });
  }
}

export default new SearchView();
