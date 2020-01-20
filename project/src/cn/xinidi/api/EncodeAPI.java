package cn.xinidi.api;

import java.util.HashMap;
import java.util.Map;

/**
 * By Gang
 * 重点！！ 该程序、代码以及内容仅用来学习参考，请勿作商业用途。
 * 另外，如果侵犯到您的权益或者隐私，请与我联系删除，敬谢！
 */
public class EncodeAPI {

    private static Map<Integer, Character> map;

    /**
     * 加密参数的方法
     *
     * @param map    一个Map格式的参数列表，由于HasMap是散列存储，
     *               所以调用该方法加密的话需要得到原来map.put顺序的样本，
     *               而这个样本需要在源码中获得，也就是需要你自己去反编译。
     * @param bool   如果为[true]，则userid,uuid,token将会被使用，否则将不会被使用
     * @param userid 首次登陆后返回的参数中获取。不可以省略，起码都应该传入一个 "" 空的字符串，该参数是否使用由 [参数2 ]决定
     * @param uuid   首次登陆后返回的参数中获取。不可以省略，起码都应该传入一个 "" 空的字符串，该参数是否使用由 [参数2 ]决定
     * @param token  默认值是00000，这个参数是用户第一次登陆后返回的。不可以省略，起码都应该传入一个 "" 空的字符串，该参数是否使用由 [参数2 ]决定
     * @return 返回加密的值，是一个 [Map]
     */
    public static Map<String, String> encodeing(Map<String, String> map, boolean bool, String userid, String uuid, String token) {
        String str = "";
        for (Map.Entry entry : map.entrySet()) {
            String trim = ((String) entry.getKey()).trim();
            String str2 = entry.getValue() == null ? "" : (String) entry.getValue();
            //com.kingosoft.activity_kb_common.ui.activity.zgjbxx.d.a(str2.length() + "");
            str = str + "&" + trim + "=" + str2;
        }

        return encodeing(str, bool, userid, uuid, token);
    }

    /**
     * 加密参数的方法。
     *
     * @param str   如果是正确的参数列表，该参数列表中必须包含[sfid]与[uuid]。
     * @param token 默认值是00000，这个参数是用户第一次登陆后返回的。不可以省略，起码都应该传入一个 "" 空的字符串
     * @return
     */
    public static Map<String, String> encodeing(String str, String token) {
        token = ("".trim().equals(token)) ? "00000" : token;
        Map<String, String> hashMap = encodeing(str, false, "", "", token);
        hashMap.put("token", token);
        return hashMap;
    }

    /**
     * 加密参数的方法
     *
     * @param str    按规定Map散列组合后的参数列表,请参照 [encodeing(map...)] 方法
     * @param bool   如果为[true]，则token将会被使用，否则将不会被使用
     * @param userid 首次登陆后返回的参数中获取。不可以省略，起码都应该传入一个 "" 空的字符串，该参数是否使用由 [参数2 ]决定
     * @param uuid   首次登陆后返回的参数中获取。不可以省略，起码都应该传入一个 "" 空的字符串，该参数是否使用由 [参数2 ]决定
     * @param token  默认值是00000，这个参数是用户第一次登陆后返回的。不可以省略，起码都应该传入一个 "" 空的字符串，该参数是否使用由 [参数2 ]决定
     * @return
     */
    public static Map<String, String> encodeing(String str, boolean bool, String userid, String uuid, String token) {
        String key = Info.AppInfo.encodeKey;

        if (bool) {
            //str = (str + "&sfid=" + u.a.userid) + "&uuid=" + u.a.uuid;
            str = (str + "&sfid=" + userid) + "&uuid=" + uuid;
        }
        if (str.indexOf("&") == 0) {
            str = str.substring(1);
        }

        //System.out.println(str);

        Map<String, String> hashMap = new HashMap();
        try {
            //ab.a("as_str=", str);
            hashMap.put("param", getParamEncode(str, key));
            hashMap.put("param2", getParam2Encode(str));
            if (bool) {
                //hashMap.put("token", u.a.token);
                hashMap.put("token", token);
                hashMap.put("appinfo", Info.AppInfo.appver);
            } else {
                hashMap.put("token", "00000");
                hashMap.put("appinfo", Info.AppInfo.appver);
            }
        } catch (Exception e) {
            hashMap.put("param", "error");
            hashMap.put("param2", "error");
            if (bool) {
                hashMap.put("token", "error");
                hashMap.put("appinfo", Info.AppInfo.appver);
            }
        }
        return hashMap;
    }

    /**
     * param参数加密
     *
     * @param string 未加密的param参数
     * @param s      一个key值[Version]
     * @return
     */
    public static String getParamEncode(String string, String s) {
        if (string == null || "".equals(string) || s == null || "".equals(s)) {
            return string;
        }
        String s2 = "";
        int length = s.length();
        int length2 = string.length();
        int n = (int) Math.ceil(length2 * 1.0 / length);
        int n2 = (int) Math.ceil(length2 * 3.0 * 6.0 / 9.0 / 6.0);
        String string2 = "";
        String s3;
        for (int i = 0; i < n; ++i) {
            int n3 = 1;
            while (true) {
                s3 = string2;
                if (n3 > length) break;
                int n4 = i * length + n3;
                String string3 = "000" + (Integer.parseInt(toArray(string.substring(n4 - 1, n4))) + Integer.parseInt(toArray(s.substring(n3 - 1, n3))) + n2 * 6 % length);
                string2 += string3.substring(string3.length() - 3);
                if (n4 == length2) {
                    s3 = string2;
                    break;
                }
                n3++;
            }
            string2 = s3;
        }
        int n5 = 0;
        string = s2;
        while (true) {
            s = string;
            if (n5 >= string2.length()) break;
            int length3;
            if ((length3 = n5 + 9) >= string2.length()) {
                length3 = string2.length();
            }
            s = string2.substring(n5, length3);
            n5 += 9;
            s = "000000" + a(Long.parseLong(s));
            s = s.substring(s.length() - 6);
            string += s;
        }
        return s;
    }

    /**
     * param2参数加密
     *
     * @param str 未加密的param参数
     * @return 加密后的param
     */
    public static String getParam2Encode(String str) {
        String[] split = GMd5.md5(str).split("");

        //可能是java的版本原因，也可能是系统的原因 linux 与 window 符号长度的原因，在手机端aide上 split[0] 应该是一个空白字符
        if ( !("".equals(split[0].trim())) ) {
            String[] tmp = new String[split.length + 1];
            tmp[0] = "";
            for (int i = 0; i < split.length; i++) {
                tmp[i + 1] = split[i];
            }
            split = tmp;
        }

        String str2 = "";
        for (int i = 0; i < split.length; i++) {
            if (!(i == 3 || i == 10 || i == 17 || i == 25)) {
                str2 = str2 + split[i];
            }
        }

        return GMd5.md5(str2);
    }

    private static void putMap() {
        int i = 0;
        if (map == null) {
            map = new HashMap<>();
        }
        for (int i2 = 0; i2 < 10; i2++) {
            map.put(Integer.valueOf(i2), Character.valueOf((char) (i2 + 48)));
        }
        while (i < 26) {
            map.put(Integer.valueOf(i + 10), Character.valueOf((char) (i + 97)));
            i++;
        }
    }

    /**
     * 该方法默认为公开的，如果有使用，请将其公开
     *
     * @param s
     * @return
     */
    private static String toArray(String s) {
        final StringBuffer sb = new StringBuffer();
        final char[] charArray = s.toCharArray();
        for (int i = 0; i < charArray.length; ++i) {
            if (i != charArray.length - 1) {
                sb.append(Integer.valueOf(charArray[i])).append(",");
            } else {
                sb.append(Integer.valueOf(charArray[i]));
            }
        }
        return sb.toString();
    }

    private static String a(long j) {
        putMap();
        String str = "";
        if (j < 0) {
            return "-" + a(Math.abs(j));
        }
        do {
            String str2 = str;
            str = (map.get(((int) (j % 36)))).toString();
            if (!("".equals(str2))) {
                str = str + str2;
            }
            j /= 36;
        } while (j > 0);
        return str;
    }

}
