// pages/company-detail/company-detail.js
var company_count_t = [];
var util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    look_all:'',
    show_all:'block',
    line_number:5,
    discription:'',
    loading_state:true,
    page:1,
    company_detail_data:[],
    latitude:'',
    longitude:'',
    id:'',
    isShow:true,
    click_send_box: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      id:options.id
    })
    company_count_t = [];
    that.company_detail();
    if (that.data.discription.length<115){
      that.setData({
        show_all:'none',
      })
    }
    that.company_detail_pull();
  },
  jubao:function(e){
    var inc_id = this.data.id
    // if(){

    // }
    wx.navigateTo({
      url: '../tip/tip?inc_id=' + inc_id,
    })
  },
  // 页面数据
  company_detail: function () {
    var that = this;
    var data = {
      customer_id_en: util.customer_id_en,
      user_id_en: util.user_id_en,
      id: that.data.id,
      page: 1,
      limit: 5,
    };
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/enterprise/enterprise_detail',
      function(res){
        console.log(res)
        that.setData({
          company_detail_data:res.data.data.job_rs,
          pic_url: res.data.data.pic_url,
          name: res.data.data.name,
          industry_rs: res.data.data.industry_rs,
          discription: res.data.data.discription,
          address:res.data.data.address,
          company_id: res.data.data.id,
          latitude: res.data.data.latitude,
          longitude: res.data.data.longitude,
          is_report:res.data.data.base.is_report,
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
  // 显示隐藏
  myShow:function(){
  
    if (isShow==true){
      this.setData({
        isShow : !isShow
      })
    }
    
  },
  // 上拉加载
  company_detail_pull: function () {
    var that = this;
    var data = {
      customer_id_en: util.customer_id_en,
      user_id_en: util.user_id_en,
      id: that.data.id,
      page:that.data.page,
      limit:5,
    }
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/enterprise/enterprise_detail',
      function (res) {
        // console.log(res)
        var company_detail_data = res.data.data.job_rs;
        if (company_detail_data) {
          if (company_detail_data != '') {
            for (var i = 0; i < company_detail_data.length; i++) {
              company_count_t.push(company_detail_data[i]);
            }
            if (company_detail_data.length < 5) {
              that.setData({
                loading_state: false,
              })
            }
          }
          var page = that.data.page;
          page = page + 1;
          that.setData({
            company_detail_data: company_count_t,
            page: page
          })
          // console.log(that.data.company_detail_data)
          // console.log(that.data.page)
        } else {
          that.setData({
            loading_state: false,
          })
        }
      }
    )
  },
  // 查看全部
  setLoading:function(){
    var that=this;
    that.setData({
      line_number:10,
      show_all:'none',
    })
  },
  // 职位详情跳转
  classification:function(e){
    var that = this;
    console.log(e)
    var id = e.currentTarget.dataset.id;
    if (that.data.click_send_box == 0) {
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      click_send_box: 0
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
    this.company_detail_pull();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})