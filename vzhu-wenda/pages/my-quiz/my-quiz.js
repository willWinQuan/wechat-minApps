// pages/my-quiz/my-quiz.js
var util = require("../../utils/util.js");
var start = '';
var page = 1;
var arr = [];
var len = 0;
var v_time1 = [];
var v_seconds = [];
var v_content = [];
var innerAudioContext = '';
var v_time2 = []
var v_type = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topTabItems: [
      {
        name: '未回答',
        name: '未评论',
        name: '已完成',
        name: '已失效'
      },

    ],
    answered: true,
    active: false,
    recordContr: true,
    loading: false,
    recordShow: 0,
    show: 1,
    active:0,
    status: 1,
    list: [],
    more_more: 0,
    loging: 1,
    no_more: 0,
    list_type:1,
    v_index: 0,
    count: 0,
    count1: 0,
    background: '#5777eb',
    Jump:1,
    version:'',
    count_1: 0,
    count_2: 0,
    count_3: 0,
    count_4: 0,
    lenMore:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1;
    arr = [];
    this.setData({
      list: arr,
      more_more: 0,
    })
    // 
  },
  onShow: function () {
    page = 1;
    v_time1 = [];
    v_seconds = [];
    v_content = [];
    v_time2 = [];
    v_type = [];
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: util.color,
    })
    this.details()
    this.details1()
    this.setData({
      Jump: 1,
      background: util.color,
    })
    len = 254;
    // 暂停播放录音
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext1.pause()
    }
  },
  details: function () {
    var that = this;
    var customer_id_en = util.customer_id_en
    if (util.user_id_en==null){
      var user_id_en=''
    }else{
      var user_id_en = util.user_id_en
    }
    page = page;
    var pagesize = 10;
    var status = that.data.status;
    var http_host = util.http_host;
    console.log(that.data.active)
    // 请求详情
    wx.request({
      url: http_host + '/mini_program/applets/index.php/answer/Front_User/my_question',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        page: page,
        pagesize: pagesize,
        status: status
      },
      success: function (res) {
        console.log(res)
        that.setData({
          more_more: 1,
        })
        // 
        setTimeout(function () {
          that.setData({
            loging: 0,
            no_more: 1,
          })
        }, 300)
        var list = res.data.data.list;

        console.log(list)
        if(list==undefined){
          return;
        }
        if (list.length==0) {
          if (page == 1) {
            if (that.data.active == 0) {
              that.setData({
                count: res.data.data.count
              })
            }
            if (that.data.active == 1) {
              that.setData({
                count1: res.data.data.count
              })
            }
          }
        } else {
          if (that.data.active == 0) {
            that.setData({
              count: res.data.data.count
            })
          } else {
            for (var i = 0; i < list.length; i++) {
              v_time1.push(list[i].answer.v_time)
              v_time2.push(list[i].answer.v_time)
              v_seconds.push(list[i].answer.seconds)
              v_content.push(list[i].answer.content)
              v_type.push(list[i].answer.v_type)
            }
          }
          // 
          if (that.data.active == 1) {
            that.setData({
              count1: res.data.data.count
            })
          }
          if (page == 1) {
            arr = list
          } else {
            for (var i = 0; i < list.length; i++) {
              arr.push(list[i])
            }
          }
          console.log(list.length)
          if (list.length<10){
            setTimeout(function () {
              that.setData({
                list: arr,
                loging: 0,
                no_more: 1,
                more_more: 0
              })
            }, 300)
            console.log(that.data.list)
          }else{
            setTimeout(function () {
              that.setData({
                list: arr,
                loging: 0,
                no_more: 0,
                more_more: 0
              })
            }, 300)
          }
        }
      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  // 仅仅为了未评价的数量
  details1: function () {
    var that = this;
    var customer_id_en = util.customer_id_en
    if (util.user_id_en == null) {
      var user_id_en = ''
    } else {
      var user_id_en = util.user_id_en
    }
    var http_host = util.http_host;
    // 请求详情
    wx.request({
      url: http_host + '/mini_program/applets/index.php/answer/front_user/get_order_count',
      data: {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          count_1: res.data.count_1,
          count_2: res.data.count_2,
          count_3: res.data.count_3,
          count_4: res.data.count_4,
        })
      },
      fail: function (res) {
        console.log('no')
      }
    });
  },
  // 选择分类
  bindTap(e) {
    this.details1()
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext.stop();
      clearInterval(start);
    }
    let index = parseInt(e.currentTarget.dataset.index);
    var index1=index+1;
    page = 1;
    arr = [];
    v_time1 = [];
    v_seconds = [];
    v_content = [];
    v_time2 = [];
    v_type = [];
    this.setData({
      active: index,
      status: index1,
      list: arr,
      more_more: 0,
      loging: 1,
      no_more:0,
    })
    this.details()
  },
  // 播放录音
  voice: function (e) {
    if (util.version < 160) {// 小于1.6.0的版本
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        showCancel: false,
      })
      return
    }
    clearInterval(start);
    // 销毁实例
    util.innerAudioContext.destroy()
    // 重建实例
    util.innerAudioContext = wx.createInnerAudioContext();
    var switch_if = 1;
    var switch_type = 1;
    var that = this;
    var index = e.currentTarget.dataset.index
    var seconds = e.currentTarget.dataset.seconds
    var startTime = seconds - v_seconds[index]
    var v_index = that.data.v_index
    // 
    that.setData({
      v_index: index
    })
    // 
    var list = that.data.list
    console.log(that.data.list[index].answer.v_type)
    if (that.data.list[index].answer.v_type == 0 && switch_if == 1) {
      that.data.list[index].answer.v_type = 1;
      switch_if = 0;
      switch_type = 1;
    }
    if (that.data.list[index].answer.v_type == 1 && switch_if == 1) {
      that.data.list[index].answer.v_type = 2
      switch_if = 0;
      switch_type = 0;
    }
    if (that.data.list[index].answer.v_type == 2 && switch_if == 1) {
      that.data.list[index].answer.v_type = 1
      switch_if = 0;
      switch_type = 1;
    }
    if (that.data.list[index].answer.v_type == 3 && switch_if == 1) {
      that.data.list[index].answer.v_type = 1
      switch_if = 0;
      switch_type = 1;
    }
    for (var i = 0; i < list.length; i++) {
      if (i != index) {
        if (v_seconds[i] != list[i].answer.seconds) {
          that.data.list[i].answer.v_type = 2
        }
      }
    }
    that.setData({
      list: list
    })
    // 再次点击暂停播放
    if (v_index == index && that.data.list[index].answer.v_type == 2 && switch_type == 0) {
      // 暂停播放录音
      util.innerAudioContext.pause()
      clearInterval(start);
      return;
    }
    // 
    util.innerAudioContext.src = v_content[index];
    console.log(v_content[index])
    // 开始播放音频的时间点
    util.innerAudioContext.startTime = startTime;
    util.innerAudioContext.play()
    util.innerAudioContext.onPlay(() => {
      console.log('开始播放')
      // 
      clearInterval(start);
      start = setInterval(function () {
        if (v_seconds[index]<=0) {
          clearInterval(start)
          return;
        }else{
          v_seconds[index] = v_seconds[index] - 0.1;
          v_time2[index] = v_time2[index] + 0.1;
          // 

          var lent = len / seconds * v_time2[index];
          that.data.list[index].answer.v_time = lent;
          // 
          var voicetime = Number(v_seconds[index]).toFixed(1);
          var voicetime1 = Number(v_time2[index]).toFixed(1);
          var time_ting = Math.ceil(voicetime)
          var mintue1 = parseInt(time_ting / 60 % 60)
          var seconds1 = parseInt(time_ting % 60)
          // 小于一分钟的
          if (time_ting < 60) {
            if (time_ting == 0) {
              var seconds_time = 0
              that.data.list[index].answer.seconds_time = seconds_time;
            } else {
              var seconds_time = seconds1 + '"'
              that.data.list[index].answer.seconds_time = seconds_time;
            }
          } else {
            if (time_ting == 0) {
              var seconds_time = 0
              that.data.list[index].answer.seconds_time = seconds_time;
            } else {
              if (seconds == 0) {
                var seconds_time = mintue1 + "'" + '00"'
                that.data.list[index].answer.seconds_time = seconds_time;
              } else {
                var seconds_time1 = mintue1 + "'";
                if (seconds < 10) {
                  var seconds_time2 = '0' + seconds1 + '"';
                } else {
                  var seconds_time2 = seconds1 + '"';
                }
                var seconds_time = seconds_time1 + seconds_time2
                that.data.list[index].answer.seconds_time = seconds_time;
              }
            }
          }
          // 
          var list = that.data.list
          that.setData({
            list: list
          })
        }
        // 
      }, 100)
    })
    // 错误
    util.innerAudioContext.onError((res) => {
      clearInterval(start);
      console.log(res.errMsg)
      console.log(res.errCode)
      that.data.list[index].answer.v_type = 0;
      var list = that.data.list
      that.setData({
        lenMore: false,
        icon: 'warn',
        toast: '语音路径失效',
        list: list
      });
      setTimeout(function () {
        that.setData({
          lenMore: true,
        });
      }, 700)
      return;
    })
    // 结束
    util.innerAudioContext.onEnded((res) => {
      console.log('播放结束')
      clearInterval(start);
      var that = this;
      var index = that.data.v_index;
      var list = that.data.list
      v_seconds[index] = that.data.list[index].answer.seconds;
      that.data.list[index].answer.v_type = 3;
      v_time2[index] = 0;
      that.setData({
        list: list
      })
      console.log(that.data.list)
    })
  },
  navigator: function (e) {
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext.stop();
    }
    clearInterval(start);
    var that=this;
    var index=that.data.v_index;
    // 
    page = 1;
    v_time1 = [];
    v_seconds = [];
    v_content = [];
    v_time2 = [];
    v_type = [];
    this.details()
    // 
    console.log(e.currentTarget.dataset.id)
    var question_id = e.currentTarget.dataset.id;
    if (that.data.Jump==1){
      that.setData({
        Jump:0
      })
      wx.navigateTo({
        url: '../question_details/question_details?question_id=' + question_id,
      })
    }
  },
  // 触碰到底部
  onReachBottom: function () {
    console.log(11111)
    var that = this;
    if (this.data.more_more == 0) {
      page = page + 1;
      that.details()
    }
  },
})