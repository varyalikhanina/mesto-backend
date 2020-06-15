export default class Api {
    constructor(url, token) {
        this.url = url;
        this.token = token;
    }
    getData() {
        return fetch(`${this.url}`, {
            headers: {
                authorization: `${this.token}`
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    patchData(name, about) {
        this.name = name;
        this.about = about;
        return fetch(`${this.url}`, {
            method: 'PATCH',
            headers: {
              authorization: `${this.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.name,
                about: this.about
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}