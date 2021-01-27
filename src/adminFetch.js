import { API_URL, API_ID } from "./constants/constants";

export async function getData(urlEnd) {
  if (localStorage.tokenData) {
    const token = JSON.parse(localStorage.getItem("tokenData")).access_token;

    try {
      const response = await fetch(`${API_URL}/${urlEnd}`, {
        method: "GET",
        headers: {
          "X-Api-Factory-Application-Id": API_ID,
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      return resData;
    } catch (error) {
      throw error;
    }
  }
}

export function createEntity(entity, options) {
  if (localStorage.tokenData) {
    const token = JSON.parse(localStorage.getItem("tokenData")).access_token;
    return fetch(`${API_URL}/db/${entity}`, {
      method: "POST",
      headers: {
        "X-Api-Factory-Application-Id": API_ID,
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(options),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

export function deleteEntity(entity, entityId) {
  if (localStorage.tokenData) {
    const token = JSON.parse(localStorage.getItem("tokenData")).access_token;
    return fetch(`${API_URL}/db/${entity}/${entityId}`, {
      method: "DELETE",
      headers: {
        "X-Api-Factory-Application-Id": API_ID,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

export function changeEntity(entity, entityId, options) {
  if (localStorage.tokenData) {
    const token = JSON.parse(localStorage.getItem("tokenData")).access_token;
    return fetch(`${API_URL}/db/${entity}/${entityId}`, {
      method: "PUT",
      headers: {
        "X-Api-Factory-Application-Id": API_ID,
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(options),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
