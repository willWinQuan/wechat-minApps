var util=require('../../utils/util.js');
var customer_id_en = util.customer_id_en;
var http_host = util.http_host;
var user_id_en = "";
var page_id=1;
var card_count_t = [];
var share_img = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_calc:true,
    ckdata:[],
    usable_num:5,
    lose_num:2,
    color:'',
    is_use:1,
    page: 1,
    is_load: 0,
    no_record: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    card_count_t = [];
    util.topColor();
    user_id_en=util.user_id_en; 
    that.ckdata(1,true);
    that.time_card();
  },
  ckdata:function(is_use,my_calc){
    var that=this;
    var data = {
      customer_id_en,
      user_id_en,
      page_id,
      is_use: is_use,
    }
   
    util.commonRequest(
      data,
      "/mini_program/wa_card/back/index.php/home/miniprogram/my_time_card",
      function (res) {
        console.log("我的计次"+JSON.stringify(res));
          that.setData({
            ckdata:res.data.data,
            my_calc: my_calc,
            is_use:is_use
          })  
      }
    )

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  bindmy_card:function(e){
    var is_use = e.currentTarget.dataset.isuse;
    var carid = e.currentTarget.dataset.cardid;
    if(is_use==1){
      wx.navigateTo({
        url: '../buy_time/buy_time?carid=' + carid +'&user_id_en='+user_id_en+'',
      })
    }else if(is_use==2){
      wx.showToast({
        title: '已失效',
        icon:'warn'
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.topColor();
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/color_style',
      data: {
        customer_id_en: customer_id_en,
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          color: res.data.data
        })
      },
      fail: function (res) {
        // console.log('no')
      }
    })
    util.share(function (res) {
      console.log(res);
      share_img = res;
    })
  },
  // 上拉加载
  time_card: function () {
    var that = this;
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    var http_host = util.http_host;
    var page = that.data.page;
    var is_load = that.data.is_load;
    var is_use=that.data.is_use;
    console.log(customer_id_en)
    console.log(user_id_en)
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/my_time_card',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        page_id: page,
        is_use:is_use,
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data.data);
        var ckdata = res.data.data;
        if (that.data.page == 1) {
          if (!ckdata) {
            that.setData({
              no_record: 1,
            })
          } else {
            that.setData({
              no_record: 0,
            })
          }
        }
        if (ckdata) {
          if (ckdata != null) {
            for (var i = 0; i < ckdata.length; i++) {
              card_count_t.push(ckdata[i]);
            }
            if (ckdata.length < 8) {
              that.setData({
                is_load: 1,
              })
            }
          }
          var page = that.data.page;
          page = page + 1;
          that.setData({
            ckdata: card_count_t,
            page: page
          })
          console.log(that.data.page)
        } else {
          that.setData({
            is_load: 1,
          })
        }
      },
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
    this.time_card();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/my_calculate/my_calculate',
      imageUrl: share_img,
    }
  },
  usabletap:function(){
    this.ckdata(1,true);
    var is_use=this.data.is_use;
    this.setData({
      is_use:1,
    })
  },
  losetap:function(){
    this.ckdata(2,false);
    var is_use = this.data.is_use;
    this.setData({
      is_use: 2,
    })
  },
  buy_time:function(){
    wx.navigateTo({
      url:'../buy_time/buy_time'
    })
  }
})