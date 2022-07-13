import { Popup } from "./Popup";

class PopupWithForm extends Popup {
  constructor(popupSelector, handler) {
    super(popupSelector);
    this._handler = handler;
  }

  _getInputValues() {
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
    super.setEventListeners();
    this._formElement = this._popupSelector.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input-field'));
    this._btnSubmit = this._popupSelector.querySelector('.popup__submit-button');
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._formData = this._getInputValues();
      this._handler.formSubmitHandler(this._formData, this._btnSubmit);
    })
  }
}

export { PopupWithForm  }
