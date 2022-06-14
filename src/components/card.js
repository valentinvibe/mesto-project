import {cardTemplate, cardsContainer, popupConfirm } from "./constants.js";
import { showBigImg } from "./modal.js";
import { openPopup, setActiveLike } from "./utils.js";
import { setLike, delLike } from "./api.js";

let cardToDel = '';

function createCard(card, userInfo) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true),
        cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__description').textContent = card.name;
  const btnLike = cardElement.querySelector('.card__like-button'),
        likeCount = cardElement.querySelector('.card__likes-count'),
        btnDel = cardElement.querySelector('.card__remove-button');

  if (card.owner._id === userInfo._id) {
    btnDel.addEventListener('click', () => {
      openPopup(popupConfirm);
      cardToDel = card._id;
      cardElement.id = `delete`;
    });
  } else {
    btnDel.remove();
  }

  cardElement.querySelector('.card__likes-count').textContent = card.likes.length;
  setActiveLike(card.likes, userInfo._id, btnLike);

  btnLike.addEventListener('click', () => {
    btnLike.classList.toggle('card__like-button_active');

    if (btnLike.classList.contains('card__like-button_active')) {
      setLike(card._id, likeCount)
    } else {
      delLike(card._id, likeCount)
    }
  });


  cardImage.addEventListener('click', () => {
    showBigImg(card.name,card.link);
  });

   return cardElement;
};


function renderCard(card) {
  cardsContainer.prepend(card);
};

export {
  createCard,
  renderCard,
  cardToDel
}
