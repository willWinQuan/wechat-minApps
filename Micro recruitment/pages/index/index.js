//index.js
//获取应用实例
var app = getApp();
var util = require("../../utils/util.js");
var http_host='';
var customer_id_en='';
var page=1;
var nav_data=[];
var userLocation=0;
//var nav_data1 = [];
var tt='';
var windowHeight='';
Page({
  data: {
    list_click:-1,
    list_click1:-1,
    list_clicks:0,
    list_clicks1: 0,
    list_clicks2: 0,
    list_clicks3: 0,
    screen:[1,2,1,2],
    Navigation:[],
    screen_index:0,
    screen_index1: 0,
    screen_index2: 0,
    screen_index3: 0,
    mask:false,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    arr_msg: [],
    latitude:'',
    longitude:'',
    customer_id_en:'',
    list_nav:[
      '职位',
      "薪资",
      '筛选',
      "区域",
    ],
    city:'',
    city_id:'',
    percentage:'',
    size:'',
    loging:0,
    no_more:0,
    more_more:1,
    loading_hidden:true,
    address:'',
    label:'',
    position:'',
    price:'',
    local_id:'',
    price_id:0,
    position_id:0,
    label_id:0,
    link_type:'',
    content:'',
    title:'',
    pic:'',
    Jump:0,
    data:[],
    Percentage1:0,
    fixed:'static',
    top:0
  },
  // 
  onLoad: function () {
    var that = this;
    //更新数据
    wx.removeStorageSync('local')
    wx.removeStorageSync('local1')
    page = 1;
    nav_data = [];
    that.setData({
      no_more: 0,
      data: nav_data
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that=this;
    that.setData({
      more_more:0
    })
    wx.showToast({
      title: '正在刷新',
      icon: 'loading',
      mask: true
    })
    page = 1;
    nav_data = [];
    that.setData({
      no_more: 0,
      data: nav_data
    })
    console.log(page)
    // 首页详情
    that.index_request()
    wx.stopPullDownRefresh()
  },
  onShow:function(){
    // 获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        windowHeight=res.windowHeight;
        console.log(windowHeight)
      }
    })
    var that=this;
    // 清除演示器
    clearTimeout(tt)
    // 
    that.setData({
      Jump:0
    })
    // 
    console.log(that.data.longitude)
    // 定位
    if (that.data.longitude==''){
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          // 
          console.log(2222)
          console.log(res)
          var latitude = res.latitude;
          var longitude = res.longitude;
          var speed = res.speed;
          var accuracy = res.accuracy;
          that.setData({
            longitude: longitude,
            latitude: latitude,
            request: 0
          })
          //调用应用实例的方法获取全局数据
          app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            that.setData({
              userInfo: userInfo,
            })
            console.log(util.user_id_en)
          })
          // 首页详情
          that.index_request()
          console.log(http_host)
        },
        fail: function () {
          console.log(1111111)
          if (userLocation==0){
            that.Location()
          }
        }
      })
    }
    // 列表详情
    wx.getStorage({
      //获取数据的key
      key: 'local',
      success: function (res) {
        console.log(res)
        var local = res.data.local;
        var city = res.data.city;
        page = 1;
        nav_data=[];
        console.log(local)
        if (local == undefined) {
          local = ''
        } else {
          that.setData({
            city_id: local,
            no_more: 0,
            data: nav_data
          })
        }
        console.log(local)
        wx.removeStorageSync('local')
        console.log(111)
        // 首页详情
        that.index_request()
      },
      fail: function (res) {
        console.log(res)

      }
    })
  },
  Location:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '网络完全，请放心授权定位',
      showCancel:false,
      success:function(){
        wx.getSystemInfo({
          success: function (res) {
            var version = res.SDKVersion;
            version = version.replace(/\./g, "")
            console.log(version)
            if (parseInt(version) < 111) {// 小于1.2.0的版本
              // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
              wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
                showCancel: false,
              })
              return
            }
          }
        })  
        wx.openSetting({
          success: function (res) {
              console.log(res)
              if (res.authSetting["scope.userLocation"]){
                userLocation=1
              }
              console.log(util.user_id_en)
              if (util.user_id_en == '' || util.user_id_en==undefined){
                if (res.authSetting["scope.userInfo"]) {
                  app.getUserInfo(function (userInfo) {
                    console.log(userInfo)
                    that.setData({
                      userInfo: userInfo,
                    })
                    console.log(util.user_id_en)
                  })
                }
              }
          }
        })
      }
    })    
  },
  //首页详情
  index_request:function(){
    var that=this;
    var http_host = util.http_host;
    var customer_id_en = util.customer_id_en;
    var local = that.data.city_id
    // 请求首页详情
    wx.request({
      url: http_host + '/mini_program/minvite/back/index.php/home/Auxiliary/index',
      data: {
        customer_id_en: customer_id_en,
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        local: local
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.img1.length)
        var let1 = Number(res.data.img1.length);
        var percentage = Number(100 / let1);
        if (percentage<25){
          percentage=25
        }
        var list = res.data.list
        console.log(res.data.share_pic.content)
        that.setData({
          arr_msg: res.data.img,
          Navigation: res.data.img1,
          percentage: percentage,
          city: res.data.city,
          city_id: res.data.city_id,
          local: res.data.city_id,
          size: res.data.list_length,
          address: list.address,
          label: list.label,
          position: list.position,
          price: list.price,
          loading_hidden: false,
          content: res.data.share_pic.content,
          title: res.data.share_pic.title,
          pic: res.data.share_pic.pic,
        })
        // 列表详情
        that.index_nav()
      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  // 列表详情
  index_nav:function(){
    var that=this;
    var http_host = util.http_host;
    var customer_id_en = util.customer_id_en;
    page=page;
    var size = that.data.size;
    var local = that.data.city_id;
    var local_id = that.data.local_id;
    var price_id = that.data.price_id;
    var position_id = that.data.position_id;
    var label_id = that.data.label_id;
    console.log(size)
    console.log(page)
    if (local_id==''){
      local = local;
    }else{
      local = local_id
    }
    that.setData({
      loging:1,
      no_more:0,
    })
    // 请求列表详情
    wx.request({
      url: http_host + '/mini_program/minvite/back/index.php/home/Auxiliary/job',
      data: {
        customer_id_en: customer_id_en,
        page: page,
        size: size,
        price: price_id,
        position: position_id,
        label: label_id,
        local: local
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.data)
        var data = res.data.data;
        if (data.length==0){
          setTimeout(function(){
            that.setData({
              no_more: 1,
              loging: 0,
              more_more:0
            })
          },300)
        }else{
          for (var i = 0; i < data.length; i++) {
            nav_data.push(data[i]);
          }
          //nav_data1 = that.data.data
          setTimeout(function(){
            that.setData({
              data: nav_data,
              loging: 0,
              more_more: 1,
              no_more: 0,
            })
          },300)
        }
      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  // 类型筛选
  screen_click:function(e){
    var that=this;
    page = 1;
    nav_data=[];
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    that.setData({
      screen_index: index,
      position_id: id,
      more_more:1,
      data:'',
      mask:false,
      list_click: -1,
      fixed:'static',
      top: 0
    })
    // 列表详情
    that.index_nav()
  },
  screen_click1: function (e) {
    var that = this;
    page = 1;
    nav_data = [];
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    that.setData({
      screen_index1: index,
      price_id: id,
      more_more: 1,
      data: '',
      mask: false,
      list_click: -1,
      fixed: 'static',
      top: 0
    })
    // 列表详情
    that.index_nav()
  },
  screen_click2: function (e) {
    var that = this;
    page = 1;
    nav_data = [];
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    that.setData({
      screen_index2: index,
      label_id: id,
      more_more: 1,
      data: '',
      mask: false,
      list_click: -1,
      fixed: 'static',
      top: 0
    })
    // 列表详情
    that.index_nav()
  },
  screen_click3: function (e) {
    var that = this;
    page=1;
    nav_data = [];
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    that.setData({
      screen_index3: index,
      local_id: id,
      more_more: 1,
      data: '',
      mask: false,
      list_click: -1,
      fixed: 'static',
      top: 0
    })
    // 列表详情
    that.index_nav()
  },
  // 内容筛选
  List_click:function(e){
    var that = this;
    var id = e.target.dataset.id;
    if (that.data.list_click==id){
      that.setData({
        list_click: -1,
        list_click1: -1,
        mask: false,
        fixed: 'static',
        top: 0,
        Percentage1:false,
      })
    }else{
      that.setData({
        list_click: id,
        list_click1: -1,
        mask: true,
        fixed:'fixed'
      })
    }
    // 
    if(id==0){
      that.setData({
        list_clicks: 1,
        list_clicks1: 0,
        list_clicks2: 0,
        list_clicks3: 0,
      })
    }
    // 
    if (id == 1) {
      that.setData({
        list_clicks: 0,
        list_clicks1: 1,
        list_clicks2: 0,
        list_clicks3: 0,
      })
    }
    // 
    if (id == 2) {
      that.setData({
        list_clicks: 0,
        list_clicks1: 0,
        list_clicks2: 1,
        list_clicks3: 0,
      })
    }
    // 
    if (id == 3) {
      that.setData({
        list_clicks: 0,
        list_clicks1: 0,
        list_clicks2: 0,
        list_clicks3: 1,
      })
    }
  },
  // 上拉加载
  onReachBottom:function(){
    var that=this;
    var more_more = that.data.more_more
    if (more_more==1){
      page++;
      // 列表详情
      that.index_nav()
    }
    console.log(page)
  },
  // 职位详情
  details:function(e){
    var id = e.currentTarget.dataset.test
    console.log(id)
    var that=this;
    var http_host = util.http_host;
    var customer_id_en = util.customer_id_en;
    wx.request({
      url: http_host + '/mini_program/minvite/back/index.php/home/Auxiliary/job_jump',
      data: {
        customer_id_en: customer_id_en,
        id:id
      },
      success: function (res) {
        console.log(res)
        if (res.data.error==1000){
          if (that.data.Jump == 0) {
            that.setData({
              Jump: 1
            })
            wx.navigateTo({
              url: '../details/details?id=' + id
            })
          }
        }else{
          wx.showModal({
            title: '提示',
            content: '此岗位已下架',
            showCancel: false,
            success: function () {

            }
          })  
        }
      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  // 搜索事件处理函数
  search_input: function (e) {
    var that=this;
    var local = that.data.local;
    console.log(local)
    if (that.data.Jump == 0) {
      that.setData({
        Jump: 1
      })
      wx.navigateTo({
        url: '../search/search?local=' + local
      })
    }  
  },
  // 地址选择
  addressSearch:function(){
    var that=this;
    var myID=1;
    if (that.data.Jump==0){
      that.setData({
        Jump:1
      })
      wx.navigateTo({
        url: '../addressSearch/addressSearch?myID=' + myID
      })
    }
  },
  // 导航跳转
  classification: function (e) {
    var that = this;
    var index = e.target.dataset.link_type;
    var link = e.target.dataset.link;
    var link_status = e.target.dataset.link_status;
    //
    that.setData({
      link: link
    })
    if (index==2){
      that.cilik(index, link_status)
    }else{
      that.cilik(link, link_status)
    } 
  },
  // 广告图跳转
  imageClick: function (e) {
    var that = this;
    var index = e.target.dataset.link;
    var link_status = e.target.dataset.link_status;
    that.cilik(index, link_status)
  },
  // 自定义跳转
  cilik: function (obj,status) {
    var that = this;
    if (that.data.Jump==0){
      that.setData({
        Jump: 1
      })
      if (obj == 1) {
        that.setData({
          Jump: 0
        })
        if (status == 1) {
          wx.switchTab({
            url: '../index/index'
          })
        } else {
          wx.navigateTo({
            url: '../index/index'
          })
        }
      }
      // 
      if (obj == 2) {
        var local = that.data.local;
        var link = that.data.link
        wx.navigateTo({
          url: '../search/search?local=' + local + '&link=' + link
        })
      }
      // 
      if (obj == 3) {
        if (status == 1) {
          wx.switchTab({
            url: '../send_box/send_box',
          })
        } else {
          wx.navigateTo({
            url: '../send_box/send_box',
          })
        }
      }
      // 
      if (obj == 4) {
        if (status == 1) {
          wx.switchTab({
            url: '../my-collection/my-collection'
          })
        } else {
          wx.navigateTo({
            url: '../my-collection/my-collection'
          })
        }
      }
      // 
      if (obj == 5) {
        if (status == 1) {
          wx.switchTab({
            url: '../resume/my-resume'
          })
        } else {
          wx.navigateTo({
            url: '../resume/my-resume'
          })
        }
      }
      // 
      if (obj == 6) {
        if (status == 1) {
          wx.switchTab({
            url: '../company_apply/company_apply'
          })
        } else {
          wx.navigateTo({
            url: '../company_apply/company_apply'
          })
        }
      }
      // 
      if (obj == 7) {
        if (status == 1) {
          wx.switchTab({
            url: '../company-search/company-search'
          })
        } else {
          wx.navigateTo({
            url: '../company-search/company-search'
          })
        }
      }
      // 
      if (obj == 8) {
        if (status == 1) {
          wx.switchTab({
            url: '../mine/mine'
          })
        } else {
          wx.navigateTo({
            url: '../mine/mine'
          })
        }
      }
    }
  },
  //转发
  onShareAppMessage: function () {
    var that=this;
    return {
      title: that.data.title ,
      path: '/pages/index/index',
      desc: that.data.content,
      imageUrl: that.data.pic,
    }
  },
  // 计算页面滚动距离
  onPageScroll:function(res){
    var that=this;
    var Percentage1 = res.scrollTop / windowHeight
    // console.log(Percentage1)
    var top = res.scrollTop;
    if (that.data.mask == false) {
      that.setData({
        top: top
      })
    }
    if (top>0){
      if (Percentage1 > 0.60) {
        console.log(1111)
        that.setData({
          Percentage1: true
        })
      } else {
        that.setData({
          Percentage1: false
        })
      }
    }
  }
})

function xunhuan(){
    tt=setTimeout(function () {
      app.globalData.seconds = app.globalData.seconds + 1
      if (app.globalData.seconds == 120) {
        wx.login({
          success: function (res) {
            var code = res.code;
            var data = {
              code: code,
              customer_id_en: util.customer_id_en,
            };
            util.commonRequest(
              data,
              '/mini_program/minvite/back/index.php/home/Auxiliary/session_key',
              function (res) {
                app.globalData.session_key = res.data.session_key
                console.log(res)
              })
          }
        });
        app.globalData.seconds = 0
        xunhuan();
      } else {
        xunhuan();
      }
    }, 1000)
}