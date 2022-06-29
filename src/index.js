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
    formNewAvatar,
    config,
    popupImage,
    bigImage,
    popupImgDesc
} from "./components/constants.js";
import { createCard, renderCard, cardToDel, Card } from "./components/card.js";
import { openPopup, closePopup } from "./components/utils.js"
import {
  handleProfileFormSubmit,
  handlePlaceFormSubmit,
  handlerAvatarFormSubmit
} from "./components/modal.js";
import { getInitialCards,
         getUserInfo ,
         deleteCard,
         Api
} from "./components/Api.js";
import { PopupWithImage } from './components/Popup.js';

let userData = [];

const api = new Api(config);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(data => {
    titleProfile.textContent = data[0].name;
    descProfile.textContent = data[0].about;
    avatarProfile.src = data[0].avatar;
    if (data[1].length > 0) {
      data[1].forEach(card => {
        const popup = new PopupWithImage(popupImage, bigImage, popupImgDesc);
        popup.handleCardClick(data[1].link, data[1].name);
        const newCard = new Card(card, data[0], '#card-template', api, popup.handleCardClick());
        const newCardElement = newCard.generate();
        // renderCard(createCard(card, data[0]));
        renderCard(newCardElement);
      })
    } else {
      const text = document.createElement('p');
      text.textContent = 'Нет карточек для отображения';
      document.querySelector('.cards-container').before(text);
    }
    return userData = data[0]
  })
  .catch(err => {
    console.log(err);
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
  deleteCard(cardToDel.id)
    .then(() => {
      cardToDel.remove();
      closePopup(popupConfirm);
    })
    .catch(err => {
      console.log(err);
    })
})

formNewAvatar.addEventListener('submit', handlerAvatarFormSubmit)
