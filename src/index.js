import './pages/index.css';

import enableValidation from "./components/validate.js";
import {
    btnEditProfile,
    popupEditProfile,
    btnAddNewPlace,
    newPlacePopup,
    formNewPlace,
    formEditProfile,
    inputUserName,
    inputUserBio,
    popups,
    titleProfile,
    descProfile,
    avatarProfile,
    popupConfirm,
    btnConfirm,
    btnAvatarEdit,
    popupAvatar,
    formNewAvatar
} from "./components/constants.js";
import { createCard, renderCard, cardToDel } from "./components/card.js";
import { openPopup, closePopup } from "./components/utils.js"
import {
  handleProfileFormSubmit,
  handlePlaceFormSubmit,
  handlerAvatarFormSubmit
} from "./components/modal.js";
import { getInitialCards,
         getUserInfo ,
         deleteCard
} from "./components/api.js";

let userData = {}; //Сохраним информацию о пользователе в объекте

getUserInfo()
  .then(data => {
    titleProfile.textContent = data.name;
    descProfile.textContent = data.about;
    avatarProfile.src = data.avatar;
    return userData = data
  })
  .catch(err => {
    throw new Error(`${err.status} ${err.statusText}`)
  })


getInitialCards()
  .then(cards => {
    if (cards.length > 0) {
      cards.forEach(card => {
        renderCard(createCard(card, userData));
      })
    } else {
      let text = document.createElement('p');
      text.textContent = 'Нет карточек для отображения';
      document.querySelector('.cards-container').before(text);
    }
  })
  .catch(err => {
    throw new Error(`${err.status} ${err.statusText}`)
  })


/* Set eventListeners */

btnEditProfile.addEventListener('click', () => {
  inputUserName.value = titleProfile.textContent;
  inputUserBio.value = descProfile.textContent;
  openPopup(popupEditProfile);
});

btnAddNewPlace.addEventListener('click', () => {
  openPopup(newPlacePopup);
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

formNewPlace.addEventListener('submit', (e) => {
  e.preventDefault();
  handlePlaceFormSubmit(userData);
})

btnAvatarEdit.addEventListener('click', () => {
  openPopup(popupAvatar);
})

/* Close Popups & click overlay*/

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    })
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

btnConfirm.addEventListener('click', () => {
  deleteCard(cardToDel)
    .catch(err => {
      throw new Error(`${err.status} ${err.statusText}`)
    })
  closePopup(popupConfirm);
  const selectCard = document.querySelector(`#delete`);
  selectCard.remove();
})

formNewAvatar.addEventListener('submit', handlerAvatarFormSubmit)
