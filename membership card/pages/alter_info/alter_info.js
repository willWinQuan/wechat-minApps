// pages/alter_info/alter_info.js
var util=require('../../utils/util.js');
var share_img = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
      path: '/pages/alter_info/alter_info',
      imageUrl: share_img,
    }
  },
  person_info:function(){
    console.log(1343)
    wx.navigateTo({
      url:'../person_info/person_info'
    })
  },
  new_password:function(){
    wx.navigateTo({
      url:'../new_password/new_password'
    })
  },
  new_phone:function(){
    wx.navigateTo({
      url: '../new_phone/new_phone',
    })
  }
})