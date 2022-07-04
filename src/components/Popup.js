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
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popupSelector.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input-field'));
    this._formSubmit = this._formElement.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    const formElement = this._popupSelector.querySelector('.popup__form');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));
    this._formValues = {};
    inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    console.log(this._formValues)
    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners();
    const data = this._getInputValues();
    const formSubmit = this._popupSelector.querySelector('.popup__submit-button');
    formSubmit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(data.name, data.about);
    })
  }
}

export { Popup, PopupWithImage, PopupWithForm }
