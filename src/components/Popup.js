class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._setEventListeners();
    this._handleEsc = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEsc);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEsc);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
      console.log();
    }
  }

  _setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close(this._popupSelector);
      }
      if (evt.target.classList.contains('popup__close-button')) {
        this.close(this._popupSelector);
      }
    })
  }
}

class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._bigImage = this._popupSelector.querySelector('.popup__big-img');
      this._popupImgDesc = this._popupSelector.querySelector('.popup__img-description');
    }

    open(item) {
      super.open();
      this._bigImage.src = item.link;
      this._bigImage.alt = item.name;
      this._popupImgDesc.textContent = item.name;
    }

}

export { Popup, PopupWithImage }
