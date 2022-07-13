import { Popup } from "./Popup.js";

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

export { PopupWithImage }
