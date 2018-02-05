// pages/mall/mall.js
var app = getApp()
var htt_host='';
var customer_id_en='';
var page=0;
var util = require('../../utils/util.js');
var card_count_t=[];
var card_count_p=[];
var name='';
var share_img = '';
app.globalData.user_id_en
Page({
  /**
   * 页面的初始数据
   */
  data: {
    card_count:[],
    page_id:1,
    customer_id_en:'',
    http_host:'',
    test:1,
    is_load:0,
    no_record:0,
    card_count_t:[],
    card_count_p:[],
    search_no:0,
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 顶部颜色
    util.topColor();
    var that=this;
    var customer_id_en=util.customer_id_en;
    var http_host=util.http_host;
    var page_id=that.data.page_id;
    console.log(customer_id_en)
    console.log(http_host)
    console.log(page_id)
    
    that.setData({
      customer_id_en: customer_id_en,
      http_host: http_host,
      test:0
    })
    // console.log(customer_id_en);
    // console.log(http_host)
    
  },
  mall:function(){
    var that=this;
    var customer_id_en = that.data.customer_id_en;
    var http_host = that.data.http_host;
    var page_id = that.data.page_id;
    var name = that.data.name;   
    var card_count_p = that.data.card_count_p;
    var card_count_t = that.data.card_count_t;
    console.log(customer_id_en)
    if(name){
      var data={
        customer_id_en: that.data.customer_id_en,
        page_id: that.data.page_id,
        name:name,
      }
      wx.request({
        url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/time_card',
        data: {
          customer_id_en: that.data.customer_id_en,
          page_id: that.data.page_id,
          name:name,
        },
        success: function (res) {
          var card_count = res.data.data;
          if (card_count) {
            var length = card_count.length;
            //var new_card_count = [];
            var j = (that.data.page_id - 1) * 8
            if (length<8){
              for (var i = j; i < j + length; i++) {
                //new_card_count[i] = card_count[i];
                card_count_p.push(card_count[i])
              }
            }else{
              for (var i = j; i < j + 8; i++) {
                //new_card_count[i] = card_count[i];
                card_count_p.push(card_count[i])
              }
            }            
            that.setData({
              card_count: card_count_p,
              page_id: page_id+1
            })
          } else {
            that.setData({
              //card_count: [],
              page_id: page_id,
              search_no: 1
            })

          }
        },
      })
    }else{
      wx.request({
        url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/time_card',
        data: {
          customer_id_en: that.data.customer_id_en,
          page_id: that.data.page_id,
        },
        success: function (res) {
          var card_count = res.data.data;
          console.log(card_count)
          if (that.data.page_id == 1) {
            if (!card_count) {
              that.setData({
                no_record: 1,
              })
            } else {
              that.setData({
                no_record: 0,
              })
            }
          }
          if (card_count) {
            var length = card_count.length;
            if (length < 8) {
              if (card_count != null) {
                var j = (that.data.page_id - 1) * 8
                for (var i = j; i < j + length; i++) {
                  card_count_t.push(card_count[i]);
                }
              }
              var page_id = that.data.page_id;
              page_id = page_id + 1;
              that.setData({
                card_count: card_count_t,
                page_id: page_id,
                is_load: 1,
              })
            }else{
              if (card_count != null) {
                var j = (that.data.page_id - 1) * 8
                for (var i = j; i < j + 8; i++) {
                  card_count_t.push(card_count[i]);
                }
              }
              var page_id = that.data.page_id;
              page_id = page_id + 1;
              that.setData({
                card_count: card_count_t,
                page_id: page_id
              })
            }
          } 
          else {
            that.setData({
              is_load:1
            })
          }
        },
      })
      console.log(that.data.card_count_t)
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      this.mall()
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
    that.setData({
      page_id:1,
      card_count_t: [],
      card_count_p: [],
      name:'',
      value:''
    })

    that.mall()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/mall/mall',
      imageUrl: share_img,
    }
  },
  buy_detail:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url:'../buy_detail/buy_detail?id='+id
    })
  },
  searchtap:function(e){
    var that=this;
    var http_host=util.http_host;
    var customer_id_en=util.customer_id_en;
    var name=e.detail.value;
    var page_id=that.data.page_id;
    console.log(name);
    that.setData({
      name:name,
    })
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/time_card',
      data:{
        customer_id_en:customer_id_en,
        name:name,
        page_id: 1,
      },
      success:function(res){
        console.log(res)
        var card_count = res.data.data;
        if (that.data.page_id == 2) {        
          if (!card_count) {
            that.setData({
              no_record: 1,
            })
          } else {
            that.setData({
              no_record: 0, 
            })
          }
        }
        if (card_count){
          var length = card_count.length;
          var new_card_count = [];
          if (length < 8) {
            var j = 0
            for (var i = j; i < j + length; i++) {
              new_card_count[i] = card_count[i];
            }
            that.setData({
              is_load: 1
            })
          }else{
            var j = 0
            for (var i = j; i < j + 8; i++) {
              new_card_count[i] = card_count[i];
            }
          }
          console.log(new_card_count);
          that.setData({
            card_count_p: new_card_count,
            card_count: new_card_count,
            page_id: 2
          })  
        }else{
          that.setData({
            card_count: [],
            page_id: 2,
            is_load: 1
          })
        }
      }
    })
  }
})