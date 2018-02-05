// pages/classify/classify.js
var util = require("../../utils/util.js");
var expert_data = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify_index: 0,
    classify_status: 0,
    screen_status: 0,
    screen_data: ['回答最多', '关注最多', '免费提问', '评分最高'],
    mask_status: false,
    click_status: 0,
    loading_status: true,
    page: 1,
    jump: 0,
    category_id: 0,
    screen_id: '',
    expert_data: [],
    name:'',
    expert_status:0,
    title_status:0,
    screen_index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      color:util.color,
      http_host:util.http_host,
      category_id:options.id,
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
    expert_data = [],
      that.setData({
        jump: 0,
        page: 1,
        expert_data: [],
        name:'',
        expert_status:0,
        category_id: that.data.category_id,
        screen_id: '',
        loading_status: true,
        title_status:0,
        screen_index: 0,
        classify_index: 0,
      })
    that.classify_data();
    that.expert_list();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: util.color,
    })
  },
  search: function (e) {
    var that = this;
    expert_data = [];
    that.setData({
      page: 1,
      expert_data: [],
      name: e.detail.value,
    })
    that.expert_list();
  },
  // 渲染页面数据
  classify_data:function(){
    var that=this;
    var customer_id_en=util.customer_id_en;
    wx.request({
      url: util.http_host+'/mini_program/applets/index.php/answer/front_page/mainpage',
      data:{
        customer_id_en: customer_id_en,
      },
      success:function(res){
        that.setData({
          category: res.data.category,
          screen_data: res.data.screen,
        })     
      }
    })
  },
  // 搜索点击事件
  search_click: function () {
    var that = this;
    if (that.data.jump == 0) {
      that.setData({
        jump: 1,
      })
      wx.navigateTo({
        url: '../search/search',
      })
      that.expert_list()
    }
  },
  // 分类按钮
  classify_click: function () {
    var that = this;
    if (that.data.classify_status == 0) {
      that.setData({
        classify_status: 1,
        screen_status: 0,
        mask_status: true,
        title_status: 0,
      })
    } else {
      that.setData({
        classify_status: 0,
        mask_status: false,
      })
    }
  },
  // 筛选按钮
  screen_click: function () {
    var that = this;
    if (that.data.screen_status == 0) {
      that.setData({
        classify_status: 0,
        screen_status: 1,
        mask_status: true,
        title_status: 1,
      })
    } else {
      that.setData({
        screen_status: 0,
        mask_status: false,
      })
    }
  },
  // 分类子选项点击事件
  classify_item: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var category_id = e.currentTarget.dataset.id;
    expert_data= [],
    that.setData({
      classify_index: index,
      classify_status: 0,
      category_id: category_id,
      mask_status: false,
      page:1,
      expert_data: [],
      loading_status: true,
      expert_status: 0,
    })
    that.expert_list();
  },
  // 筛选子选项点击事件
  screen_item: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var screen_id = e.currentTarget.dataset.id;
    expert_data = [],
    that.setData({
      screen_index: index,
      screen_status: 0,
      mask_status: false,
      screen_id: screen_id,
      page:1,
      expert_data: [],
      loading_status: true,
      expert_status: 0,
    })
    that.expert_list();
  },
  // 遮罩层点击事件
  bindmask: function () {
    var that = this;
    that.setData({
      mask_status: false,
      classify_status: 0,
      screen_status: 0,
    })
  },
  // 专家详情
  experts_detail: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (that.data.jump == 0) {
      that.setData({
        jump: 1,
        id: id,
      })
      wx.navigateTo({
        url: '../experts_detail/experts_detail?id=' + id,
      })
    }
  },
  // 答主列表数据
  expert_list: function () {
    var that = this;
    var customer_id_en =util.customer_id_en;
    var page = that.data.page;
    // console.log()
    wx.request({
      url: util.http_host+'/mini_program/applets/index.php/answer/front_page/indexpage',
      data: {
        customer_id_en: customer_id_en,
        page: page,
        category_id: that.data.category_id,
        screen_id: that.data.screen_id,
        name:that.data.name,
      },
      success: function (res) {
        console.log(res)
        var expert_list = res.data;
        if (that.data.page == 1 && res.data.length == 0) {
          that.setData({
            expert_status: 1,
          })
          return;
        }
        if (res.data.length == 0 && that.data.page != 1) {
          that.setData({
            page: page,
            loading_status: false,
            expert_list: expert_list,
          })
          return;
        }
        expert_data = expert_data.concat(res.data);
        that.setData({
          page: page,
          expert_data: expert_data,
          loading_status: true,
          expert_list: expert_list,
        })
        if (expert_data.length < 5) {
          that.setData({
            loading_status: false,
          })
        }
      }
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
    var that = this;
    if (that.data.expert_list.length == 0) {
      return;
    }
    // expert_data=[];
    var page = that.data.page;
    page = Number(page) + 1;
    that.setData({
      // expert_data:[],
      page: page,
      loading_status: true,
    })
    that.expert_list();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})