// pages/mine/mine.js
var person_text='';
var util = require('../../utils/util.js');
var customer_id_en = '';
var http_host = '';
var user_id_en ="";
var share_img='';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_activate: 1,
    person_list:'',
    is_open:'',
    person_img:'',
    card_bg:'',
    card_name:'',
    card_title:'',
    color:'',
    member_integral:'',
    member_balance:'',
    member_grade:'',
    code:'',
    color1:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.topColor();
  },
  getPhoneNumber: function (e) {
      console.log(e);
    var that=this;
    var customer_id_en=util.customer_id_en;
    var http_host=util.http_host;
    var user_id_en = util.user_id_en;
    var code=that.data.code;
    wx.login({
      success:function(res){
        // code=res.code
        that.setData({
          code:res.code
        }) 
        wx.request({
          url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/personal_msg',
          data: {
            customer_id_en: customer_id_en,
            user_id_en: user_id_en,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            code: that.data.code,
          },
          success: function (res) {
          }
        })
      }
    });
    
    if (!e.detail.iv) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权,请授权激活您的会员卡',
        success: function (res) {
        }
      })
      return;
    } 
       wx.showToast({
         title: '授权成功',
         icon: 'success',
         duration: 1000,
         mask: true
       })
      setTimeout(function(){
        wx.navigateTo({
          url: '../person_info/person_info?pass_id=' + util.user_id_en
        })
      },1000);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    util.topColor();
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var person_list = that.data.person_list;
    var is_open = that.data.is_open;
    var person_img = that.data.person_img;
    var person_text = that.data.person_text;
    var user_id_en = util.user_id_en;
    var is_activate = that.data.is_activate;
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
    });
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/personal_api',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
      },
      success: function (res) {
        console.log(res);
        console.log(res.data.data.menber)
        var list=[];
        for(var i=0;i<10;i++){
          list.push(res.data.data[i]);
        }
        if (res.data.data.menber){
          that.setData({
            person_list: list,
            card_bg: res.data.data.menber.img,
            card_name: res.data.data.menber.name,
            card_title: res.data.data.menber.title,
            card_number: res.data.data.menber.card_number,
            is_activate: res.data.data.is_activate,
            member_integral: res.data.data.menber.points,
            member_balance: res.data.data.menber.balance,
            member_grade: res.data.data.menber.level_name,
            color1: res.data.data.menber.color,
          })
        }else{
          that.setData({
            person_list: list,
            is_activate: res.data.data.is_activate,
          })
        }
        console.log(that.data.person_list)
      },
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
      path: '/pages/mine/mine',
      imageUrl: share_img,
    }
  },
  alter_info_tap:function(e){
     var that=this;
     var name = e.currentTarget.dataset.name;
     if(name=='修改资料'){
       if(that.data.is_activate != 1){
           wx.showModal({
               title: '提示',
               showCancel: false,
               content: '请先激活您的会员卡',
               success: function (res) {
                   
               }
           })
          return;
       }
       wx.navigateTo({
         url: '../alter_info/alter_info'
       })
     }else if(name=='我的券'){
       wx.navigateTo({
         url: '../my_ticket/my_ticket'
       })
     }
     else if (name == '充值记录') {
       wx.navigateTo({
         url: '../recharge_record/recharge_record'
       })
     }
     else if (name == '门店查询') {
       wx.navigateTo({
         url: '../store_apply/store_apply'
       })
     }
     else if (name == '消费记录') {
       wx.navigateTo({
         url: '../consume_record/consume_record'
       })
     }
     else if (name == '积分记录') {
       wx.navigateTo({
         url: '../integral_query/integral_query'
       })
     }
     else if (name == '在线充值') {
       if (that.data.is_activate != 1) {
           wx.showModal({
               title: '提示',
               content: '请先激活您的会员卡',
               showCancel: false,
               success: function (res) {
                  
               }
           })
         return;
       }
       wx.navigateTo({
         url: '../member_recharge/member_recharge'
       })
     }
     else if (name == '自助买单') {
       if (that.data.is_activate != 1) {
           wx.showModal({
               title: '提示',
               content: '请先激活您的会员卡',
               showCancel: false,
               success: function (res) {
               }
           })
         return;
       }
       wx.navigateTo({
         url: '../self_pay/self_pay'
       })
     }
     else if (name == '我的次卡') {
       wx.navigateTo({
         url: '../my_calculate/my_calculate?user_id_en='+user_id_en+''
       })
     } else if (name == '会员卡权益') {
       wx.navigateTo({
         url: '../membership_card/membership_card'
       })
     }
  },
})