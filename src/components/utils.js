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
  setActiveLike,
  renderLoading,
  setInactiveFormBtn
}


