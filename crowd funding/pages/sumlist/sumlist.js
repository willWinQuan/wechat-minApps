// sumlist.js
var customer_id_en="";
var apply_id="";//发起id
var user_id="";
var activity_id="";
var user_id_en="";
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     sumlist:"",
     indexflag: true,//底部导航
     myCrowdflag: false,
     personalflag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载开始
    util.showLoading();
    customer_id_en = options.customer_id_en;
    apply_id=options.apply_id;
    user_id = options.user_id;
    activity_id = options.activity_id;
    user_id_en = options.user_id_en;

    var that=this;
    that.sumlistdata();
  },
 sumlistdata:function(){
   var that=this;
   var data = {
     customer_id_en,
     apply_id
   }
   util.commonRequest(
     data,
     'index.php/home/Crowdfund/rank_list',
     function (res) {
       console.log("排行榜-页面：" + JSON.stringify(res))
       that.setData({
         sumlist: res.data.crowdfund_data
       })
       //加载结束
       util.hideToast();
       wx.hideNavigationBarLoading() //完成停止加载
       wx.stopPullDownRefresh() //停止下拉刷新
     });
 },
 tabpersoanl: function () {
   this.setData({
     indexflag: false,//底部导航
     myCrowdflag: false,
     personalflag: true
   })
   wx.redirectTo({
     url: '../mypersonal/mypersonal?user_id_en=' + user_id_en + '&user_id=' + user_id + '',
   })
 },
 tabmyCrowdfunding: function () {
   this.setData({
     indexflag: false,//底部导航
     myCrowdflag: true,
     personalflag: false
   })
   //加载开始
   util.showLoading();
   wx.redirectTo({
     url: '../mycrowdfunding/mycrowdfunding?customer_id_en=' + customer_id_en + '&user_id_en=' + user_id_en + '&activity_id=' + activity_id + '&user_id=' + user_id + ''
   })
   //加载结束
   util.hideToast();
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
    var that = this;
    that.sumlistdata();
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
    var that = this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    that.sumlistdata();
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
