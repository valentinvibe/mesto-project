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
  const btnSubmit = popupEditProfile.querySelector('.popup__submit-button');
  renderLoading(true, btnSubmit);
  setUserInfo(inputUserName.value, inputUserBio.value)
    .then((res) => {
      updateUsefInfo(inputUserName.value, inputUserBio.value);
      closePopup(popupEditProfile);
      setInactiveFormBtn(btnSubmit);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btnSubmit);
    })

};

function handlePlaceFormSubmit(user) {
  const card = {
    name: namePlace.value,
    link: linkPlace.value
  }
  const btnSubmit = newPlacePopup.querySelector('.popup__submit-button');
  renderLoading(true, btnSubmit);
  addNewCard(card, user)
    .then(result => {
      renderCard(createCard(result,user));
      closePopup(newPlacePopup);
      setInactiveFormBtn(btnSubmit);
      formNewPlace.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btnSubmit, 'Создать');
    })
};

function handlerAvatarFormSubmit(e) {
  e.preventDefault();
  const btnSubmit = popupAvatar.querySelector('.popup__submit-button');
  renderLoading(true, btnSubmit);
  setUserAvatar(avaLink.value)
    .then(result => {
      avatarProfile.src = result.avatar;
      closePopup(popupAvatar);
      setInactiveFormBtn(btnSubmit);
      formNewAvatar.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btnSubmit);
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
