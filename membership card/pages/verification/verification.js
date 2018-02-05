// pages/verification/verification.js
var customer_id_en='';
var user_id_en='';
var card_count_t=[];
var share_img = '';
var util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    verifition_count:[],
    is_load:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.topColor();
    var that=this;
    card_count_t = [];
    that.verification();
  },
  verification: function () {
    var that = this;
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    var http_host = util.http_host;
    var page = that.data.page;
    var is_load=that.data.is_load;
    console.log(customer_id_en)
    console.log(user_id_en)
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/cancel_out',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        page_id: page,
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data.data);
        var verifition_count = res.data.data;
        if (that.data.page == 1) {
          if (!verifition_count) {
            that.setData({
              no_record: 1,
            })
          } else {
            that.setData({
              no_record: 0,
            })
          }
        }
        if (verifition_count) {
          if (verifition_count != null) {
            for (var i = 0; i < verifition_count.length; i++) {
              card_count_t.push(verifition_count[i]);
            }
            if (verifition_count.length < 10) {
              that.setData({
                is_load: 1,
              })
            }
          }
          var page = that.data.page;
          page = page + 1;
          that.setData({
            verifition_count: card_count_t,
            page: page
          })
          console.log(that.data.verifition_count)
          console.log(that.data.page)
        } else {
          that.setData({
            // test: 1
            is_load: 1,
          })
          console.log(is_load)
        }
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
    this.verification();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/verification/verification',
      imageUrl: share_img,
    }
  }
})