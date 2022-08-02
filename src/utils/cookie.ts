import { Cookies } from "react-cookie";
import { CookieGetOptions, CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

const getCookie = (name: string, option?: CookieGetOptions) => {
  return cookies.get(name, option);
};

const setCookie = (name: string, value: any, option?: CookieSetOptions) => {
  return cookies.set(name, value, option);
};

export { getCookie, setCookie };
