
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
console.log("Token actuel :", localStorage.getItem("token"));
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};