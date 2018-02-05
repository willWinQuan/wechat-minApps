var util = require("../../utils/util.js");
var recorderManager = ''
var app = getApp()
var start = '';
var len = 0;
var src1=[];
var src2=[];
var innerAudioContext='';
var options='';
var recorderManager='';
var imgCount=9;
var time=0;
var voicetime1=0;
var voicetime=0;
var start_time='';
var answer_seconds = '';
var system_system='';
var system1='';
var system='';
var start1=''
Page({
  data: {  
    tempFilePath: '',
    showModal: false,
    tabread: true,
    entry_status: 1,
    curIndex: 0,
    recordIndex: 1,
    windowHeight:0,
    recordll: 0,
    recordll: 0,
    wid_het:0,
    len:0,
    star1: 4,
    star2: 1,
    show:1,
    question_id:'',
    src1:[],
    src2:[],
    content:'',
    imgs: [], //图片
    upimgs: [],
    data_img:[],
    imgCount1:9,
    lenMore:true,
    mintue:'00',
    seconds:'00',
    type1:1,
    length:0,
    background:'#5b75ee',
    more_more:1,
    binImg:0,
    status:4,
    imgIndex:0,
    version:'',
    fixed:true,
    status_ly:0,
    shiting: '点击可以试听',
    play: 1,
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      question_id: options.question_id,
      background: util.color,
    })
  },
  onShow: function () {
    // 背景色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: util.color,
    })
    var that = this;
    // 计算虚拟键盘与textarea的距离
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        // 做ios低于11版本的兼容
        system_system = res.system;
        system = system_system.substring(4,6)
        system1 = system_system.substring(0, 3)
        system = system.replace(/\./g, "")
        system = Number(system)
        if (system1 == 'iOS') {
          if (system < 11) {
            var company = res.windowWidth / 750;
            var wid_het = company * 70;
            console.log(wid_het)
            that.setData({
              wid_het: wid_het,
            })
          } else {
            var company = res.windowWidth / 750;
            var wid_het = company * 250;
            console.log(wid_het)
            that.setData({
              wid_het: wid_het,
            })
          }
        }else{
          var company = res.windowWidth / 750;
          var wid_het = company * 110;
          console.log(wid_het)
          that.setData({
            wid_het: wid_het,
          })
        }
        // 
      }
    })
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        var version = res.SDKVersion;
        version = version.replace(/\./g, "")
        console.log(version)
        that.setData({
          version: version
        })
      }
    })
    src1= [];
    src2=[];
    voicetime1 = 0;
    voicetime = 0;
    //清除定时器
    time=0;
    clearInterval(start);
    // 计算播放进度
    len = 254;
    // 录音时长5分钟
    options = {
      duration: 300000,
      sampleRate: 8000,
      numberOfChannels: 1,
      encodeBitRate: 16000,
      format: 'mp3',
      frameSize:1 
    }
    //
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext.pause()
    }
    that.setData({
      show: 1,
      lent:0
    })
    clearInterval(start_time);
    voicetime1=0;
    // 
    this.details()
  },
  // 详情
  details:function(){
    var that = this;
    var customer_id_en = util.customer_id_en
    var user_id_en = util.user_id_en
    var http_host = util.http_host;
    var question_id = that.data.question_id
    if(that.data.more_more==1){
      // 请求详情
      wx.request({
        url: http_host + '/mini_program/applets/index.php/answer/Front_expert_order/order_detail',
        data: {
          customer_id_en: customer_id_en,
          user_id_en: user_id_en,
          question_id: question_id,
        },
        success: function (res) {
          console.log(res)
          console.log(res.data.data.question_users)
          var score = res.data.data.score;
          var is_peek = res.data.data.is_peek
          var score1 = 5 - score;
          var question_users=res.data.data.question_users;
          var answer = res.data.data.answer;
          var answer_users = res.data.data.answer_users;
          for (var j = 0; j < res.data.data.question_photo.length; j++) {
            src2.push(res.data.data.question_photo[j].url)
          }
          that.setData({
            answer: answer,
            score: score,
            score1: score1,
            is_peek: is_peek,
          })
          console.log(answer)
          if (answer==null){
            that.setData({
              weixin_name: question_users.nickname,
              weixin_headimgurl: question_users.headurl,
              createtime: res.data.data.createtime,
              money: res.data.data.money,
              content: res.data.data.content,
              question_photo: res.data.data.question_photo,
              category: res.data.data.category,
              src2: src2,
              status: res.data.data.status
            })
          }else{
            for (var i = 0; i < res.data.data.answer_photo.length; i++) {
              src1.push(res.data.data.answer_photo[i].url)
            }
            that.setData({
              weixin_name: question_users.nickname,
              weixin_headimgurl: question_users.headurl,
              createtime: res.data.data.createtime,
              money: res.data.data.money,
              content: res.data.data.content,
              question_photo: res.data.data.question_photo,
              category: res.data.data.category,
              answer_content: answer.content,
              answer_createtime: answer.createtime,
              answer_seconds:answer.seconds,
              seconds_time: answer.seconds_time,
              type: answer.type,
              headurl: answer_users.userinfo.headurl,
              nickname: answer_users.userinfo.nickname,
              answer_photo: res.data.data.answer_photo,
              src1: src1,
              src2: src2,
              status: res.data.data.status
            })
            voicetime = answer.seconds;
            answer_seconds = that.data.answer_seconds
          }
        },
        fail: function (res) {
          console.log('no')
        }
      });
    }
  },
  // 
  playBtn:function(){
    //清除定时器
    time = 0;
    clearInterval(start);
    //开始录音  
    recorderManager = wx.getRecorderManager()
    // 
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
    wx.authorize({
      scope: 'scope.record',
      success() {
        console.log("录音授权成功");
        //第一次成功授权后 状态切换为2
        that.setData({
          status_ly: 0,
        })
        // 用户已经同意小程序使用录音功能，后续调用 wx.recorderManager 接口不会弹窗询问
        if (that.data.recordll == 0) {
          that.setData({
            recordll: 1,
            recordIndex: 0
          })
          // 开始录音
          recorderManager.start(options)
          return;
        }
      },
      fail() {
        console.log('no')
        that.setData({
          status_ly: 1,
        })
      }
    })
    if (that.data.status_ly == 1) {
      wx.showModal({
        title: '提示',
        content: '您未授权录音，请前往授权',
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            wx.openSetting({
              success: (res) => {
                console.log(res.authSetting);
                if (res.authSetting['scope.record']) {
                  // 使用新版录音接口，可以获取录音文件
                  if (that.data.recordll == 0) {
                    that.setData({
                      recordll: 1,
                      recordIndex: 0
                    })
                    // 开始录音
                    recorderManager.start(options)
                    //return;
                  }
                  that.setData({
                    status_ly: 0
                  })
                } else {
                  console.log('no')
                  that.setData({
                    status_ly: 1
                  })
                }
              }
            })
          } else {
            that.setData({
              status_ly: 1
            })
          }
        }
      })
    }
      //录音开始事件
      recorderManager.onStart(() => {
        console.log('recorder start')
        // 计时
        that.timing()
      })
      //录音停止事件，会回调文件地址
      recorderManager.onStop((res) => {
        console.log('recorder stop', res)
        const { tempFilePath } = res;
        console.log(res.tempFilePath)
        this.setData({
          tempFilePath: res.tempFilePath,
          recordIndex:2,
        })
        // 
        clearInterval(start);
        // 
        wx.showToast({
          title: '恭喜!录音成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function(){
        // 上传录音文件
          wx.uploadFile({
            url: util.http_host + '/mini_program/applets/index.php/answer/Front_expert_order/upload_voice',
            filePath: res.tempFilePath,
            name: 'voice_url',
            formData: {
              customer_id_en: util.customer_id_en,
              user_id_en: util.user_id_en,
            },
            success: function (res) {
              console.log('上传成功')
              console.log(res)
              var data = JSON.parse(res.data)
              console.log(data)
              that.setData({
                show_pic:data.show_pic,
                show_pic1: data.data
              })
            },
            fail: function () {
              console.log("上传失败")
            }
          });
        }, 200)
        })

      //已录制完指定帧大小的文件，会回调录音分片结果数据。如果设置了 frameSize ，则会回调此事件
      recorderManager.onFrameRecorded((res) => {
        const { frameBuffer } = res
        console.log('frameBuffer.byteLength', frameBuffer.byteLength)

      })
      // 
      if (this.data.recordll == 1) {
        this.setData({
          recordll: 2,
          recordIndex:2
        })
        recorderManager.stop(options)
        // 计时
        clearInterval(start)
        return;
      }
      if (this.data.recordll == 2) {
        util.innerAudioContext1.src = this.data.show_pic
        util.innerAudioContext1.play()
        // 
        util.innerAudioContext1.onPlay(() => {
          clearInterval(start1)
          console.log('开始播放')
          // 
          var time1 = that.data.time1;
          var mintue1 = parseInt(time1 / 60 % 60)
          var seconds1 = parseInt(time1 % 60)
          if (mintue1 < 10) {
            mintue1 = '0' + mintue1
          }
          if (seconds1 < 10) {
            seconds1 = '0' + seconds1
          }
          that.setData({
            mintue1: mintue1,
            seconds1: seconds1,
            time1: time1
          })
          that.setData({
            recordll:3,
            recordIndex:3,
            shiting:'点击可以暂停'
          })
          // 
          start1 = setInterval(function () {
            time1 = time1 - 1;
            if (time1 < 0) {
              clearInterval(start1)
              return;
            }
            var mintue1 = parseInt(time1 / 60 % 60)
            var seconds1 = parseInt(time1 % 60)
            if (mintue1 < 10) {
              mintue1 = '0' + mintue1
            }
            if (seconds1 < 10) {
              seconds1 = '0' + seconds1
            }
            that.setData({
              mintue1: mintue1,
              seconds1: seconds1,
              time1: time1
            })
            // 
          }, 1000)
        })
      }  
      // 播放暂停
      if (this.data.recordll == 3){
        util.innerAudioContext1.pause()
        util.innerAudioContext1.onPause(() => {
          clearInterval(start1)
          console.log('播放暂停')
          that.setData({
            recordll:2,
            shiting: '点击可以试听'
          })
        })
        util.innerAudioContext1.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
        // 结束
        util.innerAudioContext1.onEnded((res) => {
          console.log('播放结束')
          clearInterval(start1)
          var time1=that.data.time;
          that.setData({
            recordIndex: 2,
            recordll:2,
            time1: time1,
            shiting: '点击可以试听'
          })
        })
      }  
  },
  // 关闭
  maskHinde: function () {
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext1.stop()
    }
    var that = this;
    that.setData({
      mask: false
    })
  },
  // 切换文字与语音输入
  bindChange(e) {
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext1.stop()
    }
    const index = parseInt(e.currentTarget.dataset.index);
    console.log(index)
    var index1=index+1;
    this.setData({
      curIndex: index,
      type1: index1
    })
  },
  // 切换图片上传
  binImg:function(){
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext1.stop()
    }
    this.setData({
      imgIndex:1
    })
  },
  modal: function () {
    console.log('modal')
    this.setData({
      showModal: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  onCancel: function () {
    this.hideModal();
  },
  // 图片添加完成
  onConfirm: function () {
    var that=this;
    var curIndex = that.data.curIndex
    console.log(curIndex)
    that.setData({
      curIndex: curIndex,
      imgIndex:0
    })
  },
  // 重新录制
  onConfirm1:function(){
    var that=this;
    that.setData({
      recordIndex:1,
      recordll:0,
      mintue: '00',
      seconds: '00'
    })
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext1.stop()
    }
  },
  // 查看图片
  previewImage:function(e){
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.src1 // 需要预览的图片http链接列表  
    })
  },
  // 查看图片
  previewImage1: function (e) {
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.src2 // 需要预览的图片http链接列表  
    })
  },
  // 上传图片
  chooseImg:function(){
    var that=this;
    var imgs = this.data.imgs;
    // 
    if (imgs.length >= 9) {
      that.setData({
        lenMore: false,
        toast:'最多上传9张图片'
      });
      setTimeout(function () {
        that.setData({
          lenMore: true
        });
      }, 700);
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
              imgs: imgs,
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
                var data=JSON.parse(res.data)
                console.log(data)
                var upimgs = that.data.upimgs;
                var length = upimgs.length+1;
                var data_img = that.data.data_img;
                upimgs.push(data.show_pic)
                data_img.push(data.data)
                that.setData({
                  upimgs: upimgs,
                  length: length,
                  data_img: data_img
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
  // 删除图片
  deleteImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    var upimgs = this.data.upimgs;
    var index = e.currentTarget.dataset.index;
    var data_img = this.data.data_img
    imgs.splice(index, 1);
    upimgs.splice(index, 1);
    data_img.splice(index, 1);
    var length = upimgs.length;
    this.setData({
      imgs: imgs,
      upimgs: upimgs,
      data_img: data_img,
      length: length
    });
  },
  // 计时
  timing:function() {
    console.log('开始录音了')
    var that = this;
    start = setInterval(function () {
      time = time + 1;
      var mintue = parseInt(time / 60 % 60)
      var seconds = parseInt(time % 60)
      if (mintue < 10) {
        mintue = '0' + mintue
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      that.setData({
        mintue: mintue,
        seconds: seconds,
        time: time,
        time1:time,
      })
      // 
    }, 1000)
  },
  submit:function(){
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext1.stop()
    }
    var that = this;
    var customer_id_en = util.customer_id_en
    var user_id_en = util.user_id_en
    var http_host = util.http_host;
    var question_id = that.data.question_id
    var type1 = this.data.type1
    if (type1==1){
      var content = this.data.value
    }else{
      var content = this.data.show_pic1
    }
    var seconds = this.data.time
    var photo = this.data.data_img
    console.log(photo)
    // 
    if (photo==''){
      var data = {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        question_id: question_id,
        type: type1,
        content: content,
        seconds: seconds,
      }
    }else{
      var data = {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
        question_id: question_id,
        type: type1,
        content: content,
        seconds: seconds,
        photo: photo
      }
    }
    // 
    console.log(photo)
    console.log(type1)
    wx.request({
      url: http_host + '/mini_program/applets/index.php/answer/Front_expert_order/upload_data',
      data:data,
      success: function (res) {
        console.log(res)
        that.setData({
          showModal:false
        })
        wx.showModal({
          title: '提示',
          content: '回答成功',
          showCancel: '',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../ask_me/ask_me',
              })
            }
          }
        })
      },
      fail: function (res) {
        console.log('no')
      }
    }); 
  },
  textarea:function(e){
    var value = e.detail.value;
    console.log(value)
    var that = this;
    that.setData({
      value: value,
    })
  },
  // 播放语音
  voice_tap:function(){
    if (util.version < 160) {// 小于1.6.0的版本
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        showCancel: false,
      })
      return
    }
    var that=this;
    if (this.data.show==1){
      if (that.data.lent==254){
        voicetime1 = 0;
        voicetime = that.data.answer_seconds;
        that.setData({
          lent:0
        })
      }
      util.innerAudioContext1.src = this.data.answer_content
      console.log(this.data.answer_content)
      util.innerAudioContext1.play()
      util.innerAudioContext1.onPlay(() => {
        console.log('开始播放')
        that.setData({
          show:0
        })
        that.voice_time()
      })
      util.innerAudioContext1.onError((res) => {
        clearInterval(start_time);
        console.log(res.errMsg)
        console.log(res.errCode)
        that.setData({
          lenMore: false,
          icon: 'warn',
          show: 1,
          lent: 0,
          toast: '语音路径失效'
        });
        setTimeout(function () {
          that.setData({
            lenMore: true,
          });
        }, 700)
      })
      // 结束
      util.innerAudioContext1.onEnded((res) => {
        console.log('播放结束')
        voicetime1 = 0;
        voicetime = that.data.answer_seconds;
        clearInterval(start_time);
        that.setData({
          show: 1,
          seconds_time: 0,
        })
      })
      return
    }else{
      util.innerAudioContext1.pause()
      util.innerAudioContext1.onPause(() => {
        console.log('暂停播放')
        that.setData({
          show: 1
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
        voicetime=that.data.answer_seconds;
        clearInterval(start_time)
        return;
      } else {
        voicetime = Number(voicetime - 0.1).toFixed(1);
        voicetime1 = Number(Number(voicetime1 + 0.1).toFixed(1));
        var time_ting = Math.ceil(voicetime)
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
        } else {
          if (time_ting == 0) {
            var seconds_time = 0
            that.setData({
              seconds_time: seconds_time
            })
          } else {
            if (seconds == 0) {
              var seconds_time = mintue + "'" + '00"'
              that.setData({
                seconds_time: seconds_time
              })
            } else {
              var seconds_time1 = mintue + "'";
              if (seconds < 10) {
                var seconds_time2 = '0' + seconds + '"';
              } else {
                var seconds_time2 = seconds + '"';
              }
              var seconds_time = seconds_time1 + seconds_time2
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
      }
      // 
    }, 100)
  },
})