const ROOT_URL = process.env.REACT_APP_API_URL;
export const signupUrl = () => `${ROOT_URL}user/register/`;
export const loginUrl = () => `${ROOT_URL}user/login/`;
export const logoutUrl = () => `${ROOT_URL}user/logout/`;
export const productUrl = params =>
    params ? `${ROOT_URL}product?${new URLSearchParams(params).toString()}` : `${ROOT_URL}product/`;
export const updateProductUrl = id => `${ROOT_URL}product/${id}`;
