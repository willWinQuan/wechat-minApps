// pages/new_password/new_password.js
// var util=require('../../utils/util.js');
var count_down='';
var share_img = '';
var util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code_value:'',
    password_value:'',
    sure_password_value:'',
    send_code:'发送验证码',
    count_down:'',
    select_type:'password',
    select_type2:'',
    color:'',
    tel:'',
    focus1:false,
    password_state:0,
    focus2:false,
    password_state2:0,
    select_type2:'password',
    disabled_status:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.topColor();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    clearInterval(count_down);
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
        console.log(res.data.data)
        that.setData({
          color: res.data.data
        })
      },
      fail: function (res) {
        // console.log('no')
      }
    })
    //
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
    util.share(function (res) {
      console.log(res);
      share_img = res;
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(count_down);
    util.topColor();
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
      path: '/pages/new_password/new_password',
      imageUrl: share_img,
    }
  },
  // 发送验证码
  sendCodetap:function(){
    var that=this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var user_id_en = util.user_id_en;
    var send_code = that.data.send_code;
    var count_down=setInterval(function(){
      if (send_code == '发送验证码' || send_code=='重新发送'){
        send_code = 60; 
        wx.request({
          url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/sendmsg',
          data: {
            customer_id_en: customer_id_en,
            user_id_en: user_id_en,
            op:'password',
          },
          success: function (res) {
            console.log(res)
           },
          fail: function (res) { },
          complete: function (res) { },
        })   
      }
      send_code--;
      that.setData({
        send_code: send_code,
      });
      
      if (send_code == 0) {
        that.setData({
          send_code: '重新发送',
        });
        clearInterval(count_down)
      }

    },1000);  
   
  },
  toggle_password:function(){
    var that=this;
    var password_state = that.data.password_state;
    if (password_state==0){
      that.setData({
        password_state:1,
        select_type:'text',
        focus1:true,
      })
    }else{
      that.setData({
        password_state: 0,
        select_type: 'password',
        focus1: true,
      })
    }
  },
  toggle_password_sure:function(){
    var that = this;
    var password_state2 = that.data.password_state2;
    if (password_state2 == 0) {
      that.setData({
        password_state2: 1,
        select_type2: 'text',
        focus2: true,
      })
    } else {
      that.setData({
        password_state2: 0,
        select_type2: 'password',
        focus2: true,
      })
    }
  },
  // 验证码失去焦点
  noteCode:function(e){
    var that=this;
    that.setData({
      code_value:e.detail.value,
    })
    var code_value = that.data.code_value;
    var reg = new RegExp(/^\d{6}$/);
  },
  
  // 新支付密码失去焦点
  newPassword:function(e){
    var that=this;
    that.setData({
      password_value: e.detail.value,
    });
  },
  // 确认密码失去焦点
  surePassword:function(e){
    var that=this;
    // var password_value = that.data.password_value;
    that.setData({
      sure_password_value:e.detail.value,
    });
  },
  // 点击确认修改按钮
  alter_info:function(){
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var user_id_en = util.user_id_en;
   
    var reg = new RegExp(/^\d{6}$/);
    that.setData({
      disabled_status:true,
    })

    setTimeout(function(){
      var code_value = that.data.code_value;      
      var password_value = that.data.password_value;
      var sure_password_value = that.data.sure_password_value;
      wx.request({
        url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/change_password',
        data: {
          customer_id_en: customer_id_en,
          user_id_en: user_id_en,
          code: code_value,
          password: password_value,
          repassword: sure_password_value,
        },
        success: function (res) {
          console.log(res)
          if (res.data.error == 1000) {
            wx.showModal({
              title: '提示',
              content: '修改成功',
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../mine/mine',
                  })
                }
              }
            })
          } else {
            util.showModal('提示', res.data.data, false, function () { })
          }
        }
      })
    },1000)  

    // button 禁用
    setTimeout(function () {
      that.setData({
        disabled_status: false,
      })
    }, 1000)
  },
  inputType:function(e){
    console.log(e);
  }
})