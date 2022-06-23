'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @description 相加
 * @param calcArray
 * @returns {Promise<Number>}
 */
const calcSum = (calcArray) => {
    return calcArray.reduce((total, current) => {
        const oneLen = (total.toString().split('.')[1] || '').length;
        const twoLen = (current.toString().split('.')[1] || '').length;
        const maxLen = oneLen > twoLen ? oneLen : twoLen;
        const number = +'1'.padStart(maxLen, '0');
        return (+total * number + +current * number) / number;
    });
};

/**
 * @description 获取当前网址
 * @returns {string}
 */
const addressBarCurrent = () => location.href;

/**
 * @description 获取页面所在路径
 * @returns {string}
 */
const addressBarFilePath = () => location.pathname;

/**
 * @description 获取页面的来源
 * @returns {string}
 */
const addressBarFrom = () => document.referrer;

/**
 * @description 获取网址#号后的参数
 * @returns {string}
 */
const addressBarHash = () => location.hash.slice(1);

/**
 * @description 获取http(s)
 * @returns {string}
 */
const addressBarHttp = () => document.location.protocol === 'https:' ? 'https://' : 'http://';

/**
 * @description 获取域名:端口
 * @returns {string}
 */
const addressBarHost = () => location.host;

/**
 * @description 获取http(s)://域名：端口
 * @returns {string}
 */
const addressBarHead = () => `${addressBarHttp()} + ${addressBarHost()}`;

/**
 * @description 获取域名
 * @returns {string}
 */
const addressBarName = () => location.hostname;

/**
 * @description 获取端口
 * @returns {string}
 */
const addressBarPort = () => location.port;

/**
 * @description 获取参数
 * @returns {string}
 */
const addressBarQuery = () => location.search.substr(1);

/**
 * @description 是否array类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeArray = (typeValue) => Object.prototype.toString.call(typeValue).toLowerCase() === '[object array]';

/**
 * @description 清除键值-单层
 * @param {[]|{}} ao array或object
 * @returns {[]}
 */
const aoCleanKeyOne = (ao) => {
    const result = [];
    for (const key in ao) {
        result.push(ao[key]);
    }
    return result;
};

/**
 * @description 切片存储在一个新数组
 * @param {[]|{}} ao array或object
 * @param {number} size 每个切片的大小
 * @returns {[]}
 */
const aoChunk = (ao, size) => {
    const array = typeArray(ao) ? ao : aoCleanKeyOne(ao);
    const length = array.length;
    size = ~~Math.abs(+size);
    if (length < 1 || size < 1) {
        return [];
    }
    else {
        let index = 0;
        let resIndex = 0;
        const result = new Array(Math.ceil(length / size));
        while (index < length) {
            result[resIndex++] = array.slice(index, (index += size));
        }
        return result;
    }
};

/**
 * @description 是否object类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeObject = (typeValue) => Object.prototype.toString.call(typeValue).toLowerCase() === '[object object]';

/**
 * @desc 清除键值-全部
 * @param {[]|{}} ao array或object
 * @returns {[]}
 */
const aoCleanKeyAll = (ao) => {
    const result = [];
    let count = 0;
    for (const key in ao) {
        result[count] =
            typeArray(ao[key]) || typeObject(ao[key])
                ? aoCleanKeyAll(ao[key])
                : ao[key];
        count++;
    }
    return result;
};

/**
 * @description 是否值在ao中
 * @param {[]|{}} ao array或object
 * @param {*} aoSearch 要搜索的值
 * @param  {boolean} [aoMatchCase] 是否匹配大小写，true为匹配，false为不匹配，默认为不匹配
 * @returns {boolean}
 */
const aoWhetherIn = (ao, aoSearch, aoMatchCase = false) => {
    const newArray = aoCleanKeyOne(ao); // 函数 some 不能循环 json 类型，统一转成数组
    return newArray.some((key) => {
        let a = JSON.stringify(key);
        let b = JSON.stringify(aoSearch);
        if (!aoMatchCase) {
            a = a.toLowerCase();
            b = b.toLowerCase();
        }
        return a === b;
    });
};

/**
 * @description 删除空值以及指定的值
 * @param {[]|{}} ao array或object
 * @param {[]|{}} aoAssign 现在仅设置为不等于空字符，其它条件可额外增加，如：[null,undefined]
 * @returns {[]|{}}
 */
const aoDeleteEmpty = (ao, aoAssign) => {
    const aoAssignAry = (typeArray(aoAssign) ? aoAssign : [aoAssign]);
    const result = typeArray(ao)
        ? []
        : {};
    for (const key in ao) {
        if (!(ao[key] === '' || aoWhetherIn(aoAssignAry, ao[key], false))) {
            typeArray(ao) ? result.push(ao[key]) : (result[key] = ao[key]);
        }
    }
    return result;
};

/**
 * @description 删除键
 * @param {[]|{}} ao array或object
 * @param {[]|string} aoKey 要删除的键，可字符或数组
 * @returns {[]|{}}
 */
const aoDeleteKey = (ao, aoKey) => {
    const aoKeyAry = (typeArray(aoKey) ? aoKey : [aoKey]);
    const result = typeArray(ao) ? [] : {};
    for (const i in ao) {
        if (!aoWhetherIn(aoKeyAry, i, false)) {
            typeArray(ao) ? result.push(ao[i]) : (result[i] = ao[i]);
        }
    }
    return result;
};

/**
 * @description 删除值
 * @param {[]|{}} ao array或object
 * @param {*} aoValue 要删除的值
 * @returns {[]|{}}
 */
const aoDeleteValue = (ao, aoValue) => {
    const aoValueAry = (typeArray(aoValue) ? aoValue : [aoValue]);
    const result = typeArray(ao) ? [] : {};
    for (const i in ao) {
        if (!aoWhetherIn(aoValueAry, ao[i], true)) {
            typeArray(ao) ? result.push(ao[i]) : (result[i] = ao[i]);
        }
    }
    return result;
};

/**
 * @description 键名
 * @param {[]|{}} ao array或object
 * @returns {[]}
 */
const aoKeyName = (ao) => {
    const result = [];
    for (const key in ao) {
        result.push(key);
    }
    return result;
};

/**
 * @description 保留键，其它删除
 * @param {[]|{}} ao array或object
 * @param {[]|string} aoHold 要保留的键，可字符或数组
 * @returns {[]|{}}
 */
const aoHoldKey = (ao, aoHold) => {
    const aoHoldAry = (typeArray(aoHold) ? aoHold : [aoHold]);
    const keyArray = aoKeyName(ao);
    const result = typeArray(ao) ? [] : {};
    for (const key in aoHoldAry) {
        if (aoWhetherIn(keyArray, aoHoldAry[key], false)) {
            typeArray(ao) ? result.push(ao[aoHoldAry[key]]) : (result[aoHoldAry[key]] = ao[aoHoldAry[key]]);
        }
    }
    return result;
};

/**
 * @description 保留值，其它删除
 * @param {[]|{}} ao array或object
 * @param {*} aoValue 要保留的值，可字符或数组
 * @returns {[]|{}}
 */
const aoHoldValue = (ao, aoValue) => {
    aoValue = typeArray(aoValue) ? aoValue : [aoValue];
    const result = typeArray(ao) ? [] : {};
    for (const k in aoValue) {
        for (const e in ao) {
            if (JSON.stringify(aoValue[k]) === JSON.stringify(ao[e])) {
                typeArray(ao) ? result.push(ao[e]) : (result[e] = ao[e]);
            }
        }
    }
    return result;
};

/**
 * @description 随机取ao中number个值
 * @param {[]|{}} ao array或object
 * @param {number} number 取几个
 * @returns {[]}
 */
const aoRandom = (ao, number) => {
    number = ~~Math.abs(number);
    const array = aoCleanKeyOne(ao);
    const result = [];
    for (let i = 0; i < number && array.length > 0; i++) {
        const r = Math.floor(Math.random() * array.length);
        result[i] = array[r];
        array.splice(r, 1);
    }
    return result;
};

/**
 * @description 随机生成ao中的值并排队行列
 * @param {[]|{}} ao array或object
 * @param {number} rows 几行
 * @param {number} columns 几列
 * @returns {[]}
 */
const aoRandomRAC = (ao, rows, columns) => {
    const result = [];
    for (let i = 0; i < rows; i++) {
        const item = [];
        for (let e = 0; e < columns; e++) {
            const value = aoRandom([75, 80, 85], 1);
            item.push(value[0]);
        }
        result.push(item);
    }
    return result;
};

/**
 * @description 重复值
 * @param {[]|{}} ao array或object
 * @param {number} number 选项：1:不重复值的ao,2:不重复的键值,3:重复的键值
 * @returns {[]|{}}
 */
const aoRepeat = (ao, number) => {
    number = ~~Math.abs(number);
    const a = typeArray(ao) ? [] : {};
    const b = [];
    const c = [];
    for (const key in ao) {
        if (aoWhetherIn(a, ao[key], false)) {
            c.push(key);
        }
        else {
            b.push(key);
            typeArray(ao) ? a.push(ao[key]) : (a[key] = ao[key]);
        }
    }
    return +number === 1 ? a : +number === 2 ? b : c;
};

/**
 * @description 反序
 * @param {[]|{}} ao array或object
 * @returns {[]|{}}
 */
const aoReverse = (ao) => {
    const result = typeArray(ao) ? [] : {};
    const keyArray = aoKeyName(ao);
    keyArray.reverse();
    for (const key in keyArray) {
        typeArray(ao)
            ? result.push(ao[keyArray[key]])
            : (result[keyArray[key]] = ao[keyArray[key]]);
    }
    return result;
};

/**
 * @description 迪卡尔积
 * @example arrayDiKaErJi([1,2,3],[1,2,3],[1,2,3])
 * @returns {[]}
 */
const arrayDiKaErJi = (...arrayAny) => arrayAny.reduce((total, current) => {
    const ret = [];
    total.forEach((a) => {
        current.forEach((b) => {
            ret.push(a.concat([b]));
        });
    });
    return ret;
}, [[]]);

/**
 * 将多层级的数组扁平化
 * @param {[]} arrayAny
 * @returns {[]}
 */
const arrayFlatten = (arrayAny) => {
    while (arrayAny.some((item) => Array.isArray(item))) {
        arrayAny = [].concat(...arrayAny);
    }
    return arrayAny;
};

/**
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 * @param {[]} arrayAny 需要查询的数组
 * @param {[]} arrayTar 目标数组
 */
const arrayHasOne = (arrayAny, arrayTar) => {
    return arrayTar.some((value) => arrayAny.indexOf(value) > -1);
};

/**
 * @param {[]} arrayAny1
 * @param {[]} arrayAny2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
const arrayIntersection = (arrayAny1, arrayAny2) => {
    const len = Math.min(arrayAny1.length, arrayAny2.length);
    let i = -1;
    const res = [];
    while (++i < len) {
        const item = arrayAny2[i];
        if (arrayAny1.indexOf(item) > -1) {
            res.push(item);
        }
    }
    return res;
};

/**
 * @description 是否number类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeNumber = (typeValue) => typeof typeValue === 'number' || (!isNaN(typeValue) && typeof typeValue === 'string');

/**
 * @description 排序数组
 * @param {[]} arrayAny 要排序的数组
 * @param {boolean} [arrayOrder] 排序方式：(true)从小到大，(false)从大到小
 * @returns {[]}
 */
const arrayOrder = (arrayAny, arrayOrder) => {
    const ary = [...arrayAny];
    ary.sort(function (a, b) {
        a = typeNumber(a) ? +a : a;
        b = typeNumber(b) ? +b : b;
        return a > b ? 1 : -1;
    });
    return arrayOrder ? ary : ary.reverse();
};

/**
 * @description 根据字段进行arrayAny的排序
 * @param {[]} arrayAny 必须是[[],[],...]或[{},{},...]的形式
 * @param {number|string} arrayField 字段名字：如果是 arrayAny 时，请用 arrayAny 的下标
 * @param {boolean} [arrayOrder] 排序顺序：(true)从小到大，(false)从大到小
 * @returns {[]}
 * @example arrayOrderByField([[1, "a", 9], [2, "b", 8], [3, "c", 7], [4, "d", 6]], 1, false)
 * @example arrayOrderByField([{"a": 3}, {"a": 2}, {"a": 1}], "a")
 */
const arrayOrderByField = (arrayAny, arrayField, arrayOrder) => {
    const result = arrayAny.sort(function (a, b) {
        const x = a[arrayField];
        const y = b[arrayField];
        return x < y ? -1 : x > y ? 1 : 0;
    });
    return arrayOrder ? result : aoReverse(result);
};

/**
 * @description 获取arrayAny的xy等比对换
 * @param {[]} arrayAny [[],[],...]
 * @returns {[]}
 * @example arrayAnyRatioReplace([[1,'a'],[2,'b'],[3,'c'],[4,'d']])
 */
const arrayRatioReplace = (arrayAny) => {
    const result = [];
    let count = 0;
    for (let o = 0; o < length; o++) {
        if (count < arrayAny[o].length) {
            count = arrayAny[o].length;
        }
    }
    for (let t = 0; t < count; t++) {
        const ary = [];
        for (let i = 0; i < length; i++) {
            // eslint-disable-next-line no-void
            arrayAny[i][t] === void 0 && (arrayAny[i][t] = '');
            ary.push(arrayAny[i][t]);
        }
        result.push(ary);
    }
    return result;
};

/**
 * @description 以assign分隔arrayAny组成新的string
 * @param {[]} arrayAny 要分隔的数组
 * @param {string} char
 * @returns {String}
 */
const arrayToStringChar = (arrayAny, char) => arrayAny.join(String(char));

/**
 * @description 得到两个数组的并集
 * @param {[]} arrayAny1
 * @param {[]} arrayAny2
 */
const arrayUnion = (arrayAny1, arrayAny2) => {
    return Array.from(new Set([...arrayAny1, ...arrayAny2]));
};

/**
 * @description 值是否在数组中
 * @param {[]} arrayAny 用来验证的列表
 * @param {*} value 要验证的值
 * @return {Boolean}
 */
const arrayWhetherIn = (arrayAny, value) => {
    for (let i = 0; i < arrayAny.length; i++) {
        if (value === arrayAny[i]) {
            return true;
        }
    }
    return false;
};

/**
 * @description 浏览器代理信息
 * @returns {String}
 */
const browserUserAgent = () => navigator.userAgent.toLowerCase();

/**
 * @description 浏览器信息对象
 * @returns {{edge: Boolean, opera: Boolean, weiXin: Boolean, safari: Boolean, chrome: Boolean, android: Boolean, firefox: Boolean, ipad: Boolean, ie: Boolean, iphone: Boolean}}
 */
const browserInfoObject = () => {
    const userAgent = browserUserAgent();
    return {
        android: userAgent.indexOf('android'.toLowerCase()) >= 0,
        iphone: userAgent.indexOf('iphone'.toLowerCase()) >= 0,
        ipad: userAgent.indexOf('ipad'.toLowerCase()) >= 0,
        ie: !!window.ActiveXObject || 'ActiveXObject' in window,
        edge: userAgent.indexOf('edge'.toLowerCase()) >= 0,
        safari: userAgent.indexOf('safari'.toLowerCase()) >= 0,
        firefox: userAgent.indexOf('firefox'.toLowerCase()) >= 0,
        chrome: userAgent.indexOf('chrome'.toLowerCase()) >= 0,
        opera: userAgent.indexOf('opera'.toLowerCase()) >= 0,
        weiXin: userAgent.indexOf('MicroMessenger'.toLowerCase()) >= 0
    };
};

/**
 * @description 浏览器是否手机浏览器
 * @returns {Boolean}
 */
const browserIsMobile = () => /mobi/i.test(browserUserAgent());

/**
 * @description 浏览器是否电脑浏览器
 * @returns {Boolean}
 */
const browserIsPc = () => !browserIsMobile();

/**
 * @returns {String} 当前浏览器名称
 */
const browserName = () => {
    const ua = window.navigator.userAgent;
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1;
    };
    if (isExplorer('MSIE')) {
        return 'IE';
    }
    else if (isExplorer('Firefox')) {
        return 'Firefox';
    }
    else if (isExplorer('Chrome')) {
        return 'Chrome';
    }
    else if (isExplorer('Opera')) {
        return 'Opera';
    }
    else if (isExplorer('Safari')) {
        return 'Safari';
    }
    else {
        return 'Unknown';
    }
};

/**
 * @description 浏览器是否在数组中
 * @param {Array} browserArray 要查询的数组
 * @returns {Boolean}
 */
const browserWhetherInArray = (browserArray) => {
    return browserArray.some((value) => browserUserAgent().indexOf(value.toLowerCase()) > 0);
};

/**
 * @description 全大写
 * @param {string} string
 * @returns {string}
 */
const caseAllBig = (string) => {
    return String(string).toUpperCase();
};

/**
 * @description 全小写
 * @param {string} string
 * @returns {string}
 */
const caseAllSmall = (string) => {
    return String(string).toLowerCase();
};

/**
 * @description 首字母大写，其它小写
 * @param {string} string
 * @returns {string}
 */
const caseFirstBig = (string) => {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1).toLowerCase();
};

/**
 * @description 单词首字母大写，其它小写
 * @param {string} string
 * @returns {string}
 */
const caseWordFirstBig = (string) => {
    const ary = String(string).split(' ');
    for (let i = 0; i < ary.length; i++) {
        ary[i] = ary[i].slice(0, 1).toUpperCase() + ary[i].slice(1).toLowerCase();
    }
    return ary.join(' ');
};

/**
 * @description 是否有指定的class
 * @param {HTMLElement} HTMLElement
 * @param {string} className
 * @returns {Boolean}
 */
const classHas = (HTMLElement, className) => {
    return !!HTMLElement.className.match('(\\s|^)' + className + '(\\s|$)');
};

/**
 * @description 添加class
 * @param {HTMLElement} HTMLElement
 * @param {String} className
 */
const classAdd = (HTMLElement, className) => {
    classHas(HTMLElement, className) ||
        (function () {
            const string = HTMLElement.className;
            const classNew = string + ' ' + className;
            HTMLElement.className = string.length > 0 ? classNew : className;
        })();
};

/**
 * @description 移除class
 * @param {HTMLElement} HTMLElement
 * @param {String} className
 */
const classRemove = (HTMLElement, className) => {
    classHas(HTMLElement, className) &&
        (function () {
            const array = HTMLElement.className.split(' ');
            const result = [];
            Object.keys(array).forEach((key) => {
                array[+key] !== className && result.push(array[+key]);
            });
            HTMLElement.className = result.join(' ');
        })();
};

/**
 * @description 切换增减class
 * @param {HTMLElement} HTMLElement
 * @param {String} className
 */
const classToggle = (HTMLElement, className) => {
    HTMLElement.className.indexOf(className) === -1 ? classAdd(HTMLElement, className) : classRemove(HTMLElement, className);
};

/**
 * @description 控制输入：每个number个字符中间加空格
 * @param controlValue
 * @param number
 * @returns {string}
 */
const controlInputNumberSpace = (controlValue, number) => {
    const theValue = String(controlValue).replace(/\s/g, '');
    const array = [];
    const length = Math.ceil(theValue.length / number);
    for (let i = 0; i < length; i++) {
        array.push(theValue.substr(i * number, parseInt(String(number))));
    }
    return array.join(' ');
};

/**
 * @description 替换全部
 * @param {Number|String} string
 * @param {Number|String} search
 * @param {Number|String} replace
 * @returns {String}
 */
const replaceAll = (string, search, replace) => {
    return String(string).split(String(search)).join(String(replace));
};

/**
 * @description 只替换第一个
 * @param {Number|String} string
 * @param {Number|String} search
 * @param {Number|String} replace
 * @returns {String}
 */
const replaceOne = (string, search, replace) => {
    return String(string).replace(String(search), String(replace));
};

/**
 * @description 保留第一个指定的值
 * @param {string} string
 * @param {string} char
 * @returns {string}
 */
const holdFirst = (string, char) => {
    const tempValue = '##@!@##@!@##';
    const replaceFirstChar = replaceOne(String(string), String(char), tempValue);
    const otherReplaceEmpty = replaceAll(replaceFirstChar, String(char), '');
    return replaceOne(otherReplaceEmpty, tempValue, String(char));
};

/**
 * @description 控制价格的输入
 * @param {number|string} controlPrice
 * @param {number} [number]
 * @returns {string}
 */
const controlInputPrice = (controlPrice, number) => {
    let thePrice = holdFirst(holdFirst(String(controlPrice).replace(/[^\d.-]/g, ''), '-'), '.');
    if (thePrice.substr(0, 1) === '.') {
        thePrice = '0.' + thePrice.substr(1);
    }
    if (thePrice.substr(0, 2) === '-.') {
        thePrice = '-0.' + thePrice.substr(2);
    }
    number = typeNumber(number) ? ~~number : 2;
    const ary = thePrice.split('.');
    const int = ary[0];
    const float = ary[1] || null;
    return float && float.length > number ? int + '.' + float.substr(0, number) : thePrice;
};

/**
 * @description 是否date类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeDate = (typeValue) => typeValue instanceof Date && !isNaN(typeValue.getTime());

/**
 * @description 是否string类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeString = (typeValue) => Object.prototype.toString.call(typeValue).toLowerCase() === '[object string]' ||
    typeNumber(typeValue);

/**
 * @description 是否全数字格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatAllNumber = (string) => /^[0-9]+$/.test(String(string));

/**
 * @description 获取时间对象
 * @param {*} timeValue
 * @returns {Date|Null}
 */
const timeNewDate = (timeValue = new Date()) => {
    if (timeValue) {
        let theNewDate;
        if (typeDate(timeValue)) {
            theNewDate = timeValue;
        }
        else {
            let theTime = timeValue;
            if (typeString(theTime)) {
                theTime = formatAllNumber(String(theTime))
                    ? theTime
                    : String(theTime).replace(/[.|-]/gm, '/');
            }
            if (typeNumber(theTime) && String(theTime).length === 10) {
                theTime *= 1000;
            }
            theNewDate = typeNumber(theTime) ? new Date(+theTime) : new Date(String(theTime));
        }
        return typeDate(theNewDate) ? theNewDate : null;
    }
    else {
        return new Date();
    }
};

// noinspection SpellCheckingInspection
const H_YM = '{y}-{m}';
const H_YM_ABBR = '{y}{m}';
const H_DATE = '{y}-{m}-{d}';
const H_DATE_ABBR = '{y}{m}{d}';
const H_MH = '{y}-{m}-01';
const H_DATETIME = '{y}-{m}-{d} {h}:{i}:{s}';
const H_DATETIME_ABBR = '{y}{m}{d}{h}{i}{s}';
const H_H_I = '{h}:{i}';
const H_M_D_H_I = '{m}-{d} {h}:{i}';
const H_Y_M_D_H_I = '{y}-{m}-{d} {h}:{i}';
const T_YM = 'YYYY-MM';
const T_YM_ABBR = 'YYYYMM';
const T_DATE = 'YYYY-MM-DD';
const T_DATE_ABBR = 'YYYYMMDD';
const T_MH = 'YYYY-MM-01';
const T_DATETIME = 'YYYY-MM-DD HH:mm:ss';
const T_DATETIME_ABBR = 'YYYYMMDDHHmmss';
const T_H_I = 'HH:mm';
const T_M_D_H_I = 'MM-DD HH:mm';
const T_Y_M_D_H_I = 'YYYY-MM-DD HH:mm';

/**
 * @description 获取时间对象
 * @param {*} [timeValue]
 * @returns {{s: Number, d: Number, w: Number, h: Number, y: Number, i: Number, m: Number}|Null}
 */
const timeObject = (timeValue = new Date()) => {
    const theNewDate = timeNewDate(timeValue);
    return theNewDate !== null
        ? {
            y: theNewDate.getFullYear(),
            m: theNewDate.getMonth() + 1,
            d: theNewDate.getDate(),
            h: theNewDate.getHours(),
            i: theNewDate.getMinutes(),
            s: theNewDate.getSeconds(),
            w: theNewDate.getDay()
        }
        : null;
};

/**
 * @description 时间格式化
 * @param {*} [timeValue]
 * @param {String} [format] 格式
 * @param {Boolean} [zero] 是否加零，默认加零
 * @returns {Null|String}
 */
const timeFormat = (timeValue = new Date(), format = H_DATETIME, zero = true) => {
    const theObject = timeValue ? timeObject(timeValue) : timeObject(new Date());
    if (theObject !== null) {
        return format.replace(/{([ymdhisw])+}/g, (result, key) => {
            const timeValue = theObject[key];
            return key === 'w'
                ? ['日', '一', '二', '三', '四', '五', '六'][timeValue]
                : zero
                    ? String(timeValue).padStart(2, '0')
                    : String(timeValue);
        });
    }
    else {
        return null;
    }
};

/**
 * @description 计算日期number天后(前)的日期（正数为后，负数为前）
 * @param {*} dateValue 要计算的日期
 * @param {number} number number天后(前)
 * @returns {String|Null}
 */
const dateApart = (dateValue, number) => {
    const theNewDate = timeNewDate(dateValue);
    return theNewDate ? timeFormat(~~(+theNewDate / 1000) + number * 24 * 60 * 60, H_DATE, true) : null;
};

/**
 * @description 是否闰年
 * @param {Number} year
 * @returns {Boolean}
 */
const someWhetherLeapYear = (year) => (+year % 4 === 0 && +year % 100 !== 0) || +year % 400 === 0;

/**
 * @description 二月的天数
 * @param {Number} year
 * @returns {Number}
 */
const someFebruaryDays = (year) => someWhetherLeapYear(~~String(year)) ? 29 : 28;

/**
 * @description 某年某月的月天数
 * @param {Number} year
 * @param {Number} month
 * @returns {Number}
 */
const someYearMonthDays = (year, month) => {
    const monthDays = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][~~String(month) - 1];
    return monthDays || someFebruaryDays(~~String(year));
};

/**
 * @description 获取number个月后（前）的日期，number可为正可为负
 * @param {*} [dateValue] 时间
 * @param {number} number 几个月后（前）
 * @returns {Null|String}
 */
const dateApartMonth = (dateValue = new Date(), number) => {
    const theObject = timeObject(dateValue);
    if (theObject) {
        const totalMonths = +theObject.y * 12 + +theObject.m + +number;
        let day = theObject.d;
        let year = Math.floor(totalMonths / 12);
        let month = totalMonths % 12;
        if (month === 0) {
            year = year - 1;
            month = 12;
        }
        const monthDays = someYearMonthDays(year, month);
        day = day > monthDays ? monthDays : day;
        const Year = String(year).padStart(4, '0');
        const Month = String(month).padStart(2, '0');
        const Day = String(day).padStart(2, '0');
        return `${Year}-${Month}-${Day}`;
    }
    else {
        return null;
    }
};

/**
 * @description 获取一个时间至number个月前(后)的所有年月的数据列表
 * @param {number|string} number 几个月
 * @param {*} [dateValue] 时间
 * @returns {Array|Null}
 */
const dateApartMonthList = (number, dateValue = new Date()) => {
    const theObject = timeObject(dateValue);
    if (theObject) {
        let y = +String(theObject.y).padStart(4, '0');
        let m = +String(theObject.m).padStart(2, '0');
        const array = [];
        const big = number > 0;
        number = Math.abs(number);
        array.push(`${y}-${m}`);
        for (let i = 0; i < +number; i++) {
            if (big) {
                m++;
                if (m >= 13) {
                    y += 1;
                    m = 1;
                }
            }
            else {
                m--;
                if (m <= 0) {
                    y -= 1;
                    m = 12;
                }
            }
            const Y = `${y}`.padStart(4, '0');
            const M = `${m}`.padStart(2, '0');
            array.push(`${Y}-${M}`);
        }
        return array;
    }
    else {
        return null;
    }
};

/**
 * @description 两个日期时间相差多少天
 * @param {*} dateOne 日期一
 * @param {*} dateTwo 日期二
 * @param {beforeAll} abs 绝对值
 * @returns {Number|Null}
 */
const dateDifference = (dateOne, dateTwo, abs) => {
    const oneObject = timeNewDate(dateOne);
    const twoObject = timeNewDate(dateTwo);
    if (oneObject && twoObject) {
        abs = abs || false;
        const result = ~~((oneObject.getTime() - twoObject.getTime()) /
            (1000 * 24 * 60 * 60));
        return abs ? Math.abs(result) : result;
    }
    else {
        return null;
    }
};

/**
 * @description 获取日期的月尾日期
 * @param {*} [dateValue]
 * @returns {String|Null}
 */
const dateMonthFoot = (dateValue = new Date()) => {
    const theObject = timeObject(dateValue);
    if (theObject !== null) {
        const year = String(theObject.y).padStart(4, '0');
        const month = String(theObject.m).padStart(2, '0');
        const day = new Date(+year, +month, 0).getDate();
        return `${year}-${month}-${day}`;
    }
    else {
        return null;
    }
};

/**
 * @description 获取日期的月头日期
 * @param {*} [dateValue]
 * @returns {String|Null}
 */
const dateMonthHead = (dateValue = new Date()) => {
    const theObject = timeNewDate(dateValue);
    return theObject ? timeFormat(theObject, H_MH, true) : null;
};

/**
 * @description 时间的年份
 * @param {*} [timeValue]
 * @returns {String|Null}
 */
const timeGetYear = (timeValue = new Date()) => {
    const theTime = timeValue || new timeValue();
    const theObject = timeObject(theTime);
    return theObject !== null ? String(theObject.y).padStart(4, '0') : null;
};

/**
 * @description 时间的月份
 * @param {*} [timeValue]
 * @returns {String|Null}
 */
const timeGetMonth = (timeValue = new Date()) => {
    const theTime = timeValue || new timeValue();
    const theObject = timeObject(theTime);
    return theObject !== null ? String(theObject.m).padStart(2, '0') : null;
};

/**
 * @description 获取日期下月的年月
 * @param {*} [dateValue]
 * @param {Boolean} [isResultArray] 是否返回数组形式，若false则返回字符串，默认为false
 * @returns {String|Array|Null}
 */
const dateMonthNext = (dateValue = new Date(), isResultArray) => {
    const theObject = timeNewDate(dateValue);
    if (theObject !== null) {
        const next = dateApart(dateMonthFoot(dateValue), 1);
        const year = timeGetYear(next);
        const month = timeGetMonth(next);
        isResultArray = isResultArray || false;
        return isResultArray ? [year, month] : `${year}-${month}`;
    }
    else {
        return null;
    }
};

/**
 * @description 获取日期上月的年月
 * @param {*} [dateValue]
 * @param {Boolean} [isResultArray] 是否返回数组形式，若false则返回字符串，默认为false
 * @returns {Array|String|Null}
 */
const dateMonthPrev = (dateValue = new Date(), isResultArray) => {
    const theObject = timeNewDate(dateValue);
    if (theObject) {
        const apart = dateApart(dateMonthHead(dateValue), -1);
        const year = timeGetYear(apart);
        const month = timeGetMonth(apart);
        isResultArray = isResultArray || false;
        return isResultArray ? [year, month] : `${year}-${month}`;
    }
    else {
        return null;
    }
};

/**
 * @description 日期的周日日期
 * @param {*} [dateValue]
 * @returns {String|Null}
 */
const dateWeekSunday = (dateValue = new Date()) => {
    const theNewDate = timeNewDate(dateValue);
    if (theNewDate !== null) {
        const week = theNewDate.getDay();
        const ary = [0, -1, -2, -3, -4, -5, -6];
        return dateApart(theNewDate, ary[week]);
    }
    else {
        return null;
    }
};

/**
 * @description 获取日期一周的日期
 * @param {*} [dateValue]
 * @returns {Array|Null}
 */
const dateOneWeek = (dateValue = new Date()) => {
    const theObject = timeNewDate(dateValue);
    if (theObject !== null) {
        const array = [];
        const sunday = dateWeekSunday(dateValue);
        for (let i = 0; i < 7; i++) {
            const apart = dateApart(sunday, i);
            array.push(apart);
        }
        return array;
    }
    else {
        return null;
    }
};

/**
 * @description 获取日期一月的日期
 * @param {*} [dateValue]
 * @returns {Array|Null}
 */
const dateOneMonth = (dateValue = new Date()) => {
    const theObject = timeNewDate(dateValue);
    if (theObject) {
        const array = [];
        const monthFoot = dateMonthFoot(dateValue);
        const oneWeek = dateOneWeek(monthFoot);
        array.push(oneWeek);
        for (let i = 0; i < 6; i++) {
            const apart = dateApart(oneWeek[0], -(i * 7 + 1));
            if (new Date(String(apart)).getMonth() + 1 !== theObject.getMonth() + 1) {
                break;
            }
            const theWeek = dateOneWeek(apart);
            array.unshift(theWeek);
        }
        return array;
    }
    else {
        return null;
    }
};

const defineBooleanAry = [
    { value: 0, label: '否' },
    { value: 1, label: '是' }
];

// noinspection NonAsciiCharacters,HttpUrlsUsage
const defineFace = {
    '[微笑]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/huanglianwx_thumb.gif',
    '[嘻嘻]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_thumb.gif',
    '[哈哈]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6a/laugh.gif',
    '[可爱]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/14/tza_thumb.gif',
    '[可怜]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/kl_thumb.gif',
    '[挖鼻]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/wabi_thumb.gif',
    '[吃惊]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f4/cj_thumb.gif',
    '[害羞]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/shamea_thumb.gif',
    '[挤眼]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c3/zy_thumb.gif',
    '[闭嘴]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/29/bz_thumb.gif',
    '[鄙视]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/71/bs2_thumb.gif',
    '[爱你]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/lovea_thumb.gif',
    '[泪]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9d/sada_thumb.gif',
    '[偷笑]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/19/heia_thumb.gif',
    '[亲亲]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/qq_thumb.gif',
    '[生病]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/sb_thumb.gif',
    '[太开心]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/mb_thumb.gif',
    '[白眼]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/landeln_thumb.gif',
    '[右哼哼]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/98/yhh_thumb.gif',
    '[左哼哼]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/zhh_thumb.gif',
    '[嘘]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a6/x_thumb.gif',
    '[衰]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/cry.gif',
    '[委屈]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/73/wq_thumb.gif',
    '[吐]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9e/t_thumb.gif',
    '[哈欠]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cc/haqianv2_thumb.gif',
    '[抱抱]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/27/bba_thumb.gif',
    '[怒]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7c/angrya_thumb.gif',
    '[疑问]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/yw_thumb.gif',
    '[馋嘴]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a5/cza_thumb.gif',
    '[拜拜]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/88_thumb.gif',
    '[思考]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e9/sk_thumb.gif',
    '[汗]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/24/sweata_thumb.gif',
    '[困]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/kunv2_thumb.gif',
    '[睡]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/96/huangliansj_thumb.gif',
    '[钱]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/90/money_thumb.gif',
    '[失望]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0c/sw_thumb.gif',
    '[酷]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/cool_thumb.gif',
    '[色]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/20/huanglianse_thumb.gif',
    '[哼]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/49/hatea_thumb.gif',
    '[鼓掌]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/36/gza_thumb.gif',
    '[晕]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/dizzya_thumb.gif',
    '[悲伤]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1a/bs_thumb.gif',
    '[抓狂]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/62/crazya_thumb.gif',
    '[黑线]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/91/h_thumb.gif',
    '[阴险]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/yx_thumb.gif',
    '[怒骂]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/numav2_thumb.gif',
    '[互粉]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/89/hufen_thumb.gif',
    '[心]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/hearta_thumb.gif',
    '[伤心]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ea/unheart.gif',
    '[猪头]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/pig.gif',
    '[熊猫]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/panda_thumb.gif',
    '[兔子]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/81/rabbit_thumb.gif',
    '[ok]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/ok_thumb.gif',
    '[耶]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/ye_thumb.gif',
    '[good]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/good_thumb.gif',
    '[NO]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ae/buyao_org.gif',
    '[赞]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d0/z2_thumb.gif',
    '[来]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/come_thumb.gif',
    '[弱]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/sad_thumb.gif',
    '[草泥马]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7a/shenshou_thumb.gif',
    '[神马]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/horse2_thumb.gif',
    '[囧]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/15/j_thumb.gif',
    '[浮云]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bc/fuyun_thumb.gif',
    '[给力]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1e/geiliv2_thumb.gif',
    '[围观]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f2/wg_thumb.gif',
    '[威武]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/vw_thumb.gif',
    '[奥特曼]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bc/otm_thumb.gif',
    '[礼物]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c4/liwu_thumb.gif',
    '[钟]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d3/clock_thumb.gif',
    '[话筒]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9f/huatongv2_thumb.gif',
    '[蜡烛]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/lazhuv2_thumb.gif',
    '[蛋糕]': 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3a/cakev2_thumb.gif'
};

const defineIsUseAry = [
    { value: '0', label: '禁用' },
    { value: '1', label: '启用' }
];

/**
 * @example :fetch-suggestions="(q,c) => autoQuery(q,c,a)"
 * @param queryString
 * @param queryCallback
 * @param queryArray
 */
const autoQuery = (queryString, queryCallback, queryArray) => {
    queryCallback(queryString ? queryArray.filter((state) => state.value.toUpperCase().match(queryString.toUpperCase())) : queryArray);
};

/**
 * @description 获取(定义)表格的index
 * @param data
 */
const elTableIndex = (data) => {
    const { row, rowIndex } = data;
    row.index = rowIndex;
};

/**
 * @description 关键字高亮
 * @param {Object} lightObject 对象
 * @param {String} lightKey 键
 * @param {String} lightValue 值
 * @param {String} [lightColor] 颜色
 * @returns {String}
 */
const keyLight = (lightObject, lightKey, lightValue, lightColor = '#1980ff') => {
    return lightValue
        ? lightObject[lightKey]
            ? lightValue.replace(new RegExp(lightObject[lightKey], 'ig'), (val) => `<span style='color:${lightColor}'>${val}</span>`)
            : lightValue
        : '--';
};

const summaryMethod = (summaryParam, summaryFields) => {
    const { columns, data } = summaryParam;
    const sums = [];
    columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '合计';
            return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (summaryFields.includes(column.property)) {
            sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return +(prev + curr).toFixed(2);
                }
                else {
                    return prev;
                }
            }, 0);
        }
    });
    return sums;
};

/**
 * @desc 保证字符串尾部含有指定字符
 * @param {number|string} ensureString
 * @param {number|string} ensureAssign
 * @returns {number|string}
 */
const ensureFootHave = (ensureString, ensureAssign) => {
    const theString = String(ensureString);
    const theAssign = String(ensureAssign);
    return theString.substr(-theString.length) === theAssign ? theString : theString + theAssign;
};

/**
 * @desc 保证字符串尾部没有指定字符
 * @param {number|string} ensureString
 * @param {number|string} ensureAssign
 * @returns {number|string}
 */
const ensureFootNone = (ensureString, ensureAssign) => {
    const theString = String(ensureString);
    const theAssign = String(ensureAssign);
    const strLen = theString.length;
    const theLen = theAssign.length;
    return theString.substr(-theLen) === theAssign ? ensureFootNone(theString.substr(0, strLen - theLen), theAssign) : theString;
};

/**
 * @desc 保证字符串头部含有指定字符串
 * @param {number|string} ensureString
 * @param {number|string} ensureAssign
 * @returns {number|string}
 */
const ensureHeadHave = (ensureString, ensureAssign) => {
    const theString = String(ensureString);
    const theAssign = String(ensureAssign);
    return theString.substr(0, theAssign.length) === theAssign ? theString : theAssign + theString;
};

/**
 * @desc 保证字符串头部没有指定字符串
 * @param {number|string} ensureString
 * @param {number|string} ensureAssign
 * @returns {number|string}
 */
const ensureHeadNone = (ensureString, ensureAssign) => {
    const theString = String(ensureString);
    const theAssign = String(ensureAssign);
    const length = theAssign.length;
    return theString.substr(0, length) === theAssign ? ensureHeadNone(theString.substr(length), theAssign) : theString;
};

/**
 * @description 从字符串中提取文件的文件全名
 * @param {String} string
 * @returns {String}
 */
const fileFullName = (string) => {
    const a = document.createElement('a');
    a.href = string;
    return (a.pathname.match(/\/([^/?#]+)$/i) || ['', ''])[1];
};

/**
 * @description 从字符串中提取文件的文件名称
 * @param {String} string
 * @returns {String}
 */
const fileBaseName = (string) => fileFullName(string).replace(/\.[^.]+$/i, '');

/**
 * @description 从字符串中提取文件的后缀名称
 * @param {String} string
 * @returns {String}
 */
const fileSuffixName = (string) => fileFullName(string).replace(/.+[.]([^.\\/]+)$/gi, '$1');

/**
 * @description 从字符串中提取文件的后缀名并进行分类
 * @param {String} string
 * @returns {String}
 */
const fileClassify = (string) => {
    const suffixName = fileSuffixName(string);
    const array = [
        { n: 'doc', v: ['doc', 'docx', 'dot', 'docx'] },
        { n: 'txt', v: ['txt'] },
        { n: 'xls', v: ['xls', 'xlsx'] },
        { n: 'ppt', v: ['ppt', 'pptx'] },
        { n: 'pdf', v: ['pdf'] },
        { n: 'htm', v: ['htm', 'html'] },
        { n: 'pic', v: ['png', 'jpg', 'jpeg', 'bmp', 'gif'] },
        {
            n: 'vid',
            v: [
                'avi',
                'rm',
                'mpg',
                'mpeg',
                'mpe',
                'wmv',
                'mp4',
                'mkv',
                'vob',
                '3gp',
                'mov'
            ]
        },
        { n: 'aud', v: ['wav', 'mp3', 'wma', 'aif', 'cda', 'mid', 'caf', 'amr'] },
        { n: 'app', v: ['exe', 'app', 'ipa', 'apk'] },
        { n: 'zip', v: ['zip', 'rar'] }
    ];
    let result = 'other';
    for (let i = 0; i < array.length; i++) {
        if (array[i].v.includes(suffixName)) {
            result = array[i].n;
            break;
        }
    }
    return result;
};

/**
 * @description 文件大小的单位
 * @param {Number} fileSize 文件大小
 * @param {Number} fixed 保留浮点位数
 * @returns {String}
 */
const fileUnit = (fileSize, fixed) => {
    const array = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const k = 1024;
    const i = Math.floor(Math.log(fileSize) / Math.log(k));
    return (fileSize / Math.pow(k, i)).toFixed(fixed) + array[i];
};

/**
 * @description defineBooleanAry filter
 * @param {number|string} value
 * @returns {String}
 */
const filterBoolean = (value) => {
    return +value === 1 ? '是' : '否';
};

/**
 * @description :2022-01-01
 * @param {*} time
 * @returns {String}
 */
const filterDate = (time) => {
    return timeFormat(time, H_DATE);
};

/**
 * @description :2022-01-01 01:01
 * @param {*} time
 * @returns {String}
 */
const filterDateHI = (time) => {
    return timeFormat(time, H_Y_M_D_H_I);
};

/**
 * @description :2022-01-01 01:01:01
 * @param {*} time
 * @returns {String}
 */
const filterDatetime = (time) => {
    return timeFormat(time, H_DATETIME);
};

/**
 * @description defineIsUseAry filter
 * @param {number|string} value
 * @returns {String}
 */
const filterIsUse = (value) => {
    return +value === 1 ? '已启用' : '已禁用';
};

/**
 * @description 是否全中文格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatAllCn = (string) => /^[\u4e00-\u9fa5]+$/i.test(String(string));

/**
 * @description 是否 date 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatDate = (string) => {
    if (/^(\d{4})-(\d{2})-(\d{2})$/.test(String(string))) {
        const [y, m, d] = string.split('-');
        return +m > 0 && +m <= 12 && +d > 0 && +d <= someYearMonthDays(y, m);
    }
    else {
        return false;
    }
};

/**
 * @description 是否 dateTime 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatDatetime = (string) => {
    if (/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.test(String(string))) {
        const [date, time] = string.split(' ');
        const [h, m, s] = time.split('-');
        return formatDate(date) && +h < 24 && +m < 60 && +s < 60;
    }
    else {
        return false;
    }
};

/**
 * @description 是否 domain 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatDomain = (string) => /^[a-z0-9]+(([.-])[a-z0-9]+)*\.[a-z0-9]+$/.test(String(string));

/**
 * @description 是否 email格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatEmail = (string) => /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/i.test(String(string));

/**
 * @description 是否外链格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatExternal = (string) => /^(https?:|mailto:|tel:)/.test(String(string));

/**
 * @description 是否十六进制颜色的格式
 * @param {string} string
 * @returns {boolean}
 */
const formatHexColor = (string) => {
    const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/;
    return reg.test(string);
};

/**
 * @description 是否 idCard 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatIdCard = (string) => /^[1-9](\d{14}|\d{16}[0-9x])$/i.test(String(string));

/**
 * @description 是否 imageBase 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatImageBase = (string) => /^data:image\/(bmp|png|gif|jpg|jpeg);base64,/.test(String(string));

/**
 * @description 是否 ip 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatIp = (string) => {
    if (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(String(string))) {
        const [a, b, c, d] = string.split('.');
        return +a < 256 && +b < 256 && +c < 256 && +d < 256;
    }
    else {
        return false;
    }
};

/**
 * @description 是否 mobile 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatMobile = (string) => /^(13|14|15|16|17|18)[0-9]{9}$/.test(String(string));

/**
 * @description 是否 price 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatPrice = (string) => /^\d+\.?\d{0,2}$/.test(String(string));

/**
 * @description 是否 telephone 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatTelephone = (string) => /^[0-9-()]{5,18}$/.test(String(string));

/**
 * @description 是否 url 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatUrl = (string) => /^((https?:)?\/\/)?[a-z0-9]+(([.-])[a-z0-9]+)*\.[a-z0-9]+/.test(String(string));

/**
 * @description 是否 username 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatUsername = (string) => /^[a-z]+[a-z0-9]+[-_.]*[a-z0-9]+$/i.test(String(string));

/**
 * @description 是否 zip 格式
 * @param {String} string
 * @returns {Boolean}
 */
const formatZip = (string) => /^\d{6}$/.test(String(string));

/**
 * @description 字符串中是否含有指定的字符（串）
 * @param {String} string
 * @param {String} haveAssign
 * @returns {Boolean}
 */
const haveAssign = (string, haveAssign) => {
    return String(string).indexOf(String(haveAssign)) >= 0;
};

/**
 * @description 字符串中是否含有中文
 * @param {String} string
 * @returns {Boolean}
 */
const haveCn = (string) => {
    return /[\u4e00-\u9fa5]+/.test(String(string));
};

/**
 * @description 保留中文
 * @param {Number|String} string
 * @returns {String}
 */
const holdCn = (string) => {
    return String(string).replace(/[^\u4e00-\u9fa5]/g, '');
};

/**
 * @description 保留字母
 * @param {string} string
 * @returns {string}
 */
const holdLetter = (string) => {
    return String(string).replace(/[^a-zA-Z]/g, '');
};

/**
 * @description 保留数字
 * @param {string} string
 * @returns {string}
 */
const holdNumber = (string) => {
    return String(string).replace(/[^0-9]/g, '');
};

/**
 * @description 读取本地缓存
 * @param {string} localKey
 * @returns {*}
 */
const localRead = (localKey) => {
    return localStorage.getItem(localKey) || '';
};

/**
 * @description 存储数据
 * @param localKey
 * @param localValue
 */
const localSave = (localKey, localValue) => {
    localStorage.setItem(localKey, localValue);
};

/**
 * @description 两个时间相差几个月
 * @param {*} timeOne 时间一
 * @param {*} timeTwo 时间二
 * @param {Boolean} [abs] 绝对值
 * @returns {Number}
 * **/
const monthDifference = (timeOne, timeTwo, abs) => {
    abs = abs || true;
    const oneObject = timeObject(timeOne);
    const twoObject = timeObject(timeOne);
    if (oneObject && twoObject) {
        const oneCount = oneObject.y * 12 + oneObject.m;
        const twoCount = twoObject.y * 12 + twoObject.m;
        const result = oneCount - twoCount;
        return abs ? Math.abs(result) : result;
    }
    else {
        return 0;
    }
};

/**
 * @description 数字加逗号
 * @param {Number|String} number
 * @returns {String}
 */
const numberAddComma = (number) => {
    return String(+number || 0).replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
};

/**
 * @description 数字位数不足前补零
 * @param {Number|String} number
 * @param {Number|String} length
 * @returns {String}
 */
const numberAddZero = (number, length) => String(~~Math.abs(number)).padStart(~~Math.abs(length), '0');

/**
 * @description 根据对象替换
 * @param {Number|String} string
 * @param {Object} replaceObject
 * @returns {String}
 */
const replaceByObject = (string, replaceObject) => {
    Object.keys(replaceObject).forEach((key) => {
        string = replaceAll(string, key, replaceObject[key]);
    });
    return string;
};

/**
 * @description 去掉空格和逗号
 * @param {string} string
 * @returns {number}
 */
const numberGet = (string) => +replaceByObject(string, { ',': '', ' ': '' });

/**
 * @description 价格大写
 * @param {Number|String} number
 * @returns {String}
 */
const numberPriceBigWrite = (number) => {
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    const head = number < 0 ? '欠' : '';
    number = Math.abs(+number);
    let string = '';
    for (let i = 0; i < fraction.length; i++) {
        string += (digit[Math.floor(number * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    string = string || '整';
    number = Math.floor(number);
    for (let i = 0; i < unit[0].length && number > 0; i++) {
        let dot = '';
        for (let j = 0; j < unit[1].length && number > 0; j++) {
            dot = digit[number % 10] + unit[1][j] + dot;
            number = Math.floor(number / 10);
        }
        string =
            dot.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + string;
    }
    return (head +
        string
            .replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整'));
};

/**
 * @description 数字以单位表示
 * @param {Number} number
 * @param {Number} fixed 四舍五入
 * @returns {String}
 */
const numberUnit = (number, fixed) => {
    const head = number < 0 ? '-' : '';
    number = ~~Math.abs(number);
    fixed = ~~Math.abs(fixed);
    const result = number < 1e3
        ? number
        : number >= 1e3 && number < 1e4
            ? (number / 1e3).toFixed(fixed) + '千'
            : number >= 1e4 && number < 1e8
                ? (number / 1e4).toFixed(fixed) + '万'
                : number >= 1e8
                    ? (number / 1e8).toFixed(fixed) + '亿'
                    : number;
    return head + result;
};

/**
 * @description 删除object的元素
 * @param {Object} theObject
 * @param {Array|String} objectKey
 * @returns {Object}
 */
const objectDeleteElement = (theObject, objectKey) => {
    const keyAry = (typeArray(objectKey) ? objectKey : [objectKey]);
    keyAry.map((item) => delete theObject[item]);
    return theObject;
};

/**
 * @description 是否有字节点
 * @param {Object} theObject 要检查的对像
 * @param {String} [nodeName] 节点名称
 * @returns {Boolean}
 */
const objectHasChildren = (theObject, nodeName) => {
    nodeName = nodeName || 'children';
    return theObject[nodeName] && theObject[nodeName].length > 0;
};

/**
 * @description 获取object的长度
 * @param {Object} theObject
 * @returns {Number}
 */
const objectLength = (theObject) => {
    let len = 0;
    Object.keys(theObject).forEach(() => {
        len++;
    });
    return len;
};

/**
 * @description 重命名object的键名
 * @param {Object} theObject
 * @param {String} objectKey
 * @param {String} newKey
 * @returns {Object}
 */
const objectRenameKey = (theObject, objectKey, newKey) => {
    if (Object.keys(theObject).indexOf(objectKey) !== -1) {
        theObject[newKey] = theObject[objectKey];
        delete theObject[objectKey];
    }
    return theObject;
};

/**
 * @description 十六进制颜色转RGB颜色
 * @param {string} hex
 * @param {number} [opacity]
 * @return {string}
 */
const someColorHexToRGB = (hex, opacity = 1) => {
    let sHex = hex.toLowerCase();
    if (formatHexColor(hex)) {
        if (sHex.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1));
            }
            sHex = sColorNew;
        }
        const sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sHex.slice(i, i + 2)));
        }
        return opacity
            ? 'RGBA(' + sColorChange.join(',') + ',' + String(opacity) + ')'
            : 'RGB(' + sColorChange.join(',') + ')';
    }
    return sHex;
};

/**
 * @description RGB颜色转十六进制颜色
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {string}
 */
const someColorRGBToHex = (r, g, b) => {
    const hex = ((r << 16) | (g << 8) | b).toString(16);
    return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
};

/**
 * @description 最高的 z-index 值
 * @returns {Number}
 */
const someMaxZIndex = () => ~~(new Date().getTime() / 1000).toFixed(0);

/**
 * @description 如果值复数，则显示复数标签
 * @param {Number} number
 * @param {String} unit
 * @returns {String}
 */
const somePluralize = (number, unit) => number === 1 ? number + unit : number + unit + 's';

/**
 * @description 取随机颜色
 * @returns {String}
 */
const someRandomColor = () => {
    const array = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F'
    ];
    let string = '';
    for (let i = 0; i < 6; i++) {
        const id = Math.ceil(Math.random() * 15);
        string += array[id];
    }
    return '#' + string;
};

/**
 * @description 字符串截取
 * @param {Number|String} string 要截取的字符串
 * @param {number} number 截取数量
 * @returns {String}
 */
const stringCut = (string, number) => {
    number = ~~Math.abs(number);
    const have = String(string).substr(0, number - 1) + '…';
    const none = String(string).substr(0, number);
    return string.length > number ? have : none;
};

/**
 * @description 字符串截取（中英文分别设置）
 * @param {Number|String} string 要截取的字符串
 * @param {Number} cnNumber 有中文要截取的数量
 * @param {Number} enNumber 无中文要截取的数量
 * @returns {String}
 */
const stringCutCn = (string, cnNumber, enNumber) => {
    const theCnNumber = ~~Math.abs(cnNumber);
    const theEnNumber = ~~Math.abs(enNumber);
    return haveCn(string) ? stringCut(string, theCnNumber) : stringCut(string, theEnNumber);
};

/**
 * @description 字符串循环
 * @param {Number|String} string 要循环的字符串
 * @param {Number} number 要循环的次数
 * @returns {String}
 */
const stringLoop = (string, number) => {
    const theNumber = ~~String(number);
    let result = '';
    for (let i = 0; i < theNumber; i++) {
        result += String(string);
    }
    return result;
};

/**
 * @description 随机 number 个字符
 * @param {Number} number 需要几个字符
 * @returns {String}
 */
const stringRandom = (number) => {
    const theNumber = ~~Math.abs(number);
    let string = '';
    for (let i = 0; i < theNumber; i++) {
        string += Math.random().toString(36).substr(2);
    }
    return string.substr(0, theNumber);
};

/**
 * @description 字符串反序
 * @param {Number|String} string
 * @returns {String}
 */
const stringReverse = (string) => {
    return String(string).split('').reverse().join('');
};

/**
 * @description 以指定字符分隔字符串组成新的数组
 * @param {Number|String} string 要分隔的字符串
 * @param {Number|String} char 指定字符
 * @returns {Array}
 */
const stringToArrayChar = (string, char) => {
    return String(string).split(String(char));
};

/**
 * @description 以个数分隔字符串组成新的数组
 * @param {Number|String} string 要分隔的字符串
 * @param {Number|String} number 多少数量
 * @returns {Array}
 */
const stringToArrayNumber = (string, number) => {
    const theString = String(string);
    const theNumber = ~~Math.abs(number);
    const array = [];
    const length = Math.ceil(theString.length / theNumber);
    for (let i = 0; i < length; i++) {
        array.push(theString.substr(i * theNumber, theNumber));
    }
    return array;
};

/**
 * @description 获取时间戳
 * @param {*} [timeValue]
 * @returns {Number|Null}
 */
const timestamp = (timeValue = new Date()) => {
    const theNewDate = timeValue ? timeNewDate(timeValue) : new Date();
    return theNewDate ? ~~(theNewDate.getTime() / 1000).toFixed(0) : null;
};

/**
 * @description 多少时间前（中文）
 * @param {*} timeValue
 * @param {string} [format]
 * @param {boolean} [zero] 是否加零，默认加零
 * @returns {null|string}
 */
const timeAgoCn = (timeValue = new Date(), format = H_DATETIME, zero = true) => {
    const theTimestamp = timestamp(timeValue); // 时间戳(10位)
    if (theTimestamp !== null) {
        const nowTimestamp = ~~(Date.now() / 1000); // 时间戳(10位)
        const diff = nowTimestamp - theTimestamp;
        return diff < 60
            ? '刚刚'
            : diff < 3600
                ? ~~(diff / 60) + '分钟前'
                : diff < 86400
                    ? ~~(diff / 3600) + '小时前'
                    : diff < 691200
                        ? ~~(diff / 86400) + '天前'
                        : timeFormat(timeValue, format, zero);
    }
    else {
        return null;
    }
};

/**
 * @description 多少时间前（英文）
 * @param {*} timeValue
 * @param {string} [format]
 * @param {boolean} [zero] 是否加零，默认加零
 * @returns {null|string}
 */
const timeAgoEn = (timeValue = new Date(), format = H_DATETIME, zero = true) => {
    const theTimestamp = timestamp(timeValue); // 时间戳(10位)
    if (theTimestamp !== null) {
        const nowTimestamp = ~~(Date.now() / 1000); // 时间戳(10位)
        const diff = nowTimestamp - theTimestamp;
        return diff < 60
            ? 'now'
            : diff < 3600
                ? somePluralize(~~(diff / 60), ' minute') + 'ago'
                : diff < 86400
                    ? somePluralize(~~(diff / 3600), ' hour') + 'ago'
                    : diff < 691200
                        ? somePluralize(~~(diff / 86400), ' day') + 'ago'
                        : timeFormat(timeValue, format, zero);
    }
    else {
        return null;
    }
};

/**
 * @description 两个时间的时间差
 * @param {*} timeOne
 * @param {*} timeTwo
 * @param {Boolean} [abs] 绝对值
 * @returns {Number|Null}
 */
const timeDifference = (timeOne, timeTwo, abs = false) => {
    const oneNewDate = timeNewDate(timeOne);
    const twoNewDate = timeNewDate(timeTwo);
    if (oneNewDate !== null && twoNewDate !== null) {
        const result = ~~((oneNewDate.getTime() - twoNewDate.getTime()) / 1000);
        return abs ? Math.abs(result) : result;
    }
    else {
        return null;
    }
};

/**
 * @description 时间的日份
 * @param {*} [timeValue]
 * @returns {String|Null}
 */
const timeGetDay = (timeValue = new Date()) => {
    const theTime = timeValue || new Date();
    const theObject = timeObject(theTime);
    return theObject !== null ? String(theObject.d).padStart(2, '0') : null;
};

/**
 * @description 时间的周几
 * @param {*} [timeValue]
 * @returns {String|Null}
 */
const timeGetWeek = (timeValue = new Date()) => {
    const theTime = timeValue || new timeValue();
    const theObject = timeObject(theTime);
    return theObject !== null ? theObject === null || theObject === void 0 ? void 0 : theObject.w : null;
};

/**
 * @description 时间的年份
 * @param {*} [timeValue]
 * @param {boolean} isArray
 * @returns {string|null|string[]}
 */
const timeGetYearMonth = (timeValue = new Date(), isArray = false) => {
    const theTime = timeValue || new timeValue();
    const theObject = timeObject(theTime);
    return theObject == null ?
        null : isArray ?
        [theObject.y, theObject.m] : `${String(theObject.y).padStart(4, '0')}-${String(theObject.m).padStart(2, '0')}`;
};

/**
 * @param {*} theTime 传入的时间
 * @param {*} [nowTime] 当前时间时间
 * @returns {Boolean|Null} 传入的时间是否早于当前时间
 */
const timeIsEarly = (theTime, nowTime) => {
    const theNewDate = timeNewDate(theTime);
    const nowNewDate = timeNewDate(nowTime) || new Date();
    if (theNewDate !== null && nowNewDate !== null) {
        const theTimeStamp = theNewDate.getTime();
        const nowTimeStamp = nowNewDate.getTime();
        return theTimeStamp < nowTimeStamp;
    }
    else {
        return null;
    }
};

/**
 * @param {*} timeValue 时间
 * @returns {String} 相对时间字符串
 */
const timeRelativeTime = (timeValue = new Date()) => {
    const theTimeStamp = timestamp(timeValue);
    if (theTimeStamp) {
        const nowTimeStamp = Math.floor(Date.now() / 1000); // 获取当前时间时间戳
        const isEarly = timeIsEarly(theTimeStamp, nowTimeStamp); // 判断传入时间戳是否早于当前时间戳
        let diff = nowTimeStamp - theTimeStamp; // 获取两个时间戳差值
        if (!isEarly) {
            // 如果isEarly为false则差值取反
            diff = -diff;
        }
        const dirStr = isEarly ? '前' : '后';
        let resStr;
        if (diff <= 59) {
            // 少于等于59秒
            resStr = diff + '秒' + dirStr;
        }
        else if (diff > 59 && diff <= 3599) {
            // 多于59秒，少于等于59分钟59秒
            resStr = Math.floor(diff / 60) + '分钟' + dirStr;
        }
        else if (diff > 3599 && diff <= 86399) {
            // 多于59分钟59秒，少于等于23小时59分钟59秒
            resStr = Math.floor(diff / 3600) + '小时' + dirStr;
        }
        else if (diff > 86399 && diff <= 2623859) {
            // 多于23小时59分钟59秒，少于等于29天59分钟59秒
            resStr = Math.floor(diff / 86400) + '天' + dirStr;
        }
        else if (diff > 2623859 && diff <= 31567859 && isEarly) {
            // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
            resStr = timeFormat(theTimeStamp, H_M_D_H_I, true);
        }
        else {
            resStr = timeFormat(theTimeStamp, H_DATETIME, true);
        }
        return resStr;
    }
    else {
        return null;
    }
};

/**
 * @description 秒牌
 * @param {number} seconds 秒数
 * @returns {string}
 */
const timeSecondBar = (seconds) => {
    let showMinutes = 0;
    let showHours = 0;
    let showDays = 0;
    const showSeconds = ~~(+seconds % 60);
    if (seconds > 59) {
        showMinutes = ~~(+seconds / 60);
    }
    if (showMinutes > 59) {
        showHours = ~~(showMinutes / 60);
    }
    showMinutes = ~~(showMinutes % 60);
    if (showHours > 59) {
        showDays = ~~(showHours / 24);
    }
    showHours = ~~(showHours % 24);
    const showHoursStr = String(showHours).padStart(2, '0');
    const showMinutesStr = String(showMinutes).padStart(2, '0');
    const showSecondsStr = String(showSeconds).padStart(2, '0');
    const last = `${showHoursStr}:${showMinutesStr}:${showSecondsStr}`;
    return showDays === 0 ? last : `${showDays}.${last}`;
};

/**
 * @description 短时间
 * @param {*} timeValue
 * @returns {Null|String}
 */
const timeShort = (timeValue = new Date()) => {
    const theObject = timeValue ? timeObject(timeValue) : timeObject(new Date());
    if (theObject !== null) {
        const nowObject = timeObject(new Date());
        const dateOne = `${theObject === null || theObject === void 0 ? void 0 : theObject.y}-${theObject === null || theObject === void 0 ? void 0 : theObject.m}-${theObject === null || theObject === void 0 ? void 0 : theObject.d}`;
        const dateTwo = `${nowObject === null || nowObject === void 0 ? void 0 : nowObject.y}-${nowObject === null || nowObject === void 0 ? void 0 : nowObject.m}-${nowObject === null || nowObject === void 0 ? void 0 : nowObject.d}`;
        const diff = +timeDifference(dateOne, dateTwo, false);
        const oneDaySeconds = 86400; // 一天秒数
        return diff === oneDaySeconds * 2
            ? '后天 ' + timeFormat(timeValue, H_H_I, true)
            : diff === oneDaySeconds
                ? '明天 ' + timeFormat(timeValue, H_H_I, true)
                : diff === 0
                    ? timeFormat(timeValue, H_H_I, true)
                    : diff === -oneDaySeconds
                        ? '昨天 ' + timeFormat(timeValue, H_H_I, true)
                        : diff === -oneDaySeconds * 2
                            ? '前天 ' + timeFormat(timeValue, H_H_I, true)
                            : theObject.y === (nowObject === null || nowObject === void 0 ? void 0 : nowObject.y)
                                ? timeFormat(timeValue, H_H_I, true)
                                : timeFormat(timeValue, H_Y_M_D_H_I, true);
    }
    else {
        return null;
    }
};

/**
 * @description 判断时间戳格式是否是毫秒
 * @param {Number} timestamp
 * @returns {Boolean}
 */
const timeStampIsMillisecond = (timestamp) => String(timestamp).length > 10;

/**
 * @description 是否boolean类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeBoolean = (typeValue) => Object.prototype.toString.call(typeValue).toLowerCase() === '[object boolean]';

/**
 * @description 是否function类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeFunction = (typeValue) => Object.prototype.toString.call(typeValue).toLowerCase() === '[object function]';

/**
 * @description 是否regexp类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeRegexp = (typeValue) => Object.prototype.toString.call(typeValue).toLowerCase() === '[object regexp]';

/**
 * @description 是否empty类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeEmpty = (typeValue) => !typeFunction(typeValue) &&
    !typeRegexp(typeValue) &&
    (typeValue == null ||
        typeValue === 'undefined' ||
        typeValue.length === 0 ||
        JSON.stringify(typeValue) === '{}');

/**
 * @description 是否float类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeFloat = (typeValue) => typeNumber(typeValue) && typeValue % 1 !== 0;

/**
 * @description 是否HTMLElement类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeHTMLElement = (typeValue) => {
    const d = document.createElement('div');
    try {
        d.appendChild(typeValue.cloneNode(true));
        return typeValue.nodeType === 1;
    }
    catch (e) {
        return typeValue === window || typeValue === document;
    }
};

/**
 * @description 是否int类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeInt = (typeValue) => typeNumber(typeValue) && typeValue % 1 === 0;

/**
 * @description 是否intMinus类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeIntMinus = (typeValue) => typeInt(typeValue) && typeValue < 0;

/**
 * @description  是否intPositive类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeIntPositive = (typeValue) => typeInt(typeValue) && typeValue > 0;

/**
 * @description 是否symbol类型
 * @param {*} typeValue
 * @returns {Boolean}
 */
const typeSymbol = (typeValue) => Object.prototype.toString.call(typeValue).toLowerCase() === '[object symbol]';

/**
 * @description uniCode解码
 * @param {String} string
 * @returns {String}
 */
const uniCodeDecode = (string) => decodeURI(string.replace(/\\/g, '%'));

/**
 * @description uniCode编码
 * @param {String} string
 * @returns {String}
 */
const uniCodeEncode = (string) => {
    const array = [];
    for (let i = 0; i < string.length; i++) {
        array[i] = ('00' + string.charCodeAt(i).toString(16)).slice(-4);
    }
    return '\\u' + array.join('\\u');
};

/**
 * @description urlCode解码
 * @param {String} string
 * @returns {String}
 */
const urlCodeDecode = (string) => decodeURIComponent(string);

/**
 * @description urlCode编码
 * @param {String} string
 * @returns {String}
 */
const urlCodeEncode = (string) => encodeURIComponent(string);

/**
 * @description 获取网址字符串中的参数，并组成参数对象
 * @param {String} urlString 网址字符串
 * @returns {Object} 参数对象
 */
const urlStringQueryObject = (urlString) => {
    const search = urlString.substring(urlString.lastIndexOf('?') + 1);
    const json = {};
    search.replace(/([^?&=]+)=([^?&=]*)/g, (result, $1, $2) => {
        const name = decodeURIComponent($1);
        let value = decodeURIComponent($2);
        value = String(value);
        json[name] = value;
        return result;
    });
    return json;
};

/**
 * @description 获取网址字符串中的一个参数
 * @param {String} urlString 网址字符串
 * @param {String} name 参数名称
 * @returns {*|null}
 */
const urlStringQueryOne = (urlString, name) => {
    const object = urlStringQueryObject(urlString);
    return name && typeof object[name] !== 'undefined' ? object[name] : null;
};

/**
 * @desc 验证是否全中文
 * @param {*} rule
 * @param {String} validateValue
 * @param {*} callback
 * @param {String} field
 * @param {Number} [min]
 * @param {Number} [max]
 */
const validateAllCn = (rule, validateValue, callback, field = '未知', min = 2, max = 10) => {
    if (!validateValue || validateValue.length === 0) {
        callback(new Error(`${field}必须填写`));
    }
    else {
        if (formatAllCn(validateValue)) {
            if (validateValue.length < min || validateValue.length > max) {
                callback(new Error(`${field}在${min}-${max}个字符之间`));
            }
            else {
                callback();
            }
        }
        else {
            callback(new Error(`${field}必须是全中文`));
        }
    }
};

/**
 * @desc 验证是否数字格式
 * @param {*} rule
 * @param {String} validateValue
 * @param {*} callback
 * @param {String} field
 * @param {String} [action]
 */
const validateAllNumber = (rule, validateValue, callback, field = '未知', action = '填写') => {
    if (!validateValue || validateValue.length === 0) {
        callback(new Error(`${field}必须${action}`));
    }
    else {
        if (formatAllNumber(validateValue)) {
            callback();
        }
        else {
            callback(new Error(`${field}格式不正确`));
        }
    }
};

/**
 * @desc 验证是否date格式
 * @param {*} rule
 * @param {String} validateValue
 * @param {*} callback
 * @param {String} field
 * @param {String} [action]
 */
const validateDate = (rule, validateValue, callback, field = '未知', action = '填写') => {
    if (!validateValue || validateValue.length === 0) {
        callback(new Error(`${field}必须${action}`));
    }
    else {
        if (formatDate(validateValue)) {
            callback();
        }
        else {
            callback(new Error(`${field}格式不正确`));
        }
    }
};

/**
 * @desc 验证是否dateTime格式
 * @param {*} rule
 * @param {String} validateValue
 * @param {*} callback
 * @param {String} field
 * @param {String} [action]
 */
const validateDatetime = (rule, validateValue, callback, field = '未知', action = '填写') => {
    if (!validateValue || validateValue.length === 0) {
        callback(new Error(`${field}必须${action}`));
    }
    else {
        if (formatDatetime(validateValue)) {
            callback();
        }
        else {
            callback(new Error(`${field}格式不正确`));
        }
    }
};

/**
 * @desc 验证是否电子邮箱格式
 * @param {*} rule
 * @param {String} validateValue
 * @param {*} callback
 * @param {Number} [min]
 * @param {Number} [max]
 */
const validateEmail = (rule, validateValue, callback, min = 5, max = 30) => {
    const field = '电子邮箱';
    if (!validateValue || validateValue.length === 0) {
        callback(new Error(`${field}必须填写`));
    }
    else {
        if (formatEmail(validateValue)) {
            if (validateValue.length <= min || validateValue.length >= max) {
                callback(new Error(`${field}在${min}-${max}个字符之间`));
            }
            else {
                callback();
            }
        }
        else {
            callback(new Error(`请填写正确的${field}`));
        }
    }
};

/**
 * @desc 验证后的错误信息
 * @param {*} fields
 */
const validateErrMsg = (fields) => fields[Object.keys(fields)[0]][0].message;

/**
 * @desc 验证是否手机号码格式
 * @param {*} rule
 * @param {String} validateValue
 * @param {*} callback
 * @param {String} action
 */
const validateMobile = (rule, validateValue, callback, action = '填写') => {
    const field = '手机号码';
    const number = 11;
    if (!validateValue || validateValue.length === 0) {
        callback(new Error(`${field}必须${action}`));
    }
    else {
        if (formatMobile(validateValue)) {
            if (validateValue.length !== number) {
                callback(new Error(`${field}为${number}个字符`));
            }
            else {
                callback();
            }
        }
        else {
            callback(new Error(`请${action}正确的${field}`));
        }
    }
};

/**
 * @desc 验证是否价格格式
 * @param {*} rule
 * @param {String} validateValue
 * @param {*} callback
 * @param {String} field
 * @param {String} [action]
 * @param {Number} [min]
 * @param {Number} [max]
 */
const validatePrice = (rule, validateValue, callback, field = '价格', action = '填写', min = 1, max = 10) => {
    if (!validateValue || validateValue.length === 0) {
        callback(new Error(`${field}必须${action}`));
    }
    else {
        if (formatPrice(validateValue)) {
            if (validateValue.length < ~~Math.abs(min) || validateValue.length > ~~Math.abs(max)) {
                callback(new Error(`${field}在${~~Math.abs(min)}-${~~Math.abs(max)}个字符之间`));
            }
            else {
                callback();
            }
        }
        else {
            callback(new Error(`${field}只能是数字（最多2位小数）`));
        }
    }
};

/**
 * @desc 验证是否已填
 * @param {*} rule
 * @param {String} validateValue
 * @param {*} callback
 * @param {String} field
 * @param {String} [action]
 * @param {Number} [min]
 * @param {Number} [max]
 */
const validateRequire = (rule, validateValue, callback, field, action = '填写', min, max) => {
    if (!validateValue || validateValue.length === 0) {
        callback(new Error(`${field}必须${action}`));
    }
    else {
        if (min &&
            max &&
            (validateValue.length < ~~Math.abs(min) || validateValue.length > ~~Math.abs(max))) {
            callback(new Error(`${field}在${~~Math.abs(min)}-${~~Math.abs(max)}个字符之间`));
        }
        else {
            callback();
        }
    }
};

/**
 * @desc 验证是否用户名格式
 * @param {*} rule
 * @param {String} validateValue
 * @param {*} callback
 * @param {Number} [min]
 * @param {Number} [max]
 */
const validateUsername = (rule, validateValue, callback, min = 5, max = 20) => {
    const field = '用户名';
    if (!validateValue || validateValue.length === 0) {
        callback(new Error(`${field}必须填写`));
    }
    else {
        if (formatUsername(validateValue)) {
            if (validateValue.length < min || validateValue.length > max) {
                callback(new Error(`${field}在${min}-${max}个字符之间`));
            }
            else {
                callback();
            }
        }
        else {
            callback(new Error(`${field}必须是以字母为开头，由字母、数字、减号、点、下划线组成`));
        }
    }
};

/**
 * 周天至周六（中文）
 * @return {string[]}
 */
const weekAryCn = ['日', '一', '二', '三', '四', '五', '六'];

/**
 * 周天至周六（英文）
 * @return {string[]}
 */
const weekAryEn = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

/**
 * @description 根据时间计算周几的中文
 * @param {*} timeValue 时间
 * @param {boolean} [isWeek] 是否使用周
 * @returns {Null|String}
 */
const weekGetCn = (timeValue = new Date(), isWeek = false) => {
    const theObject = timeObject(timeValue);
    if (theObject !== null) {
        const number = timeGetWeek(timeValue);
        if (number !== null && number < weekAryCn.length && number >= 0) {
            const week = isWeek ? '周' : '星期';
            return `${week}${weekAryCn[number]}`;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

/**
 * @description 根据时间计算周几的英文
 * @param {*} timeValue 时间
 * @returns {Null|String}
 */
const weekGetEn = (timeValue = new Date()) => {
    const theObject = timeObject(timeValue);
    if (theObject !== null) {
        const number = timeGetWeek(timeValue);
        if (number !== null && number < weekAryEn.length && number >= 0) {
            return weekAryEn[number];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

exports.H_DATE = H_DATE;
exports.H_DATETIME = H_DATETIME;
exports.H_DATETIME_ABBR = H_DATETIME_ABBR;
exports.H_DATE_ABBR = H_DATE_ABBR;
exports.H_H_I = H_H_I;
exports.H_MH = H_MH;
exports.H_M_D_H_I = H_M_D_H_I;
exports.H_YM = H_YM;
exports.H_YM_ABBR = H_YM_ABBR;
exports.H_Y_M_D_H_I = H_Y_M_D_H_I;
exports.T_DATE = T_DATE;
exports.T_DATETIME = T_DATETIME;
exports.T_DATETIME_ABBR = T_DATETIME_ABBR;
exports.T_DATE_ABBR = T_DATE_ABBR;
exports.T_H_I = T_H_I;
exports.T_MH = T_MH;
exports.T_M_D_H_I = T_M_D_H_I;
exports.T_YM = T_YM;
exports.T_YM_ABBR = T_YM_ABBR;
exports.T_Y_M_D_H_I = T_Y_M_D_H_I;
exports.addressBarCurrent = addressBarCurrent;
exports.addressBarFilePath = addressBarFilePath;
exports.addressBarFrom = addressBarFrom;
exports.addressBarHash = addressBarHash;
exports.addressBarHead = addressBarHead;
exports.addressBarHost = addressBarHost;
exports.addressBarHttp = addressBarHttp;
exports.addressBarName = addressBarName;
exports.addressBarPort = addressBarPort;
exports.addressBarQuery = addressBarQuery;
exports.aoChunk = aoChunk;
exports.aoCleanKeyAll = aoCleanKeyAll;
exports.aoCleanKeyOne = aoCleanKeyOne;
exports.aoDeleteEmpty = aoDeleteEmpty;
exports.aoDeleteKey = aoDeleteKey;
exports.aoDeleteValue = aoDeleteValue;
exports.aoHoldKey = aoHoldKey;
exports.aoHoldValue = aoHoldValue;
exports.aoKeyName = aoKeyName;
exports.aoRandom = aoRandom;
exports.aoRandomRAC = aoRandomRAC;
exports.aoRepeat = aoRepeat;
exports.aoReverse = aoReverse;
exports.aoWhetherIn = aoWhetherIn;
exports.arrayDiKaErJi = arrayDiKaErJi;
exports.arrayFlatten = arrayFlatten;
exports.arrayHasOne = arrayHasOne;
exports.arrayIntersection = arrayIntersection;
exports.arrayOrder = arrayOrder;
exports.arrayOrderByField = arrayOrderByField;
exports.arrayRatioReplace = arrayRatioReplace;
exports.arrayToStringChar = arrayToStringChar;
exports.arrayUnion = arrayUnion;
exports.arrayWhetherIn = arrayWhetherIn;
exports.autoQuery = autoQuery;
exports.browserInfoObject = browserInfoObject;
exports.browserIsMobile = browserIsMobile;
exports.browserIsPc = browserIsPc;
exports.browserName = browserName;
exports.browserUserAgent = browserUserAgent;
exports.browserWhetherInArray = browserWhetherInArray;
exports.calcSum = calcSum;
exports.caseAllBig = caseAllBig;
exports.caseAllSmall = caseAllSmall;
exports.caseFirstBig = caseFirstBig;
exports.caseWordFirstBig = caseWordFirstBig;
exports.classAdd = classAdd;
exports.classHas = classHas;
exports.classRemove = classRemove;
exports.classToggle = classToggle;
exports.controlInputNumberSpace = controlInputNumberSpace;
exports.controlInputPrice = controlInputPrice;
exports.dateApart = dateApart;
exports.dateApartMonth = dateApartMonth;
exports.dateApartMonthList = dateApartMonthList;
exports.dateDifference = dateDifference;
exports.dateMonthFoot = dateMonthFoot;
exports.dateMonthHead = dateMonthHead;
exports.dateMonthNext = dateMonthNext;
exports.dateMonthPrev = dateMonthPrev;
exports.dateOneMonth = dateOneMonth;
exports.dateOneWeek = dateOneWeek;
exports.dateWeekSunday = dateWeekSunday;
exports.defineBooleanAry = defineBooleanAry;
exports.defineFace = defineFace;
exports.defineIsUseAry = defineIsUseAry;
exports.elTableIndex = elTableIndex;
exports.ensureFootHave = ensureFootHave;
exports.ensureFootNone = ensureFootNone;
exports.ensureHeadHave = ensureHeadHave;
exports.ensureHeadNone = ensureHeadNone;
exports.fileBaseName = fileBaseName;
exports.fileClassify = fileClassify;
exports.fileFullName = fileFullName;
exports.fileSuffixName = fileSuffixName;
exports.fileUnit = fileUnit;
exports.filterBoolean = filterBoolean;
exports.filterDate = filterDate;
exports.filterDateHI = filterDateHI;
exports.filterDatetime = filterDatetime;
exports.filterIsUse = filterIsUse;
exports.formatAllCn = formatAllCn;
exports.formatAllNumber = formatAllNumber;
exports.formatDate = formatDate;
exports.formatDatetime = formatDatetime;
exports.formatDomain = formatDomain;
exports.formatEmail = formatEmail;
exports.formatExternal = formatExternal;
exports.formatHexColor = formatHexColor;
exports.formatIdCard = formatIdCard;
exports.formatImageBase = formatImageBase;
exports.formatIp = formatIp;
exports.formatMobile = formatMobile;
exports.formatPrice = formatPrice;
exports.formatTelephone = formatTelephone;
exports.formatUrl = formatUrl;
exports.formatUsername = formatUsername;
exports.formatZip = formatZip;
exports.haveAssign = haveAssign;
exports.haveCn = haveCn;
exports.holdCn = holdCn;
exports.holdFirst = holdFirst;
exports.holdLetter = holdLetter;
exports.holdNumber = holdNumber;
exports.keyLight = keyLight;
exports.localRead = localRead;
exports.localSave = localSave;
exports.monthDifference = monthDifference;
exports.numberAddComma = numberAddComma;
exports.numberAddZero = numberAddZero;
exports.numberGet = numberGet;
exports.numberPriceBigWrite = numberPriceBigWrite;
exports.numberUnit = numberUnit;
exports.objectDeleteElement = objectDeleteElement;
exports.objectHasChildren = objectHasChildren;
exports.objectLength = objectLength;
exports.objectRenameKey = objectRenameKey;
exports.replaceAll = replaceAll;
exports.replaceByObject = replaceByObject;
exports.replaceOne = replaceOne;
exports.someColorHexToRGB = someColorHexToRGB;
exports.someColorRGBToHex = someColorRGBToHex;
exports.someFebruaryDays = someFebruaryDays;
exports.someMaxZIndex = someMaxZIndex;
exports.somePluralize = somePluralize;
exports.someRandomColor = someRandomColor;
exports.someWhetherLeapYear = someWhetherLeapYear;
exports.someYearMonthDays = someYearMonthDays;
exports.stringCut = stringCut;
exports.stringCutCn = stringCutCn;
exports.stringLoop = stringLoop;
exports.stringRandom = stringRandom;
exports.stringReverse = stringReverse;
exports.stringToArrayChar = stringToArrayChar;
exports.stringToArrayNumber = stringToArrayNumber;
exports.summaryMethod = summaryMethod;
exports.timeAgoCn = timeAgoCn;
exports.timeAgoEn = timeAgoEn;
exports.timeDifference = timeDifference;
exports.timeFormat = timeFormat;
exports.timeGetDay = timeGetDay;
exports.timeGetMonth = timeGetMonth;
exports.timeGetWeek = timeGetWeek;
exports.timeGetYear = timeGetYear;
exports.timeGetYearMonth = timeGetYearMonth;
exports.timeIsEarly = timeIsEarly;
exports.timeNewDate = timeNewDate;
exports.timeObject = timeObject;
exports.timeRelativeTime = timeRelativeTime;
exports.timeSecondBar = timeSecondBar;
exports.timeShort = timeShort;
exports.timeStampIsMillisecond = timeStampIsMillisecond;
exports.timestamp = timestamp;
exports.typeArray = typeArray;
exports.typeBoolean = typeBoolean;
exports.typeDate = typeDate;
exports.typeEmpty = typeEmpty;
exports.typeFloat = typeFloat;
exports.typeFunction = typeFunction;
exports.typeHTMLElement = typeHTMLElement;
exports.typeInt = typeInt;
exports.typeIntMinus = typeIntMinus;
exports.typeIntPositive = typeIntPositive;
exports.typeNumber = typeNumber;
exports.typeObject = typeObject;
exports.typeRegexp = typeRegexp;
exports.typeString = typeString;
exports.typeSymbol = typeSymbol;
exports.uniCodeDecode = uniCodeDecode;
exports.uniCodeEncode = uniCodeEncode;
exports.urlCodeDecode = urlCodeDecode;
exports.urlCodeEncode = urlCodeEncode;
exports.urlStringQueryObject = urlStringQueryObject;
exports.urlStringQueryOne = urlStringQueryOne;
exports.validateAllCn = validateAllCn;
exports.validateAllNumber = validateAllNumber;
exports.validateDate = validateDate;
exports.validateDatetime = validateDatetime;
exports.validateEmail = validateEmail;
exports.validateErrMsg = validateErrMsg;
exports.validateMobile = validateMobile;
exports.validatePrice = validatePrice;
exports.validateRequire = validateRequire;
exports.validateUsername = validateUsername;
exports.weekAryCn = weekAryCn;
exports.weekAryEn = weekAryEn;
exports.weekGetCn = weekGetCn;
exports.weekGetEn = weekGetEn;
//# sourceMappingURL=require.js.map
