import { bigImage, popupImgDesc, popupImage } from "./constants.js"
import { renderCard, createCard } from "./card.js";
import { openPopup, closePopup } from "./utils.js";
import {
  namePlace,
  linkPlace,
  newPlacePopup,
  formNewPlace,
  inputUserName,
  inputUserBio,
  titleProfile,
  descProfile,
  popupEditProfile
} from "./constants.js";

import { setUserInfo, addNewCard } from "./api.js";


function updateUsefInfo(name,bio) {
  titleProfile.textContent = name;
  descProfile.textContent = bio;
};

function handleProfileFormSubmit(e) {
  e.preventDefault();
  updateUsefInfo(inputUserName.value, inputUserBio.value);
  setUserInfo(inputUserName.value, inputUserBio.value);
  closePopup(popupEditProfile);
};

function handlePlaceFormSubmit(e) {
  e.preventDefault();
  renderCard(createCard(namePlace.value, linkPlace.value));
  addNewCard(namePlace.value, linkPlace.value);
  closePopup(newPlacePopup);
  formNewPlace.reset();
  const btnSubmit = formNewPlace.querySelector('.popup__submit-button');
  btnSubmit.classList.add('popup__submit-button_inactive');
  btnSubmit.setAttribute('disabled','');
};

// OpenPopupBigImg
function showBigImg(name,link) {
  bigImage.src = link;
  bigImage.alt = name;
  popupImgDesc.textContent = name;
  openPopup(popupImage);
};

export {
  handleProfileFormSubmit,
  handlePlaceFormSubmit,
  showBigImg
}
