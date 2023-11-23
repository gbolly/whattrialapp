const ROOT_URL_ENV = process.env.REACT_APP_API_URL
console.log(ROOT_URL_ENV, "API URL FROM ENV");
const ROOT_URL = "https://what-trial-gbolly-api-stage.us.aldryn.io/api/";
export const signupUrl = () => `${ROOT_URL}user/register/`;
export const loginUrl = () => `${ROOT_URL}user/login/`;
export const logoutUrl = () => `${ROOT_URL}user/logout/`;
export const productUrl = params =>
    params ? `${ROOT_URL}product?${new URLSearchParams(params).toString()}` : `${ROOT_URL}product/`;
export const updateProductUrl = id => `${ROOT_URL}product/${id}`;
