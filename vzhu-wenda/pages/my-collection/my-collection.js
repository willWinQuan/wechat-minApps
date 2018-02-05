// pages/my-collection/my-collection.js
let url = "/mini_program/applets/index.php/answer/Front_User/favori_list";
let app = getApp();
let http_host = '';
let util = require("../../utils/util.js");
let page_size = 1;
let detailList = [];
let Arr_data = [];

function opensetting(callback) {
  // var that=this;
  wx.openSetting({
    success: function (res) {
      if (res.authSetting["scope.userInfo"]) {
        wx.showToast({
          title: '正在授权中...',
          icon: 'loading',
        })
      }
      app.getUserInfo(function (userInfo) {
        console.log(userInfo)
        wx.showToast({
          title: '授权成功',
          duration: 500,
        })
        typeof callback == "function" && callback({ 'ok': true })
      })
    }
  })
}

Page({

  data: {
    myCollection:false,
    collection:true,
    collectionList:[],
    list:[],
    test:'123asdf456asf',
    page:1,
    limit:10,
    http:''
  },

  onLoad (options) {
    var that = this
    var user_id_en = util.user_id_en
    if (user_id_en != undefined) {
      return null;
    } else {
      wx.showModal({
        title: '提示',
        content: '查询不到授权，请前往授权',
        showCancel: false,
        success(e) {
          console.log(e)
          console.log("获取授权部分的")
          opensetting(() => {
            console.log('i am null')
          })
          let customer_id_en = that.data.customer_id_en
          let user_id_en = that.data.user_id_en
          that.setData({
            customer_id_en: customer_id_en,
            user_id_en: user_id_en
          })
        }
      })
    }
  },

  getDetail(){
    console.log("获取后台数据的")
    let that = this
    let page = that.data.page
    http_host = util.http_host
    let customer_id_en = that.data.customer_id_en
    let user_id_en = util.user_id_en
    console.log(util.user_id_en)
    console.log(that.data.user_id_en)

    if (util.user_id_en == undefined){
      user_id_en == null
    }else{
      user_id_en = util.user_id_en
    }
    // console.log(user_id_en)
    let  limit = that.data.limit
    let data = {
      customer_id_en: util.customer_id_en,
      user_id_en: user_id_en,
      page: page,
      limit: limit
    }
    wx.request({
      url: http_host + url,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        let dataList = res.data.data;
        console.log(dataList);

        if (dataList.length == 0) {
          setTimeout(() => {
            that.setData({
              no_more: 1,
              loging: 0,
              http: res.data.http,
              loading_hidden: false,
              Arr_data :[],
              more_more: 0
            })
          }, 300)
        } else {
          for (let i = 0; i < dataList.length; i++) {
            Arr_data.push(dataList[i]);
          }
          setTimeout(() => {
            that.setData({
              dataList: Arr_data,
              loging: 0,
              more_more: 1,
              http: res.data.http,
              loading_hidden: false,
              no_more: 0,
            })
          }, 300)
        }

      }
    })
  },
  onShow(){
    let that = this
    var user_id_en = util.user_id_en
   

    let bgColor = util.color
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: bgColor,
      animation: {
        timingFunc: 'easeIn'
      }
    })
    Arr_data = [];
    that.setData({
      page: 1
    })

    that.getDetail()
  },
  onReachBottom() {
    let that = this
    let http = that.data.http
    that.mytest()
  },
  mytest(){
    let that = this
    let detailList = that.data.detailList
    if (detailList == '') {
      wx.showToast({
        title: '数据已加载完',
        icon: 'loading',
        duration:2000
      })
    }
    let page = that.data.page
    console.log(page)
    page = Number(page) + 1;
    that.setData({
      page: page,
    })
    that.getDetail()
  },
  // 跳转链接
  experts_detail(e){
    // console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../experts_detail/experts_detail?id=' + id,
    })
  },


  
})