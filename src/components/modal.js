import {
  bigImage,
  popupImgDesc,
  popupImage,
  popupEditProfile,
  newPlacePopup,
  popupAvatar
} from "./constants.js";

import {
  openPopup,
  renderLoading,
  setInactiveFormBtn,
  closePopup
} from "./utils.js";

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

import { createCard, renderCard } from "./card.js";

function updateUsefInfo(name,bio) {
  titleProfile.textContent = name;
  descProfile.textContent = bio;
};

function handleProfileFormSubmit(e) {
  e.preventDefault();
  setUserInfo(inputUserName.value, inputUserBio.value)
    .then((res) => {
      renderLoading(true);
      updateUsefInfo(inputUserName.value, inputUserBio.value);
    })
    .catch(err => {
      throw new Error(`${err.status} ${err.statusText}`)
    })
    .finally(() => {
      renderLoading(false);
    })
    .finally(() => {
      closePopup(popupEditProfile)
    })
    .finally(() => {
      setInactiveFormBtn(popupEditProfile)
    })

};

function handlePlaceFormSubmit(user) {
  const card = {
    name: namePlace.value,
    link: linkPlace.value
  }
  addNewCard(card, user)
    .then(result => {
      renderLoading(true);
      renderCard(createCard(result,user))
    })
    .catch(err => {
      throw new Error(`${err.status} ${err.statusText}`)
    })
    .finally(() => {
      renderLoading(false);
    })
    .finally(() => {
      closePopup(newPlacePopup)
    })
    .finally(() => {
      setInactiveFormBtn(newPlacePopup)
    })
  formNewPlace.reset();
};

function handlerAvatarFormSubmit(e) {
  e.preventDefault();
  setUserAvatar(avaLink.value)
    .then(result => {
      renderLoading(true);
      avatarProfile.src = result.avatar;
    })
    .catch(err => {
      throw new Error(`${err.status} ${err.statusText}`)
    })
    .finally(() => {
      renderLoading(false);
    })
    .finally(() => {
      closePopup(popupAvatar)
    })
    .finally(() => {
      setInactiveFormBtn(popupAvatar)
    })
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
