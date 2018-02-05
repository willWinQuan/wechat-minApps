1// pages/self_pay/self_pay.js
var customer_id_en = '';
var http_host = '';
var user_id_en = '';
var share_img = '';
var util = require('../../utils/util.js');
var form_id="";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    maskflag: true,
    discount: false,
    isdiscount: true,
    discount_content: 'block',
    full_content: 'none',
    total: 0,
    payment_amount: 0,
    discount_value: 0,
    discountstate: false,
    restostate: false,
    resto_value: '',
    rebate_value: '0',
    rebatestate: false,
    rebate_num: '',
    integral: '',
    integral_value: 0,
    integralstate: false,
    negative: '',
    is_allowable: '',
    resto: 0,
    color: '',
    discount: '',
    reduce: '',
    coupon_id: '',
    points: 0,
    discount_text: '',
    condition: '',
    discount1: '',
    type: 0,
    type1: 0,
    money1: 0,
    passarry: [1, 2, 3, 4, 5, 6],
    isFocus: false,
    password: '',
    signid: '',
    maskflag1: true,
    discount2: '',
    integral_value1: 0,
    integral_value2: 0,
    recover: 0,
    background: '',
    user_status:'',
    user_status_desc:'',
    toastHidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.topColor();
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var user_id_en = util.user_id_en;
    var is_allowable = that.data.is_allowable;
    console.log(user_id_en)
    console.log(that.data.resto)
    that.setData({
      http_host: http_host,
    })
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/color_style',
      data: {
        customer_id_en: customer_id_en,
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.data)
        that.setData({
          color: res.data.data,
          background: res.data.background,
        })
      },
      fail: function (res) {
        // console.log('no')
      }
    });
   
  },
  hiddenflag: function () {
    this.setData({
      maskflag1: true,
      maskflag: true
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
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var user_id_en = util.user_id_en;

    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/integral',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
      },
      success: function (res) {
        console.log(res)
        if (res.data.data.recover!=0){
          var integral_value1 = Math.round((Math.floor(res.data.data.integral / res.data.data.recover)) * 100) / 100;
        }else{
          var integral_value1=0;
        }
        console.log(res.data.data.img)
        that.setData({
          is_allowable: res.data.data.is_allowable,
          rebate_num: res.data.data.discount,
          resto_value: res.data.data.money,
          integral: res.data.data.integral,
          recover: res.data.data.recover,
          integral_value1: integral_value1,
          name: res.data.data.name,
          card_name: res.data.data.name,
          card_number: res.data.data.number,
          card_bg: res.data.data.img,
          card_color: res.data.data.color,
          card_name: res.data.data.name,
          card_title: res.data.data.title,
          user_status: res.data.data.user_status,
          user_status_desc: res.data.data.user_status_desc
        })
        // var is_allowable = that.data.is_allowable; 
      }
    })
    // 
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    wx.request({
      url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/color_style',
      data: {
        customer_id_en: customer_id_en,
      },
      success: function (res) {
        console.log(res.data.data)
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
  formSubmitTopay: function (e) {
    var that = this;
    console.log(that.data.total1);
    if (that.data.total1 == undefined || that.data.total1 == 0 || that.data.total1==''){
      wx.showModal({
        title: '提示',
        content: '请输入大于零的金额',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.setData({
              maskflag: true,
            })
          }
        }
      });
      return
    }
    console.log(that.data.resto_value)
    console.log(that.data.resto)
    var integralstate = that.data.integralstate
    var restostate = that.data.restostate
    var discountstate = that.data.discountstate
    var status = util.status;
     form_id=e.detail.formId;
    console.log(status)
    console.log(restostate)
    var user_status = that.data.user_status;
    console.log(user_status)
    if (user_status==1){
      if (integralstate == false && restostate == false && discountstate == false) {
        wx.showModal({
          title: '提示',
          content: '请选择支付方式',
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                maskflag: true,
              })
            } 
          }
        });
      } else {
        var customer_id_en = util.customer_id_en;
        var http_host = util.http_host;
        var user_id_en = util.user_id_en;
        var cardcode = that.data.card_number
        var discountstate = that.data.discountstate
        var integralstate = that.data.integralstate
        if (discountstate) {
          var coupon_id = that.data.coupon_id
        } else {
          var coupon_id = ''
        }
        if (integralstate) {
          var points = that.data.integral_value * that.data.recover
        } else {
          var points = 0
        }
        console.log(that.data.total)
        console.log(points)
        console.log(coupon_id)
        console.log(that.data.resto)
        console.log(that.data.integral_value)
        console.log(that.data.integral_value1)
        // 积分抵扣
        if (integralstate == true && restostate == false) {
          // if (that.data.integral_value <= that.data.integral_value1) {
          if (that.data.resto <= 0){
            wx.request({
              url: http_host + '/mini_program/wa_card/back/index.php/home/frontweb/mypay',
              data: {
                customer_id_en: customer_id_en,
                user_id_en: user_id_en,
                paytype: 1,
                price: that.data.total,
                money: that.data.resto,
                coupon_id: coupon_id,
                points: points,
                cardcode: cardcode,
              },
              method: 'post',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res)

                that.setData({
                  signid: res.data.signid,
                  isFocus: true,
                  maskflag1: false,
                })
              },
              fail: function (res) {
                // console.log('no')
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '积分抵扣不足，请选择添加余额支付',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
                that.setData({
                  maskflag: true,
                })
              }
            });
          }
        }
        // 优惠券抵扣
        if (discountstate == true && restostate == false) {
          if (that.data.resto <= 0) {
            wx.request({
              url: http_host + '/mini_program/wa_card/back/index.php/home/frontweb/mypay',
              data: {
                customer_id_en: customer_id_en,
                user_id_en: user_id_en,
                paytype: 1,
                price: that.data.total,
                money: that.data.resto,
                coupon_id: coupon_id,
                points: points,
                cardcode: cardcode,
              },
              method: 'post',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res)

                that.setData({
                  signid: res.data.signid,
                  isFocus: true,
                  maskflag1: false,
                })
              },
              fail: function (res) {
                // console.log('no')
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '优惠券抵扣不足，请选择添加余额支付',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
                that.setData({
                  maskflag: true,
                })
              }
            });
          }
        }
        // 
        if (restostate) {
          if (that.data.resto_value < that.data.resto) {
            wx.showModal({
              title: '提示',
              content: '余额不足',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
                that.setData({
                  maskflag: true,
                })
              }
            });
          } else {

            wx.request({
              url: http_host + '/mini_program/wa_card/back/index.php/home/frontweb/mypay',
              data: {
                customer_id_en: customer_id_en,
                user_id_en: user_id_en,
                paytype: 1,
                price: that.data.total,
                money: that.data.resto,
                coupon_id: coupon_id,
                points: points,
                cardcode: cardcode,
              },
              method: 'post',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res)

                that.setData({
                  signid: res.data.signid,
                  isFocus: true,
                  maskflag1: false,
                })
              },
              fail: function (res) {
                // console.log('no')
              }
            })
          }
        }
        // 
      }
    }else{
      wx.showModal({
        title: '温馨提示',
        content: that.data.user_status_desc,
        showCancel:false,
        success: function (res) {
          that.setData({
            maskflag: true,
          })
        }
      });
    }  
    // 
    that.setData({
      maskflag: false,
    })
  },
  // 
  inputfocus: function (e) {
    var poss = e.detail.value;
    var that = this;
    that.setData({
      password: poss
    })
  },
  inputvalue: function (e) {
    var poss = e.detail.value;
    var that = this;
    var signid = that.data.signid;
    that.setData({
      password: poss
    })
    if (poss.length == 6) {
      that.setData({
        maskflag1: true,
        isFocus: false,
      })
    
      var customer_id_en = util.customer_id_en;
      var http_host = util.http_host;
      var signid = that.data.signid
      var pwd = that.data.password
      var cardcode = that.data.card_number;

      console.log(signid)
      console.log(pwd)
      wx.request({
        url: http_host + '/mini_program/wa_card/back/index.php/home/frontweb/checkmypay',
        data: {
          customer_id_en: customer_id_en,
          signid: signid,
          pwd: pwd,
          page:"pages/index/index",
          form_id: form_id,
          tl_type:2
        },
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res)
          that.setData({
            password: '',
            maskflag: true,
          })
          // 提示
          if (res.data.err_code == 1) {
            if (res.data.get_points == 0) {
              wx.showModal({
                title: '提示',
                content: '支付成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    setTimeout(function () {
                      wx.navigateTo({
                        url: "../consume_record/consume_record"
                      }, 500)
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              });
            } else {
              wx.showModal({
                title: '提示',
                content: '支付成功,并获取得到' + res.data.get_points + '积分',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    setTimeout(function () {
                      wx.navigateTo({
                        url: "../consume_record/consume_record"
                      }, 500)
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              });
            }
          } else {
            that.setData({
              toastcontent:res.data.err_data,
              toastHidden:false
            })
            setTimeout(function(){
              that.setData({
                toastHidden: true
              })
            },2000)
          }
        },
        fail: function (res) {
          that.setData({
            password: ''
          })
        }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/self_pay/self_pay',
      imageUrl: share_img,
    }
  },
  onmasktap: function (e) {
    var that = this;
    var coupon_id = e.currentTarget.id;
    var condition = e.currentTarget.dataset.condition
    var discount1 = e.currentTarget.dataset.discount
    var discount_text = e.currentTarget.dataset.discount_text
    var total = that.data.total
    var rebate_num = that.data.rebate_num
    var rebate_value = that.data.rebate_value
    var integral_value = that.data.integral_value
    var rebatestate = that.data.rebatestate
    var integralstate = that.data.integralstate
    console.log(discount1)
    var type = that.data.type
    var type1 = that.data.type1
    if (type == 1) {
      var discount_value = Math.round((total - (total * (discount1 / 10))) * 100) / 100;
      var rebate_value = (total - discount_value) - ((total - discount_value) * rebate_num / 10)
      console.log(rebate_value)
      if (rebate_value < 0.01 && rebate_value > 0) {
        var rebate_value = 0.01
      }
      that.setData({
        type1: 1,
        rebate_value: Math.round(rebate_value*100)/100
      })

    } else {
      var discount_value = discount1;
      var rebate_value = (total - discount_value) - ((total - discount_value) * rebate_num / 10);
      console.log(rebate_value)
      if (rebate_value < 0.01 && rebate_value > 0) {
        var rebate_value = 0.01
      }
      that.setData({
        type1: 2,
        rebate_value: Math.round(rebate_value * 100) / 100
      })
    }

    console.log(total)
    console.log(rebate_value)
    console.log(integral_value)
    console.log(discount_value)

    if (rebatestate) {
      if (integralstate) {
        if (Number(total - rebate_value - discount_value) < Number(that.data.integral_value1)) {
          console.log(discount_value)
          var resto = 0
          var integral_value = Math.ceil(total - discount_value - rebate_value)
        } else {
          var integral_value = that.data.integral_value1
          var resto = Math.round((total - discount_value - rebate_value - integral_value) * 100) / 100
        }
      } else {
        var resto = Math.round((total - discount_value - rebate_value) * 100) / 100
        var integral_value = 0
      }
    } else {
      if (integralstate) {
        if (Number(total - discount_value) < Number(that.data.integral_value1)) {
          var resto = 0
          var integral_value = Math.ceil(total - discount_value)
        } else {
          var integral_value = that.data.integral_value1
          var resto = Math.round((total - discount_value - integral_value) * 100) / 100
        }
      } else {
        var resto = Math.round((total - discount_value) * 100) / 100
        var integral_value = 0
      }
    }

    that.setData({
      maskflag: true,
      discount: false,
      discountstate: true,
      coupon_id: coupon_id,
      discount_text: discount_text,
      discount1: discount1,
      condition: condition,
      discount_value: Math.round(discount_value * 100) / 100,
      integral_value: Math.ceil(integral_value),
      resto: resto
    })
  },
  onmasktap1: function () {
    var that = this;
    that.setData({
      maskflag: true,
      discount: false,
      maskflag1:true,
    })
  },
  discount: function () {
    var that = this;
    var customer_id_en = util.customer_id_en;
    var http_host = util.http_host;
    var user_id_en = util.user_id_en;
    var man = that.data.total;
    console.log(customer_id_en)

    that.setData({
      maskflag: false,
      discount: true,
    })
  },
  isdiscounttap: function () {
    var that = this;
    that.setData({
      isdiscount: true,
      discount_content: 'block',
      full_content: 'none',
      type: 1,
    })
  },
  isfulltap: function () {
    var that = this;
    that.setData({
      isdiscount: false,
      discount_content: 'none',
      full_content: 'block',
      type: 2,
    })
  },
  // 改变输入支付金额的时候获取input的值
  getPaySum: function (e) {
    var that = this;
    var total = e.detail.value;
    var rebate_value = that.data.rebate_value;
    var payment_amount = e.detail.value;
    var discount_value = that.data.discount_value;
    var discountstate = that.data.discountstate;
    var rebate_num = that.data.rebate_num;
    var resto_value = that.data.resto_value;
    var restostate = that.data.restostate;
    var rebatestate = that.data.rebatestate;
    var integralstate = that.data.integralstate;
    var integral = that.data.integral;
    var resto = that.data.resto;
    var condition = that.data.condition
    var discount1 = that.data.discount1
    var integral_value = that.data.integral_value
    var type1 = that.data.type1
    var type = that.data.type
    var coupon_id = that.data.coupon_id
    console.log(discount_value)
    console.log(integral_value)
    // 
    if (total==''){
      that.setData({
        total1: '',
        rebatestate: false,
        integralstate: false,
        restostate: false,
        resto: 0,
        rebate_value: 0,
        integral_value: 0,
        type1: 0,
        discount_value: 0,
        discountstate: false,
        reduce: '',
        discount2: ''
      })
    }
    // 
    var regu = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
    if (!regu.test(total)) {
      total = total.substr(0, total.length - 1);
    }
    that.setData({
      total1: total
    })
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (that.data.total1!=''){
      if (regu.test(that.data.total1)) {
        // 
        console.log(total)
        // 
        var customer_id_en = util.customer_id_en;
        var http_host = util.http_host;
        var user_id_en = util.user_id_en;
        if (total == '') {
          that.setData({
            integralstate: false,
            rebatestate: false,
            restostate: false,
            total: total
          })
        } else {
          that.setData({
            rebatestate: true,
            total: total
          })
        }
        wx.request({
          url: http_host + '/mini_program/wa_card/back/index.php/home/miniprogram/use_conpon',
          data: {
            customer_id_en: customer_id_en,
            user_id_en: user_id_en,
            man: total
          },
          method: 'get',
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
            console.log(res)
            console.log('use_conpon:' + res)
            console.log(res.data.data)
            if (res.data.data) {
              // 自动选择优惠券
              // 只有折扣券
              if (res.data.data.discount && res.data.data.reduce == undefined) {
                // 
                var discount_discount = res.data.data.discount[0].discount
                var condition = res.data.data.discount[0].condition
                console.log(discount_discount)
                var rebate_value = (total * (discount_discount / 10) - total * (rebate_num / 10) * (discount_discount / 10));
                console.log(rebate_value)
                if (rebate_value < 0.01 && rebate_value > 0) {
                  var rebate_value = 0.01
                }
                var discount_value = total - (total * (discount_discount / 10))
                // id
                var coupon_id = res.data.data.discount[0].id
                that.setData({
                  discount2: res.data.data.discount,
                  reduce: 0,
                  rebate_value: Math.round(rebate_value * 100) / 100,
                  condition: condition,
                  discount1: discount_discount,
                  type: 1,
                  type1: 1,
                  coupon_id: coupon_id,
                  isdiscount: true,
                  discountstate: true,
                  discount_value: Math.round(discount_value * 100) / 100
                })
                // 

              }
              // 只有满减券
              if (res.data.data.discount == undefined && res.data.data.reduce) {
                // 
                console.log('res:'  +  res )
                console.log(res)
                var discount_value = res.data.data.reduce[0].discount
                var condition = res.data.data.reduce[0].condition
                console.log('reduce_discount:'+ reduce_discount)
                var rebate_value = (total - discount_value) - ((total - discount_value) * (rebate_num / 10));
                console.log(rebate_value)
                if (rebate_value < 0.01 && rebate_value>0){
                  var rebate_value=0.01
                }
                // id
                var coupon_id = res.data.data.reduce[0].id
                that.setData({
                  discount2: 0,
                  reduce: res.data.data.reduce,
                  rebate_value: Math.round(rebate_value * 100) / 100,
                  condition: condition,
                  // discount1: reduce_discount,
                  discount1: discount_value,
                  type: 2,
                  type1: 2,
                  coupon_id: coupon_id,
                  isdiscount: false,
                  discountstate: true,
                  discount_value: Math.round(discount_value * 100) / 100
                })

              }
              // 折扣券与满减券同时存在
              if (res.data.data.discount && res.data.data.reduce) {
                //
                console.log(555555)
                var discount_discount = res.data.data.discount[0].discount
                var discount_condition = res.data.data.discount[0].condition
                var discount_value = total - (total * (discount_discount / 10))
                console.log(discount_value)
                // id
                var discount_coupon_id = res.data.data.discount[0].id
                // 
                var reduce_discount = res.data.data.reduce[0].discount
                var reduce_condition = res.data.data.reduce[0].condition
                // id
                var reduce_coupon_id = res.data.data.reduce[0].id
                // 
                if (Number(discount_value) >= Number(reduce_discount)) {
                  var rebate_value = (total * (discount_discount / 10)) - (total * (rebate_num / 10) * (discount_discount / 10));
                  if (rebate_value < 0.01 && rebate_value > 0) {
                    var rebate_value = 0.01
                  }
                  that.setData({
                    condition: discount_condition,
                    discount1: discount_discount,
                    rebate_value: Math.round(rebate_value * 100) / 100,
                    type: 1,
                    type1: 1,
                    coupon_id: discount_coupon_id,
                    isdiscount: true,
                    discountstate: true,
                    discount_value: Math.round(discount_value * 100) / 100
                  })

                } else {
                  var discount_value = res.data.data.reduce[0].discount
                  var rebate_value = (total - discount_value) - ((total - discount_value) * (rebate_num / 10));
                  if (rebate_value < 0.01 && rebate_value > 0) {
                    var rebate_value = 0.01
                  }
                  that.setData({
                    condition: reduce_condition,
                    discount1: reduce_discount,
                    rebate_value: Math.round(rebate_value * 100) / 100,
                    type: 2,
                    type1: 2,
                    coupon_id: reduce_coupon_id,
                    isdiscount: false,
                    discountstate: true,
                    discount_value: Math.round(discount_value * 100) / 100
                  })
                }
                that.setData({
                  discount2: res.data.data.discount,
                  reduce: res.data.data.reduce,
                  rebate_value: Math.round(rebate_value * 100) / 100
                })

              }
              // 
            } else {
              var discount_value = that.data.discount_value
              var rebate_value = total - (total * (rebate_num / 10));
              if (rebate_value < 0.01 && rebate_value > 0) {
                var rebate_value = 0.01
              }
              that.setData({
                money1: 0,
                discount2: 0,
                reduce: 0,
                condition: '',
                discount1: '',
                discount_value: 0,
                type: 0,
                type1: 0,
                coupon_id: '',
                discountstate: false,
                rebate_value: Math.round(rebate_value * 100) / 100
              })
              // 
              console.log(total)

            }
            // 
            var discount_value = that.data.discount_value
            console.log(total)
            console.log(rebate_value)
            console.log(discount_value)
            console.log(that.data.integral_value1)
            if (Number(total - rebate_value - discount_value) < Number(that.data.integral_value1)) {
              var integral_value = Math.ceil(total - rebate_value - discount_value)
              // 
              if (integral_value > 0) {
                that.setData({
                  integralstate: true
                })
              } else {
                that.setData({
                  integralstate: false
                })
              }
              // 
              that.setData({
                resto: 0,
                restostate: false,
                integral_value: Math.round(integral_value * 100) / 100
              })
            } else {
              console.log(that.data.integral_value1)
              var integral_value = that.data.integral_value1
              var resto = (total - rebate_value - integral_value - discount_value);
              console.log(resto)
              // 
              if (integral_value > 0) {
                that.setData({
                  integralstate: true
                })
              } else {
                that.setData({
                  integralstate: false
                })
              }
              // 
              that.setData({
                resto: Math.round(resto * 100) / 100,
                restostate: true,
                integral_value: Math.round(integral_value * 100) / 100
              })
            }
            // 消除掉输入值为空的勾选项
            if (total == '') {
              that.setData({
                restostate: false
              })
            }
          },
          fail: function (res) {
            // console.log('no')
          }
        })
      } else {
        wx.showModal({
          title: '温馨提示',
          content: '请正确输入金额',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.setData({
                total1: '',
                rebatestate: false,
                integralstate: false,
                restostate: false,
                resto: 0,
                rebate_value: 0,
                integral_value: 0,
                type1:0,
                discount_value:0,
                discountstate:false,
                reduce:'',
                discount2:''
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        });
      }
    }else{
      that.setData({
        rebatestate: false,
        integralstate: false,
        restostate: false,
        resto: 0,
        rebate_value: 0,
        integral_value: 0
      })
    }
  },
  // 优惠券checkbox点击事件
  discounttap: function (e) {
    var that = this;
    var total = that.data.total;
    var rebatestate = that.data.rebatestate;
    var integralstate = that.data.integralstate;
    var rebate_value = that.data.rebate_value;
    var discountstate = that.data.discountstate;
    var payment_amount = that.data.payment_amount;
    var discount_value = e.currentTarget.dataset.name;
    var rebate_num=that.data.rebate_num
    var resto = that.data.resto;
    console.log(discountstate)
    if (discountstate) {
      var rebate_value = total - (total * rebate_num / 10)
      if (rebate_value < 0.01 && rebate_value > 0) {
        var rebate_value = 0.01
      }
      that.setData({
        rebate_value: Math.round((rebate_value) * 100) / 100,
      })
      // 折扣勾选与否的情况：
      console.log(rebate_value)
      console.log(total - rebate_value)
      console.log(that.data.integral_value1)
      if (Number(total - rebate_value) < Number(that.data.integral_value1)) {
        // 是否勾选积分
        if (integralstate) {
          // 是否勾选折扣
          if (rebatestate) {
            var integral_value = total - rebate_value
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: 0,
            })
          } else {
            var integral_value = total;
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: 0,
            })
          }
        } else {
          // 是否勾选折扣
          if (rebatestate) {
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: Math.round((total - rebate_value) * 100) / 100,
            })
          } else {
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: Math.round((total) * 100) / 100,
            })
          }
        }
        // 
      } else {
        var integral_value = that.data.integral_value1
        // 是否勾选积分
        if (integralstate) {
          // 是否勾选折扣
          if (rebatestate) {
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: Math.round((total - rebate_value - integral_value) * 100) / 100,
            })
          } else {
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: Math.round((total - integral_value) * 100) / 100,
            })
          }

        } else {
          // 是否勾选折扣
          if (rebatestate) {
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: Math.round((total - rebate_value) * 100) / 100,
            })
          } else {
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: Math.round((total) * 100) / 100,
            })
          }
        }
        //
      }
      that.setData({
        discountstate: false,
        // payment_amount: Math.round((payment_amount + discount_value)*100)/100,
        payment_amount: payment_amount + discount_value,
        // resto: Math.round((resto + discount_value)*100)/100,
      });


      // 
    } else {
      console.log(111)
      var rebate_value = (total - discount_value) - ((total - discount_value) * rebate_num / 10)
      if (rebate_value < 0.01 && rebate_value > 0) {
        var rebate_value = 0.01
      }
      that.setData({
        rebate_value: Math.round((rebate_value) * 100) / 100,
      })
      if (integralstate) {
        if (rebatestate) {
          if (Number(total - rebate_value - discount_value) < Number(that.data.integral_value1)) {
            that.setData({
              integral_value: Math.ceil(total - rebate_value - discount_value),
              resto: 0,
            })
          } else {
            var integral_value = that.data.integral_value1;
            that.setData({
              resto: Math.round((total - rebate_value - discount_value - integral_value) * 100) / 100,
              integral_value: Math.ceil(integral_value),
            })
          }
        } else {
          if (Number(total - discount_value) < Number(that.data.integral_value1)) {
            that.setData({
              integral_value: Math.ceil(total - discount_value),
              resto: 0,
            })
          } else {
            var integral_value = that.data.integral_value1;
            that.setData({
              resto: Math.round((total - discount_value - integral_value) * 100) / 100,
              integral_value: Math.ceil(integral_value),
            })
          }
        }
      } else {
        if (rebatestate) {
          that.setData({
            resto: Math.round((total - discount_value - rebate_value) * 100) / 100,
            integral_value: 0,
          })
        } else {
          that.setData({
            resto: Math.round((total - discount_value) * 100) / 100,
            integral_value: 0,
          })
        }
      }
      // 
      that.setData({
        discountstate: true,
        // payment_amount: Math.round((payment_amount + discount_value)*100)/100,
        payment_amount: payment_amount - discount_value,
        // resto: Math.round((resto - discount_value)*100)/100 ,
      });
    }
  },
  // 会员卡checkbox
  restotap: function (e) {
    var that = this;
    // var payment_amount = that.data.payment_amount;
    var restostate = that.data.restostate;
    // var resto_value = e.currentTarget.dataset.name;
    // var discount_value = that.data.discount_value;
    // var resto_value = Number(that.data.resto_value);

    if (restostate) {
      that.setData({
        restostate: false,
      });
    } else {
      that.setData({
        restostate: true,
      })
    }
  },
  // 折扣checkbox点击事件
  rebatetap: function () {
    var that = this;
    var total = that.data.total;
    var integralstate = that.data.integralstate;
    var payment_amount = that.data.payment_amount;
    var rebatestate = that.data.rebatestate;
    var discountstate = that.data.discountstate
    var rebate_num = that.data.rebate_num;
    var rebate_value = that.data.rebate_value;
    var discount_value = that.data.discount_value;
    var resto = that.data.resto;
    var rebate_value = Number(that.data.rebate_value);
    if (rebatestate) {
      if (discountstate == true) {
        if (Number(total - discount_value) < Number(that.data.integral_value1)) {
          var integral_value = total - discount_value
          if (integralstate) {
            var resto = 0;
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: resto
            })
          } else {
            var resto = integral_value;
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: resto
            })
          }
        } else {
          var integral_value = that.data.integral_value1
          if (integralstate) {
            var resto = 0;
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: Math.round((total - discount_value - integral_value) * 100) / 100
            })
          } else {
            var resto = Math.round(integral_value * 100) / 100;
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: Math.round((total - discount_value) * 100) / 100
            })
          }
          // that.setData({
          //   resto: resto ,
          //   integral_value: integral_value
          // })
        }
      } else {
        // 去掉积分
        console.log(discountstate)
        if (Number(total) < Number(that.data.integral_value1)) {
          var integral_value = total;
          // 是否勾选了积分抵扣
          if (integralstate) {
            var resto = 0;
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: resto
            })
          } else {
            var resto = Math.round(total * 100) / 100;
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: resto
            })
          }
          // 

        } else {
          var integral_value = that.data.integral_value1
          // 是否勾选了积分抵扣
          if (integralstate) {
            var resto = Math.round((total - integral_value) * 100) / 100;
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: resto
            })
          } else {
            var resto = Math.round(total * 100) / 100;
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: resto
            })
          }
          // 
        }
      }
      // 
      that.setData({
        rebatestate: false,
        payment_amount: Math.round((payment_amount + rebate_value) * 100) / 100,
        // resto: Math.round((resto + rebate_value) * 100) / 100,
      });
      console.log(that.data.payment_amount)
    } else {
      if (discountstate) {
        if (Number(total - discount_value - rebate_value) < Number(that.data.integral_value1)) {
          // 是否勾选了积分抵扣
          if (integralstate) {
            var integral_value = Math.round((total - discount_value - rebate_value) * 100) / 100;
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: 0
            })
          } else {
            var integral_value = Math.round((total - discount_value - rebate_value) * 100) / 100;
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: integral_value
            })
          }
          // var integral_value = Math.round((total - discount_value - rebate_value) * 100) / 100;
          // that.setData({
          //   integral_value: Math.round(integral_value * 100) / 100,
          // })
        } else {
          // var integral_value = that.data.integral_value1
          // that.setData({
          //   resto: Math.round((total - rebate_value - integral_value - discount_value) * 100) / 100,
          //   integral_value: integral_value
          // })
          // 是否勾选了积分抵扣
          if (integralstate) {
            var integral_value = that.data.integral_value1;
            var resto = Math.round((total - discount_value - rebate_value - integral_value) * 100) / 100;
            console.log(resto)
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: resto
            })
          } else {
            var integral_value = that.data.integral_value1
            var resto = Math.round((total - discount_value - rebate_value) * 100) / 100;
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: resto
            })
          }
        }
      } else {
        if (Number(total - rebate_value) < Number(that.data.integral_value1)) {

          // var integral_value = Math.round((total - rebate_value) * 100) / 100;
          // that.setData({
          //   integral_value: Math.round(integral_value * 100) / 100,
          // })
          // 是否勾选了积分抵扣
          if (integralstate) {
            var integral_value = total - rebate_value
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: 0
            })
          } else {
            var integral_value = Math.round((total - rebate_value) * 100) / 100;
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: integral_value
            })
          }
        } else {
          // 是否勾选了积分抵扣
          if (integralstate) {
            var integral_value = that.data.integral_value1;
            var resto = total - rebate_value - integral_value
            that.setData({
              integral_value: Math.ceil(integral_value),
              resto: resto
            })
          } else {
            var integral_value = that.data.integral_value1
            var resto = Math.round((total - rebate_value) * 100) / 100;
            that.setData({
              // integral_value: Math.round(integral_value * 100) / 100,
              integral_value: 0,
              resto: resto
            })
          }
        }
      }
      that.setData({
        rebatestate: true,
        payment_amount: Math.round((payment_amount - rebate_value) * 100) / 100,
        // resto: Math.round((resto - rebate_value) * 100) / 100,
      });
      // console.log(that.data.payment_amount)
    }
  },
  integraltap: function () {
    var that = this;
    var payment_amount = that.data.payment_amount;
    var integralstate = that.data.integralstate;
    var rebatestate = that.data.rebatestate
    var discountstate = that.data.discountstate
    var integral = that.data.integral;
    var integral_value = that.data.integral_value;
    var rebate_value = that.data.rebate_value
    var discount_value = that.data.discount_value
    var total = that.data.total
    console.log(total)
    var resto = that.data.resto;
    console.log(resto)
    if (integralstate) {
      //  
      if (rebatestate) {
        if (discountstate) {
          that.setData({
            resto: Math.round((total - rebate_value - discount_value) * 100) / 100,
            integral_value: 0
          })
        } else {
          that.setData({
            resto: Math.round((total - rebate_value) * 100) / 100,
            integral_value: 0
          })
        }
      } else {
        if (discountstate) {
          that.setData({
            resto: Math.round((total - discount_value) * 100) / 100,
            integral_value: 0
          })
        } else {
          that.setData({
            resto: Math.round((total) * 100) / 100,
            integral_value: 0
          })
        }
      }

      that.setData({
        integralstate: false,
        payment_amount: Math.round((payment_amount + integral_value) * 100) / 100,
      })

    } else {
      if (rebatestate) {
        if (discountstate) {
          if (Number(total - rebate_value - discount_value) < Number(that.data.integral_value1)) {
            that.setData({
              integral_value: Math.ceil(total - rebate_value - discount_value),
              resto: 0
            })
          } else {
            var integral_value = that.data.integral_value1
            that.setData({
              resto: Math.round((total - rebate_value - discount_value - integral_value) * 100) / 100,
              integral_value: Math.ceil(integral_value)
            })
          }
        } else {
          if (Number(total - rebate_value) < Number(that.data.integral_value1)) {
            that.setData({
              integral_value: Math.ceil(total - rebate_value),
              resto: 0
            })
          } else {
            var integral_value = that.data.integral_value1
            that.setData({
              resto: Math.round((total - rebate_value - integral_value) * 100) / 100,
              integral_value: Math.ceil(integral_value)
            })
          }
        }
      } else {
        if (discountstate) {
          if (Number(total - discount_value) < Number(that.data.integral_value1)) {
            that.setData({
              integral_value: Math.ceil(total - discount_value),
              resto: 0
            })
          } else {
            var integral_value = that.data.integral_value1
            that.setData({
              resto: Math.round((total - discount_value - integral_value) * 100) / 100,
              integral_value: Math.ceil(integral_value)
            })
          }
        } else {
          if (Number(total) < Number(that.data.integral_value1)) {
            that.setData({
              integral_value: Math.ceil(total),
              resto: 0
            })
          } else {
            var integral_value = that.data.integral_value1
            that.setData({
              resto: Math.round((total - integral_value) * 100) / 100,
              integral_value: Math.ceil(integral_value)
            })
          }
        }
      }
      that.setData({
        integralstate: true,
        payment_amount: Math.round((payment_amount - integral_value) * 100) / 100,
      })
    }
  },
  // 
  password:function(){
    var that=this;
    that.setData({
      isFocus:true
    })
  }
})