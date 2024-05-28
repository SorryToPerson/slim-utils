"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCookie = exports.getCookie = exports.setCookie = exports.removeSessionStorage = exports.setSessionStorage = exports.getSessionStorage = exports.removeLocalStorage = exports.setLoalStorage = exports.getLocalStorage = void 0;
var console_1 = require("./console");
var sc = new console_1.SlimConsole('default');
function getLocalStorage(key) {
    var _a;
    try {
        var v = (_a = localStorage.getItem(key)) !== null && _a !== void 0 ? _a : 'null';
        return JSON.parse(v);
    }
    catch (error) {
        sc.error(error);
        return null;
    }
}
exports.getLocalStorage = getLocalStorage;
function setLoalStorage(key, obj) {
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    }
    catch (error) {
        sc.error(error);
    }
}
exports.setLoalStorage = setLoalStorage;
function removeLocalStorage(key) {
    localStorage.removeItem(key);
}
exports.removeLocalStorage = removeLocalStorage;
function getSessionStorage(key) {
    var _a;
    try {
        var v = (_a = sessionStorage.getItem(key)) !== null && _a !== void 0 ? _a : 'null';
        return JSON.parse(v);
    }
    catch (error) {
        sc.error(error);
        return null;
    }
}
exports.getSessionStorage = getSessionStorage;
function setSessionStorage(key, obj) {
    try {
        sessionStorage.setItem(key, JSON.stringify(obj));
    }
    catch (error) {
        sc.error(error);
    }
}
exports.setSessionStorage = setSessionStorage;
function removeSessionStorage(key) {
    sessionStorage.removeItem(key);
}
exports.removeSessionStorage = removeSessionStorage;
function setCookie(name, value, days) {
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
exports.setCookie = setCookie;
function getCookie(name) {
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
exports.getCookie = getCookie;
function removeCookie(name) {
    setCookie(name, '', -1);
}
exports.removeCookie = removeCookie;
