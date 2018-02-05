// pages/membership_card/membership_card.js
var app = getApp()
var htt_host = '';
var customer_id_en = '';
var share_img = '';
var util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_id_en:'',
    http_host:'',
    data:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.topColor();
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var that=this;
    // 
    that.setData({
      customer_id_en: customer_id_en,
      http_host: http_host
    })
    // 
      wx.request({
        url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/power',
        data: {
          customer_id_en: that.data.customer_id_en,
        },
        success: function (res) {
          var data=res.data.data
          console.log(data)
          that.setData({
              data:data
          })
        },
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
      path: '/pages/membership_card/membership_card',
      imageUrl: share_img,
    }
  }
})