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

export async function getSelectOptions(url) {
  if (localStorage.tokenData) {
    const token = JSON.parse(localStorage.getItem("tokenData")).access_token;
    try {
      const response = await fetch(`${API_URL}/${url}`, {
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
