//index.js
//获取应用实例
var app = getApp()
var util = require("../../utils/util.js");
var http_host = '';
var customer_id_en = '';
var page = 1;
var nav_data = [];
var index_index='';
var xinxi = 0;
Page({
  data: {
    list_click: -1,
    list_click1: -1,
    list_clicks: 0,
    list_clicks1: 0,
    list_clicks2: 0,
    list_clicks3: 0,
    screen: [1, 2, 1, 2],
    screen_index: 0,
    screen_index1: 0,
    screen_index2: 0,
    screen_index3: 0,
    mask: false,
    search_icon: true,
    no_xinxi:false,
    list_nav: [
      '职位',
      "薪资",
      '筛选',
      "区域",
    ],
    city:'',
    city_id:'',
    size:'',
    address:'',
    label:'',
    position:'',
    price:'',
    local_id: '',
    price_id: 0,
    position_id: 0,
    label_id: 0,
    data:'',
    loging:0,
    local:'',
    no_more:0,
    name:'',
    link:'',
    Jump:0,
    value:''
  },
  onLoad: function (userInfo) {
    console.log(userInfo)
    wx.removeStorageSync('local1')
    var that=this;
      var local = userInfo.local;
      var link = userInfo.link;
      nav_data = []
      that.setData({
        local: local,
        link: link,
        data:[],
      })
      console.log(link)
    page = 1;
    //页面详情
    that.search_nav()
  },
  onShow: function () {
    var that = this;
    // 
    that.setData({
      Jump: 0,
    })
    // 列表详情
    wx.getStorage({
      //获取数据的key
      key: 'local1',
      success: function (res) {
        console.log(res)
        var local = res.data.local;
        var city = res.data.city;
        console.log(local)
        if (local == undefined) {
          local = ''
        } else {
          that.setData({
            city_id: local,
            local: local,
          })
        }
        page = 1;
        console.log(that.data.local)
        nav_data = []
        that.setData({
          no_more: 0,
          data: [],
          value: '',
          name: '',
          no_xinxi:false
        })
        console.log(local)
        //页面详情
        that.search_nav()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 页面详情
  search_input: function (e) {
    page=1;
    var that = this;
    var name = e.detail.value;
    nav_data=[]
    console.log(name)
    if (name == '') {
      that.setData({
        search_icon: true,
        name: name,
        data:'',
        no_more: 0,
        loging: 0,
        more_more: 1,
      })
    } else {
      that.setData({
        search_icon: false,
        name: name,
        data: '',
        no_more: 0,
        loging: 0,
        more_more: 1,
      })
    }
    // 
    that.index_nav()
  },
  // 页面详情
  search_nav:function(){
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    // 请求首页详情
    wx.request({
      url: http_host + '/mini_program/minvite/back/index.php/home/Auxiliary/select',
      data: {
        customer_id_en: customer_id_en,
        local: that.data.local,
        link_type: that.data.link_type,
      },
      success: function (res) {
        console.log(res)
        var list = res.data.list
        // 
        for (var i = 0; i < list.position.length;i++){
          if (list.position[i].id == that.data.link){
            index_index=i;
            console.log(index_index)
            that.setData({
              screen_index: index_index
            })
          }
        }
        // 
        that.setData({
          city: res.data.city,
          city_id: res.data.city_id,
          size: res.data.list_length,
          address: list.address,
          label: list.label,
          position: list.position,
          price: list.price,
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
  index_nav: function () {
    var that = this;
    var http_host = util.http_host;
    var customer_id_en = util.customer_id_en;
    page = page;
    var size = that.data.size;
    var local = that.data.city_id;
    var local_id = that.data.local_id;
    var price_id = that.data.price_id;
    var position_id = that.data.position_id;
    console.log(position_id)
    console.log(that.data.link)
    if (that.data.link != 'undefined' && that.data.link != undefined && that.data.link!=''){
      position_id = that.data.link
    }
    console.log(that.data.link)
    var label_id = that.data.label_id;
    var name = that.data.name
    console.log(size)
    xinxi = 1;
    if (local_id == ''){
      local = local;
    } else {
      local = local_id;
    }
    that.setData({
      loging: 1,
      no_more:0,
    })
    console.log(that.data.link)
    console.log(position_id)
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
        local: local,
        name: name
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.data)
        if (res.data.data){
          var data = res.data.data;
          if (data.length == 0) {
            if (nav_data==''){
              setTimeout(function () {
                that.setData({
                  no_more: 0,
                  loging: 0,
                  more_more: 0,
                  no_xinxi: true,
                })
              }, 300)
            }else{
              setTimeout(function () {
                that.setData({
                  no_more: 1,
                  loging: 0,
                  more_more: 0,
                  no_xinxi: false,
                })
              }, 300)
            }
          } else {
            for (var i = 0; i < data.length; i++) {
              nav_data.push(data[i]);
            }
            setTimeout(function () {
              that.setData({
                data: nav_data,
                more_more: 1,
                loging: 0,
                no_more: 1,
                no_xinxi: false,
              })
              // 
            }, 300)
          }   
        }

      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  // 上拉加载
  onReachBottom: function () {
    var that = this;
    var more_more = that.data.more_more
    if (more_more == 1) {
      page++;
      // 列表详情
      that.index_nav()
    }
    console.log(page)
  },
  // 类型筛选
  screen_click: function (e) {
    var that = this;
    page = 1;
    nav_data = [];
    var index = e.currentTarget.dataset.index;
    var id= e.currentTarget.dataset.id;
    console.log(id)
    that.setData({
      screen_index: index,
      position_id: id,
      more_more: 1,
      data: '',
      link:'',
      mask: false,
      list_click: -1,
      no_more: 0
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
      link: '',
      mask: false,
      list_click: -1,
      no_more: 0
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
      link: '',
      mask: false,
      list_click: -1,
      no_more: 0
    })
    // 列表详情
    that.index_nav()
  },
  screen_click3: function (e) {
    var that = this;
    page = 1;
    nav_data = [];
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    that.setData({
      screen_index3: index,
      local_id: id,
      more_more: 1,
      data: '',
      link: '',
      mask: false,
      list_click: -1,
      no_more:0
    })
    // 列表详情
    that.index_nav()
  },
  // 内容筛选
  List_click: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    if (that.data.list_click == id) {
      that.setData({
        list_click: -1,
        list_click1: -1,
        mask: false,
      })
    } else {
      that.setData({
        list_click: id,
        list_click1: -1,
        mask: true,
      })
    }
    // 
    if (id == 0) {
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
  // 地址选择
  addressSearch: function () {
    var that=this;
    var myID = 2;
    if (that.data.Jump==0){
      that.setData({
        Jump:1
      })
      wx.navigateTo({
        url: '../addressSearch/addressSearch?myID' + myID
      })
    }
  },
  // 职位详情
  details: function (e) {
    var id = e.currentTarget.dataset.test
    console.log(id)
    var that = this;
    if (that.data.Jump == 0) {
      that.setData({
        Jump: 1
      })
      wx.navigateTo({
        url: '../details/details?id=' + id
      })
    }  
  },
})