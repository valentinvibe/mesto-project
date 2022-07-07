import { cardsContainer } from './constants.js';

class Section {
  constructor({cardsData, renderer}, sectionSelector) {
    this._data = cardsData;
    this._renderer = renderer;
    this._container = sectionSelector;
  }

  setItem(element) {
    this._container.append(element);
  }

  addItem() {
    this._data.forEach(item => {
      this._renderer(item);
    });
  }

}

export { Section }
