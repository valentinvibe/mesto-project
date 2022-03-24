const editProfileBtn = document.querySelector('.profile__edit-button'),
      addNewPlaceBtn = document.querySelector('.profile__add-button'),
      editProfilePopup = document.querySelector('.popup_profile'),
      editProfileCloseBtn = editProfilePopup.querySelector('.popup__close-button'),
      newPlacePopup = document.querySelector('.popup_new-place'),
      newPlacePopupCloseBtn = newPlacePopup.querySelector('.popup__close-button'),
      likeBtns = document.querySelectorAll('.card__like-button'),
      popupImage = document.querySelector('.popup_big-image'),
      popupImageCloseBtn = popupImage.querySelector('.popup__close-button'),
      cardRemoveBtn = document.querySelectorAll('.card__remove-button'),
      cardTemplate = document.querySelector('#card-template').content,
      cardsContainer = document.querySelector('.cards-container'),
      formNewPlace = newPlacePopup.querySelector('.popup__form'),
      formEditProfile = editProfilePopup.querySelector('.popup__form'),
      inputUserName = formEditProfile.querySelector('input[name="user-name"]'),
      inputUserBio = formEditProfile.querySelector('input[name="user-bio"]'),
      namePlace = formNewPlace.querySelector('input[name="place-name"]'),
      linkPlace = formNewPlace.querySelector('input[name="place-link"]'),
      bigImage = document.querySelector('.popup__big-img'),
      popupImgDesc = document.querySelector('.popup__img-description'),
      cardsImages = document.querySelectorAll('.card__image');

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
  createCard(card.name, card.link);
})

editProfileBtn.addEventListener('click', () => {
  editProfilePopup.classList.add('popup_opened');
  inputUserName.value = document.querySelector('.profile__title').textContent;
  inputUserBio.value = document.querySelector('.profile__description').textContent;
});

editProfileCloseBtn.addEventListener('click', () => {
  editProfilePopup.classList.remove('popup_opened');
});

addNewPlaceBtn.addEventListener('click', () => {
  newPlacePopup.classList.add('popup_opened');
});

newPlacePopupCloseBtn.addEventListener('click', () => {
  newPlacePopup.classList.remove('popup_opened');
})

likeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('card__like-button_active');
  })
})

popupImageCloseBtn.addEventListener('click', () => {
  popupImage.classList.remove('popup_opened');
})

cardRemoveBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const cardsItem = btn.closest('.card');
    cardsItem.remove();
  })
});

cardsImages.forEach(cardImg => {
  cardImg.addEventListener('click', ()=> {
    const cardDesc = cardImg.parentElement.querySelector('.card__description').textContent;
    showBigImg(cardDesc ,cardImg.src);
  });
});


// editProfileInfo
function updateUsefInfo(name,bio) {
  document.querySelector('.profile__title').textContent = name;
  document.querySelector('.profile__description').textContent = bio;
}

function formSubmitHandlerProfile(e) {
  e.preventDefault();
  updateUsefInfo(inputUserName.value, inputUserBio.value);
  formEditProfile.reset();
  editProfilePopup.classList.remove('popup_opened');
};

formEditProfile.addEventListener('submit', formSubmitHandlerProfile);



// createNewCard
function createCard(name,link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__description').textContent = name;
  cardElement.querySelector('.card__remove-button').addEventListener('click', (e) => {
    e.target.closest('.card').remove();
  });
  cardElement.querySelector('.card__like-button').addEventListener('click', (e) => {
    e.target.classList.toggle('card__like-button_active');
  });
  cardElement.querySelector('.card__image').addEventListener('click', (e) => {
    showBigImg(name,link);
  })
  renderCard(cardElement);
};

function renderCard(card) {
  cardsContainer.prepend(card);
};

// NewPlace
function formSubmitHandlerPlace(e) {
  e.preventDefault();
  createCard(namePlace.value, linkPlace.value);
  formNewPlace.reset();
  newPlacePopup.classList.remove('popup_opened');
}

formNewPlace.addEventListener('submit', formSubmitHandlerPlace);


// OpenPopupBigImg
function showBigImg(name,link) {
  popupImage.classList.add('popup_opened');
  bigImage.src = link;
  bigImage.alt = name;
  popupImgDesc.textContent = name;
}
