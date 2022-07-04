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
    aPopup,
    namePlace,
    linkPlace,
    options
} from "./components/constants.js";
import { renderCard, cardToDel, Card } from "./components/card.js";
import { openPopup, closePopup, renderLoading, setInactiveFormBtn } from "./components/utils.js"
import {
  handleProfileFormSubmit,
  handlerAvatarFormSubmit
} from "./components/modal.js";
import { getInitialCards,
         getUserInfo ,
         deleteCard,
         Api
} from "./components/Api.js";
import { Section } from "./components/Section.js";
import { Popup, PopupWithImage, PopupWithForm } from './components/Popup.js';
import { FormValidator } from './components/FormValidator.js';

let userData = [];
let cardsList;

const api = new Api(config);
const popupWithImage = new PopupWithImage(popupImage);


const validatePopups = [popupEditProfile, newPlacePopup, popupAvatar];

function validateForms(validatedForms) {
  validatedForms.forEach(form => {
    const initFormValidate = new FormValidator(options, form);
    initFormValidate.enableValidation();
  })
}

// const popup = new PopupWithImage(popupImage);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(data => {
    titleProfile.textContent = data[0].name;
    descProfile.textContent = data[0].about;
    avatarProfile.src = data[0].avatar;

    cardsList = new Section({
      cardsData: data[1],
      renderer: (item) => {
          const card = new Card(item, data[0], '#card-template', {
            handleCardClick: () => {
              popupWithImage.open(item)
            },
            setLikeHandler: (cardId, counterElement, buttonElement) => {
              api.setLike(cardId)
                .then((data) => {
                  counterElement.textContent = data.likes.length;
                  buttonElement.classList.add('card__like-button_active');
                })
                .catch(err => {
                  console.log(err);
                })
            },
            delLikeHandler: (cardId, counterElement, buttonElement) => {
              api.delLike(cardId)
                .then((data) => {
                  counterElement.textContent = data.likes.length;
                  buttonElement.classList.remove('card__like-button_active');
                })
                .catch(err => {
                  console.log(err);
                })
            },
            delCardHandler: (cardId) => {
              api.deleteCard(cardId)
                .then((data) => {
                  const cardToDel = evt.target.closest('.card');
                  cardToDel.remove();
                })
                .catch(err => {
                  console.log(err);
                })
            }
          });
          const cardElement = card.generate();
          cardsList.setItem(cardElement);
      }
    }, cardsContainer);
    cardsList.addItem();

    return userData = data[0]
  })
  .then(res => {
    const popupWithFormProfile = new PopupWithForm(popupEditProfile, {
      formSubmitHandler: (name, about) => {
        api.setUserInfo(name,about)
          .then(res => {
            titleProfile.textContent = res.name;
            descProfile.textContent = res.about;
          })
          .catch(err => {
            console.log(err);
          })
      }
    })
  })
  .catch(err => {
    console.log(err);
  })



function handlePlaceFormSubmit(user) {
  const card = {
    name: namePlace.value,
    link: linkPlace.value
  }
  const btnSubmit = newPlacePopup.querySelector('.popup__submit-button');
  renderLoading(true, btnSubmit);
  api.addNewCard(card, user)
    .then(result => {
      cardsList.addItem();
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

/* Set eventListeners */

btnEditProfile.addEventListener('click', () => {
  inputUserName.value = titleProfile.textContent;
  inputUserBio.value = descProfile.textContent;
  //openPopup(popupEditProfile);
  popupWithFormProfile.open();
});

btnAddNewPlace.addEventListener('click', () => {
  //openPopup(newPlacePopup);
});

// formEditProfile.addEventListener('submit', handleProfileFormSubmit);

formNewPlace.addEventListener('submit', (e) => {
  e.preventDefault();
  handlePlaceFormSubmit(userData);
})

btnAvatarEdit.addEventListener('click', () => {
  //openPopup(popupAvatar);
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

/* Validation */

validateForms(validatePopups);

/* --------------- */

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
