// pages/mine/mine.js
var app = getApp();
var util = require("../../utils/util.js");
var http_host = '';
var customer_id_en = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
      apply_pass:0,
      id:'',
      type:0,
      eid:'',
      status:'',
      apply_status:'',
      create_status:'',
      is_status:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var job_id = options.job_id
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
    console.log(util.visitor_id)
    var that = this;
    that.setData({
      is_status: true
    })
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          nickName: res.userInfo.nickName,
        })
      },
    })
    var customer_id_en = util.customer_id_en
    var user_id_en = util.user_id_en;
    var http_host = util.http_host;
    console.log(user_id_en)
    //游客登录
    if (user_id_en == undefined || user_id_en==''){
      user_id_en = util.visitor_id
    }
    // 请求首页详情
    wx.request({
      url: http_host + '/mini_program/minvite/back/index.php/home/user/user_center',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          link_type: res.data.link_type
        })
        console.log(that.data.link_type[0])
        console.log(res.data.data.e_rs)
        if (res.data.data.e_rs==undefined){
          that.setData({
            id: res.data.data.id,
            avatarUrl: '',
            apply_status: res.data.data.apply_status,
            create_status: res.data.data.create_status,
            info_status: res.data.data.info_status,
            type: 0,
          })
          console.log(that.data.avatarUrl)
        }else{
          that.setData({
            id: res.data.data.id,
            avatarUrl: res.data.data.weixin_headimgurl,
            // nickName: res.data.data.weixin_name,
            type: res.data.data.type,
            eid: res.data.data.e_rs.eid,
            status: res.data.data.e_rs.status,
            apply_status: res.data.data.e_rs.apply_status,
            create_status: res.data.data.e_rs.create_status,
            info_status: res.data.data.e_rs.info_status,
            status:res.data.data.e_rs.status,
            is_enter:res.data.data.base.is_enter,
          })
        }
        
      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  //跳转页面
  /////////////////////////////////////////////
  //我的简历
  bindmyresume: function () {
    var that=this;
    console.log(util.user_id_en)
    if (that.data.is_status) {
      that.setData({
        is_status: false
      })
      if (that.data.link_type[2] == 1) {
        wx.switchTab({
          url: '../resume/my-resume',
        })
      } else {
        wx.navigateTo({
          url: '../resume/my-resume',
        })
      }
    } 
    
  },
  //我的收藏
  bindmycollection: function () {
    var that = this;
    if(that.data.is_status){
      that.setData({
        is_status: false
      })
      if (that.data.link_type[1] == 1) {
        wx.switchTab({
          url: '../my-collection/my-collection',
        })
      } else {
        wx.navigateTo({
          url: '../my-collection/my-collection',
        })
      }
    } 
  },
  //我的投递箱
  bindsendbox: function () {
    var that=this;
    if(that.data.is_status){
      that.setData({
        is_status: false
      })
      if (that.data.link_type[0] == 1) {
        wx.switchTab({
          url: '../send_box/send_box',
        })
      } else {
        wx.navigateTo({
          url: '../send_box/send_box',
        })
      }
    }
    
  },
  // 我也要发布职位
  bindcompanyapply: function (e) {
    var that = this;
    // 企业未申请过
    if(that.data.is_status){
      that.setData({
        is_status: false
      })
      if (that.data.apply_status == 0 || that.data.status == 2) {
        if (that.data.link_type[3] == 1) {
          wx.switchTab({
            url: '../company_apply/company_apply',
          })
        } else {
          wx.navigateTo({
            url: '../company_apply/company_apply',
          })
        }
      }
      if (that.data.apply_status == 1 && that.data.status == 0) {
        wx.navigateTo({
          url: '../company-apply-submit/company-apply-submit?apply_status=' + that.data.apply_status,
        })
      }
    }
    
  },
  // 发布职位
  bindpostingposition: function (e) {
    var that = this;
    if (that.data.is_status) {
      that.setData({
        is_status: false
      })
      wx.navigateTo({
        url: '../posting-position/posting-position',
      })
    }
    
  },
  // 企业管理
  bindcompanymsg: function () {
    var that = this;
    var eid = that.data.eid;
    if (that.data.is_status) {
      that.setData({
        is_status: false
      })
      if (that.data.info_status == 0) {
        wx.navigateTo({
          url: '../company_info/company_info?',
        })
      } else {
        wx.navigateTo({
          url: '../company-msg/company-msg?eid=' + eid,
        })
      }
    }
  },
  // 投递信息
  bindsendmsg: function () {
    var that=this;
    var job_id = that.data.job_id
    if (that.data.is_status) {
      that.setData({
        is_status: false
      })
      wx.navigateTo({
        url: '../send_msg/send_msg?job_id=' + job_id,
      })
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
  onShareAppMessage: function () {
  
  },
})