var customer_id_en='';
var http_host='';
var card_count_t=[];
var util=require('../../utils/util.js');
var share_img = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consume_record:[],
    integral:'',
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
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    var http_host = util.http_host;
    var page=that.data.page;
    var consume_record = that.data.consume_record;

    card_count_t = [];
    that.integral();
  },
  integral: function () {
    var that = this;
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    var http_host = util.http_host;
    var page = that.data.page;
    var is_load=that.data.is_load;
    var integral = that.data.integral;

    console.log(customer_id_en)
    console.log(user_id_en)
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/integral_record',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        page_id: page,
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data.data);
       var consume_record = res.data.data;
        that.setData({
          integral: res.data.integral.points,
        })
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
            // card_count_t=[];
            for (var i = 0; i < consume_record.length; i++) {
              card_count_t.push(consume_record[i]);
            }
            if (consume_record.length<8){
              that.setData({
                is_load: 1,
              })
            }
          }
          var page = that.data.page;
          page = page + 1;
          console.log(that.data.consume_record)
          that.setData({
            consume_record: card_count_t,
            page: page
          })
          console.log(that.data.consume_record)
          console.log(that.data.page)
        } else {
          that.setData({
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
    console.log("7")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("6")
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
    var that = this;

    that.integral();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/integral_query/integral_query',
      imageUrl: share_img,
    }
  }
})