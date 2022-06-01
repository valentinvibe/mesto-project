import enableValidation from "./components/validate.js";
import {initialCards} from "./components/initialCards.js";
import {
    btnEditProfile,
    popupEditProfile,
    btnCloseEditProfile,
    btnAddNewPlace,
    newPlacePopup,
    newPlacePopupCloseBtn,
    popupImage,
    popupImageCloseBtn,
    formNewPlace,
    formEditProfile,
    inputUserName,
    inputUserBio,
    popups
} from "./components/constants.js";
import { createCard, renderCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js"
import {
  formSubmitHandlerProfile,
  formSubmitHandlerPlace
} from "./components/utils.js";



initialCards.forEach(card => {
  renderCard(createCard(card.name, card.link));
});

/* Set eventListeners */

btnEditProfile.addEventListener('click', () => {
  inputUserName.value = document.querySelector('.profile__title').textContent;
  inputUserBio.value = document.querySelector('.profile__description').textContent;
  openPopup(popupEditProfile);
});

btnCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

btnAddNewPlace.addEventListener('click', () => {
  openPopup(newPlacePopup);
});

newPlacePopupCloseBtn.addEventListener('click', (e) => {
  closePopup(newPlacePopup);
  const form = e.target.closest('.popup').querySelector('.popup__form');
  form.reset();
});

popupImageCloseBtn.addEventListener('click', () => {
  closePopup(popupImage);
});

formEditProfile.addEventListener('submit', formSubmitHandlerProfile);

formNewPlace.addEventListener('submit', formSubmitHandlerPlace);


/* Close Popups ESC & click overlay*/
popups.forEach(popup => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const target = document.querySelector('.popup_opened');
    closePopup(target);
  }
})

/* Validation Forms */

enableValidation(
  {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-field_type_error',
    errorClass: 'popup__input-error_active'
  }
);
