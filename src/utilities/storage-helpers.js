import Cookies from 'universal-cookie';

export const getFromStore = async key => {
  const value = localStorage.getItem(key);

  if (value !== "undefined") {
    return JSON.parse(value);
  }
  return;
};

export const saveToStore = async (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    alert(e);
  }
};

export const removeFromStore = async (key, clearAll = false) => {
  try {
    if (clearAll) {
      localStorage.clear();
    } else {
      localStorage.removeItem(key);
    }
  } catch (e) {
    alert(e);
  }
};

export const getCookie = (name) => {
  console.log(document.cookie)
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

export const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=us.aldryn.io;`;
}
