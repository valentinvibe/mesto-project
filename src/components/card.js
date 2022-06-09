import {cardTemplate, cardsContainer, popupConfirm } from "./constants.js";
import { showBigImg } from "./modal.js";
import { openPopup } from "./utils.js";

const cardToDel = [];

function createCard(name, link, likes=[], cardOwnerId = 0, cardId = 0, userInfo = {}) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true),
        cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__description').textContent = name;
  const btnLike = cardElement.querySelector('.card__like-button'),
        btnDel = cardElement.querySelector('.card__remove-button');
  cardElement.querySelector('.card__likes-count').textContent = likes.length;
  
  if ((cardOwnerId === userInfo._id) || cardOwnerId == 0) {
    btnDel.addEventListener('click', () => {
      openPopup(popupConfirm);
      cardToDel.push(cardId);
      cardElement.id = 'a'+cardId;
    });
  } else {
    btnDel.remove();
  }

  btnLike.addEventListener('click', () => {
    btnLike.classList.toggle('card__like-button_active');
  });
  cardImage.addEventListener('click', () => {
    showBigImg(name,link);
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
