class UserInfo {
    constructor(nameSelector, bioSelector, avatarSelector) {
      this._nameSelector = nameSelector;
      this._bioSelector = bioSelector;
      this._avatarSelector = avatarSelector;
    }

    getUserInfo() {
      return {
        'name' : this._nameSelector.textContent,
        'about' : this._bioSelector.textContent
      }
    }

    setUserInfo(user) {
      this._nameSelector.textContent = user.name;
      this._bioSelector.textContent = user.about;
      this._avatarSelector.src = user.avatar;
    }

    setUserAvatar(user) {
      this._avatarSelector.src = user.avatar;
    }
}

export { UserInfo }

