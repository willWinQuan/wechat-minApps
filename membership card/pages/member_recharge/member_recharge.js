var util=require('../../utils/util.js');
var share_img = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargestate:true,
    detail:'',
    count:1,
    color:'',
    now:0,
    prev:'',
    img:'',
    number:'',
    title:'',
    detail_length:0,
    http_host:'',
    now:'',
    prev:'',
    isFrozen:'',
    user_status: '',
    user_status_desc: '',
    color1:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.topColor();
    var that = this;
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    var http_host = util.http_host;
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/Home/Membership/recharge',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en
      },
      success: function (res) {       
        console.log(res)
        that.setData({
          detail: res.data.discounts,
          detail_length: res.data.discounts.length,
          now:res.data.now,
          prev:res.data.prev,
          img: res.data.img,
          color1: res.data.color,
          number: res.data.number,
          title: res.data.title,
          http_host:http_host,
          isFrozen: res.data.isFrozen,
          user_status: res.data.user_status,
          user_status_desc: res.data.user_status_desc
        })
        if (res.data.discounts.length!=0){
          that.setData({
            now: res.data.discounts[0].now,
            prev: res.data.discounts[0].prev,
            http_host: http_host
          })
        }else{
          // wx.showModal({
          //   title: '温馨提示',
          //   content: '充值暂未开通',
          //   showCancel: false,
          // })
        }
      },
      fail: function (res) {
        // console.log('no')
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
  },
  formSubmitTopay:function(){
    var that=this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var user_id_en = util.user_id_en;
    var paytype=-1;
    var cardcode = that.data.number;
    var price = that.data.prev;
    var money = that.data.now;
    var user_status = that.data.user_status;
    console.log(user_status)
    if (user_status == 0) {
      wx.showModal({
        title: '温馨提示',
        content: that.data.user_status_desc,
        showCancel:false,
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
    
      wx.request({
        url: http_host + '/mini_program/wa_card/back/index.php/home/frontweb/paymini',
        data: {
          customer_id_en: customer_id_en,
          user_id_en: user_id_en,
          paytype: paytype,
          cardcode: cardcode,
          price: price,
          money: money
        },
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res)
          wx.requestPayment({
            'appId': res.data.appId,
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function (data) {
                wx.request({
                    url: http_host + '/mini_program/wa_card/back/index.php/home/frontweb/tpl_may',
                    data: {
                        customer_id_en: customer_id_en,
                        user_id_en: user_id_en,
                        form_id: res.data.package,
                        tl_type: 4,
                        page: "pages/index/index",
                        cardcode: cardcode
                    },
                    method: 'post',
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                        console.log("模板消息：" + JSON.stringify(res));
                    }
                });      
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                success: function () {
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../recharge_record/recharge_record'
                    })
                  }, 500)
                }
              });
            },
          });
          that.setData({

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
      path: '/pages/member_recharge/member_recharge',
      imageUrl: share_img,
    }
  },
  counttap:function(e){
    var that=this;
    var c = e.currentTarget;
    console.log(e.currentTarget.dataset.now)
    console.log(e.currentTarget.dataset.prev)
    that.setData({
      count: e.currentTarget.id,
      now: e.currentTarget.dataset.now,
      prev: e.currentTarget.dataset.prev
    })
    console.log(c);
  }
})