// pages/regulation/regulation.js
var share_img = '';
var cardcode = '';
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      rudata:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      util.topColor();
      cardcode = options.cardcode;
      console.log(cardcode)
      this.ruledata();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  ruledata: function (){
     var that=this;
     var data={
       customer_id_en: util.customer_id_en,
       cardcode: cardcode,
     }
     util.commonRequest(
       data,
       "/mini_program/wa_card/back/index.php/home/frontweb/rule_content",
       function(res){
         console.log(res)
        console.log("次卡使用规则："+JSON.stringify(res));
         that.setData({
           rudata:res.data.ruletext
         })
       }
     )
   },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
      path: '/pages/regulation/regulation',
      imageUrl: share_img,
    }
  }
})