// pages/add_manager/add_manager.js
var app = getApp()
var util = require('../../utils/util.js');
var phone_close = "";
var isclose = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isclose: false,
    phone_close: false,
    name_value: '',
    phone_value: '',
    radioCheckVal: 1,
    dateValue: '2017-10-01',
    name: '',
    person_list: 0,
    state: false,
    person_name: [],
    num: [],
    color: '#ffffff',
    pass_id: '',
    num_value: '',
    message_length: 0,
    message_value: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        user_id_en: userInfo.user_id_en,
        // color: userInfo.color,
      })
      if (options.pass_id) {
        that.setData({
          pass_id: options.pass_id,
        })
        console.log(options.pass_id)
      }
      var customer_id_en = util.customer_id_en;
      var http_host = util.http_host;
      var user_id_en = util.user_id_en;
      var person_list = that.data.person_list;
      var person_name = that.data.person_name;
      var num = that.data.num;
      wx.request({
        url: http_host + '/mini_program/wa_card/back/index.php/Home/miniprogram/fields',
        data: {
          customer_id_en: customer_id_en,
          user_id_en: user_id_en,
        },
        success: function (res) {
          console.log(res)
          if (res.data.form) {
            for (var i = 0; i < res.data.form.length; i++) {
              if (res.data.form[i].type == 0) {
                num.push(res.data.form[i].name)
              }
            }
            console.log(num)
            that.setData({
              person_list: res.data.form,
              person_name: person_name,
            })
          }
          if (res.data.is_manager == 1) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '您已经是管理员！',
              success: function (res) {
                wx.navigateBack()
              }
            })
          }
        }
      })
    });
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
  // input输入的时候
  closetap: function (e) {
    var that = this;
    var value = e.detail.value;
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var isclose = 'isclose[' + index + ']';
    var name_value = 'name_value[' + index + ']';
    // console.log(isclose)
    // console.log(name_value);
    // console.log(value);
    if (value) {
      that.setData({
        [isclose]: true,//isclose[0]
        [name_value]: value,
      })
    } else {
      that.setData({
        [isclose]: false,
        [name_value]: '',
      })
    }
    // console.log(isclose)
  },
  // 点击关闭按钮
  clear_name: function (e) {
    var that = this;
    var name = e.currentTarget.dataset.cname;
    var name_value = that.data.name_value;
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var name_value = 'name_value[' + index + ']';
    var isclose = 'isclose[' + index + ']';
    // console.log(index);
    // console.log(name)
    // console.log([name_value])
    that.setData({
      [name_value]: "",
      [isclose]: false,
    })
  },
  formSubmit: function (e) {
    var that = this;
    var num = that.data.num;
    var num_value = that.data.num_value;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var user_id_en = util.user_id_en;
    var message_value = that.data.message_value;
    console.log(message_value)
    for (var i = 0; i < num.length; i++) {
      console.log(e.detail.value[num[i]])
      num_value = num_value + e.detail.value[num[i]] + ',';
    }
    num_value = num_value + message_value;
    console.log(num_value);
    // num_value = num_value.substr(0, num_value.length - 1)
    that.setData({
      num_value: num_value,
    })
    console.log(num_value)
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/add_manager',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: util.user_id_en,
        form: num_value,
      },
      success: function (res) {
        console.log(res)
        if (res.data.error == 1000) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '添加管理员成功',
            success: function (res) {
              wx.navigateBack()
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '添加管理员失败!请核对后重新添加',
            success: function (res) {
              wx.navigateBack()
            }
          })
        }
        that.setData({
          num_value: '',
        })
      }
    })
  },
  // 备注数字计算
  message_input: function (e) {
    var that = this;
    var message_value = e.detail.value;
    var message_length = e.detail.value.length;
    that.setData({
      message_value: message_value,
      message_length: message_length,
    });
  }

})