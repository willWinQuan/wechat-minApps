// pages/position_info/position_info.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      job_id: options.id,
      user_id_en: util.user_id_en
    })
    that.job_detail();
    console.log(that.data.job_id)
    console.log(util.user_id_en)
  },
  // 渲染页面数据
  job_detail: function () {
    var that = this;
    var data = {
      customer_id_en: util.customer_id_en,
      user_id_en: util.user_id_en,
      job_id: that.data.job_id,
    };
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/job/job_detail',
      function (res) {
        console.log(res)
        that.setData({
          job_name: res.data.job_name,
          publish_time: res.data.publish_time,
          min: res.data.min,
          max: res.data.max,
          labels: res.data.labels,
          pic_url: res.data.pic_url,
          company_name: res.data.company_name,
          discription: res.data.discription,
          position: res.data.position,
          content: res.data.content1,
          address: res.data.address,
          legal_person: res.data.legal_person,
          id: res.data.id,
          phoneNumber: res.data.e_contact,
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          is_see: res.data.is_see,
          province: res.data.province,
          city:res.data.city,
          area:res.data.area,     
          job_id:res.data.job_id,
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
          scale: 28,
          name: that.data.company_name,
          address: that.data.address,
        })
      }
    })
  },
  // 查看公司
  bindcompanydetail: function (e) {
    console.log(e)
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(that.data.is_see)
    if (that.data.is_see == 1) {
      wx.navigateTo({
        url: '../company-detail/company-detail?id=' + id,
      })
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
    this.job_detail();
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