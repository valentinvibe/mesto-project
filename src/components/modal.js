import {
  bigImage,
  popupImgDesc,
  popupImage,
  popupEditProfile,
  newPlacePopup,
  popupAvatar,
  avatarProfile
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
      renderLoading(true, popupEditProfile);
      updateUsefInfo(inputUserName.value, inputUserBio.value);
      closePopup(popupEditProfile);
      setInactiveFormBtn(popupEditProfile);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupEditProfile);
    })

};

function handlePlaceFormSubmit(user) {
  const card = {
    name: namePlace.value,
    link: linkPlace.value
  }
  addNewCard(card, user)
    .then(result => {
      renderLoading(true, newPlacePopup);
      renderCard(createCard(result,user));
      closePopup(newPlacePopup);
      setInactiveFormBtn(newPlacePopup);
      formNewPlace.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, newPlacePopup);
    })
};

function handlerAvatarFormSubmit(e) {
  e.preventDefault();
  setUserAvatar(avaLink.value)
    .then(result => {
      renderLoading(true, popupAvatar);
      avatarProfile.src = result.avatar;
      closePopup(popupAvatar);
      setInactiveFormBtn(popupAvatar);
      formNewAvatar.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAvatar);
    })
  
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
