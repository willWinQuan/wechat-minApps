// pages/report / report.js
var util = require("../../utils/util.js");
var imgCount = 9;
var lent = 0;
Page({
  data: {
    item: [1, 1, 1, 1, 1],
    imgs: [],
    Percentage: '10%',
    money: '3.3元',
    input_wit: 0,
    input_wit1:true,
    focus:false,
    let1: 0,
    imgCount1: 9,
    upimgs: [],
    lenMore: true,
    toast: '',
    color:'#5b75ee',
    show_pic:[],
    value1:'请输入电话号码',
    textarea:0,
    mask:0,
    fixed:'static',
    icon:'success',
    http_host: util.http_host,
    animationData: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      expert_id: options.expert_id,
      color: util.color,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //计算评分
    lent = 154 / 5;
    // 详情
    this.details()
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: util.color,
    })
  },
  // 详情
  details: function () {
    var that = this;
    var customer_id_en = util.customer_id_en
    var expert_id = that.data.expert_id
    var user_id_en = util.user_id_en
    var http_host = util.http_host;
    // 请求首页详情
    wx.request({
      url: http_host + '/mini_program/applets/index.php/answer/frontweb/askexpert_web',
      data: {
        customer_id_en: customer_id_en,
        expert_id: expert_id,
        user_id_en: user_id_en
      },
      success: function (res) {
        console.log(res.data.data.expert_nickname)
        var data = res.data.data;
        var star = res.data.data.star;
        var lenght = lent * star
        that.setData({
          expert_headurl: data.expert_headurl,
          sex: data.sex,
          self_intro: data.self_intro,
          expert_nickname: data.expert_nickname,
          favori_fans: data.favori_fans,
          favori_status: data.favori_status,
          money: data.money,
          star: data.star,
          lenght: lenght,
          cate: data.cate,
        })
      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  placeholder: function () {
    var that = this;
    that.setData({
      input_wit: 70,
      input_wit1: false,
      focus:true,
    })
  },
  bindblur:function(){
    var that = this;
    that.setData({
      input_wit: 0,
      input_wit1: true,
      focus: false,
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
  textarea: function (e) {
    var val = e.detail.value.length;
    var value = e.detail.value;
    console.log(value)
    var that = this;
    that.setData({
      let1: val,
      value: value
    })
  },
  user_tel: function (e) {
    var value1 = e.detail.value;
    if (value1==''){
      this.setData({
        value1: '请输入电话号码'
      })
    }else{
      this.setData({
        value1: value1 
      })
    }
    this.setData({
      user_tel: value1
    })
  },
  // 上传图片
  chooseImg: function () {
    var that = this;
    var imgs = this.data.imgs;
    // 
    if (imgs.length >= 9) {
      that.setData({
        lenMore: false,
        toast: '最多上传9张图片'
      });
      setTimeout(function () {
        that.setData({
          lenMore: true
        });
      }, 1000);
      return false;
    }
    // 
    var imgCount1 = imgCount - this.data.imgs.length
    console.log(imgCount1)
    that.setData({
      imgCount1: imgCount1
    })
    wx.chooseImage({
      count: that.data.imgCount1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return;
          } else {
            imgs.push(tempFilePaths[i]);
            console.log(imgs)
            // 
            wx.uploadFile({
              url: util.http_host + '/mini_program/applets/index.php/answer/Front_expert_order/upload_img',
              filePath: res.tempFilePaths[i],
              name: 'pic_url',
              formData: {
                customer_id_en: util.customer_id_en,
                user_id_en: util.user_id_en,
              },
              success: function (res) {
                var data = JSON.parse(res.data)
                console.log(data)
                var upimgs = that.data.upimgs;
                var show_pic = that.data.show_pic;
                upimgs.push(data.show_pic)
                show_pic.push(data.data)
                that.setData({
                  upimgs: upimgs,
                  show_pic: show_pic
                })
              },
              fail: function () {
                console.log("上传失败")
              }
            });
          }
          that.setData({
            imgs: imgs
          });
          console.log(that.data.imgs)
        }
        // 
      }
    });
  },
  // 举报
  report: function () {
    var that = this;
    var http_host = util.http_host
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    // var discription = this.data.value;
    // var user_tel = this.data.user_tel
    if (this.data.value){
      var discription = this.data.value;
    }else{
      var discription = '';
    }
    if (this.data.user_tel){
      var user_tel = this.data.user_tel
    }else{
      var user_tel = ''
    }
    console.log(discription)
    console.log(user_tel)
    var expert_id = this.data.expert_id;
    var pic_url = this.data.show_pic;
    console.log(pic_url)
    var pic_url=pic_url.join(",")
    console.log(pic_url)
    wx.request({
      url: http_host + '/mini_program/applets/index.php/answer/Front_User/complain',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        discription: discription,
        user_tel: user_tel,
        expert_id: expert_id,
        pic_url: pic_url,
      },
      method: 'get',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.err_code==1000){
          that.setData({
            favori_status: 1,
            toast: res.data.data,
            lenMore: false,
            icon: 'success',
          })
          setTimeout(function () {
            that.setData({
              lenMore: true,
            });
            wx.navigateBack();
          }, 700);
        }else{
          that.setData({
            toast: res.data.data,
            lenMore: false,
            icon:'warn',
          })
          setTimeout(function () {
            that.setData({
              lenMore: true
            });
          }, 700);
        }
      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  // 收藏
  favori: function () {
    var that = this;
    var http_host = util.http_host
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    var expert_id = this.data.expert_id;
    wx.request({
      url: http_host + '/mini_program/applets/index.php/answer/Front_User/favori',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        expert_id: expert_id,
      },
      method: 'get',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.data) {
          that.setData({
            favori_status: 1,
          })
        } else {
          that.setData({
            favori_status: 0,
          })
        }
        wx.showToast({
          title: res.data.err_data,
          icon: 'success',
          duration: 500
        })
      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  // 返回
  return: function () {
    wx.navigateBack()
  },
  // 查看图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.upimgs // 需要预览的图片http链接列表  
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    var upimgs = this.data.upimgs;
    var show_pic = this.data.show_pic;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    upimgs.splice(index, 1);
    show_pic.splice(index, 1);
    this.setData({
      imgs: imgs,
      upimgs: upimgs,
      show_pic: show_pic
    });
  },
  // 
  see_xinxi:function(){
    this.setData({
      textarea:1,
      mask:1,
      fixed: 'fixed'
    })
  },
  mask_hide:function(){
    this.setData({
      textarea: 0,
      mask: 0,
      fixed:'static'
    })
  }
})