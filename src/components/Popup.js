class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose() {
    if (evt.key === 'Escape' && this._popupSelector.classList.cotains('popup_opened')) {
        closePopup(this._popupSelector);
      }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(this._popupSelector);
      }
      if (evt.target.classList.contains('popup__close-button')) {
          closePopup(this._popupSelector);
      }
    })
  }
}

class PopupWithImage extends Popup {
    constructor(popupSelector, bigImage, popupImgDesc) {
      super(popupSelector);
      this._bigImage = bigImage;
      this._popupImgDesc = popupImgDesc;
    }

    open() {
      super.open();
      this._handleCardClick();
    }

    handleCardClick(link, name) {
      this._bigImage.src = link;
      this._bigImage.alt = name;
      this._popupImgDesc.textContent = name;
    }
}
