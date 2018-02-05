//app.js
var customer_id_en='';
var http_host='';
var user_id_en='';
var util = require("utils/util.js");

App({
  onLaunch: function () {
    wx.setTopBarText({
      text: 'test-chq-会员卡'
    })
  },
  opensetting: function (code){
      var that=this;
      wx.showModal({
          title: '温馨提示',
          content: '检测到您未打开微信用户授权，请到小程序设置中打开用户信息授权',
          showCancel: false,
          success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                    success: function (data) {
                        console.log('重新授权信息：' + JSON.stringify(data))
                        if (data) {
                            if (data.authSetting["scope.userInfo"] == true) {
                                wx.getUserInfo({
                                    success: function (data1) {
                                        console.log("重新授权code：" + code);
                                        var nickName = data1.userInfo.nickName;
                                        var avatarUrl = data1.userInfo.avatarUrl;
                                        that.globalData.avatarUrl = data1.userInfo.avatarUrl;
                                        that.globalData.nickName = data1.userInfo.nickName;
                                        var candata = {
                                            customer_id_en: util.customer_id_en,
                                            code: code,
                                            nickName: nickName,
                                            avatarUrl: avatarUrl,
                                        };
                                        console.log(candata);
                                        util.commonRequest(
                                            candata,
                                            '/mini_program/wa_card/back/index.php/home/wx/getinfo_xcx',
                                            function (res) {
                                                console.log("重新授权返回数据：" + JSON.stringify(res))
                                                //获取user_id_en
                                                that.globalData.user_id_en = res.data.user_id_en;
                                                util.status = res.data.status;
                                                typeof cb == "function" && cb(that.globalData)
                                            })
                                    },
                                    fail: function () {
                                        console.log("3授权失败返回数据");
                                    }
                                });
                            } else {
                                that.opensetting(code);
                            }
                        }
                    },
                    fail: function () {
                        console.log("设置失败返回数据");
                    }
                });
              }
          }
      })
          
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
          var code = res.code;
          wx.getUserInfo({
            success: function (res1) {
              console.log(res1)
              typeof cb == "function" && cb(that.globalData)
              var code = res.code;
              var nickName = res1.userInfo.nickName;
              var avatarUrl = res1.userInfo.avatarUrl;
              that.globalData.avatarUrl = res1.userInfo.avatarUrl;
              that.globalData.nickName = res1.userInfo.nickName;
              var candata = {
                customer_id_en: util.customer_id_en,
                code: code,
                nickName: nickName,
                avatarUrl: avatarUrl,
              };
              console.log(candata);
              util.commonRequest(
                candata,
                '/mini_program/wa_card/back/index.php/home/wx/getinfo_xcx',
                function (res) {
                  console.log("授权返回数据：" + JSON.stringify(res));
                  //获取user_id_en
                  that.globalData.user_id_en = res.data.user_id_en;
                  util.user_id_en = res.data.user_id_en;
                  util.status = res.data.status;
                  console.log(util.user_id_en);
                  typeof cb == "function" && cb(that.globalData);
                })
            },
            fail: function (res) {
              console.log("获取登录信息失败：" + JSON.stringify(res));
              // 显示提示弹窗
              wx.showModal({
                title: '温馨提示',
                content: '检测到您未打开微信用户授权，请到小程序设置中打开用户信息授权',
                showCancel:false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    wx.openSetting({
                      success: function (data) {
                        console.log('重新授权信息：' + JSON.stringify(data))
                        if (data) {
                          if (data.authSetting["scope.userInfo"] == true) {
                            wx.getUserInfo({
                              success: function (data1) {
                                console.log("重新授权code：" + code);
                                var nickName = data1.userInfo.nickName;
                                var avatarUrl = data1.userInfo.avatarUrl;
                                that.globalData.avatarUrl = data1.userInfo.avatarUrl;
                                that.globalData.nickName = data1.userInfo.nickName;
                                var candata = {
                                    customer_id_en: util.customer_id_en,
                                    code: code,
                                    nickName: nickName,
                                    avatarUrl: avatarUrl,
                                };
                                util.commonRequest(
                                  candata,
                                  '/mini_program/wa_card/back/index.php/home/wx/getinfo_xcx',
                                  function (res) {
                                    console.log("重新授权返回数据：" + JSON.stringify(res))
                                    //获取user_id_en
                                    that.globalData.user_id_en = res.data.user_id_en;
                                    util.status = res.data.status
                                    typeof cb == "function" && cb(that.globalData)
                                  })
                              },
                              fail: function () {
                                console.log("3授权失败返回数据");
                              }
                            });
                          }
                        }
                      },
                      fail: function () {
                        console.log("设置失败返回数据");
                        that.opensetting(code);
                      }
                    });
                  } else if (res.cancel) {
                    console.log("用户点击了取消")
                  }
                }
              });
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
    color:null
  }
})


