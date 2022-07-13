function renderLoading(isLoading, btnSubmit, buttonText='Сохранить') {
  if (isLoading) {
    btnSubmit.textContent = 'Сохранение...'
  } else {
    btnSubmit.textContent = buttonText;
  }
}

export {
  renderLoading
}


