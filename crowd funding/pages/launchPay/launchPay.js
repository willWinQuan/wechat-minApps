// launchCrowd.js
var customer_id_en = ""
var activity_id = "";
var id = "";//商品id
var user_id_en = "";
var apply_id = "";
var util = require('../../utils/util.js');
var config = require('../../utils/config.js');
var mark = "";//支持者留言
var user_id = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mshop_code: "",
    userName: "",
    provinceName: "",
    cityName: "",
    countyName:"",
    detailInfo: "",
    telNumber: "",
    product_data:"",
    start_time:"",
    end_time:"",
    addressflag:true,
    paymoney:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    id = options.id;
    user_id_en = options.user_id_en;
    customer_id_en = options.customer_id_en;
    activity_id = options.activity_id;
    apply_id = options.apply_id;
    user_id = options.user_id;
    //订单数据
    that.launchPay();
  },

  launchPay:function(){
    //加载开始
    util.showLoading();
    var that=this;
    var data = {
      customer_id_en,
      user_id_en,
      apply_id
    }
    util.commonRequest(
      data,
      'index.php/home/Crowdfund/pay_page',
      function (res) {
        console.log("订单数据：" + JSON.stringify(res));
        if (res.data.address == null) {   
          wx.chooseAddress({
            success: function (data) {
              that.setData({
                addressflag:true,
                paymoney: res.data.price,
                userName:data.userName,
                provinceName: data.provinceName,
                cityName: data.cityName,
                countyName: data.countyName,
                detailInfo: data.detailInfo,
                telNumber: data.telNumber,
                mshop_code: res.data.mshop_code,
                product_data: res.data.product_data,
                end_time: res.data.end_time,
                start_time: res.data.start_time
              })
              console.log(data.userName)
              console.log(data.postalCode)
              console.log(data.provinceName)
              console.log(data.cityName)
              console.log(data.countyName)
              console.log(data.detailInfo)
              console.log(data.nationalCode)
              console.log(data.telNumber)
            },
            fail: function (data) {
              console.log("fail:" + JSON.stringify(data));
              that.setData({
                addressflag: false
              });
            }
          })
        } else {
          that.setData({
            paymoney: res.data.price,
            userName: res.data.address.name,
            provinceName: res.data.address.location_p,
            cityName: res.data.address.location_c,
            countyName: res.data.address.location_a,
            detailInfo: res.data.address.address,
            telNumber: res.data.address.phone,
            mshop_code: res.data.mshop_code,
            product_data: res.data.product_data,
            end_time: res.data.end_time,
            start_time: res.data.start_time
          })
        }
        //加载结束
        util.hideToast();
      }
    )

  },
  inputblur:function(e){
      console.log("备注失去焦点");
      if(e.detail.value!=''){
        mark = e.detail.value;
      }
  },
  tappay: function () {//支付
    var that = this;
   
    var paymoney = that.data.paymoney;//支付金额
    var name = that.data.userName;
    var location_p = that.data.provinceName;
    var location_c = that.data.cityName;
    var location_a = that.data.countyName;
    var address = that.data.detailInfo;
    var phone = that.data.telNumber;
    var data = {
      customer_id_en: customer_id_en,
      user_id_en: user_id_en,
      activity_id: activity_id,
      apply_id: apply_id,
      paymoney: paymoney,
      name: name,
      location_p: location_p,
      location_c: location_c,
      location_a: location_a,
      address: address,
      phone: phone,
      mark: mark
    }
    console.log(data);
   console.log("支付data"+JSON.stringify(data))
    wx.request({
      url: config.BaseURL+'index.php/home/front/applyorder',
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, 
      success: function (response) {
        console.log(response.data);
        // 发起支付  
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
              success:function(){
                setTimeout(function () {
                  wx.navigateTo({//跳转到我的订单
                    url: '../myorder/myorder?user_id_en=' + user_id_en + ''
                  })
                }, 1000);
              }
            });


          },
          'fail': function (res) {
            console.log(res);
          }
        });

      },
      fail: function (err) {
        console.log(err)
        // fail  
        callback(err)
      },
      complete: function (msg) {
        console.log(msg)
        // complete  
      }
    })

  },
  writeAddre:function(){//编辑地址
    var that=this;
    //加载开始
    util.showLoading();
    wx.chooseAddress({
      success: function (data) {
        that.setData({
          addressflag: true,
          userName: data.userName,
          provinceName: data.provinceName,
          cityName: data.cityName,
          countyName: data.countyName,
          detailInfo: data.detailInfo,
          telNumber: data.telNumber
        })
        that.update();
        //加载结束
        util.hideToast();
        console.log(data.userName)
        console.log(data.postalCode)
        console.log(data.provinceName)
        console.log(data.cityName)
        console.log(data.countyName)
        console.log(data.detailInfo)
        console.log(data.nationalCode)
        console.log(data.telNumber)
      },
      fail: function (data) {
        console.log("fail:" + JSON.stringify(data));
        that.setData({
          addressflag: false
        });
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
     var that=this;
     if (that.data.addressflag==false){
       console.log("赶紧选个地址")
       that.launchPay();
     }
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
  // onShareAppMessage: function () {

  // }
})
