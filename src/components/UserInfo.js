import { api } from '../index.js';

class UserInfo {
    constructor({nameSelector, bioSelector}) {
        this._nameSelector = nameSelector;
        this._bioSelector = bioSelector;
    }

    async getUserInfo() {
      return await api.getUserInfo()
        .then(res => {
          this.user = res;
          return this.user
        })
        .catch(err => {
          console.log(err)
        })
    }

    setUserInfo(user) {
      api.setUserInfo(user.name, user.about)
        .then(res => {
          this._nameSelector.textContent = res.name;
          this._bioSelector.textContent = res.about;
        })
        .catch(err => {
          console.log(err)
        })
    }
}

export { UserInfo }

