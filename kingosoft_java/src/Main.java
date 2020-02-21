import cn.xinidi.Apis;
import cn.xinidi.api.Info;
import cn.xinidi.api.EncodeAPI;
import cn.xinidi.model.SchoolListJSON;
import cn.xinidi.model.UserJSON;

import java.io.IOException;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        //学校列表
        //List<SchoolListJSON> list = Apis.schoolList(Info.URLS.getSchoolListParams());

        //登录
        String loginParams = Info.URLS.getLoginParams("13589", null, null, null, "20180551119", "密码");
        UserJSON userJSON = Apis.login(loginParams);
        //System.out.println(userJSON);

        //取课表
        /*String courseParams = Info.URLS.getCourseParams("", "", "15", "20190", userJSON);
        try {
            String course = Apis.common(Info.URLS.URL, courseParams, userJSON.getToken());
            System.out.println(course);
        } catch (IOException e) {
            e.printStackTrace();
        }*/

        //取成绩
        /*String gradeParams = Info.URLS.getGradeParams("1","20190",userJSON);
        try {
            String grade = Apis.common(Info.URLS.URL, gradeParams, userJSON.getToken());
            System.out.println(grade);
        } catch (IOException e) {
            e.printStackTrace();
        }*/

        //学情警示
        /*String param = Info.URLS.getWebCommParams(userJSON, "xqjs", "list");
        try {
            String s = Apis.webCommon(Info.URLS.URL_WEBVIEW, param);
            System.out.println(s);
        } catch (IOException e) {
            e.printStackTrace();
        }*/

        //培养方案
        /*String param = Info.URLS.getWebCommParams(userJSON, "pyfa", "list");
        try {
            String s = Apis.webCommon(Info.URLS.URL_WEBVIEW, param);
            System.out.println(s);
        } catch (IOException e) {
            e.printStackTrace();
        }*/

        //等级考试成绩
        /*String param = Info.URLS.getWebCommParams(userJSON, "djkscj", "detail");
        try {
            String s = Apis.webCommon(Info.URLS.URL_WEBVIEW, param);
            System.out.println(s);
        } catch (IOException e) {
            e.printStackTrace();
        }*/

        //成绩分布
        /*String param = Info.URLS.getWebCommParams(userJSON, "cjfb", "list");
        try {
            String s = Apis.webCommon(Info.URLS.URL_WEBVIEW, param);
            System.out.println(s);
        } catch (IOException e) {
            e.printStackTrace();
        }*/

        //重修查询
        /*String param = Info.URLS.getWebCommParams(userJSON, "cxcx", "detail");
        try {
            String s = Apis.webCommon(Info.URLS.URL_WEBVIEW, param);
            System.out.println(s);
        } catch (IOException e) {
            e.printStackTrace();
        }*/

        //作息时间
        /*String param = Info.URLS.getWebCommParams(userJSON, "zxsj", "detail");
        try {
            String s = Apis.webCommon(Info.URLS.URL_WEBVIEW, param);
            System.out.println(s);
        } catch (IOException e) {
            e.printStackTrace();
        }*/
    }
}
