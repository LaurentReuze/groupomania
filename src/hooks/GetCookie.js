import Cookie from "js-cookie";

const GetCookie = (nom) => {
  return Cookie.set(nom);
};

export default GetCookie;
