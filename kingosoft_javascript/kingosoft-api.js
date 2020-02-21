"use strict";
/**
 * MD5加密类
 */
//import { Md5 } from './dist/md5'
var Md5 = /** @class */ (function () {
    function Md5() {
    }
    Md5.AddUnsigned = function (lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (!!(lX4 & lY4)) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (!!(lX4 | lY4)) {
            if (!!(lResult & 0x40000000)) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            }
            else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        }
        else {
            return (lResult ^ lX8 ^ lY8);
        }
    };
    Md5.FF = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.F(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.GG = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.G(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.HH = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.H(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.II = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.I(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.ConvertToWordArray = function (string) {
        var lWordCount, lMessageLength = string.length, lNumberOfWords_temp1 = lMessageLength + 8, lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64, lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16, lWordArray = Array(lNumberOfWords - 1), lBytePosition = 0, lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    Md5.WordToHex = function (lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };
    Md5.Utf8Encode = function (string) {
        var utftext = "", c;
        string = string.replace(/\r\n/g, "\n");
        for (var n = 0; n < string.length; n++) {
            c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    Md5.init = function (string) {
        var temp;
        if (typeof string !== 'string')
            string = JSON.stringify(string);
        this._string = this.Utf8Encode(string);
        this.x = this.ConvertToWordArray(this._string);
        this.a = 0x67452301;
        this.b = 0xEFCDAB89;
        this.c = 0x98BADCFE;
        this.d = 0x10325476;
        for (this.k = 0; this.k < this.x.length; this.k += 16) {
            this.AA = this.a;
            this.BB = this.b;
            this.CC = this.c;
            this.DD = this.d;
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k], this.S11, 0xD76AA478);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 1], this.S12, 0xE8C7B756);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S13, 0x242070DB);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 3], this.S14, 0xC1BDCEEE);
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S11, 0xF57C0FAF);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 5], this.S12, 0x4787C62A);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S13, 0xA8304613);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 7], this.S14, 0xFD469501);
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S11, 0x698098D8);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 9], this.S12, 0x8B44F7AF);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S13, 0xFFFF5BB1);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 11], this.S14, 0x895CD7BE);
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S11, 0x6B901122);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 13], this.S12, 0xFD987193);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S13, 0xA679438E);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 15], this.S14, 0x49B40821);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S21, 0xF61E2562);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 6], this.S22, 0xC040B340);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S23, 0x265E5A51);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k], this.S24, 0xE9B6C7AA);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S21, 0xD62F105D);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 10], this.S22, 0x2441453);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S23, 0xD8A1E681);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 4], this.S24, 0xE7D3FBC8);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S21, 0x21E1CDE6);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 14], this.S22, 0xC33707D6);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S23, 0xF4D50D87);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 8], this.S24, 0x455A14ED);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S21, 0xA9E3E905);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 2], this.S22, 0xFCEFA3F8);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S23, 0x676F02D9);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 12], this.S24, 0x8D2A4C8A);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S31, 0xFFFA3942);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 8], this.S32, 0x8771F681);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S33, 0x6D9D6122);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 14], this.S34, 0xFDE5380C);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S31, 0xA4BEEA44);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 4], this.S32, 0x4BDECFA9);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S33, 0xF6BB4B60);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 10], this.S34, 0xBEBFBC70);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S31, 0x289B7EC6);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k], this.S32, 0xEAA127FA);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S33, 0xD4EF3085);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 6], this.S34, 0x4881D05);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S31, 0xD9D4D039);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 12], this.S32, 0xE6DB99E5);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S33, 0x1FA27CF8);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 2], this.S34, 0xC4AC5665);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k], this.S41, 0xF4292244);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 7], this.S42, 0x432AFF97);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S43, 0xAB9423A7);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 5], this.S44, 0xFC93A039);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S41, 0x655B59C3);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 3], this.S42, 0x8F0CCC92);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S43, 0xFFEFF47D);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 1], this.S44, 0x85845DD1);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S41, 0x6FA87E4F);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 15], this.S42, 0xFE2CE6E0);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S43, 0xA3014314);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 13], this.S44, 0x4E0811A1);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S41, 0xF7537E82);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 11], this.S42, 0xBD3AF235);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S43, 0x2AD7D2BB);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 9], this.S44, 0xEB86D391);
            this.a = this.AddUnsigned(this.a, this.AA);
            this.b = this.AddUnsigned(this.b, this.BB);
            this.c = this.AddUnsigned(this.c, this.CC);
            this.d = this.AddUnsigned(this.d, this.DD);
        }
        temp = this.WordToHex(this.a) + this.WordToHex(this.b) + this.WordToHex(this.c) + this.WordToHex(this.d);
        return temp.toLowerCase();
    };
    Md5.x = Array();
    Md5.S11 = 7;
    Md5.S12 = 12;
    Md5.S13 = 17;
    Md5.S14 = 22;
    Md5.S21 = 5;
    Md5.S22 = 9;
    Md5.S23 = 14;
    Md5.S24 = 20;
    Md5.S31 = 4;
    Md5.S32 = 11;
    Md5.S33 = 16;
    Md5.S34 = 23;
    Md5.S41 = 6;
    Md5.S42 = 10;
    Md5.S43 = 15;
    Md5.S44 = 21;
    Md5.RotateLeft = function (lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); };
    Md5.F = function (x, y, z) { return (x & y) | ((~x) & z); };
    Md5.G = function (x, y, z) { return (x & z) | (y & (~z)); };
    Md5.H = function (x, y, z) { return (x ^ y ^ z); };
    Md5.I = function (x, y, z) { return (y ^ (x | (~z))); };
    return Md5;
}());
/**
 * 应用信息类
 */
class Info {
}
Info.appVer = 'android2.5.101';
Info.encodeKey = 'op5nb9';
/**
 * 参数加密类
 */
class Encodeing {
    constructor() {
        this.map = new Map();
    }
    ///该方法用作于喜鹊儿内嵌webview访问的加密
    webEncodeing(str, str2) {
        try {
            return "param=" + this.getParamEncode(str, str2) + "&param2=" + this.getParam2Encode(str);
        }
        catch (e) {
            return "param=error&param2=error";
        }
    }
    /// param参数加密
    getParamEncode(string, s) {
        if (string == null || "" === string || s == null || "" === s) {
            return string;
        }
        var s2 = "";
        var length = s.length;
        var length2 = string.length;
        var n = Math.ceil(length2 * 1.0 / length);
        var n2 = Math.ceil(length2 * 3.0 * 6.0 / 9.0 / 6.0);
        var string2 = "";
        var s3;
        for (var i = 0; i < n; ++i) {
            var n3 = 1;
            while (true) {
                s3 = string2;
                if (n3 > length)
                    break;
                var n4 = i * length + n3;
                var string3 = "000" + (Number.parseInt(this.toArray(string.substring(n4 - 1, n4))) + Number.parseInt(this.toArray(s.substring(n3 - 1, n3))) + n2 * 6 % length);
                string2 += string3.substring(string3.length - 3);
                if (n4 == length2) {
                    s3 = string2;
                    break;
                }
                n3++;
                //console.log('测试:' + string3 + "\n");
            }
            string2 = s3;
        }
        var n5 = 0;
        string = s2;
        while (true) {
            s = string;
            if (n5 >= string2.length)
                break;
            var length3;
            if ((length3 = n5 + 9) >= string2.length) {
                length3 = string2.length;
            }
            s = string2.substring(n5, length3);
            n5 += 9;
            s = "000000" + this.a(Number.parseInt(s));
            s = s.substring(s.length - 6);
            string += s;
        }
        return s;
    }
    /// param2参数加密
    getParam2Encode(str) {
        //String[] split = GMd5.md5(str).split("");
        var split = Md5.init(str).split('');
        //可能是java的版本原因，也可能是系统的原因 linux 与 window 符号长度的原因，在手机端aide上 split[0] 应该是一个空白字符
        if (!("" === split[0].trim())) {
            var tmp = new Array(split.length + 1);
            tmp[0] = "";
            for (var i = 0; i < split.length; i++) {
                tmp[i + 1] = split[i];
            }
            split = tmp;
        }
        var str2 = "";
        for (var i = 0; i < split.length; i++) {
            if (!(i == 3 || i == 10 || i == 17 || i == 25)) {
                str2 = str2 + split[i];
            }
        }
        return Md5.init(str2);
    }
    putMap() {
        var i = 0;
        if (this.map == null) {
            this.map = new Map();
        }
        for (let i2 = 0; i2 < 10; i2++) {
            this.map.set(i2, String.fromCharCode(i2 + 48));
        }
        while (i < 26) {
            this.map.set(i + 10, String.fromCharCode(i + 97));
            i++;
        }
    }
    toArray(s) {
        var sb = '';
        var charArray = s.split('');
        for (var i = 0; i < charArray.length; ++i) {
            if (i != charArray.length - 1) {
                //sb+(Integer.valueOf(charArray[i]))+(",");
                sb += s.charCodeAt(i) + ',';
            }
            else {
                //sb+(Integer.valueOf(charArray[i]));
                sb += s.charCodeAt(i);
            }
        }
        return sb;
    }
    a(j) {
        this.putMap();
        var str = '';
        if (j < 0) {
            return "-" + this.a(Math.abs(j));
        }
        do {
            var str2 = str;
            var key = Math.floor(j % 36);
            str = (this.map.get(key)) + '';
            if (!("" === str2)) {
                str = str + str2;
            }
            //j /= 36
            j = Math.floor(j / 36);
        } while (j > 0);
        return str;
    }
}
/**
 * 参数加密工具
 */
class EncodeUtil {
    /**
     *
     * @param params 通用加密方法
     * @param token
     */
    static encodeing(params, token) {
        token = ("".trim() === token) ? "00000" : token;
        var hashMap = EncodeUtil.encode(params, false, "", "", token);
        hashMap.set("token", token);
        return hashMap;
    }
    /**
 * 该方法用作于喜鹊儿内嵌webview访问的加密参数
 *
 * @param userJSON 该对象由登录后封装而来.
 * @param type     请求方式，抓包后会有对应代码
 * @param step     未知，抓包后会有对应代码
 * @return 组合后的参数
 */
    static webEncodeing(userJSON, type, step) {
        var buffer = '';
        buffer += ("user=") + (userJSON['userid']) + ("&");
        buffer += ("usertype=") + (userJSON['usertype']) + ("&");
        buffer += ("uuid=") + (userJSON['uuid']);
        //第一次加密
        var encode1 = new Encodeing().webEncodeing(buffer.toString(), userJSON['xxdm']);
        //在第一次加密的基础上添加学校代码
        encode1 = encode1 + "&xxdm=" + userJSON['xxdm'];
        //第二次加密
        var encode2 = new Encodeing().webEncodeing(encode1, Info.encodeKey);
        //参数组合
        var buffer1 = '';
        buffer1 += (escape("head[us]"))
            + ("=&");
        buffer1 += (escape("head[version]"))
            + ('=') + ("1.0.0")
            + ("&");
        buffer1 += (escape("head[ct]"))
            + ('=') + ("3")
            + ("&");
        +("&");
        //注意
        buffer1 += (escape("head[time]"))
            + ('=')
            + (('' + new Date().valueOf()).substring(0, 10))
            + ("&");
        buffer1 += (escape("head[sign]"))
            + ('=')
            + ("&");
        //注意
        buffer1 += ("sign=")
            + (escape(encode2))
            + (escape("&token="))
            + (userJSON['token'])
            + (escape("&appinfo="))
            + (Info.appVer)
            + ("&");
        buffer1 += ("action=")
            + ("jw_apply")
            + ("&");
        buffer1 += ("type=")
            + (type)
            + ("&");
        buffer1 += ("step=")
            + (step);
        return buffer1.toString();
    }
    static encode(str, bool, userid, uuid, token) {
        var key = Info.encodeKey;
        if (bool) {
            //str = (str + "&sfid=" + u.a.userid) + "&uuid=" + u.a.uuid;
            str = (str + "&sfid=" + userid) + "&uuid=" + uuid;
        }
        if (str.indexOf("&") == 0) {
            str = str.substring(1);
        }
        //System.out.println(str);
        var hashMap = new Map();
        try {
            //ab.a("as_str=", str);
            hashMap.set("param", new Encodeing().getParamEncode(str, key));
            hashMap.set("param2", new Encodeing().getParam2Encode(str));
            if (bool) {
                //hashMap.put("token", u.a.token);
                hashMap.set("token", token);
                hashMap.set("appinfo", Info.appVer);
            }
            else {
                hashMap.set("token", "00000");
                hashMap.set("appinfo", Info.appVer);
            }
        }
        catch (e) {
            hashMap.set("param", "error");
            hashMap.set("param2", "error");
            if (bool) {
                hashMap.set("token", "error");
                hashMap.set("appinfo", Info.appVer);
            }
        }
        return hashMap;
    }
}
/**
 * 参数整合工具
 */
class ParamUtils {
    ///取学校列表
    static getSchoolListParams() {
        //参数列表顺序需要强行如下，不能更改
        var buffer = '';
        //buffer +=("appver=")+(AppInfo.appver)+("&");
        buffer += ("appver=") + (Info.appVer) + "&";
        //buffer +=("action=")+("getAgent")+("&"); //默认值
        buffer += ("action=") + ("getAgent") + "&"; //默认值
        //buffer +=("xxmc=")+("");
        buffer += ("xxmc=") + "";
        return buffer.toString();
    }
    /**
    * 登录参数
    *
    * @param xxdm     学校代码
    * @param sjxh     手机型号，默认：MI 8
    * @param os       手机系统，默认：android
    * @param xtbb     android版本,默认：10
    * @param loginId  账号
    * @param password 登录密码
    * @return 组合后的参数
    */
    static getLoginParams(xxdm, sjxh, os, xtbb, loginId, password) {
        sjxh = sjxh == null || (sjxh.trim() === "") ? "MI 8" : sjxh;
        os = os == null || (os.trim() === "") ? "android" : os;
        xtbb = xtbb == null || (xtbb.trim() === "") ? "10" : xtbb;
        if (xxdm == null || xxdm.trim() === "")
            return 'null';
        if (loginId == null || loginId.trim() === "")
            return 'null';
        if (password == null || password.trim() === "")
            return 'null';
        //参数列表顺序需要强行如下，不能更改
        var buffer = '';
        buffer += ("xxdm=") + (xxdm) + ("&");
        buffer += ("sjxh=") + (sjxh) + ("&");
        buffer += ("loginId=") + (loginId) + ("&");
        buffer += ("sswl=") + ("55555") + ("&"); //默认值
        buffer += ("os=") + (os) + ("&");
        buffer += ("xtbb=") + (xtbb) + ("&");
        buffer += ("appver=") + (Info.appVer) + ("&"); //软件版本号
        buffer += ("action=") + ("getLoginInfoNew") + ("&");
        buffer += ("isky=") + ("1") + ("&"); //默认值
        buffer += ("sjbz=") + ("") + ("&"); //默认为空
        buffer += ("pwd=") + (password) + ("&");
        buffer += ("loginmode=") + ("0"); //默认值
        return buffer.toString();
    }
    /**
     * 获取课表
     *
     * @param jsdm     未知，根据词义应该是 教室代码
     * @param week     欲获取第n周的课表
     * @param xnxq     学年学期,由 [年份+学期] 构成,例1:20200 --第一学期，列2:20201 --第二学期
     * @param bjdm     未知，根据词义应该是 班级代码
     * @param userJSON 该对象由登录后封装而来，详情请看{@linkplain cn.xinidi.Apis# 登录接口},对象结构请看{@link UserJSON}
     * @return 组合后的参数
     */
    static getCourseParams(jsdm, bjdm, week, xnxq, userJSON) {
        jsdm = (jsdm == null || jsdm.trim() === "") ? "" : jsdm;
        bjdm = (bjdm == null || bjdm.trim() === "") ? "" : bjdm;
        if (week == null || "" === week.trim())
            return 'null';
        if (xnxq == null || "" === xnxq.trim())
            return 'null';
        if (userJSON == null)
            return 'null';
        //参数列表顺序需要强行如下，不能更改
        var buffer = '';
        buffer += ("jsdm=") + (jsdm) + ("&");
        buffer += ("week=") + (week) + ("&");
        buffer += ("xnxq=") + (xnxq) + ("&");
        buffer += ("channel=") + ("jrkb") + ("&"); //默认值 代表今日课表
        buffer += ("usertype=") + (userJSON["STU"]) + ("&");
        buffer += ("action=") + ("getKb") + ("&"); //默认值
        buffer += ("step=") + ("kbdetail_bz") + ("&"); //默认值
        buffer += ("userId=") + (userJSON['uuid']) + ("&"); //由 学校代码_账号 构成
        buffer += ("bjdm=") + (bjdm) + ("&");
        buffer += ("sfid=") + (userJSON['userid']) + ("&"); //由 学校代码_账号 构成
        buffer += ("uuid=") + (userJSON['uuid']);
        return buffer.toString();
    }
}
ParamUtils.URL = "http://www.xiqueer.com:8080/manager/wap/wapController.jsp"; //请求接口
ParamUtils.URL_WEBVIEW = "http://www.xiqueer.com:8080/manager/wap/jwApi.jsp"; //内嵌web请求接口
var loginParams = 'xxdm=13589&sjxh=MI 8&loginId=20180551119&sswl=55555&os=android&xtbb=10&appver=android2.5.101&action=getLoginInfoNew&isky=1&sjbz=&pwd=密码&loginmode=0';
var loginParams1 = ParamUtils.getLoginParams('13589', 'MI 8', 'android', '10', '20180551119', '密码');
var map = EncodeUtil.encodeing(loginParams, '00000'); //登录参数加密，方法1
var map1 = EncodeUtil.encodeing(loginParams1, '00000'); //登录参数加密,方法2
console.log('登录参数加密，方法1,样例 --- ', map);
console.log('登录参数加密,方法2,样例 --- ', map1);
var userJSONStr = '{"xqzhstate":"0","jw":"1.21","xqdlzh":"20180551119","xqzh":"c4361547490477160628a","xkljms":"0","xm":"余刚","userid":"13589_20180551119","pcurl":"http://www.xiqueer.com:80/pc/","usertype":"STU","imurl":"47.104.81.149:21000","xz":"0","msg":"通过身份验证！","flag":"0","token":"2p46r21yx2l41zim1n203x0s1yx1t522hkcs1luoyx2sot5b20pdej1yxb2j21wa5m1yx8r420pb38","ispay":"FALSE","serviceurl":"http://www.xiqueer.com:8080/manager/","uuid":"c2761547490477160528","rzfs":"教务","grantmodule":"教务;","imfs":"jiguang","kbbzrel":"1","xxdm":"13589","xxmc":"重庆师范大学涉外商贸学院","moduleVerInfo":[{"moduleversion":"02","modulecode":"jw","ver":"1.21"},{"moduleversion":"01","modulecode":"mh","ver":"0"},{"moduleversion":"","modulecode":"rl","ver":""},{"moduleversion":"","modulecode":"oa","ver":"0"},{"moduleversion":"","modulecode":"sx","ver":""},{"moduleversion":"","modulecode":"su","ver":""},{"moduleversion":"","modulecode":"ky","ver":""}]}';
var userJSON = JSON.parse(userJSONStr);
console.log('登录成功后，返回json样例 --- ', userJSON);
var courseParams = ParamUtils.getCourseParams("", "", "2", "20191", userJSON);
var courseMap = EncodeUtil.encodeing(courseParams, userJSON['token']); //登录参数加密,方法2
console.log('获取课表参数加密，样例 --- ', courseMap);
var str1 = EncodeUtil.webEncodeing(userJSON, 'pyfa', 'list'); //查看培养方案
console.log('内嵌web请求加密参数,样例 --- ', str1);
/**
 * 目前仅封装了
 * --取学校列表
 * --登录
 * --取课表
 * 需要更多接口，请参照项目所带修改后显toast的app(如果app提示更新，请联系我。)
 * 调用方法
 *      --- EncodeUtil.encodeing(参数列表,token)
 *      --- EncodeUtil.webEncodeing(通过 JSON.parse 解析后的登录成功返回json,行为,方式)
 * */ 
