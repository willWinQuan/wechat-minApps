//app.js
var util=require("utils/util.js");
App({
  onLaunch: function () {
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //加载开始
      util.showLoading();
      //调用登录接口
      wx.login({
        success: function (res) {
      console.log("code:"+res.code);
         var code=res.code;
          wx.getUserInfo({
            success: function (res1) {
              console.log(res1)
              typeof cb == "function" && cb(that.globalData)
              var code = res.code;
              var nickName = res1.userInfo.nickName;
              var avatarUrl = res1.userInfo.avatarUrl;

              that.globalData.avatarUrl = res1.userInfo.avatarUrl;
              that.globalData.nickName = res1.userInfo.nickName;
              var data = {
                code: code,
                nickName: nickName,
                avatarUrl: avatarUrl,
              };
              util.commonRequest(
                data,
                'index.php/home/wx/getinfo_xcx?customer_id_en=' + util.customer_id_en + '&activity_id=' + util.activity_id + '',
                function (res) {
                  console.log("授权返回数据："+JSON.stringify(res))
                  //获取user_id_en
                  that.globalData.user_id_en  = res.data.user_id_en;
                  //获取解码后user_id
                  that.globalData.user_id = res.data[0].id;
                  that.globalData.imgurl=res.data.imgurl;
                  typeof cb == "function" && cb(that.globalData)
                })
            },
            fail:function(res){
              console.log("获取登录信息失败：" + JSON.stringify(res));
              // 显示提示弹窗
              wx.showModal({
                title: '温馨提示',
                content: '此小程序需要您同意授权,环境安全,请放心授权',
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
                                util.commonRequest(
                                  data,
                                  'index.php/home/wx/getinfo_xcx?customer_id_en=' + util.customer_id_en + '&activity_id=' + util.activity_id + '',
                                  function (res) {
                                    console.log("重新授权返回数据：" + JSON.stringify(res))
                                    //获取user_id_en
                                    that.globalData.user_id_en = res.data.user_id_en;
                                    //获取解码后user_id
                                    that.globalData.user_id = res.data[0].id;
                                    that.globalData.imgurl = res.data.imgurl;
                                    typeof cb == "function" && cb(that.globalData)
                                  })
                              },
                              fail: function () {
                                console.info("3授权失败返回数据");
                              }
                            });
                          }
                        }
                      },
                      fail: function () {
                        console.info("设置失败返回数据");
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
        fail:function(res){
          console.log("登录失败："+JSON.stringify(res));
          wx.showToast({
            icon:"warn",
            title: '登录失败',
          })
        }
      });
    }
  },
  globalData:{
    user_id_en:null,
    user_id:null,
    customer_id_en: util.customer_id_en,
    activity_id: util.activity_id,
    nickName:null,
    avatarUrl:null,
    imgurl:null //背景图片
  }
})



