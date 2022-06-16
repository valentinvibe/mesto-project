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

function setActiveLike(likesArr, userId, likeBtn) {
  likesArr.forEach(element => {
    if (element._id === userId) {
      likeBtn.classList.add('card__like-button_active')
      return;
    }
  });
}

function renderLoading(isLoading, btnSubmit, buttonText='Сохранить') {
  if (isLoading) {
    btnSubmit.textContent = 'Сохранение...'
  } else {
    btnSubmit.textContent = buttonText;
  }

}

function setInactiveFormBtn(btnSubmit) {
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


