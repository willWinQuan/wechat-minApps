// pages/send_box/send_box.js

var util = require("../../utils/util.js");
var detail_list=[];//拼接数组
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabread: true,
        detail_list: [],
        http_host: util.http_host,
        id:1,
        page:1,
        status:0,
        isnomore:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       var that=this;
    },

    // 获取页面数据
    getdetail:function(status,page,limit){
    
    var that = this;
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    var http_host = util.http_host;
    if (that.data.isnomore){
        util.hideToast();
        return;
    }
    // 请求首页详情
    wx.request({
      url: http_host + '/mini_program/minvite/back/index.php/home/user/e_send_index',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        status: status,
        page:page,
        limit:limit
      },
      success: function (res) {
        if (res.data.err_code != 1000) {
          wx.showModal({
            title: '提示',
            content: res.data.err_data,
            showCancel: false
          })
          util.hideToast();
          return;
        }
        if (res.data.data.length == 0 && that.data.page != 1){
              that.setData({
                  isnomore:true
              })
              util.hideToast();
              return;
        }

        detail_list=detail_list.concat(res.data.data);
        that.setData({
          detail_list: detail_list,
        })
        util.hideToast();
      },

    })
  },
    bindnoread: function () {
        detail_list = [];
        var that=this; 
        that.setData({
            tabread: true,
            status:0,
            page:1,
            isnomore:false
        });
        that.getdetail(0, 1, 5);
    },
    bindreaded: function () {
        detail_list=[];
        var that = this;  
        that.setData({
            tabread: false,
            status:1,
            page:1,
            isnomore:false
        });
        that.getdetail(1, 1, 5);
    },
    bindresume:function(e){
        console.log(e);
        var that=this;
        // var value=e.detail.value;
        // var id=value.id;
        // var resume_id = value.resumeid;  
        // var form_id=e.detail.formId;
        // var weixin_userid = value.weixinuserid;
        var id = e.currentTarget.dataset.id;
        var resume_id = e.currentTarget.dataset.resumeid;
        wx.navigateTo({
            // url: '../resume/my-resume?id=' + id + '&resumeid=' + resume_id + '&form_id=' + form_id +'&weixin_userid='+weixin_userid+'',
            url: '../resume/my-resume?id=' + id + '&resumeid=' + resume_id + ''
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
      var status = that.data.status;
      var page = that.data.page;
      if(page ==1){
          util.showLoading();
          detail_list = [];        
          that.getdetail(status, page, 5);
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
        var that=this;
        // console.log(that.data.detail_list)
        if (that.data.detail_list.length == 0) {
            return;
        }
        var status = that.data.status;
        var page=that.data.page;
            page=Number(page)+1;
         that.setData({
            page:page  
         })   
        that.getdetail(status,page,5);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        
    }
})