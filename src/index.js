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
    popupImgDesc,
    card,
    cardsContainer,
    aPopup
} from "./components/constants.js";
import { renderCard, cardToDel, Card } from "./components/card.js";
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
import { Section } from "./components/Section.js";
import { Popup, PopupWithImage } from './components/Popup.js';

let userData = [];

const api = new Api(config);
const popupWithImage = new PopupWithImage(popupImage);


// const popup = new PopupWithImage(popupImage);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(data => {
    titleProfile.textContent = data[0].name;
    descProfile.textContent = data[0].about;
    avatarProfile.src = data[0].avatar;

    const cardsList = new Section({
      cardsData: data[1],
      renderer: (item) => {
          const card = new Card(item, data[0], '#card-template', api, {
            handleCardClick: () => {
              popupWithImage.open(item)
            }
          });
          const cardElement = card.generate();
          cardsList.setItem(cardElement);
      }
    }, cardsContainer);
    cardsList.addItem();

    return userData = data[0]
  })
  .catch(err => {
    console.log(err);
  })

function setLikeHandler(cardId, counterElement, buttonElement) {
  api.setLike(cardId)
    .then((data) => {
      counterElement.textContent = data.likes.length;
      buttonElement.classList.add('card__like-button_active');
    })
    .catch(err => {
      console.log(err);
    })
}

function delLikeHandler(cardId, counterElement, buttonElement) {
  api.delLike(cardId)
    .then((data) => {
      counterElement.textContent = data.likes.length;
      buttonElement.classList.remove('card__like-button_active');
    })
    .catch(err => {
      console.log(err);
    })
}

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
  const popupElement = new Popup(popup);
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {

      popupElement.close();
      // closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      popupElement.close();
      // closePopup(popup);
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

formNewAvatar.addEventListener('submit', handlerAvatarFormSubmit);

export { setLikeHandler, delLikeHandler }
