//app.js
var customer_id_en = '';
var http_host = '';
var user_id_en = '';
var util = require("utils/util.js");
App({
    onLaunch: function () {

    },
    getUserInfo: function (cb) {
        var that = this;
        var customer_id_en = util.customer_id_en;
        var http_host = util.http_host;

        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function (res) {
                    // console.log("code:" + res.code);
                    var code = res.code;
                    wx.getUserInfo({
                        success: function (res1) {
                            console.log(res1);
                            typeof cb == "function" && cb(that.globalData)
                            var code = res.code;
                            var nickName = res1.userInfo.nickName;
                            var avatarUrl = res1.userInfo.avatarUrl;
                            that.globalData.avatarUrl = res1.userInfo.avatarUrl;
                            that.globalData.nickName = res1.userInfo.nickName;
                            var data = {
                                customer_id_en: util.customer_id_en,
                                code: code,
                                nickName: nickName,
                                avatarUrl: avatarUrl,
                            };
                            // console.log(data);
                            util.commonRequest(
                                data,
                                '/mini_program/minvite/back/index.php/home/wx/getinfo_xcx',
                                function (res) {
                                    // console.log(res)
                                    console.log("授权返回数据：" + JSON.stringify(res));
                                    //获取user_id_en
                                    that.globalData.user_id_en = res.data.user_id_en;
                                    // var user_id_en = that.globalData.user_id_en;
                                    util.user_id_en = res.data.user_id_en;
                                    console.log(util.user_id_en);
                                    util.setstorage(//存user_id_en
                                        "user_id_en",
                                        res.data.user_id_en,
                                        function(res){
                                      
                                        }
                                    );
                                    typeof cb == "function" && cb(that.globalData);
                                })
                        },
                        fail: function (res) {
                            console.log("获取登录信息失败：" + JSON.stringify(res));
                            //游客登录
                            wx.request({
                              url: http_host + '/mini_program/minvite/back/index.php/home/wx/wxvisitor',
                              data: {
                                customer_id_en: customer_id_en,
                              },
                              success: function (res) {
                                console.log(res)
                                util.visitor_id = res.data.visitor_id;
                                console.log(util.visitor_id)
                              }
                            })    
                        }
                    });
                },
                fail: function (res) {
                    console.log("登录失败：" + JSON.stringify(res));
                    wx.showToast({
                        icon: "warn",
                        title: '登录失败',
                    })
                }
            });
        }
    },
    globalData: {
        user_id_en: null,
        customer_id_en: util.customer_id_en,
        nickName: null,
        avatarUrl: null,
        http_host: util.http_host,
        seconds: 0,
        session_key:'',
    }
})


