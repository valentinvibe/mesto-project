const btnEditProfile = document.querySelector('.profile__edit-button'),
      btnAddNewPlace = document.querySelector('.profile__add-button'),
      popupEditProfile = document.querySelector('.popup_profile'),
      newPlacePopup = document.querySelector('.popup_new-place'),
      popupImage = document.querySelector('.popup_big-image'),
      cardTemplate = document.querySelector('#card-template').content,
      cardsContainer = document.querySelector('.cards-container'),
      formNewPlace = newPlacePopup.querySelector('.popup__form'),
      formEditProfile = popupEditProfile.querySelector('.popup__form'),
      inputUserName = formEditProfile.querySelector('input[name="user-name"]'),
      inputUserBio = formEditProfile.querySelector('input[name="user-bio"]'),
      namePlace = formNewPlace.querySelector('input[name="place-name"]'),
      linkPlace = formNewPlace.querySelector('input[name="place-link"]'),
      bigImage = document.querySelector('.popup__big-img'),
      popupImgDesc = document.querySelector('.popup__img-description'),
      titleProfile = document.querySelector('.profile__title'),
      descProfile = document.querySelector('.profile__description'),
      popups = document.querySelectorAll('.popup'),
      avatarProfile = document.querySelector('.profile__avatar'),
      popupConfirm = document.querySelector('.popup_confirm'),
      btnConfirm = popupConfirm.querySelector('.popup__submit-button'),
      btnAvatarEdit = document.querySelector('.profile__btn-edit'),
      popupAvatar = document.querySelector('.popup_new-avatar'),
      btnAvatarSubmit = popupAvatar.querySelector('.popup__submit-button'),
      formNewAvatar = popupAvatar.querySelector('form'),
      avaLink = formNewAvatar.querySelector('.popup__input-field'),
      aPopup = document.querySelector('.popup');


const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd',
    'Content-Type': 'application/json'
  }
}

const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-field_type_error',
    errorClass: 'popup__input-error_active'
}



export {
  btnEditProfile,
  btnAddNewPlace,
  popupEditProfile,
  newPlacePopup,
  popupImage,
  cardTemplate,
  cardsContainer,
  formNewPlace,
  formEditProfile,
  inputUserName,
  inputUserBio,
  namePlace,
  linkPlace,
  bigImage,
  popupImgDesc,
  titleProfile,
  descProfile,
  popups,
  avatarProfile,
  popupConfirm,
  btnConfirm,
  btnAvatarEdit,
  popupAvatar,
  btnAvatarSubmit,
  formNewAvatar,
  avaLink,
  config,
  aPopup,
  options
}
