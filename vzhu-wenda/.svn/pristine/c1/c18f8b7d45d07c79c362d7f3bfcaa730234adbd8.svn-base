// pages/search/search.js
var util = require("../../utils/util.js");
var expert_data=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category_id:0,
    screen_id:'',
    page:1,
    name:'',
    click_status:0,
    expert_status:0,
    loading_status:true,
    list_status:0,
    pre_name:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.id;
    this.setData({
      http_host: util.http_host,
    })
    if(name!=undefined){
      this.setData({
        name: name,
      })
    }
    console.log()
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
    expert_data = [];
    that.setData({
      name:'',
      expert_data:[],
      page:1,
      click_status: 0,
      color:util.color,
      expert_status:0,
      loading_status: true,
      list_status:0,
      pre_name:'',
    })
    that.search_data();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: util.color,
    })
  },
  // 跳转到专家详情
  experts_detail:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    if (that.data.click_status==0){
      that.setData({
        click_status:1
      })
      wx.navigateTo({
        url: '../experts_detail/experts_detail?id='+id,
      })
    }
  },
  search:function(e){
    var that=this;
    var name = e.detail.value;
    // setTimeout(function(){
    //   if (that.data.pre_name==name){
        expert_data = [];
        that.setData({
          page: 1,
          expert_data: [],
          name: name,
          list_status: 0,
          loading_status: true,
          expert_status: 0,
        })
        that.search_data();
      // }
    // },400)
    // that.setData({
    //   pre_name:name,
    // })
  },
  // 获取页面数据
  search_data:function(){
    var that=this;
    var customer_id_en=util.customer_id_en;
    var page = that.data.page;
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
        that.setData({
          list_status:1,
        })
        var expert_list = res.data;
        console.log(that.data.expert_status)
        if (that.data.page == 1 && res.data.length == 0) {
          that.setData({
            expert_status: 1,
            expert_data: expert_list,
          })
          return;
        }
        console.log(that.data.expert_status)
        if (res.data.length == 0 && that.data.page != 1) {
          that.setData({
            page: page,
            loading_status: false,
            expert_list: expert_list,
          })
          return;
        }
        if(page==1){
          expert_data = expert_list;
          console.log(expert_data)
        }else{
          expert_data = expert_data.concat(res.data);
        }
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
    that.search_data();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})