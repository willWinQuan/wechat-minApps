// pages/mypersonal/mypersonal.js
var activity_id="";
var customer_id_en="";
var user_id="";
var user_id_en="";
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
var config=require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexflag: false,//底部导航
    myCrowdflag: false,
    personalflag: true,
    user_id:'',//用户id
    nickName:"",//微信用户昵称
    avatarUrl:"",//微信用户头像
    phbackground: ""//背景图
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    activity_id = util.activity_id;
    customer_id_en = util.customer_id_en;
    
    user_id_en = app.globalData.user_id_en;
    user_id = app.globalData.user_id;
    that.setData({
      user_id:user_id,
      nickName: app.globalData.nickName,
      avatarUrl: app.globalData.avatarUrl,
      phbackground: app.globalData.imgurl//背景图
    })
  },
  myCrowdfunding: function () {
    this.setData({
      indexflag: false,
      myCrowdflag: true,
      personalflag: false
    })

    wx.navigateTo({
      url: '../mycrowdfunding/mycrowdfunding?customer_id_en=' + customer_id_en + '&user_id_en=' + user_id_en + '&activity_id=' + activity_id + '&user_id=' + user_id + ''
    })

  },
  myorder: function () {
    this.setData({
      indexflag: false,//底部导航
      myCrowdflag: false,
      personalflag: true
    })
    wx.navigateTo({
      url: '../myorder/myorder?user_id_en='+user_id_en+''
    })
  },
  tabmyCrowdfunding: function () {
    this.setData({
      indexflag: false,//底部导航
      myCrowdflag: true,
      personalflag: false
    })

    wx.redirectTo({
      url: '../mycrowdfunding/mycrowdfunding?customer_id_en=' + customer_id_en + '&user_id_en=' + user_id_en + '&activity_id=' + activity_id + '&user_id=' + user_id + ''
    })

  },
  tabindex:function(){
    this.setData({
      indexflag: true,//底部导航
      myCrowdflag: false,
      personalflag: false
    })
    wx.redirectTo({
      url: '../index/index',
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
    this.setData({
      indexflag: false,//底部导航
      myCrowdflag: false,
      personalflag: true
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
  
  }
})