class Section {
  constructor({cardsData, renderer}, sectionSelector) {
    this._data = cardsData;
    this._renderer = renderer;
    this._container = sectionSelector;
  }

  setItem(element) {
    this._container.append(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  setNewItem(item) {
    this._container.prepend(item);
  }

  addItems() {
    this._clear();
    this._data.forEach(item => {
      this._renderer(item);
    });
  }
}

export { Section }
