function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function setActiveLike(likesArr, userId, likeSelector) {
  likesArr.forEach(element => {
    if (element._id === userId) {
      likeSelector.classList.add('card__like-button_active')
      return;
    }
  });
}



export {
  openPopup,
  closePopup,
  setActiveLike
}


