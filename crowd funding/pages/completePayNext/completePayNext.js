// completePayNext.js
var user_id_en = "";
var apply_id = "";
var customer_id_en = "";
var activity_id = "";
var user_id="";
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
    user_id_en = options.user_id_en;
    apply_id = options.apply_id;
    customer_id_en = options.customer_id_en;
    activity_id = options.activity_id;
    user_id = options.user_id;//支持者id

  },
  tapindex: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  tapcheckmy: function () {
    console.log("支持支付成功返回详情");
    wx.redirectTo({
      url: '../details/details?user_id_en=' + user_id_en + '&apply_id=' + apply_id + '&customer_id_en=' + customer_id_en + '&user_id=chq&activity_id=' + activity_id + '',
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
  // onShareAppMessage: function () {
  
  // }
})