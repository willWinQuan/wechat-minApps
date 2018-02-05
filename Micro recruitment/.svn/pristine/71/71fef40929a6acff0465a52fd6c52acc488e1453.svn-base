var app = getApp();
var util = require("../../utils/util.js");
var http_host = '';
var customer_id_en = '';
var card_count_t = [];
let imgCount = 9;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '',
    count: '',
    focus: false,
    imgs: [], //图片
    upimgs:[],
    jubsm:'0',
    desc:'' ,//举报内容
    contact:"" , //举报者电话
    inc_id:"", //企业id
    inc_pic : '' ,
    lenMore:true,
    logoimg:'',
    imgCount:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      inc_id:options.inc_id
    })
    var inc_id = this.data.inc_id
    console.log(inc_id)
  },
  
 
 
  // 输入框数据计算
  change: function (e) {
    var count = e.detail.value.length;
    this.setData({
      jubsm:count
    })
    if(count>200){
      wx.showModal({
        title: '提示',
        content:'输入框数字不能超出200个字',
        duration: 2000
      })
    } 
  },

  // 输入框手机数据计算
  changePhone: function (e) {
    var count = e.detail.value.length;
    if (count > 11) {
      wx.showModal({
        title: '提示',
        content: '输入的手机号最多11位',
        duration: 2000
      })
    }
  },
  // 上传图片
  chooseImg: function (e) {
    
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {

      that.setData({
        lenMore: false
      });
      setTimeout(function () {
        that.setData({
          lenMore: true
        });
      }, 1000);
      return false;
    }
    var imgCount1 = imgCount - this.data.imgs.length 
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
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
          // 
          wx.uploadFile({
            url: util.http_host + '/mini_program/minvite/back/index.php/home/user/upload_pic',
            filePath: res.tempFilePaths[i],
            name: 'pic_url',
            formData: {
              customer_id_en: util.customer_id_en
            },
            success: function (res) {
              var img_data = JSON.parse(res.data)
              console.log(img_data)
              var upimgs=that.data.upimgs;
              upimgs.push(img_data.data)
              that.setData({
                upimgs: upimgs
              })
              console.log(that.data.upimgs)
            },
            fail: function () {
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
  deleteImg: function (e) {
    var that=this;
    var imgs = this.data.imgs;
    var upimgs = this.data.upimgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    upimgs.splice(index, 1);
    this.setData({
      imgs: imgs,
      upimgs: upimgs
    });
  },
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgs = this.data.imgs;

    wx.previewImage({
      current: imgs[index],
      urls: imgs
    })
  },
  textarea:function(e){
    this.setData({
      textarea:e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log("已点击提交");

    var that = this
    let upimgs = that.data.upimgs;
    var value = e.detail.value;
    var phonez = /^1[34578]\d{9}$/;
    var textarea = e.detail.value.textarea;
    var phone_numb = e.detail.value.phone_numb;
    var item = e.detail.value.item;
    if (textarea.length < 1) {
      util.alertViewWithCancel("错误提示", "举报内容不能为空，请输入举报信息", function () {
      });
      return;
    }
    if (!phonez.test(phone_numb)) {
      util.alertViewWithCancel("提示", "手机号码错误，请输入正确的手机号码", function () {
      });
      return;
    } 
    if (upimgs.length < 1) {
      util.alertViewWithCancel("提示", "至少上传一张图片", function () {
      });
      return;
    } 
    var customer_id_en = util.customer_id_en;
    var user_id_en = util.user_id_en;
    let desc = value.textarea;
    let contact = value.phone_numb;
    let inc_id = that.data.inc_id;
    console.log(inc_id)
    let inc_pic = that.data.upimgs;
   
    var data = {
      customer_id_en: customer_id_en,
      user_id_en: user_id_en,
      desc: desc,
      contact: contact,
      inc_id: inc_id,
      inc_pic: inc_pic,
    }

    util.commonRequestPost(
      data,
      "/mini_program/minvite/back/index.php/home/frontweb/complain",
      function (res) {
        console.log(res);

        var err_code = res.data.err_code;
        if (err_code==1000){
          util.alertView("提示", "举报成功", function () {
            wx.navigateTo({
              url: '../tip-success/tip-success',
              duraction: 2000
            })
          })
        }else{
          util.alertViewWithCancel("提示", "提交的数据有误，请检查参数", function () {
          });
        }
        
        
      }
    )
    

  },

})