// import { renderCard, createCard } from "./card.js";

/* Получаем список всех карточек с сервера */
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
      console.log(result) // ---------------------------------------------------TEST----------------------
      return result
    })
    .catch(err => {
      throw new Error(`${err.status} ${err.statusText}`)
    })
}
/* Получаем информацию о пользователе */
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
  })
  .catch(err => {
    throw new Error(`${err.status} ${err.statusText}`)
  })
}

/* Обновляем на сервере информацию о пользователе */
function setUserInfo(name,about) {
  fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    about: about
  })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
  })
}

/* Добавляем новую карточку на сервер */
function addNewCard(name, link) {
  fetch('https://nomoreparties.co/v1/plus-cohort-11/cards', {
    method: 'POST',
    headers: {
      authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
  })
}

/* Удаление карточки */
function deleteCard(id) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/${id}`, {
  method: 'DELETE',
  headers: {
    authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd',
    'Content-Type': 'application/json'
  }
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
  })
}


  /* Установка и удаление лайка карточки */

function setLike(cardId,likeCount) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
  })
  .then(data => {
    likeCount.textContent = data.likes.length
  })
  .catch(err => {
    throw new Error(`${err.status} ${err.statusText}`)
  })
}

function delLike(cardId,likeCount) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
  })
  .then((data) => {
    likeCount.textContent = data.likes.length
  })
  .catch(err => {
    throw new Error(`${err.status} ${err.statusText}`)
  })
}

function setUserAvatar(link) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-11/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
  })
}


  export {
    getInitialCards,
    getUserInfo,
    setUserInfo,
    addNewCard,
    deleteCard,
    setLike,
    delLike,
    setUserAvatar
  }
