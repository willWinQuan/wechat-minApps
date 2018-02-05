var http_host='';
var customer_id_en='';
var share_img = '';
var util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_count:'',
    shop_tel:'',
    name:'',
    address:'',
    cuo:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.topColor();
    var that=this;
    var customer_id_en=util.customer_id_en;
    var http_host=util.http_host;
    wx.request({
      url: http_host +'/mini_program/wa_card/back/index.php/home/miniprogram/store_list',
      data:{
        customer_id_en:customer_id_en,
      },
      success:function(res){
        console.log(res)
        that.setData({
          store_count:res.data.data
        })
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
    util.topColor();
    util.share(function (res) {
      console.log(res);
      share_img = res;
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/store_apply/store_apply',
      imageUrl: share_img,
    }
  },

  locationtap: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var latitude = '';
    var longitude = '';
    var store_id = id;
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/location',
      data: {
        customer_id_en: customer_id_en,
        store_id: store_id,
      },
      success: function (res) {
        console.log(res);
        that.setData({
          latitude: res.data.data.latitude,
          longitude: res.data.data.longitude,
          name:res.data.data.name,
          address:res.data.data.address,
        });
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res) {
            var latitude = Number(that.data.latitude);
            var longitude = Number(that.data.longitude);
            var name = that.data.name;
            var address = that.data.address;
            wx.openLocation({
              latitude: latitude,
              longitude: longitude,
              scale: 28,
              name:name,
              address:address,
            })
            that.setData({
              cuo: 0
            })
          },
          fail: function () {
            console.log("3授权失败返回数据");
            that.setData({
              cuo: 1
            })
          }
        })
        if (that.data.cuo == 1) {
          wx.showModal({
            title: '提示',
            content: '没有检测到定位授权，请前往授权',
            showCancel: false,
            success: function (res) {
              wx.openSetting({
                success: function (data) {
                  console.log(data)
                  if (data.authSetting['scope.userLocation']) {
                    that.setData({
                      cuo: 0
                    })
                  }
                }
              })
            }
          })
        }
      },
    })
  },
  store_tel:function(e){
    var shop_tel = e.currentTarget.dataset.tel;
    console.log(shop_tel)
    wx.makePhoneCall({
      phoneNumber: shop_tel,
    })
  }
})