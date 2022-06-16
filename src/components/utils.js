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

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
}

function setActiveLike(likesArr, userId, likeSelector) {
  likesArr.forEach(element => {
    if (element._id === userId) {
      likeSelector.classList.add('card__like-button_active')
      return;
    }
  });
}

function renderLoading(isLoading, popupSelector) {
  const btnSubmit = popupSelector.querySelector('.popup__submit-button');
  if (isLoading) {
    btnSubmit.textContent = 'Сохранение...'
  } else if (btnSubmit.closest('.popup_new-place')) {
    btnSubmit.textContent = 'Создать'
  } else {
    btnSubmit.textContent = 'Сохранить'
  }

}

function setInactiveFormBtn(popup) {
  const btnSubmit = popup.querySelector('.popup__submit-button');
  btnSubmit.classList.add('popup__submit-button_inactive');
  btnSubmit.setAttribute('disabled','');
}


export {
  openPopup,
  closePopup,
  setActiveLike,
  renderLoading,
  setInactiveFormBtn,
  checkResponse
}


