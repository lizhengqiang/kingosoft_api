package cn.xinidi.model;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 该类是登录成功后返回的JSON解析，我仅挑选了部分重要参数读取出来
 *
 * @author Gang
 */
public class UserJSON {

    //flag
    @JSONField(name = "flag")
    private String flag;

    //登录提示
    @JSONField(name = "msg")
    private String msg;

    //学号
    @JSONField(name = "xqdlzh")
    private String xqdlzh;

    //姓名
    @JSONField(name = "xm")
    private String xm;

    //userId
    @JSONField(name = "userid")
    private String userId;

    //uuid
    @JSONField(name = "uuid")
    private String uuid;

    //一个重要的key(鬼知道是啥)
    @JSONField(name = "xqzh")
    private String xqzh;

    //学校代码
    @JSONField(name = "xxdm")
    private String xxdm;

    //学校名称
    @JSONField(name = "xxmc")
    private String xxmc;

    //用户类型
    @JSONField(name = "usertype")
    private String userType;

    //登录token
    @JSONField(name = "token")
    private String token;

    public UserJSON(String flag, String msg, String xqdlzh, String xm, String userId, String uuid, String xqzh, String xxdm, String xxmc, String userType, String token) {
        this.flag = flag;
        this.msg = msg;
        this.xqdlzh = xqdlzh;
        this.xm = xm;
        this.userId = userId;
        this.uuid = uuid;
        this.xqzh = xqzh;
        this.xxdm = xxdm;
        this.xxmc = xxmc;
        this.userType = userType;
        this.token = token;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getXqdlzh() {
        return xqdlzh;
    }

    public void setXqdlzh(String xqdlzh) {
        this.xqdlzh = xqdlzh;
    }

    public String getXm() {
        return xm;
    }

    public void setXm(String xm) {
        this.xm = xm;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getXqzh() {
        return xqzh;
    }

    public void setXqzh(String xqzh) {
        this.xqzh = xqzh;
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

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "UserJSON{" +
                "flag='" + flag + '\'' +
                ", msg='" + msg + '\'' +
                ", xqdlzh='" + xqdlzh + '\'' +
                ", xm='" + xm + '\'' +
                ", userId='" + userId + '\'' +
                ", uuid='" + uuid + '\'' +
                ", xqzh='" + xqzh + '\'' +
                ", xxdm='" + xxdm + '\'' +
                ", xxmc='" + xxmc + '\'' +
                ", userType='" + userType + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}
