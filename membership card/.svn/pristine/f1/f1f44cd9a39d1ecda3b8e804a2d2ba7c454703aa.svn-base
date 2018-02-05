// pages/my_ticket/my_ticket.js
var share_img = '';
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discount_list: [],
    no_use: [],
    my_ticket: true,
    color: '',
    http_host: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.topColor();
    this.setData({
      http_host: util.http_host
    })
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
    var user_id_en = util.user_id_en;
    var discount_list = that.data.discount_list;
    var no_use = that.data.no_use;
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
    //优惠券接口
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/frontweb/my_coupon',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en
      },
      success: function (res) {
        console.log(res.data.err_data)
        var my_ticket_data = res.data.err_data;
        console.log(res);
        var data = res.data.invalid_data;
        var no_use = res.data.no_use;
        that.setData({
          discount_list: data,
          no_use: no_use
        })
      }
    })
    util.share(function (res) {
      console.log(res);
      share_img = res;
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
      path: '/pages/my_ticket/my_ticket',
      imageUrl: share_img,
    }
  },
  usabletap: function () {
    this.setData({
      my_ticket: true,
    })
  },
  losetap: function () {
    this.setData({
      my_ticket: false,
    })
  }
})