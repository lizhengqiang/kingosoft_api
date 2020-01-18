package cn.xinidi;

import cn.xinidi.api.EncodeAPI;
import cn.xinidi.api.Info;
import cn.xinidi.model.SchoolListJSON;
import cn.xinidi.model.UserJSON;
import cn.xinidi.utils.NetUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.io.IOException;
import java.util.List;

/**
 * 请求的部分api
 * @author Gang
 */
public class Apis {

    /**
     * 取学校列表
     *
     * @param schoolListParams 请求参数，具体请看{@link Info.URLS#getSchoolListParams}
     * @return List\<{@linkplain SchoolListJSON SchoolListJSON}\>
     */
    public static List<SchoolListJSON> getSchoolList(String schoolListParams) {
        try {
            String jsonString = common(Info.URLS.URL,schoolListParams,"");
            List<SchoolListJSON> list = JSON.parseArray(jsonString, SchoolListJSON.class);
            /*for (SchoolListJSON s : list) {
                System.out.println(s.toString());
            }*/

            return list;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

    }

    /**
     * 登录
     *
     * @param loginParams 登录参数,具体请看{@link Info.URLS#getLoginParams}
     * @return {@linkplain UserJSON UserJSON}
     */
    public static UserJSON login(String loginParams) {
        try {
            String jsonString = common(Info.URLS.URL,loginParams,"");
            //System.out.println(jsonString);

            JSONObject jsonObject = JSON.parseObject(jsonString);

            // flag 判断是否登录成功
            UserJSON userJSON = null;
            if (jsonObject.getString("flag").equals("0")) {
                userJSON = jsonObject.toJavaObject(UserJSON.class);
                //System.out.println(userJSON);
            } else {
                System.out.println(jsonObject.getString("msg"));
            }

            return userJSON;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * 封装的通用请求方法
     * @param url       请求地址
     * @param params    请求参数,具体请看{@link Info.URLS}
     * @param token     请求token,默认是 00000 会在登录后返回{@link UserJSON#getToken()}
     * @return          返回一个String格式的html文本
     * @throws IOException
     */
    public static String common(String url,String params,String token) throws IOException {
        NetUtil netUtil = NetUtil.post(url,EncodeAPI.encodeing(params,token));

        return netUtil.getHTMLText();
    }
}
