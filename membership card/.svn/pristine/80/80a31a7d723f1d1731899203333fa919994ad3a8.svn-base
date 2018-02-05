var customer_id_en='';
var http_host='';
var card_count_t=[];
var share_img = '';
var util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recharge_count:[],
    card_name:'',
    card_img:'',
    is_load:0,
    page:1,
    no_record: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.topColor();
    var that=this;
    card_count_t = [];
    that.recharge();
  },
  recharge: function () {
    var that = this;
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    var http_host = util.http_host;
    var page = that.data.page;
    var is_load=that.data.is_load;
    console.log(customer_id_en)
    console.log(user_id_en)
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/Home/Membership/orders',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        type: 1,
        page: page,
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data.data);
        if(res.data){
          var recharge_count = res.data.data;
          that.setData({
            card_name: res.data.name,
            card_img: res.data.img,
          })
        }
        if(res.data==null){
          var recharge_count=res.data;
          console.log(recharge_count)
        }
        
        if (that.data.page == 1) {
          if (!recharge_count) {
            that.setData({
              no_record: 1,
            })
          } else {
            that.setData({
              no_record: 0,
            })
          }
        }
        if (recharge_count) {
          if (recharge_count != null) {
            for (var i = 0; i < recharge_count.length; i++) {
              card_count_t.push(recharge_count[i]);
            }
            if (recharge_count.length<10){
              that.setData({
                is_load: 1
              })
            }
          }
          var page = that.data.page;
          page = page + 1;
          that.setData({
            recharge_count: card_count_t,
            page: page
          })
          console.log(that.data.recharge_count)
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
    this.recharge();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/recharge_record/recharge_record',
      imageUrl: share_img,
    }
  }
})