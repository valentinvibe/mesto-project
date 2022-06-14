import { renderCard, createCard } from "./card.js";
import {
  avatarProfile,
  popupEditProfile,
  popupAvatar,
  newPlacePopup
} from "./constants.js";
import {
  renderLoading,
  closePopup,
  setInactiveFormBtn
} from "./utils.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd',
    'Content-Type': 'application/json'
  }
}


/* Получаем список всех карточек с сервера */
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
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
/* Получаем информацию о пользователе */
function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
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
  fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
  })
  .then(res => {
    renderLoading(true);
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
  })
  .catch(err => {
    throw new Error(`${err.status} ${err.statusText}`)
  })
  .finally(() => {
    renderLoading(false);
  })
  .finally(() => {
    closePopup(popupEditProfile)
  })
  .finally(() => {
    setInactiveFormBtn(popupEditProfile)
  })
}

/* Добавляем новую карточку на сервер */
function addNewCard(card, user) {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(res => {
    if (res.ok) {
      renderLoading(true);
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
  })
  .then(result => {
    renderCard(createCard(result,user))
  })
  .catch(err => {
    throw new Error(`${err.status} ${err.statusText}`)
  })
  .finally(() => {
    renderLoading(false);
  })
  .finally(() => {
    closePopup(newPlacePopup)
  })
  .finally(() => {
    setInactiveFormBtn(newPlacePopup)
  })
}

/* Удаление карточки */
function deleteCard(id) {
  fetch(`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
  })
  .catch(err => {
    throw new Error(`${err.status} ${err.statusText}`)
  })
}


  /* Установка и удаление лайка карточки */

function setLike(cardId,likeCount) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
  })
  .then(data => {
    likeCount.textContent = data.likes.length
  })
  .catch(err => {
    throw new Error(`${err.status} ${err.statusText}`)
  })
}

function delLike(cardId,likeCount) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
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

/* Обновление аватара пользователя */
function setUserAvatar(link) {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => {
    if (res.ok) {
      renderLoading(true);
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`)
  })
  .then(result => {
    avatarProfile.src = result.avatar;
  })
  .catch(err => {
    throw new Error(`${err.status} ${err.statusText}`)
  })
  .finally(() => {
    renderLoading(false);
  })
  .finally(() => {
    closePopup(popupAvatar)
  })
  .finally(() => {
    setInactiveFormBtn(popupAvatar)
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
