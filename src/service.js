export default class Service {
  constructor(api) {
    this.api = api;
  }

  ApiCall(obj) {
    return fetch(this.api.url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (!response.ok || response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        throw error;
      });
  }
}
