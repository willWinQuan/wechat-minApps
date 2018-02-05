var customer_id_en='';
var http_host='';
var card_count_t=[];
var util=require('../../utils/util');
var share_img = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consume_record:[],
    page:1,
    is_load:0,
    no_record:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.topColor();
    var that=this;
    card_count_t = [];
    that.consume();
  },
  consume: function () {
    var that = this;
    var customer_id_en = util.customer_id_en;
    var user_id_en=util.user_id_en;
    var http_host = util.http_host;
    var page = that.data.page;
    var is_load = that.data.is_load;
    console.log(customer_id_en)
    console.log(user_id_en)
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/Home/Membership/orders',
      data: {
        customer_id_en: customer_id_en,
        user_id_en:user_id_en,
        page: page,
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data.data);
        var consume_record = res.data;
        if (that.data.page == 1) {
          if (!consume_record) {
            that.setData({
              no_record: 1,
            })
          } else {
            that.setData({
              no_record: 0,
            })
          }
        }
        if (consume_record) {
          if (consume_record != null) {
            for (var i = 0; i < consume_record.length; i++) {
              card_count_t.push(consume_record[i]);
            }
            if (consume_record.length<10){
              that.setData({
                is_load: 1,
              })
            }
          }
          var page = that.data.page;
          page = page + 1;
          that.setData({
            consume_record: card_count_t,
            page: page
          })
          console.log(that.data.consume_record)
          console.log(that.data.page)
        } else {
          that.setData({
            is_load:1,
          })
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
    this.consume();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/consume_record/consume_record',
      imageUrl: share_img,
    }
  }
})