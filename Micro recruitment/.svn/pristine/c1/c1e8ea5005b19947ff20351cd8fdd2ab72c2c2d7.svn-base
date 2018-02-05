// pages/addressSearch/addressSearch.js
var util = require("../../utils/util.js");
var http_host = '';
var customer_id_en = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
    no_xinxi:false,
    search_icon:true,
    myID:'',
    placeholder:'搜索地区关键词',
    go:'inToView0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var myID = options.myID;
    var that=this;
    that.setData({
      myID: myID
    })
  },
  onShow:function(){
    var that=this;
    var http_host = util.http_host;
    var customer_id_en = util.customer_id_en;
    console.log(http_host)
    console.log(customer_id_en)
    // 
    wx.request({
      url: http_host + '/mini_program/minvite/back/index.php/home/Auxiliary/citylist',
      data: {
        customer_id_en: customer_id_en
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          data: res.data
        })
      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  // 选择地区
  cityChoice:function(e){
    var that=this;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    if (that.data.myID==1){
      wx.setStorage({
        key: "local",
        data: { local: id },
        success: function () {
          wx.navigateBack()
        }
      })
    }else{
      wx.setStorage({
        key: "local1",
        data: { local: id },
        success: function () {
          wx.navigateBack()
        }
      })
    }
  },
  scrollToViewFn: function (e) {
    var _id = e.target.dataset.id; 
    this.setData({
      go: 'inToView' + _id
    })
  },
  //  搜索
  search_input:function(e){
    var that = this;
    var http_host = util.http_host;
    var customer_id_en = util.customer_id_en;
    var name = e.detail.value
    console.log(name)
    if (name == '') {
      that.setData({
        search_icon: true,
      })
    } else {
      that.setData({
        search_icon: false,
      })
    }
    // 
    wx.request({
      url: http_host + '/mini_program/minvite/back/index.php/home/Auxiliary/citylist',
      data: {
        customer_id_en: customer_id_en,
        name:name
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          data: res.data
        })
        if (res.data==null){
          console.log(11111)
          that.setData({
            no_xinxi: true
          })
        }else{
          that.setData({
            no_xinxi: false
          })
        }
      },
      fail: function (res) {
        console.log('no')
      }
    });
  }
})