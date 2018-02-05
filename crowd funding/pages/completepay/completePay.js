// completePay.js
var customer_id_en = "";
var activity_id = "";
var user_id_en = "";
var user_id="";
var apply_id = "";//众筹商品发起id
var util = require('../../utils/util.js');
var support_message="";//支持者留言
var support_money="";//支持者金额
Page({

  /**
   * 页面的初始数据
   */
  data: {
    completePayData:"",
    chancemoney:"",
    isfocus:false,
    msgisfocus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    user_id_en=options.user_id_en;
    apply_id = options.apply_id;
    customer_id_en=options.customer_id_en;
    activity_id=options.activity_id;
    user_id=options.user_id;//支持者id

    // 页面初始数据
    that.completepay();
      
  },
  completepay:function(){
    //加载开始
    util.showLoading();
    var that=this;
    var completepayvalue = {
      user_id_en,
      apply_id,
      customer_id_en,
      activity_id
    }
    util.commonRequest(
      completepayvalue,
      'index.php/home/front/support_info',
      function (res) {
        console.log("支持支付页面数据：" + JSON.stringify(res));
        that.setData({
          completePayData: res.data.data
        })
        //加载结束
        util.hideToast();
      }
    )
  },
  tabchancemoney:function(){
        var that=this;
        // 切换金额
        var data={
          customer_id_en,
          activity_id,
          apply_id
        }       
        util.commonRequest(
          data,
          'index.php/home/front/get_support_money',
          function(res){
            console.log("切换金额："+JSON.stringify(res));
            that.setData({
              chancemoney: res.data.support_money
            })
          }
        )
  },
  radioChange:function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    if(e.detail.value!=''){
      support_message = e.detail.value;
    } 
  },
  moneyblur:function(e){
    support_money="";
    if (e.detail.value != '') {
      support_money = e.detail.value;
    }
  },
  inputblur:function(e){
    console.log('inputblur:'+e.detail.value);
    if (e.detail.value != '') {
    support_message=e.detail.value;
    }
  },
  tappay: function () {//支付
    var that=this;
    // wx.navigateTo({
    //   url: '../completePayNext/completePayNext?user_id_en=' + user_id_en + '&apply_id='+apply_id+'&customer_id_en=' + customer_id_en + '&activity_id=' + activity_id + '&user_id='+user_id+'',
    // })
    // return;
    console.log(support_money);
    if(support_money==""){  
        wx.showToast({
          title: '请输入金额..',
        })
        that.setData({
          isfocus:true
        })
        return;
      }
    if (support_message==''){
      wx.showToast({
        title: '留言不能为空..',
      })
      that.setData({
        msgisfocus:true
      })
      return;
    }
    var data = {
      customer_id_en,
      user_id_en,
      activity_id,
      apply_id,
      support_money,
      support_message
    }

   util.commonRequest(
     data,
     'index.php/home/front/orderx',
     function (response){
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
             icon: 'success'
           });
        wx.navigateTo({
          url: '../completePayNext/completePayNext?user_id_en=' + user_id_en + '&apply_id='+apply_id+'&customer_id_en=' + customer_id_en + '&activity_id=' + activity_id + '&user_id='+user_id+'',
        })
          console.log(res);
         },
         'fail': function (res) {
           console.log(res);
         }
       });
     });

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
    // 页面初始数据
    that.completepay();
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
