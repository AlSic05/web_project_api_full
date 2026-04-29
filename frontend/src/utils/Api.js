class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.removeLike(cardId);
    }
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateAvatar(avatarLink) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }
}

export function getAppInfo(api) {
  return Promise.all([api.getUserInfo(), api.getInitialCards()]);
}

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "f259293f-0caf-46de-b937-becf0e8d1736",
    "Content-Type": "application/json",
  },
});

export default api;
