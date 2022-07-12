let cardToDel = '';

class Card {
  constructor({link, name, _id, likes, owner}, userInfo, templateSelector, handler) {
    this._link = link;
    this._name = name;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._userInfo = userInfo;
    this._templateSelector = templateSelector;
    this._handler = handler;
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

  _setActiveLike(likesArr, userId, likeBtn) {
    likesArr.forEach(element => {
      if (element._id === userId) {
        likeBtn.classList.add('card__like-button_active');
        return;
      }
    });
  }

  _setEventListeners() {
    this._btnLike = this._element.querySelector('.card__like-button');
    this._likeCount = this._element.querySelector('.card__likes-count');
    this._btnDel = this._element.querySelector('.card__remove-button');

    if (this._owner._id === this._userInfo._id) {
      this._btnDel.addEventListener('click', (evt) => {
        this._handler.confirmDelCard();
        cardToDel = this._element;
      })
    } else {
      this._btnDel.remove();
    }

    this._likeCount.textContent = this._likes.length;
    this._setActiveLike(this._likes, this._userInfo._id, this._btnLike);

    this._btnLike.addEventListener('click', () => {
      if (this._btnLike.classList.contains('card__like-button_active')) {
        this._handler.delLikeHandler(this._id, this._likeCount, this._btnLike);
      } else {
        this._handler.setLikeHandler(this._id, this._likeCount, this._btnLike);
      }
    });

    this._cardImage.addEventListener('click', () => {
      this._handler.handleCardClick();
    });
  }
}

export {
  cardToDel,
  Card
}
