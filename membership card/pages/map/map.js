var util = require('../../utils/util.js');
// var amapFile = require('../../libs/amap-wx.js');

Page({
  data: {
    customer_id_en: '',
    http_host: '',
    store_id:0,
    latitude: 39.903213,
    longitude: 116.397743,
    markers: [
      {
      iconPath: "../../image/marker_checked.png",
      id: 0,
      latitude: 39.903213,
      longitude: 116.397743,
      width: 23,
      height: 33
    }
    // ,
    //   {
    //     iconPath: "../../image/marker_checked.png",
    //     id: 0,
    //     latitude: 39.903213,
    //     longitude: 116.397743,
    //     width: 23,
    //     height: 33
    //   }
    ],
    distance: '',
    cost: '',
    polyline: [],
  },
  onLoad: function (option) {
    var store_id=option.id;
    this.setData({
      store_id: store_id,
    })
  },
  onShow: function () {
    util.topColor();
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var latitude = '';
    var longitude = '';
    var store_id = that.data.store_id;
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
          markers: [{
            iconPath: "../../image/marker_checked.png",
            id: 0,
            latitude: res.data.data.latitude,
            longitude: res.data.data.longitude,
            width: 23,
            height: 33,
          }
          // ,
          // {
          //   iconPath: "../../image/marker_checked.png",
          //   id: 0,
          //   latitude: 39.903213,
          //   longitude: 116.397743,
          //   width: 23,
          //   height: 33
          // }
          ],
          distance: '',
          cost: '',
          polyline: [],
        })
      },
    })
    // this.setData({
    //   latitude: latitude,
    //   longitude: longitude,
    // })
  },
  changeLocal: function () {
  }
})