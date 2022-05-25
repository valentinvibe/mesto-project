const btnEditProfile = document.querySelector('.profile__edit-button'),
      btnAddNewPlace = document.querySelector('.profile__add-button'),
      popupEditProfile = document.querySelector('.popup_profile'),
      btnCloseEditProfile = popupEditProfile.querySelector('.popup__close-button'),
      newPlacePopup = document.querySelector('.popup_new-place'),
      newPlacePopupCloseBtn = newPlacePopup.querySelector('.popup__close-button'),
      popupImage = document.querySelector('.popup_big-image'),
      popupImageCloseBtn = popupImage.querySelector('.popup__close-button'),
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
      popups = document.querySelectorAll('.popup');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(card => {
  renderCard(createCard(card.name, card.link));
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

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


// editProfileInfo
function updateUsefInfo(name,bio) {
  titleProfile.textContent = name;
  descProfile.textContent = bio;
};

function formSubmitHandlerProfile(e) {
  e.preventDefault();
  updateUsefInfo(inputUserName.value, inputUserBio.value);
  formEditProfile.reset();
  closePopup(popupEditProfile);
};

formEditProfile.addEventListener('submit', formSubmitHandlerProfile);



// createNewCard
function createCard(name,link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__description').textContent = name;
  const btnLike = cardElement.querySelector('.card__like-button'),
        btnDel = cardElement.querySelector('.card__remove-button');

  btnDel.addEventListener('click', () => {
    btnDel.closest('.card').remove();
  });
  btnLike.addEventListener('click', () => {
    btnLike.classList.toggle('card__like-button_active');
  });
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    showBigImg(name,link);
  });

   return cardElement;
};

function renderCard(card) {
  cardsContainer.prepend(card);
};

// NewPlace
function formSubmitHandlerPlace(e) {
  e.preventDefault();
  renderCard(createCard(namePlace.value, linkPlace.value));
  closePopup(newPlacePopup);
  formNewPlace.reset();
};

formNewPlace.addEventListener('submit', formSubmitHandlerPlace);


// OpenPopupBigImg
function showBigImg(name,link) {
  bigImage.src = link;
  bigImage.alt = name;
  popupImgDesc.textContent = name;
  openPopup(popupImage);
};

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

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.add('popup__input-field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input-field_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));
  const buttonElement = formElement.querySelector('.popup__submit-button');
  console.log(buttonElement);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_inactive');
    buttonElement.setAttribute('disabled','');
  } else {
    buttonElement.classList.remove('popup__submit-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    setEventListeners(formElement);
  });
}

enableValidation();
