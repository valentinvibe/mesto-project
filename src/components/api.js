// import { renderCard, createCard } from "./card.js";
// import {
//   avatarProfile,
//   popupEditProfile,
//   popupAvatar,
//   newPlacePopup
// } from "./constants.js";
import {
  renderLoading,
  closePopup,
  setInactiveFormBtn,
  checkResponse
} from "./utils.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: 'ae0b9021-b91d-4516-99a3-d1f2660c87bd',
    'Content-Type': 'application/json'
  }
}

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl,
    this._headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
  }

  /* Получаем список всех карточек с сервера */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  /* Получаем информацию о пользователе */
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  /* Обновляем на сервере информацию о пользователе */
  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => this._checkResponse(res))
  }

  /* Добавляем новую карточку на сервер */
  addNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(res => this._checkResponse(res))
  }

  /* Удаление карточки */
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'POST',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  /* Установка и удаление лайка карточки */
  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  delLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  /* Обновление аватара пользователя */
  setUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this._checkResponse(res))
  }
}










/* Получаем список всех карточек с сервера */
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

/* Получаем информацию о пользователе */
function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

/* Обновляем на сервере информацию о пользователе */
function setUserInfo(name,about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => checkResponse(res))
}

/* Добавляем новую карточку на сервер */
function addNewCard(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(res => checkResponse(res))
}

/* Удаление карточки */
function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res =>checkResponse(res))
}

/* Установка и удаление лайка карточки */

function setLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

function delLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkResponse(res))

}

/* Обновление аватара пользователя */
function setUserAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => checkResponse(res))
}


  export {
    getInitialCards,
    getUserInfo,
    setUserInfo,
    addNewCard,
    deleteCard,
    setLike,
    delLike,
    setUserAvatar,
    Api
  }
