class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.setEventListeners();
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
    }
  }

  setEventListeners() {
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
class PopupWithForm extends Popup {
  constructor(popupSelector, handler) {
    super(popupSelector);
    this._handler = handler;
  }

  _getInputValues() {
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input-field'));
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    this._formElement = this._popupSelector.querySelector('.popup__form');
    const btnSubmit = this._popupSelector.querySelector('.popup__submit-button');
    super.setEventListeners();
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = this._getInputValues();
      this._handler.formSubmitHandler(formData,btnSubmit);
    })
  }
}

export { Popup, PopupWithImage, PopupWithForm }
