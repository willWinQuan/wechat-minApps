// pages/company-detail/company-detail.js
var util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    look_all: '',
    show_all: 'block',
    line_number: 5,
    discription: '',
    loading_state: true,
    page: 1,
    company_detail_data: [],
    latitude:'',
    longitude:'',
    is_show:false,
    edit_status:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.eid
    })
    that.company_detail();
    if (that.data.discription.length < 115) {
      that.setData({
        show_all: 'none',
      })
    }
  },
  jubao: function () {
    wx.navigateTo({
      url: '../tip/tip',
    })
  },
  // 页面数据
  company_detail: function () {
    var that = this;
    var data = {
      customer_id_en: util.customer_id_en,
      user_id_en: util.user_id_en,
      id: that.data.id,
      page:1,
      type:2,
    };
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/enterprise/enterprise_detail',
      function (res) {
        console.log(res)
        that.setData({
          pic_url: res.data.data.pic_url,
          name: res.data.data.name,
          industry_rs: res.data.data.industry_rs,
          discription: res.data.data.discription,
          address: res.data.data.address,
          company_id: res.data.data.id,
          latitude: res.data.data.latitude,
          longitude: res.data.data.longitude,
          is_show:true,
        })
      }
    )    
  },
  // 查看位置
  get_location: function () {
    var that = this;
    var latitude = Number(that.data.latitude);
    var longitude = Number(that.data.longitude);
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: that.data.scale,
          name: that.data.company_name,
          address: that.data.address,
        })
      }
    })
  },
  // 查看全部
  setLoading: function () {
    var that = this;
    that.setData({
      line_number: 10,
      show_all: 'none',
    })
  },
  // 编辑按钮
  edit_company_info:function(e){
    var that=this;
    console.log(e)
    var id=e.currentTarget.dataset.id;
    if(that.data.edit_status==0){
      that.setData({
        edit_status:1,
      })
      console.log(that.data.edit_status)
      if (that.data.is_show) {
        wx.navigateTo({
          url: '../company_info/company_info?id=' + id,
        })
      }
    } 
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
    this.setData({
      edit_status: 0,
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

  }
})