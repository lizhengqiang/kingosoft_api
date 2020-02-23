## 喜鹊儿APP(青果系统)_接口封装

该项目是基于 [xiqueer](https://gitee.com/GangJust/xiqueer "xiqueer") 封装的。

emm……该项目目前仅仅是实现了部分接口,如果需要更多实现可以借助上述项目，自己实现。

#### java:

> - 学校列表接口
> - 登录接口
> - 获取课表接口
> - 获取成绩接口
> - 获取学情警示接口
> - 查看培养方案接口
> - 等级考试成绩接口
> - 成绩分布接口
> - 重修查询接口
> - 作息时间接口

使用到`fastjson、jsoup`库。

----

#### javascript(未测试):

> - 取学校列表
> - 登录
> - 取课表

需要更多接口，请参照项目所带修改后显toast的app(如果app提示更新，请联系我。)

###### javascript实现并未测试，只是对比了java，如有问题，请联系我

调用方法

```javascript
EncodeUtil.encodeing(参数列表,token)

EncodeUtil.webEncodeing(通过 JSON.parse 解析后的登录成功返回json,行为,方式)
```

WeChat:`qq201741884`