import './pages/index.css';
import {
    btnEditProfile,
    popupEditProfile,
    btnAddNewPlace,
    newPlacePopup,
    formNewPlace,
    formEditProfile,
    inputUserName,
    inputUserBio,
    titleProfile,
    descProfile,
    avatarProfile,
    popupConfirm,
    btnAvatarEdit,
    popupAvatar,
    formNewAvatar,
    config,
    popupImage,
    cardsContainer,
    options
} from "./components/constants.js";
import { cardToDel, Card } from "./components/Card.js";
import { renderLoading, setInactiveFormBtn } from "./components/utils.js"

/* Классы */

import {  Api } from "./components/Api.js";
import { Section } from "./components/Section.js";
import { Popup, PopupWithImage, PopupWithForm } from './components/Popup.js';
import { FormValidator } from './components/FormValidator.js';
import { UserInfo } from './components/UserInfo.js';

/* Экземпляры классов */

const api = new Api(config);
const popupWithImage = new PopupWithImage(popupImage);
const avatarPopupElement = new Popup(popupAvatar);
const validatePopups = [formEditProfile, formNewPlace, formNewAvatar];

function validateForms(validatedForms) {
  validatedForms.forEach(form => {
    const initFormValidate = new FormValidator(options, form);
    initFormValidate.enableValidation();
  })
}

/* Отрисовка карточек */

let cardsList;
let userData;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(data => {
    titleProfile.textContent = data[0].name;
    descProfile.textContent = data[0].about;
    avatarProfile.src = data[0].avatar;
    userData = new UserInfo(data[0].name, data[0].about);

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
            },
            confirmDelCard: () => {
              confirmPopupElement.open()
            }
          });
          const cardElement = card.generate();
          cardsList.setItem(cardElement);
      }
    }, cardsContainer);
    cardsList.addItems();

    return userData = data[0]
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
          titleProfile.textContent = res.name;
          descProfile.textContent = res.about;
          editProfilePopupElement.close();
          setInactiveFormBtn(btnSubmit);
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
        cardsList.addItem(res);
        setInactiveFormBtn(btnSubmit);
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
        avatarProfile.src = res.avatar;
        newAvatarPopupElement.close();
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
  inputUserName.value = titleProfile.textContent;
  inputUserBio.value = descProfile.textContent;
  editProfilePopupElement.open();
});

btnAddNewPlace.addEventListener('click', () => {
  newPlacePopupElement.open();
});

btnAvatarEdit.addEventListener('click', () => {
  avatarPopupElement.open()
});

/* Валидация */

validateForms(validatePopups);

export { api }
