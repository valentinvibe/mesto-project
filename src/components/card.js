import {cardTemplate, cardsContainer} from "./constants.js";
import { showBigImg } from "./modal.js"

function createCard(name,link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__description').textContent = name;
  const btnLike = cardElement.querySelector('.card__like-button'),
        btnDel = cardElement.querySelector('.card__remove-button');

  btnDel.addEventListener('click', () => {
    btnDel.closest('.card').remove();
  });
  btnLike.addEventListener('click', () => {
    btnLike.classList.toggle('card__like-button_active');
  });
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    showBigImg(name,link);
  });

   return cardElement;
};

function renderCard(card) {
  cardsContainer.prepend(card);
};

export {
  createCard,
  renderCard
}
