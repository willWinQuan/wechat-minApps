//index.js
//获取应用实例
var customer_id_en = '';
var user_id_en = '';
var app = getApp()
var util = require('../../utils/util.js');
var share_img = '';
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    shop_img: '',
    self_pay_img: '',
    self_pay_text: '',
    shortcut_img: '',
    shop_name: '',
    shop_address_text: '',
    shop_tel: '',
    discount_bg: '',
    already_received: '',
    discount_list: [],
    customer_id_en: '',
    http_host: '',
    have: [],
    user_id_en: '',
    page: 1,
    color: '',
    is_load: '',
    user_role: '',
    text: '',
    no_record: 0,
    loading_hidden: true,
    latitude: '',
    longitude: '',
    name: '',
    address: '',
    time_card: '',
    carid: '',
    cuo:0,
    conpons:1
  },
  onLoad: function (e) {
    console.log("onload");
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var shop_img = that.data.shop_img;
    var self_pay_img = that.data.self_pay_img;
    var self_pay_text = that.data.self_pay_text;
    var discount_list = that.data.discount_list
    var user_id_en = util.user_id_en;
    var page = that.data.page;
    that.setData({
      customer_id_en: customer_id_en,
      http_host: http_host
    })
    //that.indexshow();
  },
  indexshow: function () {
    var that = this;
    app.getUserInfo(function (userInfo) {

      //更新数据
      that.setData({
        userInfo: userInfo,
        user_id_en: userInfo.user_id_en,
        // color: userInfo.color,
      })
      // console.log(that.data.color)
      console.log(userInfo.user_id_en);
      if (that.data.user_id_en) {
        wx.request({
          url: util.http_host + '/mini_program/wa_card/back/index.php/home/frontweb/mini_index',
          data: {
            customer_id_en: util.customer_id_en,
            user_id_en: that.data.user_id_en,
          },
          success: function (res) {
            console.log(res);
            var shortcut_img = res.data.data.shortcut_img;
            that.setData({
              shop_img: res.data.data.backgroundimg,
              shortcut_img: res.data.data.shortcut_img,
              self_pay_text: res.data.data.shortcut_name,
              shop_name: res.data.data.addr,
              shop_address_text: res.data.data.address,
              shop_tel: res.data.data.tel,
              user_role: res.data.data.user_role,
              loading_hidden: false,
            })
            // console.log(that.data.self_pay_text)
            var self_pay_text = that.data.self_pay_text;
            // console.log(self_pay_text);
          },
        })
        //优惠券接口
        if (that.data.conpons==1){
          that.setData({
            conpons: 0
          })
          wx.request({
            url: util.http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/conpons',
            data: {
              customer_id_en: util.customer_id_en,
              user_id_en: that.data.user_id_en,
              page_id: that.data.page,
            },
            success: function (res) {
              if (res.data.error == 1002) {
                util.showModal('提示', res.data.data, false, function () { });
              } else {
                var have = [];
                var data = res.data.data;
                console.log(that.data.page)
                if (that.data.page == 1) {
                  if (!data) {
                    that.setData({
                      no_record: 1,
                    })
                  } else {
                    that.setData({
                      no_record: 0,
                    })
                  }
                }
                if (data) {
                  for (var i = 0; i < data.length; i++) {
                    have.push(data[i].have);
                  }
                }
                // util.showLoading();
                // 上拉加载
                if (data) {
                  // util.hideToast();
                  for (var i = 0; i < data.length; i++) {
                    that.data.discount_list.push(data[i]);
                  }
                  if (data.length < 5) {
                    that.setData({
                      is_load: 1,
                    })
                  }
                } else {
                  that.setData({
                    is_load: 1,
                  })
                }
                // var page = that.data.page + 1;
                var page = 1;
                that.setData({
                  discount_list: that.data.discount_list,
                  have: have,
                  page_id: page,
                  page: page,
                })
              }
            }
          })
        }
      }
    })
  },
  // 拨打电话
  contact_us: function () {
    var that = this;
    var shop_tel = that.data.shop_tel;
    shop_tel = String(shop_tel);
    wx.makePhoneCall({
      phoneNumber: shop_tel,
    })
  },
  // 分类按钮
  self_pay: function (e) {
    var that = this;
    var self_pay_text = that.data.self_pay_text;
    var name = e.currentTarget.dataset.name;
    if (name == that.data.self_pay_text[0]) {
      if (util.status == 1) {
        wx.navigateTo({
          url: '../self_pay/self_pay'
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '请先激活您的会员卡',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../mine/mine'
              });
            }
          }
        })
      }

    } else if (name == that.data.self_pay_text[1]) {
      if (util.status == 1) {
        wx.request({
          url: util.http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/my_time_card',
          data: {
            customer_id_en: util.customer_id_en,
            user_id_en: that.data.user_id_en,
            page_id: 1,
            is_use: 1,
          },
          success: function (res) {
            that.setData({
              time_card: res.data.data.length,
              carid: res.data.data[0].id
            })
          }
        })
        // 扫描支付
        wx.scanCode({
          success: (res) => {
            console.log(res)
            console.log(res.result)
            if (res.result.indexOf((util.http_host+'/mini_program/wa_card/pages/my_calculate/index.php').split(':')[1]) > -1) {
              if (that.data.time_card == 1) {
                wx.navigateTo({
                  // url: '../buy_time/buy_time'
                  url: '../buy_time/buy_time?carid=' + that.data.carid + '&user_id_en=' + that.data.user_id_en + '',
                });
              } else {
                wx.navigateTo({
                  url: '../my_calculate/my_calculate'
                });
              }
            } else if (res.result.indexOf((util.http_host+'/mini_program/wa_card/pages/self_pay/index.php').split(':')[1]) > -1) {
              wx.navigateTo({
                url: '../self_pay/self_pay'
              });
            } else {
              util.showModal('提示', '二维码出错', false, function () { });
            }
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请先激活您的会员卡',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../mine/mine'
              });
            }
          }
        })
      }

    } else if (name == that.data.self_pay_text[2]) {
      if (util.status == 1) {
        wx.navigateTo({
          url: '../member_recharge/member_recharge'
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '请先激活您的会员卡',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../mine/mine'
              });
            }
          }
        })
      }
    } else if (name == that.data.self_pay_text[3]) {
      wx.navigateTo({
        url: '../store_apply/store_apply'
      });
    }
  },
  onReady: function () {
    console.log("onReady");
  },
  onShow: function () {

    util.topColor();
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    console.log(that.data.user_id_en)
    if (that.data.user_id_en){

    }else{
      console.log(1111)
      that.indexshow();
    }
    

    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/color_style',
      data: {
        customer_id_en: customer_id_en,
      },
      success: function (res) {
        that.setData({
          color: res.data.data
        })
      },
      fail: function (res) {
        // console.log('no')
      }
    })

    util.share(function (res) {
      console.log(res);
      share_img = res;
    })

  },
  onReachBottom: function () {
    console.log(999)
    var that = this;
    var http_host = util.http_host;
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    var discount_list = that.data.discount_list;
    var page = that.data.page;
    that.setData({
      page: page + 1
    })
    var page = that.data.page;
    // page=page+1;
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/conpons',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        page_id: page,
      },
      success: function (res) {
        var have = that.data.have;
        var data = res.data.data;
        // util.showLoading();
        if (data) {
          // util.hideToast();                   
          for (var i = 0; i < data.length; i++) {
            have.push(data[i].have);
          }
        }
        // 上拉加载
        if (data) {
          for (var i = 0; i < data.length; i++) {
            discount_list.push(data[i]);
          }
          that.setData({
            is_load: 1,
          })
        } else {
          that.setData({
            is_load: 1,
          })
        }
        // var page = that.data.page + 1;
        that.setData({
          discount_list: discount_list,
          have: have,
          page_id: page,
        })
      }
    })
  },
  examinetap: function () {
    wx.navigateTo({
      url: '../verification/verification'
    })
  },
  discounttap: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.idx;
    var that = this;
    var have = that.data.have;
    var already_received = that.data.already_received;
    var http_host = that.data.http_host;
    var customer_id_en = that.data.customer_id_en;
    var user_id_en = that.data.user_id_en;
    var data = {
      customer_id_en: customer_id_en,
      user_id_en: user_id_en,
      id: id,
    };
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/get_conpon',
      data: data,
      success: function (res) {
        // if (have[index] == 1) {
        //   util.showModal('提示', '已领取', false, function () { })
        // }
        if (res.data.error == 1000) {
          // already_received=1;
          // util.showModal('提示', '领取成功', false, function () { });
          wx.showToast({
            title: '领取成功',
            icon: 'success'
          })
          have[index] = 1;
          that.setData({
            have: have,
          })
        } else if(res.data.error == 1001){
          // util.showModal('提示', res.data.data, false, function () { });
          wx.showToast({
            title: '已领取',
            icon: 'success'
          })
        } else if (res.data.error == 1002) {
          // util.showModal('提示', res.data.data, false, function () { });
          wx.showToast({
            title: '优惠券已被领完',
            icon: 'error'
          })
        } else if (res.data.error == 1003) {
          wx.showModal({
            title: '提示',
            content: '请先激活您的会员卡',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../mine/mine'
                });
              }
            }
          })
        }
      }
    });
  },
  locationtap: function () {
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var latitude = '';
    var longitude = '';
    var store_id = '';
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
          name: res.data.data.name,
          address: res.data.data.address,
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
              name: name,
              address: address,
            })
            that.setData({
              cuo:0
            })
          },
          fail: function () {
            console.log("3授权失败返回数据");
            that.setData({
              cuo:1
            })
          }
        })
        if (that.data.cuo==1){
          wx.showModal({
            title: '提示',
            content: '没有检测到定位授权，请前往授权',
            showCancel: false,
            success: function (res) {
              wx.openSetting({
                success: function (data) {
                  console.log(data)
                  if (data.authSetting['scope.userLocation']){
                    that.setData({
                      cuo:0
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
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index',
      imageUrl: share_img,
    }
  },
})