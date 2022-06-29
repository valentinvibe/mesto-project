import { cardTemplate, cardsContainer, popupConfirm } from "./constants.js";
import { showBigImg } from "./modal.js";
import { openPopup, setActiveLike } from "./utils.js";
import { Api, setLike, delLike } from "./Api.js";

let cardToDel = '';

class Card {
  constructor({link, name, _id, likes, owner}, userInfo, templateSelector, api, handleCardClick) {
    this._link = link;
    this._name = name;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._userInfo = userInfo;
    this._templateSelector = templateSelector;
    this._api = api;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generate() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.id = this._id;
    this._element.querySelector('.card__description').textContent = this._name;
    this._setEventListeners();

    return this._element
  }

  _setEventListeners() {
    this._btnLike = this._element.querySelector('.card__like-button');
    this._likeCount = this._element.querySelector('.card__likes-count');
    this._btnDel = this._element.querySelector('.card__remove-button');

    if (this._owner._id === this._userInfo._id) {
      this._btnDel.addEventListener('click', () => {
        openPopup(popupConfirm);
        cardToDel = this._element;
      })
    } else {
      this._btnDel.remove();
    }

    this._likeCount.textContent = this._likes.length;
    setActiveLike(this._likes, this._userInfo._id, this._btnLike);

    this._btnLike.addEventListener('click', () => {
      if (this._btnLike.classList.contains('card__like-button_active')) {
        this._api.delLike(this._id)
          .then((data) => {
            this._likeCount.textContent = data.likes.length;
            this._btnLike.classList.toggle('card__like-button_active');
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        this._api.setLike(this._id)
          .then(data => {
            this._likeCount.textContent = data.likes.length;
            this._btnLike.classList.toggle('card__like-button_active');
          })
          .catch(err => {
            console.log(err);
          })
      }
    });

    this._cardImage.addEventListener('click', () => {
      showBigImg(this._name,this._link);
    });
  }

}

function createCard(card, userInfo) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true),
        cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__description').textContent = card.name;
  cardElement.id = card._id;
  const btnLike = cardElement.querySelector('.card__like-button'),
        likeCount = cardElement.querySelector('.card__likes-count'),
        btnDel = cardElement.querySelector('.card__remove-button');

  if (card.owner._id === userInfo._id) {
    btnDel.addEventListener('click', () => {
      openPopup(popupConfirm);
      cardToDel = cardElement;
    });
  } else {
    btnDel.remove();
  }

  likeCount.textContent = card.likes.length;
  setActiveLike(card.likes, userInfo._id, btnLike);

  btnLike.addEventListener('click', () => {
    if (btnLike.classList.contains('card__like-button_active')) {
      delLike(card._id)
        .then((data) => {
          likeCount.textContent = data.likes.length;
          btnLike.classList.toggle('card__like-button_active');
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      setLike(card._id)
        .then(data => {
          likeCount.textContent = data.likes.length;
          btnLike.classList.toggle('card__like-button_active');
        })
        .catch(err => {
          console.log(err);
        })
    }
  });


  cardImage.addEventListener('click', () => {
    showBigImg(card.name,card.link);
  });

   return cardElement;
};

function renderCard(card) {
  cardsContainer.append(card);
};

export {
  createCard,
  renderCard,
  cardToDel,
  Card
}
