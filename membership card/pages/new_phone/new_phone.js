// pages/new_phone/new_phone.js
var util = require('../../utils/util.js');
var app = getApp();
var share_img = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pisfocus: true,
    pnumber: "",
    ynumber: "",
    color: "",
    tel: "",
    toastHidden: true,
    toastcontent: "",
    sendmsg:60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/color_style',
      data: {
        customer_id_en: customer_id_en,
      },
      success: function (res) {
        that.setData({
          color: res.data.data
        })
      },
      fail: function (res) {
        // console.log('no')
      }
    })

    var user_id_en = util.user_id_en;
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/password',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
      },
      success: function (res) {
        console.log(res);
        if (res.data.error == 1000) {
          that.setData({
            tel: res.data.data,
          })
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '您还未绑定手机号码，或者号码有误，请重新绑定',
            success: function (res) {
              wx.navigateTo({
                url: '../person_info/person_info'
              })
            },
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindchance: function () {
    var ma = this.data.ynumber;
    var that = this;
    var pnumber = that.data.pnumber;
    if (ma.length != 6) {
        that.setData({
            toastHidden: false,
            toastcontent: '验证码错误'
        })
        return;
    }
    if (that.data.pnumber.length != 11) {
        that.setData({
            toastHidden: false,
            toastcontent: '手机号长度不对'
        })
        return;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(pnumber)) {
        that.setData({
            toastHidden: false,
            toastcontent: '手机号有误'
        })
        return;
    }
    var data = {
      customer_id_en: util.customer_id_en,
      user_id_en: app.globalData.user_id_en,
      tel_number: that.data.pnumber,
      tel_yzm: that.data.ynumber
    }
    wx.request({
      url: util.http_host + '/mini_program/wa_card/back/index.php/home/frontweb/update_phone_number',
      data: data,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("修改手机号码：" + JSON.stringify(res));
        if (res.data.err_code == "1") {
          wx.showToast({
            title: '修改成功',
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../mine/mine',
            })
          }, 1000)
        } else if (res.data.err_code == "0") {
          that.setData({
            toastHidden: false,
            toastcontent: '修改失败'
          })
        }
      }
    })
  },
  pconfirm: function (e) {
    var pnumber = e.detail.value;
    var that = this;
    this.setData({
      pnumber: pnumber
    })
  },
  yconfirm: function (e) {
    var that = this;
    var ynumber = e.detail.value;
    this.setData({
      ynumber: ynumber
    })
    
  },
  sendma: function () {
    var that = this;
    if (that.data.pnumber.length != 11) {
      that.setData({
        toastHidden: false,
        toastcontent: '手机号码有误'
      })
      return;
    }
    var data = {
      customer_id_en: util.customer_id_en,
      user_id_en: app.globalData.user_id_en,
      phone: that.data.pnumber,
      op: 'reset'
    }
    console.log(data);
    util.commonRequest(
      data,
      "/mini_program/wa_card/back/index.php/home/miniprogram/sendmsg",
      function (res) {
        console.log("验证码" + JSON.stringify(res));
        if (res.data.error != 1000) {
          wx.showModal({
            title: '提示',
            content: res.data.data,
            showCancel: false
          })
        }
        else if (res.data.error == 1000) {
          wx.showToast({
            title: '发送短信成功',
          })  
          var num = that.data.sendmsg;
       var timer=setInterval(function(){
            num=num-1;
            if(num==0){
              clearInterval(timer);
              that.setData({
                  sendmsg: 60
              })
            } else{
                that.setData({
                    sendmsg: num
              })
            }
          },1000)
         
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.topColor();
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/color_style',
      data: {
        customer_id_en: customer_id_en,
      },
      success: function (res) {
        that.setData({
          color: res.data.data
        })
      },
      fail: function (res) {
        // console.log('no')
      }
    })
    util.share(function (res) {
      console.log(res);
      share_img = res;
    })
  },
  toastChange: function () {
    this.setData({
      toastHidden: true,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/new_phone/new_phone',
      imageUrl: share_img,
    }
  }
})
