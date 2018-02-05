// pages/myorder/myorder.js


//tab切换模型
function constructor(){
var navlist = [
  {
    "id": 0,
    "img": "../img/quanbu-1.png",
    "text": "全部",
    "fontcolor": "#999"
  },
  {
    "id": 1,
    "img": "../img/daifukuang.png",
    "text": "待付款",
    "fontcolor": "#999"
  },
  {
    "id": 2,
    "img": "../img/daifahou.png",
    "text": "待发货",
    "fontcolor": "#999"
  },
  {
    "id": 3,
    "img": "../img/daishouhuo.png",
    "text": "待收货",
    "fontcolor": "#999"
  },
  {
    "id": 4,
    "img": "../img/daipingjia.png",
    "text": "已完成",
    "fontcolor": "#999"
  }
];
  return navlist;
};

//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
var customer_id_en = app.globalData.customer_id_en;
var activity_id = app.globalData.activity_id;
var user_id_en ="";
var user_id = app.globalData.user_id;
Page({
  /**
   * 页面的初始数据
   */
  data: {
     navlist: "",
     indexflag: false,//底部导航
     myCrowdflag: false,
     personalflag: true,
     orderdata:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // tab初始
    var new_navlist = new constructor();
    new_navlist[0].img='../img/quanbu.png';
    new_navlist[0].fontcolor ="#333";
    user_id_en = options.user_id_en;

    // 全部数据
    var data={
      customer_id_en: customer_id_en,
      activity_id: activity_id,
      user_id_en: user_id_en,
      type:-1
    }
    util.commonRequest(
      data,
      'index.php/home/front/mini_order',
      function(res){
        console.log("全部订单："+JSON.stringify(res));
        that.setData({
          navlist: new_navlist,
          orderdata:res.data.data 
        })
      }
    )
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
  tabindex: function () {
    this.setData({
      indexflag: true,//底部导航
      myCrowdflag: false,
      personalflag: false
    })
    wx.redirectTo({
      url: '../index/index',
    })
  },
  tabchance:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    switch (id){
      case 0:
      // 全部
      console.log(0);
      var new_navlist = new constructor();
      new_navlist[0].img = '../img/quanbu.png';
      new_navlist[0].fontcolor = "#333";

      var data = {
        customer_id_en: customer_id_en,
        activity_id: activity_id,
        user_id_en: user_id_en,
        type: -1
      };
      util.commonRequest(
        data,
        'index.php/home/front/mini_order',
        function (res) {
          console.log("全部订单：" + JSON.stringify(res));
          that.setData({
            navlist: new_navlist,
            orderdata: res.data.data
          })
        }
      );

      break;
      case 1:
      // 待付款
      console.log(1);
      var new_navlist = new constructor();
      new_navlist[1].img = '../img/daifukuang-1.png';
      new_navlist[1].fontcolor = "#333";

      var data = {
        customer_id_en: customer_id_en,
        activity_id: activity_id,
        user_id_en: user_id_en,
        type: 1
      };
      util.commonRequest(
        data,
        'index.php/home/front/mini_order',
        function (res) {
          console.log("待付款：" + JSON.stringify(res));
          that.setData({
            navlist: new_navlist,
            orderdata: res.data.data
          })
        }
      );

      break;
      case 2:
      // 待发货
      console.log(2);
      var new_navlist = new constructor();
      new_navlist[2].img = '../img/daifahou-1.png';
      new_navlist[2].fontcolor = "#333";

      var data = {
        customer_id_en: customer_id_en,
        activity_id: activity_id,
        user_id_en: user_id_en,
        type: 2
      };
      util.commonRequest(
        data,
        'index.php/home/front/mini_order',
        function (res) {
          console.log("待发货：" + JSON.stringify(res));
          that.setData({
            navlist: new_navlist,
            orderdata: res.data.data
          })
        }
      );

      break;
      case 3:
      // 待收货
      console.log(3);
      var new_navlist = new constructor();
      new_navlist[3].img = '../img/daishouhou-1.png';
      new_navlist[3].fontcolor = "#333";

      var data = {
        customer_id_en: customer_id_en,
        activity_id: activity_id,
        user_id_en: user_id_en,
        type: 3
      };
      util.commonRequest(
        data,
        'index.php/home/front/mini_order',
        function (res) {
          console.log("待收货：" + JSON.stringify(res));
          that.setData({
            navlist: new_navlist,
            orderdata: res.data.data
          })
        }
      );
      break;
      case 4:
      // 已完成
      console.log(4);
      var new_navlist = new constructor();
      new_navlist[4].img = '../img/daipingjia-1.png';
      new_navlist[4].fontcolor = "#333";

      var data = {
        customer_id_en: customer_id_en,
        activity_id: activity_id,
        user_id_en: user_id_en,
        type: 4
      };
      util.commonRequest(
        data,
        'index.php/home/front/mini_order',
        function (res) {
          console.log("已完成：" + JSON.stringify(res));
          that.setData({
            navlist: new_navlist,
            orderdata: res.data.data
          })
        }
      );
      
      break;
    }
  },
  orderdetail:function(){
     wx.navigateTo({
       url: '../orderdetail/orderdetail',
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
  onShareAppMessage: function () {
  
  }
})