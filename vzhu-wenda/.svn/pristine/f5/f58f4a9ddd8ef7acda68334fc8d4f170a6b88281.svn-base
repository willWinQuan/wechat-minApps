//index.js
//获取应用实例
var util = require("../../utils/util.js");
const app = getApp();
var expert_data=[];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    circular1:false,
    indicatorColor:'rgba(255,255,255,.3)',
    indicatorActiveColor:'#fff',
    classify_index:0,
    classify_status:0,
    screen_status:0,
    mask_status:false,
    indicatorColor1:'rgba(238,238,238,.9)',
    autoplay1:false,
    click_status:0,
    loading_status:true,
    page:1,
    jump:0,
    category_id:0,
    screen_id:'4',
    expert_data:[],
    expert_status:0,
    loading_hidden:true,
    screen_index:0,
    list_status:0,
    fixed_status:0,
    title_status:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    expert_data = [],
    that.setData({
      loading_status: true,
      expert_status: 0,
      jump:0,
      page:1,
      expert_data: [],
      category_id: 0,
      screen_id:'4',
      mask_status: false,
      classify_index: 0,
      screen_index:0,
      classify_status: 0,
      screen_status: 0,
      list_status:0,
      fixed_status:0,
      title_status:0,
    })
    that.index_data();
    that.expert_list();
    // 获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight:res.windowHeight,
        })        
        console.log(that.data.windowHeight)
      }
    })
    app.getUserInfo(function(res){
      console.log(res)
    })
    that.setData({
      color:util.color,
      http_host:util.http_host,
    })
    var customer_id_en = util.customer_id_en;
    wx.request({
      url: util.http_host + '/mini_program/applets/index.php/answer/front_page/share',
      data: {
        customer_id_en: customer_id_en,
      },
      success: function (res) {
        if (res.data.error == 1000) {
          that.setData({
            title: res.data.title,
            content: res.data.content,
            pic: util.http_host +res.data.pic,
          })
        }
      }
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
    // 暂停播放录音// 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext.pause()
    }
    // expert_data= [],
    that.setData({
      // loading_status: true,
      // expert_status: 0,
      jump:0,
      // page:1,
      // expert_data: [],
      // category_id: 0,
      // screen_id:'',
      // mask_status: false,
      // classify_index: 0,
      // screen_index:0,
      // classify_status: 0,
      // screen_status: 0,
      // list_status:0,
      // fixed_status:0,
      // title_status:0,
    })
    // that.index_data();
    // that.expert_list();
    that.getColor(function(){
        that.setData({
          color:util.color,
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: util.color,
        })
    })  
  },
  getColor:function(callback){
    wx.request({
      url: util.http_host+'/mini_program/applets/index.php/answer/front_page/color',
      data: {
        customer_id_en: util.customer_id_en,
      },
      success: function (res) {
        console.log(res)
        util.color = res.data;
        console.log(util.color)
        typeof callback == "function" && callback({})
      }
    })
  },
  // 获取页面数据
  index_data:function(){
    var that=this;
    var customer_id_en=util.customer_id_en;
    wx.request({
      url: util.http_host+'/mini_program/applets/index.php/answer/front_page/mainpage',
      data:{
        customer_id_en: customer_id_en,
      },
      success:function(res){
        console.log(res)
        that.setData({
          category:res.data.category,
          banner_img:res.data.img,
          action_img:res.data.img1,
          screen_data:res.data.screen,
          category_id: res.data.category_id,
          loading_hidden: false,
        })
      }
    })
  },
  //轮播跳转页面
  banner_jump: function (e) {
    var that=this;
    var link=e.currentTarget.dataset.link;
    var link_status = e.currentTarget.dataset.link_status;
    var link_type = e.currentTarget.dataset.link_type;
    if(link_type==1){
      that.click_jump(link, link_status);
    }
    if (link_type == 2 && link_status == 0){
      wx.navigateTo({
        url: '../classify/classify?id=' + link,
      })
    }
    if (link_type == 2 && link_status == 1) {
      wx.switchTab({
        url: '../classify/classify?id=' + link,
      })
    }
  },
  // 小图标点击跳转页面
  bindaction:function(e){
    var that=this;
    var action_link=e.currentTarget.dataset.id;
    var link_type = e.currentTarget.dataset.link_type;
    var link_status = e.currentTarget.dataset.link_status;
    if (link_type==1){
      that.click_jump(action_link, link_status);
    }
    if (link_type == 2 && link_status==1){
      wx.switchTab({
        url: '../classify/classify?id=' + action_link,
      })
    }
    if (link_type == 2 && link_status == 0) {
      wx.navigateTo({
        url: '../classify/classify?id=' + action_link,
      })
    }
  },
  // 自定义跳转
  click_jump: function (link_id, status) {
    var that = this;
    if (that.data.jump == 0) {
      that.setData({
        jump: 1,
      })
      if (link_id == 1) {
        that.setData({
          jump: 0,
        })
        if (status == 1) {
          wx.switchTab({
            url: '../index/index',
          })
        } else {
          wx.navigateTo({
            url: '../index/index',
          })
        }
      }
      if (link_id == 2) {
        if (status == 1) {
          wx.switchTab({
            url: '../classify/classify',
          })
        } else {
          wx.navigateTo({
            url: '../classify/classify',
          })
        }
      }
      if (link_id == 3) {
        if (status == 1) {
          wx.switchTab({
            url: '../search/search',
          })
        } else {
          wx.navigateTo({
            url: '../search/search',
          })
        }
      }
      if (link_id == 4) {
        if (status == 1) {
          wx.switchTab({
            url: '../mine/mine',
          })
        } else {
          wx.navigateTo({
            url: '../mine/mine',
          })
        }
      }
      if (link_id == 5) {
        if (status == 1) {
          wx.switchTab({
            url: '../my-collection/my-collection',
          })
        } else {
          wx.navigateTo({
            url: '../my-collection/my-collection',
          })
        }
      }
      if (link_id == 6) {
        if (status == 1) {
          wx.switchTab({
            url: '../my-quiz/my-quiz',
          })
        } else {
          wx.navigateTo({
            url: '../my-quiz/my-quiz',
          })
        }
      }
      if (link_id == 7) {
        if (status == 1) {
          wx.switchTab({
            url: '../my-wallet/my-wallet',
          })
        } else {
          wx.navigateTo({
            url: '../my-wallet/my-wallet',
          })
        }
      }
    }
  },
  // 搜索点击事件
  search_click:function(){
    var that=this;
    if (that.data.jump==0){
      that.setData({
        jump:1,
      })
      wx.navigateTo({
        url: '../search/search',
      })
    }
  },
  // 分类按钮
  classify_click:function(){
    var that=this;
    if (that.data.classify_status==0){
      that.setData({
        classify_status: 1,
        screen_status:0,
        mask_status: true,
        title_status:0,
      })
    }else{
      that.setData({
        classify_status:0,
        mask_status: false,
      })
    }
  },
  // 筛选按钮
  screen_click:function(){
    var that=this;
    if(that.data.screen_status==0){
      that.setData({
        classify_status: 0,
        screen_status: 1,
        mask_status:true,
        title_status:1,
      })
    }else{
      that.setData({
        screen_status: 0,
        mask_status: false,
      })
    }
  },
  // 分类子选项点击事件
  classify_item:function(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    var category_id = e.currentTarget.dataset.id;
    expert_data = [];
    that.setData({
      classify_index:index,
      classify_status: 0,
      category_id: category_id,
      mask_status: false,
      page: 1,
      expert_data: [],
      expert_status: 0,
      loading_status: true,
      title_status:0,
    })
    that.expert_list();
  },
  // 筛选子选项点击事件
  screen_item:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var screen_id = e.currentTarget.dataset.id;
    expert_data=[]
    that.setData({
      screen_index: index,
      screen_status: 0,
      mask_status: false,
      screen_id: screen_id,
      page:1,
      expert_data:[],
      expert_status: 0,
      loading_status: true,
      title_status:1,
    })
    that.expert_list();
  },
  // 遮罩层点击事件
  bindmask:function(){
    var that=this;
    that.setData({
      mask_status: false,
      classify_status: 0,
      screen_status: 0,
    })
  },
  // 专家详情
  experts_detail:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    if(that.data.jump==0){
      that.setData({
        jump:1,
        id:id,
      })
      wx.navigateTo({
        url: '../experts_detail/experts_detail?id='+id,
      })
    }
  },
  // 答主列表数据
  expert_list: function () {
    var that = this;
    var customer_id_en = util.customer_id_en;
    var page=that.data.page;
    wx.request({
      url:util.http_host+ '/mini_program/applets/index.php/answer/front_page/indexpage',
      data: {
        customer_id_en: customer_id_en,
        page: page,
        category_id: that.data.category_id,
        screen_id: that.data.screen_id,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          list_status: 1,
        })
        var expert_list=res.data;
        if (that.data.page == 1 && res.data.length == 0){
          that.setData({
            expert_status:1,
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
  // 页面距顶部高度
  onPageScroll: function (res) {
    var that = this;
    if (res.scrollTop >= 300) {
      that.setData({
        fixed_status: 1
      })
      console.log(that.data.fixed_status)
    }else {
      that.setData({
        fixed_status: 0
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
    var that = this;
    if(that.data.list_status==1){
      if (that.data.expert_list.length == 0) {
        return;
      }
      var page = that.data.page;
      page = Number(page) + 1;
      that.setData({
        page: page,
        loading_status: true,
      })
      that.expert_list();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: that.data.title,
      path: '/pages/index/index',
      desc: that.data.content,
      imageUrl: that.data.pic,
    }
  },
})