import { bigImage, popupImgDesc, popupImage } from "./constants.js"

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// OpenPopupBigImg
function showBigImg(name,link) {
  bigImage.src = link;
  bigImage.alt = name;
  popupImgDesc.textContent = name;
  openPopup(popupImage);
};

export {
  openPopup,
  closePopup,
  showBigImg
}
