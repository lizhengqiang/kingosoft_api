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
        List<SchoolListJSON> list = Apis.getSchoolList(Info.URLS.getSchoolListParams());

        //登录
        String loginParams = Info.URLS.getLoginParams("13589", null, null, null, "20180551119", "tyggi159");
        UserJSON userJSON = Apis.login(loginParams);

        //取课表
        String courseParams = Info.URLS.getCourseParams("", "", "15", "20190", userJSON);
        //System.out.println(courseParams);
        try {
            String course = Apis.common(Info.URLS.URL, courseParams, userJSON.getToken());
            System.out.println(course);
        } catch (IOException e) {
            e.printStackTrace();
        }


    }
}
