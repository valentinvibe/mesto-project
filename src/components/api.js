function getInitialCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-11/cards', {
    headers: {
      authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
    })
    .then((result) => {
      console.log(result);
      return result
    });
}

function getUserInfo() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me', {
    headers: {
      authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
  })
  .then((result) => {
    return result
  });
}


  export {
    getInitialCards,
    getUserInfo
  }
