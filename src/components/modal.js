import { bigImage, popupImgDesc, popupImage } from "./constants.js"
import { openPopup } from "./utils.js";
import {
  namePlace,
  linkPlace,
  formNewPlace,
  inputUserName,
  inputUserBio,
  titleProfile,
  descProfile,
  avaLink,
  formNewAvatar
} from "./constants.js";

import {
  setUserInfo,
  addNewCard,
  setUserAvatar
} from "./api.js";

function updateUsefInfo(name,bio) {
  titleProfile.textContent = name;
  descProfile.textContent = bio;
};

function handleProfileFormSubmit(e) {
  e.preventDefault();
  updateUsefInfo(inputUserName.value, inputUserBio.value);
  setUserInfo(inputUserName.value, inputUserBio.value);
};

function handlePlaceFormSubmit(user) {
  const card = {
    name: namePlace.value,
    link: linkPlace.value
  }
  addNewCard(card, user)
  formNewPlace.reset();
};

function handlerAvatarFormSubmit(e) {
  e.preventDefault();
  setUserAvatar(avaLink.value)
  formNewAvatar.reset();
}

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
  showBigImg,
  handlerAvatarFormSubmit
}
