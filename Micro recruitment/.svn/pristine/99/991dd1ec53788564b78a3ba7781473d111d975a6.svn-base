// pages/company/company.js
var company_count = [];
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading_state: true,
    page:1,
    company_search_data: [],
    name:'',
    new_length:10,
    click_status:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      http_host:util.http_host,
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
    var that = this;
    that.setData({
      page:1,
      click_status:0,
    })
    company_count = [];
    that.company_search();
  },
  // 搜索
  search: function (e) {
    var that = this;
    var name = that.data.name;
    that.setData({
      name: e.detail.value,
    })
    var data = {
      customer_id_en: util.customer_id_en,
      user_id_en: util.user_id_en,
      page: 1,
      name: that.data.name,
    }
    util.commonRequest(
      data,
      '/mini_program/minvite/back/index.php/home/Enterprise/getEnterpriseData',
      function (res) {
        console.log(res)
        var company_search_data = res.data.data;

        if (company_search_data) {
          var new_company_data = [];
          if (company_search_data.length < 10) {
            for (var i = 0; i < company_search_data.length; i++) {
              new_company_data[i] = company_search_data[i];
            }
            that.setData({
              loading_state: false,
            })
          } else {
            for (var i = 0; i < 10; i++) {
              new_company_data[i] = company_search_data[i];
            }
          }
          that.setData({
            company_search_data: new_company_data,
          })
        } else {
          that.setData({
            company_search_data: [],
          })
        }
      }
    )
  },
  // 上拉加载
  company_search: function () {
    var that = this;
    console.log(that.data.new_length)
    // if (that.data.new_length == 10) {
      var data = {
        customer_id_en: util.customer_id_en,
        user_id_en: util.user_id_en,
        page: that.data.page,
        name: that.data.name,
      }
      util.commonRequest(
        data,
        '/mini_program/minvite/back/index.php/home/Enterprise/getEnterpriseData',
        function (res) {
          console.log(res)
          var company_search_data = res.data.data;
          if (company_search_data) {
            console.log(company_search_data)
            for (var i = 0; i < company_search_data.length; i++) {
              company_count.push(company_search_data[i]);
            }
            if (company_search_data.length < 10) {
              that.setData({
                loading_state: false,
              })
            }
            var page = that.data.page;
            page = page + 1;
            that.setData({
              company_search_data: company_count,
              page: page,
              new_length: company_search_data.length,
            })
            console.log(that.data.company_search_data)
            console.log(that.data.page)
          } else {
            that.setData({
              loading_state: false,
              new_length: 0,
            })
          }
        }
      )
    // }

  },
  bindcompanydetail: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (that.data.click_status==0){
      that.setData({
        click_status:1,
      })
      var data = {
        customer_id_en: util.customer_id_en,
        user_id_en: util.user_id_en,
        id: id,
        type: 1,
        page: that.data.page,
      };
      util.commonRequest(
        data,
        '/mini_program/minvite/back/index.php/home/enterprise/enterprise_detail',
        function (res) {
          if (res.data.err_code == 1000) {
            wx.navigateTo({
              url: '../company-detail/company-detail?id=' + id,
            })
          }
          else {
            wx.showToast({
              title: res.data.err_data,
            })
          }
        }
      )
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
    this.company_search();
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
})