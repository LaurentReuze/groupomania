import Cookie from "js-cookie";

const RemoveCookie = (nom) => {
  Cookie.remove(nom);
};

export default RemoveCookie;
