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

export const getCookie = key => {
  const cookies = new Cookies();
  return cookies.get(key);
};

export const removeCookie = key => {
  const cookies = new Cookies();
  return cookies.remove(key);
};
