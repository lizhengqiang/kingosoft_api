package cn.xinidi.model;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 学校列表
 *
 * @author Gang
 */
public class SchoolListJSON {
    //学校代码
    @JSONField(name = "xxdm")
    private String xxdm;

    //学校名称
    @JSONField(name = "xxmc")
    private String xxmc;

    //学校名称拼音
    @JSONField(name = "pinyin")
    private String pinyin;

    //目前未知是干啥的
    @JSONField(name = "gkksh")
    private String gkksh;

    //青果服务系统的链接
    @JSONField(name = "serviceUrl")
    private String serviceUrl;

    public SchoolListJSON(String xxdm, String xxmc, String pinyin, String gkksh, String serviceUrl) {
        this.xxdm = xxdm;
        this.xxmc = xxmc;
        this.pinyin = pinyin;
        this.gkksh = gkksh;
        this.serviceUrl = serviceUrl;
    }

    public String getXxdm() {
        return xxdm;
    }

    public void setXxdm(String xxdm) {
        this.xxdm = xxdm;
    }

    public String getXxmc() {
        return xxmc;
    }

    public void setXxmc(String xxmc) {
        this.xxmc = xxmc;
    }

    public String getPinyin() {
        return pinyin;
    }

    public void setPinyin(String pinyin) {
        this.pinyin = pinyin;
    }

    public String getGkksh() {
        return gkksh;
    }

    public void setGkksh(String gkksh) {
        this.gkksh = gkksh;
    }

    public String getServiceUrl() {
        return serviceUrl;
    }

    public void setServiceUrl(String serviceUrl) {
        this.serviceUrl = serviceUrl;
    }

    @Override
    public String toString() {
        return "SchoolListJSON{" +
                "xxdm='" + xxdm + '\'' +
                ", xxmc='" + xxmc + '\'' +
                ", pinyin='" + pinyin + '\'' +
                ", gkksh='" + gkksh + '\'' +
                ", serviceUrl='" + serviceUrl + '\'' +
                '}';
    }
}
