import {getResponse} from '@mesto/shared/utils';

class Api {
    constructor({address, groupId, token}) {
        this._token = token;
        this._groupId = groupId;
        this._address = address;
    }

    getUserInfo() {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            headers: {authorization: this._token},
        }).then(getResponse);
    }

    setUserAvatar({avatar}) {
        return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({avatar}),
        }).then(getResponse);
    }

    setUserInfo({about, name}) {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, about}),
        }).then(getResponse);
    }
}

const api = new Api({
    address: 'https://nomoreparties.co',
    groupId: 'cohort0',
    token: '80a75492-21c5-4330-a02f-308029e94b63',
});

export default api;
