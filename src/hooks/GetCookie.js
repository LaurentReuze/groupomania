import Cookie from "js-cookie";

const GetCookie = (nom) => {
  return Cookie.get(nom);
};

export default GetCookie;
