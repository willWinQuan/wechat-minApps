// pages/buy_time/buy_time.js
// var consume_time = 1;
var util=require('../../utils/util.js')
var id="";
var user_id_en="";
var share_img = '';
var formId="";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    consume_time:1,
    color:'',
    carddata:"",
    passarry:[1,2,3,4,5,6],
    maskflag:true,
    password:"",
    isFocus:false,
    signid:"",
    toastHidden:true,
    toastcontent:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.topColor();
    id=options.carid;
    user_id_en = options.user_id_en;
    var that=this;
    that.setData({
      consume_time:1,
    })
    that.timecard();
  },
   timecard:function(){
      var that=this;
      var data={
        id,
        customer_id_en: util.customer_id_en,
        user_id_en: user_id_en
      }
      util.commonRequest(
          data,
          '/mini_program/wa_card/back/index.php/home/frontweb/number_pay_page',
          function(res){
            console.log("次卡买单页面初始"+JSON.stringify(res));
            that.setData({
               carddata:res.data.data
            })
          }
      )
   } , 
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
      path: '/pages/buy_time/buy_time',
      imageUrl: share_img,
    }
  },
  minstap:function(){
    var that=this;
    var consume_time=that.data.consume_time-1;
    if (consume_time<1){
      consume_time=1;
      that.setData({
        consume_time: consume_time,
      })
    }
    else{
       that.setData({
         consume_time: consume_time,
       })
    }
  },
  addtap: function () {
    var that = this;   
    var consume_time = that.data.consume_time + 1;
    console.log(consume_time);
    if (consume_time >= that.data.carddata.times) {
      consume_time = that.data.carddata.times;
      that.setData({
        consume_time: consume_time,
      })
  }else{
      that.setData({
        consume_time: consume_time,
      })
  }
    
  },
  formSubmitTopay:function(e){
    // wx.navigateTo({
    //   url:'../member_recharge/memmber_recharge'
    // })
    console.log(e);
    var that=this;
    if (that.data.carddata.user_status == "0") {
        wx.showModal({
            title: '温馨提示',
            content: '该会员已被冻结',
            showCancel: false
        })
        return;
    }
    var paytype=2;
    var cardcode = e.detail.value.cardnumber;
    formId=e.detail.formId;
    var data1={
      customer_id_en:util.customer_id_en,
      user_id_en: user_id_en,
      paytype: paytype,
      cardcode: cardcode,
      pay_number_card_times: that.data.consume_time
    };
    wx.request({
      url: util.http_host + '/mini_program/wa_card/back/index.php/home/frontweb/mypay',
      data: data1,
      method:"POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },  
      success: function (res) {
        console.log("支付提交：" + JSON.stringify(res));
        if (res.data.err_code == "1") {
          that.setData({
            maskflag: false,
            isFocus: true,
            signid: res.data.signid
          })
        } else if (res.data.err_code == "0") {
          wx.showModal({
              title: '提示',
              content: res.data.err_data,
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
          })
        }
      },
      fail: function (res) {
        console.log("接口请求错误"+JSON.stringify(res));
      }
    })
  },
  inputfocus:function(e){
    var poss=e.detail.value; 
    var that=this;
    that.setData({
      password:poss
    })
  },
  touchpassword: function () {
      var that = this;
      that.setData({
          isFocus: true
      })
  },
  inputvalue:function(e){
    console.log("密码：" + JSON.stringify(e));
    var poss = e.detail.value;
    var that = this;
    var signid = that.data.signid;
    console.log(formId);
    that.setData({
      password: poss
    })
    if(poss.length==6){
      that.setData({
        maskflag:true,
        isFocus:false
      })
      var data1={
        customer_id_en: util.customer_id_en,
        signid: signid,
        pwd:poss,
        form_id:formId,
        page:"pages/index/index",
        tl_type: 3
      }
      wx.request({
        url: util.http_host + '/mini_program/wa_card/back/index.php/home/frontweb/checkmypay',
        data: data1,
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log("支付密码验证：" + JSON.stringify(res));
          if(res.data.err_code=="1"){
              
            that.timecard();
            wx.showToast({
              title: '支付成功',
              icon: 'success',
            });
            setTimeout(function(res){
              wx.navigateTo({
                url: '../consume_record/consume_record'
              })
            },1200);
          } else if (res.data.err_code == "0"){
           that.setData({
             toastHidden:false,
             toastcontent:res.data.err_data,
             password:''
           })
          }
        },
        fail: function (res) {
          console.log("接口请求错误" + JSON.stringify(res));
        }
      })
    }
  },
  toastChange:function(){
    this.setData({
      toastHidden: true,
    })
  },
  hiddenflag:function(){
    this.setData({
      maskflag:true
    })
  },
  ruletap:function(){
    wx.navigateTo({
      url:'../regulation/regulation?cardcode='+this.data.carddata.card_number+''
    })
  },
  // 
  password: function () {
    var that = this;
    that.setData({
      isFocus: true
    })
  }
})