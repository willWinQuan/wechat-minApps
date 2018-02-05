// pages/buy_detail/buy_detail.js
var app = getApp()
var htt_host = '';
var customer_id_en = '';
var util=require('../../utils/util.js');
var share_img = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_id_en:'',
    http_host:'',
    user_id_en:'',
    content:'',
    id:'',
    img:'',
    background_color:'',
    name:'',
    price:'',
    time:'',
    title:'',
    card_number:"",
    times:"",
    color:'',
    card_color:'',
    user_status:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 顶部颜色
    util.topColor();
    // 
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var page_id = that.data.page_id;
    var user_id_en = util.user_id_en;
    console.log(customer_id_en)
    console.log(http_host)
    console.log(options)
    // 
    that.setData({
      customer_id_en: customer_id_en,
      http_host: http_host,
      id: options.id,
      user_id_en: user_id_en
    })
    that.detalidata();
  },
  detalidata:function(){
    var that=this;
    wx.request({
      url: util.http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/time_card_detail',
      data: {
        customer_id_en: that.data.customer_id_en,
        id: that.data.id,
        user_id_en: that.data.user_id_en
      },
      success: function (res) {
        console.log(res)
        var data = res.data.data;
        console.log(data);
        var content = data.content;
        var id = data.id;
        var img = data.img;
        var color = data.color;
        var name = data.name;
        var price = data.price;
        var time = data.time;
        var title = data.title;
        if (data.img){
          var card_color = '';
        }else{
          var card_color = data.color;
        }
        that.setData({
          id: id,
          content: content,
          img: img,
          background_color:color,
          name: name,
          price: price,
          time: time,
          title: title,
          card_number: data.card_number,
          times: data.times,
          card_color:card_color,
          user_status:data.user_status
        })
      },
    })
  },
  formSubmitTopay:function(){
      var that=this;
      if (that.data.user_status == "0") {
          wx.showModal({
              title: '温馨提示',
              content: '该会员已被冻结',
              showCancel: false,
          })
          return;
      }
      var data={
        customer_id_en: that.data.customer_id_en,
        user_id_en: that.data.user_id_en,
        paytype:-2,
        number_card_id:that.data.id,
        cardcode: that.data.card_number,
        price:that.data.price,
        money:that.data.price
      };
      console.log(data);
      wx.request({
        url: util.http_host + '/mini_program/wa_card/back/index.php/home/frontweb/paymini',
        data: data,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (response) {
          console.log(response);
          if (response.data.err_code==0){
            wx.showModal({
              title: '提示',
              content: response.data.err_data,
              showCancel: false,
              success: function (res) {
                console.log(res)
                if (res.confirm) {
                  setTimeout(function () {
                    wx.switchTab({
                      url: "../mine/mine"
                    }, 100)
                  })
                } 
              }
            });
            return;
          }
           wx.requestPayment({
             'appId': response.data.appId,
             'timeStamp': response.data.timeStamp,
             'nonceStr': response.data.nonceStr,
             'package': response.data.package,
             'signType': 'MD5',
             'paySign': response.data.paySign,
             'success': function (res) {
               wx.showToast({
                 title: '支付成功',
                 icon: 'success',
                 success: function () {
                     var data = {
                         customer_id_en: that.data.customer_id_en,
                         user_id_en: that.data.user_id_en,
                         form_id: response.data.package,
                         tl_type: 5,
                         page: "pages/index/index",
                         cardcode: that.data.card_number
                     };
                     wx.request({
                         url: util.http_host + '/mini_program/wa_card/back/index.php/home/frontweb/tpl_may',
                         data: data,
                         method: 'POST',
                         header: {
                             "Content-Type": "application/x-www-form-urlencoded"
                         },
                         success: function (res) {
                             console.log("模板消息：" + JSON.stringify(res));
                         }
                     });  
                   wx.navigateTo({
                     url: '../my_calculate/my_calculate',
                   })
                 }
               });
             },
             'fail': function (res) {
               console.log(res);
             }
           });
        },
        'fail': function (res) {
          console.log(res);
        }
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
      path: '/pages/buy_detail/buy_detail',
      imageUrl: share_img,
    }
  },
})