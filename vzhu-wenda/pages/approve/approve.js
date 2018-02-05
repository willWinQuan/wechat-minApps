// pages/approve/approve.js
let util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
      apply_money:0,
      apply_protocol:'无',
      protocol_sw:2,
      color:'',//主题色
      isshowall:false//是否展示全部规则说明
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that=this;
     that.shwo_data();
     that.setData({
         color:util.color
     })
  },
  showall:function(){
       this.setData({
           isshowall:true
       })
  },
  shownoall:function(){
      this.setData({
          isshowall:false
      })
  },
  shwo_data:function(){
      let that=this;
      let data={
          customer_id_en: util.customer_id_en
      };
      util.commonRequest(
          data,
          '/mini_program/applets/index.php/answer/frontweb/expert_applyweb',
          res=>{
           console.log(res);
           that.setData({
               apply_money: res.data.data.apply_fee,
               apply_protocol: res.data.data.apply_protocol
           })
          }
      )
  },
  isagreement:function(){
     let that=this;
     let protocol_sw = that.data.protocol_sw;
     switch (protocol_sw){
         case 1: protocol_sw=2;break;
         case 2: protocol_sw=1;break;
     };
     that.setData({
         protocol_sw: protocol_sw
     })
  },
  toSetting:function(){
      let that=this;
      let protocol_sw = that.data.protocol_sw;
      let data = {
          customer_id_en: util.customer_id_en,
          user_id_en: util.user_id_en,
          protocol_sw: protocol_sw
      };
      util.commonRequest(
          data,
          '/mini_program/applets/index.php/answer/frontweb/applyexpert',
          function (res) {
              console.log("请求支付" + JSON.stringify(res));
              if (res.data.errcode != 0) {
                  if (res.data.errcode==1000 || res.data.errcode==3){//免费申请 || 已支付
                      wx.showModal({
                          title: '提示',
                          content: res.data.data,
                          showCancel: false,
                          success:function(res){
                              if(res.confirm){
                                wx.redirectTo({
                                    url: '../setting/setting?type=1',
                                })
                              }
                          }
                      })
                      return;
                  }else{
                      wx.showModal({
                          title: '提示',
                          content: res.data.data,
                          showCancel: false
                      })
                      return; 
                  } 
              };
              wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: res.data.signType,
                  paySign: res.data.paySign,
                  complete: function (res) {
                      console.log(res);
                      if (res.errMsg == "requestPayment:ok") {
                          wx.showModal({
                              title: '提示',
                              content: '支付成功',
                              showCancel: false,
                              success: function (res) {
                                  if (res.confirm) {
                                      wx.redirectTo({
                                          url: '../setting/setting?type=1',
                                      })
                                  }
                              }
                          });
                      } else {
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
    //   wx.navigateTo({
    //       url: '../setting/setting?type=1',
    //   })
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
      wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: util.color,
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