import './pages/index.css';

import enableValidation from "./components/validate.js";
import {initialCards} from "./components/initialCards.js";
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
    btnConfirm
} from "./components/constants.js";
import { createCard, renderCard, cardToDel } from "./components/card.js";
import { openPopup, closePopup } from "./components/utils.js"
import {
  handleProfileFormSubmit,
  handlePlaceFormSubmit,
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
  });

getInitialCards()
  .then(cards => {
    if (cards.length > 0) {
      cards.forEach(card => {
        renderCard(createCard(card.name, card.link, card.likes, card.owner._id, card._id, userData));
      })
    } else {
      let text = document.createElement('p');
      text.textContent = 'Нет карточек для отображения';
      document.querySelector('.cards-container').before(text);
    }
  })

// initialCards.forEach(card => {
//   renderCard(createCard(card.name, card.link));
// });

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

formNewPlace.addEventListener('submit', handlePlaceFormSubmit);


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
  deleteCard(cardToDel[0]);
  closePopup(popupConfirm);
  document.querySelector(`#a${cardToDel[0]}`).remove();
  cardToDel.pop();
})