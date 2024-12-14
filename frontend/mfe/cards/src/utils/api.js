import {getResponse} from '@mesto/shared/utils';

class Api {
    constructor({address, groupId, token}) {
        this._address = address;
        this._groupId = groupId;
        this._token = token;
    }

    addCard({link, name}) {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, link}),
        }).then(getResponse);
    }

    changeLikeCardStatus(cardID, like) {
        return fetch(`${this._address}/${this._groupId}/cards/like/${cardID}`, {
            method: like ? 'PUT' : 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        }).then(getResponse);
    }

    getCardList() {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            headers: {authorization: this._token},
        }).then(getResponse);
    }

    removeCard(cardID) {
        return fetch(`${this._address}/${this._groupId}/cards/${cardID}`, {
            method: 'DELETE',
            headers: {authorization: this._token},
        }).then(getResponse);
    }
}

const api = new Api({
    address: 'https://nomoreparties.co',
    groupId: 'cohort0',
    token: '80a75492-21c5-4330-a02f-308029e94b63',
});

export default api;
