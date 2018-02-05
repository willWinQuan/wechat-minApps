// pages/renew/renew.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user_id_en:"",
      ischecked:'',
      array:[],
      days:"",
      money:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      that.setData({
          user_id_en:util.user_id_id_en
      });
      var data={
          customer_id_en: util.customer_id_en
      }
      util.commonRequest(
          data,
          '/mini_program/minvite/back/index.php/home/frontweb/purchase_web',
          function(res){
              console.log("续费页面"+JSON.stringify(res));
              that.setData({
                  array:res.data.fee_set,
                  days:res.data.fee_set[0].days,
                  money: res.data.fee_set[0].money
              })
          }
      )
  },
  tapchoose:function(e){
      var that=this;
      var index = e.currentTarget.dataset.index;
      var array = that.data.array;
        that.setData({
            ischecked:index,
            days: array[index].days,
            money: array[index].money
        })
  },
  bindpay:function(){
      var that=this;
      var data={
          customer_id_en: util.customer_id_en,
          user_id_en: util.user_id_en,
          days:that.data.days,
          money:that.data.money
      };
      util.commonRequestPost(
          data,
          '/mini_program/minvite/back/index.php/home/frontweb/purchase_service',
          function(res){
              console.log("请求支付"+JSON.stringify(res));
              if(res.data.err_code !=1000){
                  wx.showModal({
                      title: '提示',
                      content: res.data.data,
                      showCancel:false
                  })
                  return;
              };
              wx.requestPayment({
                  timeStamp:res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: res.data.signType,
                  paySign: res.data.paySign,
                  complete:function(res){
                      console.log(res);
                      if (res.errMsg == "requestPayment:ok"){
                          wx.showModal({
                              title: '提示',
                              content: '支付成功',
                              showCancel: false,
                              success:function(res){
                                  if(res.confirm){
                                      wx.redirectTo({
                                          url: '../posting-position/posting-position',
                                      })
                                  }
                              }
                          });
                      }else{
                          wx.showModal({
                              title: '提示',
                              content: "支付失败",
                              showCancel: false
                          })  
                      }  
                  }
              })
          }
      )
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
    var that=this;
    var data={
      customer_id_en: util.customer_id_en,
    };
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/frontweb/purchase_web',
      function(res){
        console.log(res)
        that.setData({
          array:res.data.fee_set,
        })
      }
    )
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