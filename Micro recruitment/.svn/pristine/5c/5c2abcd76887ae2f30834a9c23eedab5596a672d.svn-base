// pages/send_box/send_box.js

var util = require("../../utils/util.js");
var detail_list = [];//拼接数组
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabread: true,
    detail_list: [], 
    http_host: util.http_host,
    id: 1,
    page: 1,
    status: 0,
    loading_state:true,
    nodata_status:1,
    click_send_box:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

  },

  // 获取页面数据
  getdetail: function (status, page, limit) {
    var that = this;
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    var http_host = util.http_host;
    var this_page=that.data.page;
    // if (that.data.isnomore) {
    //   return;
    // }
    if(page !=1 && page==this_page){
        util.hideToast();
        return;
    }
    // 请求首页详情
    wx.request({
      
      url: http_host + '/mini_program/minvite/back/index.php/home/send/send_index',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        status: status,
        page: page,
        limit: limit
      },
      success: function (res) {
        if (user_id_en == undefined ){
          wx.showLoading({
            title: '加载中...',
          })
          return;
        }
        if (res.data.err_code != 1000 ) {
          wx.showModal({
            title: '提示',
            content: res.data.err_data,
            showCancel: false
          })
          util.hideToast();
          return;
        }
        if (res.data.data.length == 0 && that.data.page != 1) {
          that.setData({
            page: page,  
            isnomore: true,
            loading_state: false,
          })
          util.hideToast();
          return;
        }
        detail_list = detail_list.concat(res.data.data);
        that.setData({
          page: page,   
          detail_list: detail_list,
          loading_state: false,
        })
        util.hideToast();
      },

    }) 
  },
  bindnoread: function () {   
    var that = this;
    if (util.user_id_en == "" || util.user_id_en == undefined) {
        that.setData({
            tabread: true,
            status: 0,
            page: 1,
            isnomore: false,
            loading_state: true,
            detail_list: [],
            nodata_status: 1
        });
        return;
    }
    detail_list= [];
    that.setData({
      tabread: true,
      status: 0,
      page: 1,
      isnomore: false,
      loading_state: true,
      detail_list: [],
      nodata_status:0
    });
    that.getdetail(0, 1, 5);
    setTimeout(function () {
      that.setData({
        nodata_status: 1
      });
    }, 150)
  },
  bindreaded: function () {
    var that = this;
    if (util.user_id_en == "" || util.user_id_en == undefined) {
        that.setData({
            tabread: false,
            status: 1,
            page: 1,
            isnomore: false,
            loading_state: true,
            detail_list: [],
            nodata_status: 1
        });
        return;
    }
    detail_list=[];
    that.setData({
      tabread: false,
      status: 1,
      page: 1,
      isnomore: false,
      loading_state: true,
      detail_list:[],
      nodata_status: 0
    });
    that.getdetail(1, 1, 5);
    setTimeout(function () {
      that.setData({
        nodata_status: 1
      });
    }, 150)
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
    // util.showLoading();
    if (util.user_id_en == "" || util.user_id_en == undefined) {
        return;
    }
    var page = that.data.page;
    if (page == 1) {
        detail_list = [];
        var status = that.data.status;
        that.getdetail(status, page, 5);
    }
    that.setData({
      click_send_box: 0
    })
  },
  // 点击职位
  classification:function(e){
    var that=this;
    console.log(e)
    var id=e.currentTarget.dataset.id;
    if (that.data.click_send_box==0){
      that.setData({
        id: id,
        click_send_box: 1,
      })
      console.log(that.data.click_send_box)
      var data = {
        customer_id_en: util.customer_id_en,
        id: id,
      };
      util.commonRequest(
        data,
        '/mini_program/minvite/back/index.php/home/Auxiliary/job_jump',
        function (res) {
          console.log(res)
          if (res.data.error == 1000) {
            wx.navigateTo({
              url: '../details/details?id= ' + id,
            })
          } else {
            wx.showToast({
              title: '此岗位已下架',
            })
            that.setData({
              click_send_box: 0
            })
          }
        }
      )
    }
    
  },
    /**
     *    * 生命周期函数--监听页面隐藏
     */
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
    var that = this;
    // console.log(that.data.detail_list)
    // console.log(that.data.detail_list.length)
    if (that.data.detail_list.length == 0 ) {
      return;
    }
    var status = that.data.status;
    var page = that.data.page;
    page = Number(page) + 1;
    that.setData({
      loading_state: true,
    })
    that.getdetail(status, page, 5);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})