// pages/question_details/question_details.js
var util = require("../../utils/util.js");
var start='';
var time=60;
var time1 = 0;
var len=0;
var src1 = [];
var src2 = [];
var innerAudioContext='';
var voicetime=0;
var voicetime1=0;
var start_time='';
var answer_seconds=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:1,
    mask:false,
    oneself:1,
    Pjstar1:0,
    Pjstar2:5,
    background:'#5a72ed',
    lent:0,
    lenMore:true,
    status: 1,
    src1:[],
    src2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      question_id: options.question_id,
      background: util.color,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: util.color,
    })
    src1 = [];
    src2 = [];
    voicetime1=0;
    voicetime=0;
    len=254;
    this.setData({
      show:1,
      lent:0
    })
    // 暂停播放录音
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext.pause()
      clearInterval(start_time);
    }
    this.details()
    
  },
  // 详情
  details: function () {
    var that = this;
    var customer_id_en = util.customer_id_en
    var user_id_en = util.user_id_en
    var http_host = util.http_host;
    var question_id = that.data.question_id
    // 请求首页详情
    wx.request({
      url: http_host + '/mini_program/applets/index.php/answer/Front_User/question_detail',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        question_id: question_id,
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.data.status)
        var question_users = res.data.data.question_users;
        var answer = res.data.data.answer;
        var answer_users = res.data.data.answer_users;
        var score=res.data.data.score;
        var score1 = 5 - score;
        var is_peek = res.data.data.is_peek
        for (var i = 0; i < res.data.data.answer_photo.length; i++) {
          src1.push(res.data.data.answer_photo[i].url)
        }
        for (var j = 0; j < res.data.data.question_photo.length; j++) {
          src2.push(res.data.data.question_photo[j].url)
        }
        //console.log(res.data.data.question_photo[0].url)
        that.setData({
          weixin_name: question_users.nickname,
          weixin_headimgurl: question_users.headurl,
          createtime: res.data.data.createtime,
          money: res.data.data.money,
          content: res.data.data.content,
          question_photo: res.data.data.question_photo,
          category: res.data.data.category,
          headurl: answer_users.userinfo.headurl,
          nickname: answer_users.userinfo.nickname,
          src1: src1,
          src2: src2,
          status: res.data.data.status,
          score: res.data.data.score,
          score1: score1,
          is_peek: is_peek,
          is_see: res.data.data.is_see,
          peek_money: res.data.data.peek_money
        })
        if (answer!=null){
          that.setData({
            answer_content: answer.content,
            answer_createtime: answer.createtime,
            type: answer.type,
            answer_photo: res.data.data.answer_photo,
            answer_seconds: res.data.data.answer.seconds,
            seconds_time: res.data.data.answer.seconds_time,
          })
        }
        answer_seconds = that.data.answer_seconds
        voicetime = that.data.answer_seconds
      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  evaluateShow:function(){
    var that=this;
    that.setData({
      mask:true
    })
  },
  // 确定评价
  evaluateHide: function () {
    var that = this;
    that.setData({
      mask: false
    })
    var that = this;
    var customer_id_en = util.customer_id_en
    var user_id_en = util.user_id_en
    var http_host = util.http_host;
    var question_id = that.data.question_id;
    var score = that.data.Pjstar1
    console.log(score)
    // 请求首页详情
    wx.request({
      url: http_host + '/mini_program/applets/index.php/answer/Front_user/evaluate',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        question_id: question_id,
        score: score
      },
      success: function (res) {
        console.log(res.data.err_code)
        if (res.data.err_code!=1000){
          that.setData({
            toast:res.data.data,
            lenMore:false,
            icon: 'warn'
          })
        }else{
          wx.showModal({
            content: '评价成功',
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../my-quiz/my-quiz',
                })
              }
            }
          })
        }
      },
      fail: function (res) {
        console.log('no')
      }
    })
  },
  // 预览图片1
  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.src2 // 需要预览的图片http链接列表  
    })
  },
  // 预览图片2
  previewImage1: function (e) {
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.src1 // 需要预览的图片http链接列表  
    })
  },
  //  评价
  evaluate: function (e){
    var that=this;
    var Pjstar1 = that.data.Pjstar1;
    var Pjstar2 = that.data.Pjstar2;
    var index = e.target.dataset.index;
    var index2 = e.target.dataset.tindex;
    console.log(index)
    console.log(index2)
    if (index2!=undefined){
      console.log(111)
      var Sindex1 = Pjstar2 - index2-1;
      var Sindex = 5 - Sindex1;
      var that = this;
      that.setData({
        Pjstar1: Sindex,
        Pjstar2: Sindex1,
      })
    }
    if (index != undefined) {
      console.log(22)
      var Sindex1 = index+1;
      var Sindex = 5 - Sindex1;
      var that = this;
      that.setData({
        Pjstar1: Sindex1,
        Pjstar2: Sindex,
      })
    }
  },
  // 播放语音
  voice: function () {
    if (util.version < 160) {// 小于1.6.0的版本
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        showCancel: false,
      })
      return
    }
    var that = this;
    if (this.data.show == 1) {
      if (that.data.lent == 254) {
        voicetime1 = 0;
        voicetime = that.data.answer_seconds;
        that.setData({
          lent: 0
        })
        console.log(that.data.lent)
      }
      util.innerAudioContext1.src = this.data.answer_content
      console.log(this.data.answer_content)
      util.innerAudioContext1.play()
      util.innerAudioContext1.onPlay(() => {
        console.log('开始播放')
        that.setData({
          show: 0
        })
        console.log(that.data.show)
        that.voice_time()
      })
      util.innerAudioContext1.onError((res) => {
        clearInterval(start_time);
        console.log(res.errMsg)
        console.log(res.errCode)
        that.setData({
          lenMore: false,
          icon:'warn',
          show:1,
          lent:0,
          toast: '语音路径失效'
        });
        setTimeout(function(){
          that.setData({
            lenMore: true,
          });
        }, 700)
      })
      // 结束
      util.innerAudioContext1.onEnded((res) => {
        console.log('播放结束')
        voicetime1=0;
        voicetime = that.data.answer_seconds;
        clearInterval(start_time);
        that.setData({
          show: 1,
          seconds_time: 0,
        })
        console.log(that.data.show)
      })
      return
    } else {
      util.innerAudioContext1.pause()
      util.innerAudioContext1.onPause(() => {
        console.log('暂停播放')
        that.setData({
          show: 1,
        })
        clearInterval(start_time);
      })
      return
    }
    // pause
  },
  // 
  voice_time: function () {
    var that = this;
    clearInterval(start_time);
    start_time = setInterval(function () {
      if (voicetime == 0) {
        voicetime1 = 0;
        voicetime = that.data.answer_seconds;
        clearInterval(start_time)
        return;
      }else{
        voicetime = Number(voicetime - 0.1).toFixed(1);
        //console.log(voicetime)
        voicetime1 = Number(Number(voicetime1 + 0.1).toFixed(1));
        var time_ting = Math.ceil(voicetime)
        //console.log(time_ting)
        var mintue = parseInt(time_ting / 60 % 60)
        var seconds = parseInt(time_ting % 60)
        // 小于一分钟的
        if (time_ting < 60) {
          if (time_ting == 0) {
            var seconds_time = 0
            that.setData({
              seconds_time: seconds_time
            })
          } else {
            var seconds_time = seconds + '"'
            that.setData({
              seconds_time: seconds_time
            })
          }
        }else{
          if (time_ting == 0) {
            var seconds_time = 0
            that.setData({
              seconds_time: seconds_time
            })
          } else {
            if (seconds==0){
              var seconds_time = mintue +"'"+'00"'
              that.setData({
                seconds_time: seconds_time
              })
            }else{
              var seconds_time1 = mintue + "'";
              if (seconds<10){
                var seconds_time2 = '0'+seconds + '"';
              }else{
                var seconds_time2 = seconds + '"';
              }
              var seconds_time = seconds_time1 + seconds_time2
              //console.log(seconds_time)
              that.setData({
                seconds_time: seconds_time
              })
            }
          }
        }
        // 
        var lent = len / answer_seconds * voicetime1;
        that.setData({
          lent: lent
        })
        //console.log(lent)
      }
      // 
    }, 100)
  },
  // 关闭
  maskHinde:function(){
    var that=this;
    that.setData({
      mask:false
    })
  },
  // 支付
  paymoney:function(){
    var customer_id_en = util.customer_id_en
    var user_id_en = util.user_id_en
    var question_id = this.data.question_id
    console.log(question_id)
    var data = {
      customer_id_en: customer_id_en,
      user_id_en: user_id_en,
      question_id: question_id,
    };
    wx.request({
      url: util.http_host + '/mini_program/applets/index.php/answer/Front_expert/peek_pay',
      data: data,
      success: function (res) {
        console.log(res)
        if (res.data.err_code==1000){
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            complete: function (res) {
              console.log(res);
              if (res.errMsg == "requestPayment:ok") {
                console.log(res)
              } else {
                wx.showModal({
                  title: '提示',
                  content: "支付失败",
                  showCancel: false
                })
              }
            }
          })
        }
      }
    })
  }
})