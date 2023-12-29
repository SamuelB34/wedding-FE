export const getToken = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("token");
  } else {
    return "";
  }
};
