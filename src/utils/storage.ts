import { SlimConsole } from './console';

const sc = new SlimConsole('default');

export function getLocalStorage(key: string) {
  try {
    const v = localStorage.getItem(key) ?? 'null';
    return JSON.parse(v);
  } catch (error) {
    sc.error(error);
    return null;
  }
}

export function setLoalStorage(key: string, obj: any) {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (error) {
    sc.error(error);
  }
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function getSessionStorage(key: string) {
  try {
    const v = sessionStorage.getItem(key) ?? 'null';
    return JSON.parse(v);
  } catch (error) {
    sc.error(error);
    return null;
  }
}

export function setSessionStorage(key: string, obj: any) {
  try {
    sessionStorage.setItem(key, JSON.stringify(obj));
  } catch (error) {
    sc.error(error);
  }
}

export function removeSessionStorage(key: string) {
  sessionStorage.removeItem(key);
}

export function setCookie(name, value, days) {
  // 将天数转换为毫秒
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  // 设置Cookie，包括名称、值和过期时间
  document.cookie =
    name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

export function getCookie(name) {
  // 分割document.cookie字符串得到所有Cookie
  var cookieArr = document.cookie.split(';');

  // 遍历每个Cookie
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].trim(); // 移除前导和尾随空白字符

    // 查找匹配的Cookie名称
    if (cookiePair.indexOf(name + '=') === 0) {
      // 解码并返回Cookie的值
      return decodeURIComponent(cookiePair.substring(name.length + 1));
    }
  }

  // 如果未找到指定的Cookie，则返回null
  return null;
}

export function removeCookie(name) {
  setCookie(name, '', -1);
}
