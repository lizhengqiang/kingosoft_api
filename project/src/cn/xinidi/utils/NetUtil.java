package cn.xinidi.utils;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.util.Map;

/**
 * 网络工具类
 *
 * @author Gang
 */
public class NetUtil {
    private Connection.Response response;

    private NetUtil() {

    }

    //返回一个HTML文本
    public String getHTMLText() throws IOException {
        if (response != null)
            return response.body().trim();
        return null;
    }

    //返回一个document文本树
    public Document getHTMLDocument() throws IOException {
        if (response != null)
            return response.parse();
        return null;
    }

    /**
     * post请求方式
     * @param url
     * @param param
     * @return
     * @throws IOException
     */
    public static NetUtil post(String url, Map<String, String> param) throws IOException {
        Connection conn = Jsoup.connect(url);
        conn.method(Connection.Method.POST);
        conn.data(param);

        NetUtil netUtil = new NetUtil();
        netUtil.response = conn.execute();

        return netUtil;
    }
}
