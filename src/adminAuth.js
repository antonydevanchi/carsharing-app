import { API_URL, API_ID, SECRET, SYMBOLS_STRING } from "./constants/constants";

function createRandomHash(num) {
  let randomHash = "";
  for (let i = 0; i < num; i++) {
    var index = Math.floor(Math.random() * SYMBOLS_STRING.length);
    randomHash += SYMBOLS_STRING[index];
  }
  return randomHash;
}

function b64EncodeUnicode(str, secret) {
  return btoa(
    encodeURIComponent(str + secret).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode("0x" + p1);
      }
    )
  );
}

function saveToken(token) {
  const controlDate = Date.now() + token.expires_in * 1000;
  localStorage.setItem("tokenData", JSON.stringify(token));
  localStorage.setItem("controlDate", controlDate);
}

export const authorize = (username, password) => {
  const randomHashString = b64EncodeUnicode(createRandomHash(7), SECRET);

  return fetch(`${API_URL}/auth/login/oauth`, {
    method: "POST",
    headers: {
      "X-Api-Factory-Application-Id": API_ID,
      Authorization: `Basic ${randomHashString}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.access_token) {
        saveToken(data);
        localStorage.setItem("refreshKey", randomHashString);
        return data;
      }
    })
    .catch((err) => console.log(err));
};

export const getContent = (token) => {
  return fetch(`${API_URL}/auth/check`, {
    method: "GET",
    headers: {
      "X-Api-Factory-Application-Id": API_ID,
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};

export function refreshToken(token, key) {
  return fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "X-Api-Factory-Application-Id": API_ID,
      Authorization: `Basic ${key}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        saveToken(data);
        return data;
      }
    })
    .catch((err) => console.log(err));
}
