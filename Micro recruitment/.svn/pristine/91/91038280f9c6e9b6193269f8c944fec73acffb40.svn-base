// pages/my-collection/my-collection.js
var app = getApp();
var util = require("../../utils/util.js");
var http_host = '';
var customer_id_en = '';
var card_count_t = [];
Page({

  data: {
    err_code: 1,
    err_data: "success",
    detail_list: "",
    dataList:[],

    page:1,
    tabread: true,
    send_box_data: '',
    send_box_labels: '',
    status: 0,
    send_box_data: [],
    loading_state: true,
    kong: 1,
    is_see:'',
    job_id:'',
    result:''
  },
 

  onLoad: function (options) {
    var that = this
    card_count_t = [];
    // that.send_box_pull();
  },

  // 获取页面数据
  getcollection:function(){
    let that = this;
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    let page = that.data.page  //页码
    var http_host = util.http_host;
    //游客登录
    if (user_id_en == undefined || user_id_en == '') {
      user_id_en = util.visitor_id
    }
    // 请求首页详情
    wx.request({
      url: http_host + '/mini_program/minvite/back/index.php/home/user/collect_index',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        page: 1,
      },
      success: function (res) {
        console.log(res)
        console.log('res')
        if (res.data.err_code == 0) {
          wx.showModal({
            title: '提示',
            content: '信息请求失败',
            showCancel: false
          })
          return;
        }
        console.log(res)
        that.setData({
          send_box_data: res.data.data,
        })
      },

    })


  },

  // 导航跳转
  classification: function (e) {
    var send_box_data = this.data.send_box_data;
    console.log(send_box_data);
    console.log(e);
    var that = this;
    var is_see = e.currentTarget.dataset.is_see
    var id = e.currentTarget.dataset.id
    console.log(id);
    that.setData({
      is_see: is_see,
      id:id
    })
    that.gotoDetail(is_see,id)
  },
  
  // 查看职位详情
  gotoDetail: function (is_see,id){
    var job_id = this.data.result
      var that = this;
      if (is_see == 1) {
        wx.navigateTo({
          url: '../details/details?id=' + id
        })
      }
      if (is_see == 0) {
        wx.showModal({
          title: '温馨提示',
          content: '抱歉~企业暂时不开放职位,是否取消收藏',
          success:function(res){
            var data={
              customer_id_en:util.customer_id_en,
              user_id_en:util.user_id_en,
              job_id:id,
            };
            util.commonRequest(
              data,
              '/mini_program/minvite/back/index.php/home/user/collect',
              function(res){
                console.log(res)
                if(res.data.err_code==1000){
                  that.getcollection()
                }                
              }
            )
          }
        })
      }

  },

  // 上拉加载
  send_box_pull: function () {
    var that = this;
    var data = {
      customer_id_en: util.customer_id_en,
      user_id_en: util.user_id_en,
      page: that.data.page,
      limit: 6,
    };
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/user/collect_index',
      function (res) {
        var send_box_data = res.data.data;
        if (send_box_data) {
          if (send_box_data != null) {
            for (var i = 0; i < send_box_data.length; i++) {
              card_count_t.push(send_box_data[i]);
            }
            if (send_box_data.length < 6) {
              that.setData({
                loading_state: false,
              })
            }
          }
          var page = that.data.page;
          page = page + 1;
          that.setData({
            send_box_data: card_count_t,
            page: page
          })
          console.log(that.data.send_box_data)
          console.log(that.data.page)
        } else {
          that.setData({
            loading_state: false,
          })
        }
      }
    )
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
    // 渲染页面数据
    this.getcollection()

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
    this.send_box_pull()   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})