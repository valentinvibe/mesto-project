import './pages/index.css';
import {
    btnEditProfile,
    popupEditProfile,
    btnAddNewPlace,
    newPlacePopup,
    formNewPlace,
    inputUserName,
    inputUserBio,
    titleProfile,
    descProfile,
    avatarProfile,
    popupConfirm,
    btnAvatarEdit,
    popupAvatar,
    formNewAvatar,
    popupImage,
    cardsContainer,
    options
} from "./components/constants.js";
import { cardToDel, Card } from "./components/Card.js";
import { renderLoading } from "./components/utils.js"

/* Классы */

import { Api } from "./components/Api.js";
import { Section } from "./components/Section.js";
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { FormValidator } from './components/FormValidator.js';
import { UserInfo } from './components/UserInfo.js';

/* Экземпляры классов */

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd',
    'Content-Type': 'application/json'
  }
});
const popupWithImage = new PopupWithImage(popupImage);
const formValidators = {}

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(options, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(options);

/* Отрисовка карточек */
let userData;

api.getUserInfo()
  .then(data => {
    return userData = data;
  })
  .catch(err => {
    console.log(err);
  })

function createCard(item) {
  const card = new Card(item, userData, '#card-template', {
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
    },
    confirmDelCard: () => {
      confirmPopupElement.open()
    }
  });

  return card;
}

let cardsList;
const initUser = new UserInfo(titleProfile, descProfile, avatarProfile);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(data => {
    initUser.setUserInfo(data[0]);
    cardsList = new Section({
      cardsData: data[1],
      renderer: (item) => {
        const newCard = createCard(item);
        const cardElement = newCard.generate();
        cardsList.setItem(cardElement);
      }
    }, cardsContainer);
    cardsList.addItems();
  })
  .catch(err => {
    console.log(err);
  })

/* Формы попапов */

const editProfilePopupElement = new PopupWithForm(popupEditProfile, {
  formSubmitHandler: (formData, btnSubmit) => {
    renderLoading(true, btnSubmit);
    api.setUserInfo(formData['user-name'], formData['user-bio'])
      .then(res => {
        initUser.setUserInfo(res);
        editProfilePopupElement.close();
      })
      .finally(() => {
        renderLoading(false, btnSubmit);
      })
    }
})

const newPlacePopupElement = new PopupWithForm(newPlacePopup, {
  formSubmitHandler: (formData, btnSubmit) => {
    renderLoading(true, btnSubmit);
    api.addNewCard(formData)
      .then(res => {
        const newCard = createCard(res);
        const cardElement = newCard.generate();
        cardsList.setNewItem(cardElement);
        formNewPlace.reset();
        newPlacePopupElement.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, btnSubmit, 'Создать');
      })
  }
})

const newAvatarPopupElement = new PopupWithForm(popupAvatar, {
  formSubmitHandler: (formData, btnSubmit) => {
    renderLoading(true, btnSubmit);
    api.setUserAvatar(formData['avatar-link'])
      .then(res => {
        initUser.setUserAvatar(res);
        newAvatarPopupElement.close();
        formNewAvatar.reset();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, btnSubmit);
      })
  }
})

const confirmPopupElement = new PopupWithForm(popupConfirm, {
  formSubmitHandler: (formData, btnSubmit) => {
    api.deleteCard(cardToDel.id)
      .then(res => {
        cardToDel.remove();
        confirmPopupElement.close();
      })
      .catch(err => {
        console.log(err);
      })
    }
})

/* Слушатели */

btnEditProfile.addEventListener('click', () => {
  const newUser = initUser.getUserInfo();
  inputUserName.value = newUser.name;
  inputUserBio.value = newUser.about;
  editProfilePopupElement.open();
  formValidators['userInfo'].resetValidation();
});

btnAddNewPlace.addEventListener('click', () => {
  newPlacePopupElement.open();
  formValidators['newPlace'].resetValidation();
});

btnAvatarEdit.addEventListener('click', () => {
  newAvatarPopupElement.open()
  formValidators['newAvatar'].resetValidation();
});

export { api }
