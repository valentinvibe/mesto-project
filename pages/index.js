const editProfileBtn = document.querySelector('.profile__edit-button'),
      addNewPlaceBtn = document.querySelector('.profile__add-button'),
      editProfilePopup = document.querySelector('.popup_profile'),
      editProfileCloseBtn = editProfilePopup.querySelector('.popup__close-button'),
      newPlacePopup = document.querySelector('.popup_new-place'),
      newPlacePopupCloseBtn = newPlacePopup.querySelector('.popup__close-button'),
      likeBtns = document.querySelectorAll('.card__like-button'),
      popupImage = document.querySelector('.popup_big-image');
      popupImageCloseBtn = popupImage.querySelector('.popup__close-button');

editProfileBtn.addEventListener('click', () => {
  editProfilePopup.classList.add('popup_opened');
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
