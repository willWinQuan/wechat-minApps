//index.js
//获取应用实例
var app = getApp()
var util = require("../../utils/util.js");
Page({
  data: {
    list_click: 0,
    list_click1: 0,
    list_click2: 0,
    list_click3: 0,
    click_index: 0,
    click_index1: 0,
    click_index2: 0,
    click_index3: 0,
    screen: [1, 2, 1, 2],
    screen_index: 0,
    screen_index1: 0,
    screen_index2: 0,
    screen_index3: 0,
    mask: false,
    search_icon: true,
    no_xinxi: false,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    console.log(util.user_id_en)
  },
  // 搜索
  search_input: function (e) {
    var that = this;
    var name = e.detail.value
    console.log(name)
    if (name == '') {
      that.setData({
        search_icon: true,
        no_xinxi: true,
      })
    } else {
      that.setData({
        search_icon: false,
        no_xinxi: false,
      })
    }
  },
  // 类型筛选
  screen_click: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    console.log(index)
    that.setData({
      screen_index: index
    })
  },
  screen_click1: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    console.log(index)
    that.setData({
      screen_index1: index
    })
  },
  screen_click2: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    console.log(index)
    that.setData({
      screen_index2: index
    })
  },
  screen_click3: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    console.log(index)
    that.setData({
      screen_index3: index
    })
  },
  // 内容筛选
  list_click1: function () {
    var that = this;
    if (that.data.click_index == 0) {
      that.setData({
        list_click: 1,
        list_click1: 0,
        list_click2: 0,
        list_click3: 0,
        click_index: 1,
        click_index1: 0,
        click_index2: 0,
        click_index3: 0,
        mask: true,
      })
    } else {
      that.setData({
        list_click: 0,
        list_click1: 0,
        list_click2: 0,
        list_click3: 0,
        click_index: 0,
        click_index1: 0,
        click_index2: 0,
        click_index3: 0,
        mask: false,
      })
    }
  },
  list_click2: function () {
    var that = this;
    if (that.data.click_index1 == 0) {
      that.setData({
        list_click: 0,
        list_click1: 1,
        list_click2: 0,
        list_click3: 0,
        click_index: 0,
        click_index1: 1,
        click_index2: 0,
        click_index3: 0,
        mask: true,
      })
    } else {
      that.setData({
        list_click: 0,
        list_click1: 0,
        list_click2: 0,
        list_click3: 0,
        click_index: 0,
        click_index1: 0,
        click_index2: 0,
        click_index3: 0,
        mask: false,
      })
    }
  },
  list_click3: function () {
    var that = this;
    if (that.data.click_index2 == 0) {
      that.setData({
        list_click: 0,
        list_click1: 0,
        list_click2: 1,
        list_click3: 0,
        click_index: 0,
        click_index1: 0,
        click_index2: 1,
        click_index3: 0,
        mask: true,
      })
    } else {
      that.setData({
        list_click: 0,
        list_click1: 0,
        list_click2: 0,
        list_click3: 0,
        click_index: 0,
        click_index1: 0,
        click_index2: 0,
        click_index3: 0,
        mask: false,
      })
    }
  },
  list_click4: function () {
    var that = this;
    if (that.data.click_index3 == 0) {
      that.setData({
        list_click: 0,
        list_click1: 0,
        list_click2: 0,
        list_click3: 1,
        click_index3: 0,
        click_index1: 0,
        click_index2: 0,
        click_index3: 1,
        mask: true,
      })
    } else {
      that.setData({
        list_click: 0,
        list_click1: 0,
        list_click2: 0,
        list_click3: 0,
        click_index: 0,
        click_index1: 0,
        click_index2: 0,
        click_index3: 0,
        mask: false,
      })
    }
  }
})