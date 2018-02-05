// pages/expert_questions/expert_questions.js
let app = getApp();
let util = require("../../utils/util.js");
let list = []
let http_host = ''
var time = 2;
var time1 = 0;
var Interval = '';
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

let imgCount = 9
Page({

  data: {
    self_intro: '这是我的简介哦',
    item: [1, 1, 1, 1, 1],
    img: [1, 1, 1, , 1, 1, 1, 1, 1],
    answer_ratio: '10%',
    responder: '10%',
    mask: 0,
    textarea: 1,
    len: 0,
    answer_remind_sw: 1,
    favori: 0,
    textNumber: [1, 1, 1, , 1, 11,],
    moneyValue: 0,
    star: 100,
    wid_het: 0,
    customer_id_en: '',
    headurl: '',
    nickname: '',
    show_more: false,
    sex: 0,
    money: '',
    listen_ratio_sw: 1,
    kaiqi: true,
    cate: [],
    answer_remind: '',
    answer_remind_sw: 1,
    defauMoney: true,
    hiddenmask: true,
    defauMoney1: 100,
    is_ask: 0,
    self_intro: '',
    imgs: [],
    upimgs: [],
    listen_ratio: [],
    imgMAX: true,
    imgCount: '',
    http_host: util.http_host,
    words_limit: 300,
    color: '#5b75ee',
    index2: 0,
    areaChange: false,
    fixed: 'static',
    animationData: {},
    payStadus: 0
  },
  onLoad(options) {
    // console.log(options)
    let that = this
    console.log(http_host)

    let customer_id_en = util.customer_id_en
    let user_id_en = util.user_id_en
    let data = {
      customer_id_en: customer_id_en,
      user_id_en: user_id_en,
      expert_id: that.options.expert_id,
    };
    that.setData({
      expert_id: expert_id,
      http_host: util.http_host,
      color: util.color,
    })
    wx.request({
      url: util.http_host + '/mini_program/applets/index.php/answer/frontweb/askexpert_web',
      data: data,
      success(res) {
        console.log(res)
        let listen_defau = []
        let listen_money = res.data.data.listen_ratio
        listen_defau = listen_money[0]
        let defauValue = ''
        let responder = ''
        let listen_defau1 = ''
        let answer_ratio = res.data.data.answer_ratio
        let answer_percent = res.data.data.answer_ratio
        answer_ratio = (answer_ratio * 0.01).toFixed(2)
        let share = res.data.data.answer_ratio
        listen_defau1 = (listen_defau * answer_ratio).toFixed(2)
        responder = (listen_defau * answer_ratio).toFixed(2)
        defauValue = (listen_defau - responder).toFixed(2)
        share = share + "%"
        that.setData({
          list: res.data.data,
          expert_headurl: res.data.data.expert_headurl,
          expert_nickname: res.data.data.expert_nickname,
          sex: res.data.data.sex,
          money: res.data.data.money,
          favori_fans: res.data.data.favori_fans,
          favori_status: res.data.data.favori_status,
          answer_ratio: answer_ratio,
          share: share,
          answer_remind: res.data.data.answer_remind,
          is_ask: res.data.data.is_ask,
          self_intro: res.data.data.self_intro,
          listen_ratio: res.data.data.listen_ratio,
          cate: res.data.data.cate,
          star: res.data.data.star,
          answer_remind_sw: res.data.data.answer_remind_sw,
          favori: res.data.data.favori_status,
          score: (res.data.data.star / 5) * 154,
          listen_defau1: listen_defau1,
          responder: responder,
          answer_percent: answer_percent,
          defauValue: defauValue
        })
      }
    })
    let expert_id = that.options.expert_id
    let defauMoney1 = that.data.listen_ratio[0]
    console.log(expert_id)
    that.setData({
      expert_id: expert_id,
      defauMoney1: defauMoney1
    })
  },

  //选择标签事件 偷看
  choiceText(e) {
    console.log(e)
    let that = this;
    let score = that.data.score
    let peek_money = that.data.listen_ratio[0]
    let index1 = e.currentTarget.dataset.value;
    let index2 = e.currentTarget.dataset.index;
    let moneyValue = ''
    let responder = ''
    let answer_ratio = that.data.answer_ratio
    responder = (index1 * answer_ratio).toFixed(2)
    moneyValue = (index1 - responder).toFixed(2)
    that.setData({
      moneyValue: index1,
      index1: moneyValue,
      index2: index2,
      defauMoney: false
    })
  },
  // 收藏
  favoriStatus() {
    let that = this
    let cate = that.data.cate
    console.log(cate)
    let customer_id_en = util.customer_id_en
    let user_id_en = util.user_id_en
    let expert_id = that.data.expert_id
    let data = {
      customer_id_en: customer_id_en,
      user_id_en: user_id_en,
      expert_id: expert_id
    };
    if (user_id_en != undefined) {
      wx.request({
        url: util.http_host + '/mini_program/applets/index.php/answer/Front_User/favori',
        data: data,
        success(res) {
          console.log(res)
          if (res.data.data) {
            that.setData({
              favori: 1
            })
            wx.showToast({
              title: '已收藏',
              icon: 'success',
              duration: 500
            })
          } else {
            that.setData({
              favori: 0
            })
            wx.showToast({
              title: '已取消',
              icon: 'success',
              duration: 500
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '确定授权',
        showCancel: false,
        success() {
          opensetting(() => {
            console.log('i am null')
          })
          let customer_id_en = that.data.customer_id_en
          that.setData({
            customer_id_en: customer_id_en,
          })
        }
      })
    }
  },
  chooseImg(e) {
    let that = this;
    let favori = that.data.favori
    console.log(favori)
    let imgs = this.data.imgs;
    if (imgs.length >= 9) {
      that.setData({
        imgMAX: false
      });
      setTimeout(() => {
        that.setData({
          imgMAX: true
        });
      }, 1000);
      return false;
    }
    let imgResult = imgCount - that.data.imgs.length
    that.setData({
      imgResult: imgResult
    })
    wx.chooseImage({
      count: that.data.imgResult,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        let tempFilePaths = res.tempFilePaths;
        let imgs = that.data.imgs;
        for (let i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
          wx.uploadFile({
            url: util.http_host + '/mini_program/applets/index.php/answer/Front_expert_order/upload_img',
            filePath: res.tempFilePaths[i],
            name: 'pic_url',
            formData: {
              customer_id_en: util.customer_id_en,
              user_id_en: util.user_id_en,
              pic_url: imgs
            },
            success(res) {
              console.log(res)
              let img_data = JSON.parse(res.data)
              let upimgs = that.data.upimgs;
              upimgs.push(img_data.data)
              that.setData({
                upimgs: upimgs
              })
            },
            fail() {
              console.log("上传失败")
            }
          });
          that.setData({
            imgs: imgs
          });
        }
      }
    });
  },
  // 删除图片
  deleteImg(e) {
    let imgs = this.data.imgs;
    console.log(imgs)
    let upimgs = this.data.upimgs;
    let index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    upimgs.splice(index, 1);
    this.setData({
      imgs: imgs,
      upimgs: upimgs
    });
  },
  previewImg(e) {
    var index = e.currentTarget.dataset.index;
    var imgs = this.data.imgs;
    wx.previewImage({
      current: imgs[index],
      urls: imgs
    })
  },
  onShow() {
    let that = this;
    // 计算虚拟键盘与textarea的距离
    wx.getSystemInfo({
      success(res) {
        let company = res.windowWidth / 750;
        let wid_het = company * 350;
        that.setData({
          wid_het: wid_het
        })
      }
    })
    let bgColor = util.color
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: bgColor,
      animation: {
        timingFunc: 'easeIn'
      }
    })
    that.setData({
      bgColor: bgColor
    })
  },
  // 支付
  paymentBtn(e) {
    let that = this
    let content = that.data.texvalue
    let words_limit = that.data.words_limit
    let value = e.detail.value;
    let customer_id_en = util.customer_id_en
    let user_id_en = util.user_id_en
    let pic_list = that.data.upimgs
    // console.log(pic_list)
    // console.log('提问按钮已激活')
    let expert_id = that.data.expert_id
    let is_peek = that.data.listen_ratio_sw
    let peek_money = that.data.moneyValue
    let payStadus = that.data.payStadus

    if (payStadus == 0) {

      that.setData({
        payStadus: 1
      })

      if (content == undefined) {
        util.alertViewWithCancel("错误提示", "问题描述不能为空，请输入描述信息", () => {
        });
        return;
      }

      let data = {}
      if (pic_list == '' || pic_list == undefined) {
        data = {
          customer_id_en: customer_id_en,
          user_id_en: user_id_en,
          expert_id: expert_id,
          words_limit: words_limit,
          content: content,
          is_peek: is_peek,
          peek_money: peek_money
        }
      } else {
        data = {
          customer_id_en: customer_id_en,
          user_id_en: user_id_en,
          expert_id: expert_id,
          words_limit: words_limit,
          content: content,
          pic_list: pic_list,
          is_peek: is_peek,
          peek_money: peek_money
        }
      }

      wx.request({
        url: util.http_host + '/mini_program/applets/index.php/answer/frontweb/askexpert',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: data,
        success(res) {
          console.log(res)
          console.log(111111)

          that.setData({
            payStadus: 0
          })

          if (res.data.errcode == 1000) {
            wx.showModal({
              title: '温馨提示',
              content: '提问成功',
              showCancel: false,
              success(e) {
                console.log(e)
                wx.redirectTo({
                  url: '../my-quiz/my-quiz',
                })
              }
            })
            return;
          }
          let money = that.data.money
          console.log(money)
          if (money == 0 || money == '' || money == undefined) {
            wx.showModal({
              title: '温馨提示',
              content: '提问成功',
              showCancel: false,
              success(e) {
                console.log(e)
                wx.redirectTo({
                  url: '../my-quiz/my-quiz',
                })
              }
            })
            return;
          }
          // console.log(0000000)
          if (res.data.errcode == 0) {
            wx.requestPayment({
              'timeStamp': res.data.timeStamp,
              'nonceStr': res.data.nonceStr,
              'package': res.data.package,
              'signType': 'MD5',
              'paySign': res.data.paySign,
              'success'(res) {
                // console.log(res)
                let errMsg = res.errMsg;
                //支付成功
                if (errMsg == "requestPayment:ok") {
                  wx.hideLoading();
                  wx.showModal({
                    title: '温馨提示',
                    content: '提问成功',
                    showCancel: false,
                    success(e) {
                      console.log(e)
                      wx.redirectTo({
                        url: '../my-quiz/my-quiz',
                      })
                    }
                  })
                }
              },
              'fail'(res) {
                console.log(res)
                that.setData({
                  lock: false
                })
                wx.hideLoading();
              }
            })
          } else {
            wx.showModal({
              title: res.data.data,
              showCancel: false
            })
          }

        },
        fail() {
          that.setData({
            payStadus: 0
          })
        }
      })

    }


  },

  // 跳转举报页面
  bindreport() {
    var expert_id = this.data.expert_id;
    wx.navigateTo({
      url: '../report/report?expert_id=' + expert_id,
    })
  },
  // 弹框 隐藏 提问须知
  mask_hide() {
    let that = this;
    that.setData({
      mask: 0,
      textarea: 1,
      fixed: 'static',
      areaChange: false,
    })
  },
  // 开启提问须知 弹框
  mask_show() {
    let that = this;
    that.setData({
      mask: 1,
      fixed: 'fixed',
      areaChange: true,
    })
  },
  // 获取焦点
  textareaFocus: function () {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(350 + 'rpx').step()
    this.setData({
      animationData: animation.export()
    })
  },
  // 失去焦点
  textareaBlur: function () {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      delay: 200,
    })
    this.animation = animation
    animation.height(180 + 'rpx').step()
    this.setData({
      animationData: animation.export()
    })
  },
  // 监听textarea输入值
  textarea(e) {
    let value = e.detail.value;
    let len = e.detail.value.length;
    let that = this;
    that.setData({
      texvalue: value,
      len: len,
    })
  },
  // 监听switch1Change的开启
  switch1Change(e) {
    let that = this
    let listen_ratio_sw = that.data.listen_ratio_sw
    if (e.detail.value) {
      that.setData({
        listen_ratio_sw: 1
      })
    } else {
      that.setData({
        listen_ratio_sw: -1
      })
    }
    let listen = that.data.listen_ratio_sw
    console.log(listen)
  },
  // 查看更多 查看更多 弹框
  showMore() {
    let that = this
    let show_more = that.data.show_more
    that.setData({
      show_more: 1,
      hiddenmask: false,
      fixed: 'fixed',
      areaChange: true,
    })
  },
  // 弹框 隐藏 答主简介 
  see_all_sure() {
    let that = this
    let show_more = that.data.show_more
    that.setData({
      show_more: 0,
      hiddenmask: true,
      fixed: 'static',
      areaChange: false,
    })
  },

})