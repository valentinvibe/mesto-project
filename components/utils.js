import {
  titleProfile,
  descProfile,
  namePlace,
  linkPlace,
  inputUserName,
  inputUserBio,
  formEditProfile,
  popupEditProfile
} from "./constants.js";
import { closePopup } from "./modal.js"

function updateUsefInfo(name,bio) {
  titleProfile.textContent = name;
  descProfile.textContent = bio;
};

function formSubmitHandlerProfile(e) {
  e.preventDefault();
  updateUsefInfo(inputUserName.value, inputUserBio.value);
  formEditProfile.reset();
  closePopup(popupEditProfile);
};

function formSubmitHandlerPlace(e) {
  e.preventDefault();
  renderCard(createCard(namePlace.value, linkPlace.value));
  closePopup(newPlacePopup);
  formNewPlace.reset();
};

export {
  updateUsefInfo,
  formSubmitHandlerProfile,
  formSubmitHandlerPlace
}


