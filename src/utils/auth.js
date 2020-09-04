import { isEmpty } from 'lodash';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cookies_options =  { domain: '.evaluatz.com', path: '/' };



const TOKEN_KEY = 'jwtToken';
const USER_INFO = 'userInfo';

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  clear(key) {

    if (cookies && cookies.get(key,cookies_options)) {
      return cookies.remove(key, cookies_options);
    }

    return null;
  },



  clearToken(tokenKey = TOKEN_KEY) {
    return auth.clear(tokenKey);
  },

  clearUserInfo(userInfo = USER_INFO) {
    return auth.clear(userInfo);
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    auth.clearToken()
    auth.clearUserInfo();

  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get(key) {
    if (cookies && cookies.get(key, cookies_options)) {
      return cookies.get(key, cookies_options) || null;
    }
    return null;
  },

  getToken(tokenKey = TOKEN_KEY) {
    console.log("Try to auth")
    return auth.get(tokenKey);
  },

  getUserInfo(userInfo = USER_INFO) {
    return auth.get(userInfo);
  },

  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set(value, key, isLocalStorage) {
    if (isEmpty(value)) {
      return null;
    }
    if (cookies) {
      return cookies.set(key, stringify(value), cookies_options);

    }

    return null;
  },

  setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
    return auth.set(value, tokenKey, isLocalStorage);
  },

  setUserInfo(value = '', isLocalStorage = false, userInfo = USER_INFO) {
    return auth.set(value, userInfo, isLocalStorage);
  },
};

export default auth;
