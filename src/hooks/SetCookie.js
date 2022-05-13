import Cookie from "js-cookie";

const SetCookie = (nom, token) => {
  Cookie.set(nom, token, {
    expires: 1,
  });
};

export default SetCookie;
