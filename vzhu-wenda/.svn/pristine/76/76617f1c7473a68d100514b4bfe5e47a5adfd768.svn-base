// pages/experts_detail/experts_detail.js
// var writePhotosAlbum=1;
var app = getApp();
var util = require("../../utils/util.js");
var http_host=util.http_host;
var customer_id_en=util.customer_id_en;
var expert_data = [];
var voice_seconds=[];
var seconds_now=[];
var voice_src=[];
var show_seconds=[];
var time='';
var innerAudioContext = '';
var phone_number='';
var code='';
var is_allow=0;
// 重新授权回调函数
function opensetting(callback){
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
        // that.setData({
        //   userInfo: userInfo,
        // })
        wx.showToast({
          title: '授权成功',
          duration: 500,
        })
        typeof callback == "function" && callback({'ok':true})
      })
    }
  })
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenmask:true,
    code_status:0,
    newest_status:0,
    newest_data:['最新','评分'],
    newest_index:0,
    newest_text:'最新',
    page:1,
    question_list:'',
    click_status:0,
    loading_status:true,
    pay_success:[],
    pay_status:0,
    auth_status:0,
    search:'',
    voice_status:[],
    voice_length:[],
    question_data:[],
    voice_time:[],
    is_pay:0,
    voice_seconds:[],
    seconds_now:[],
    show_seconds:[],
    phone_number:'',
    phone_status:0,
    codemask:true,
    expert_status:0,
    see_status:0,
    pre_name:'',
    http_host:util.http_host,
    toast_status:true,
    is_share:0,
    to_pay:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var expert_id = options.id;
    that.setData({
      color:util.color,
      expert_id: expert_id,
      click_status: 0,
    });
    if (options.is_share==1){
      that.setData({
        is_share:1
      })
    }
    console.log('options:'+ options)
    that.getColor();
  },
  getColor: function (callback) {
    wx.request({
      url: util.http_host + '/mini_program/applets/index.php/answer/front_page/color',
      data: {
        customer_id_en: util.customer_id_en,
      },
      success: function (res) {
        console.log(res)
        util.color = res.data;
        console.log(util.color)
        typeof callback == "function" && callback({})
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
    var that=this;
    // 支付成功不刷新页面
    if (that.data.pay_status==0){
      expert_data = [],
        that.setData({
          click_status: 0,
          page: 1,
          expert_data: [],
          voice_status:[],
          voice_length:[],
          voice_time:[],
          voice_src:[],
          voice_seconds:[],
          show_seconds:[],
          phone_status:0,
          hiddenmask: true,
          expert_status:0,
          see_status:0,
          pre_name:0,
        })
      that.experts_detail(2);
    }  
    that.getColor(function () {
      that.setData({
        color: util.color,
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: util.color,
      })
    })  
  },
  // 获取页面数据
  experts_detail:function(type){
    var that=this;
    var page=that.data.page;
    if(util.user_id_en){
      var data = {
        customer_id_en: customer_id_en,
        user_id_en: util.user_id_en,
        expert_id: that.data.expert_id,
        page: page,
        limit: 5,
        type: type,
        search: that.data.search,
      }
    }else{
      var data = {
        customer_id_en: customer_id_en,
        expert_id: that.data.expert_id,
        page: page,
        limit: 5,
        type: type,
        search: that.data.search,
      }
    } 
    wx.request({
      url: http_host+'/mini_program/applets/index.php/answer/Front_expert/expert_detail',
      data:data,
      success:function(res){
        console.log(res)
        that.setData({
          nickname:res.data.data.expert_detail.nickname,
          sex: res.data.data.expert_detail.sex,
          headurl: res.data.data.expert_detail.headurl,
          self_intro: res.data.data.expert_detail.self_intro,
          category: res.data.data.expert_detail.category,
          favori_count: res.data.data.expert_detail.favori_count,
          que_av: res.data.data.expert_detail.que_av,
          star_length: (res.data.data.expert_detail.que_av/5)*154,
          collect_status: res.data.data.expert_detail.user_favori_status,
          qr_code: res.data.qr_code,
          is_self: res.data.data.expert_detail.is_self,
          question_data: res.data.data.question_list.question_data,
          user_have_tel: res.data.data.expert_detail.user_have_tel,
          is_enable: res.data.data.expert_detail.is_enable,
        })
        // console.log(that.data.qr_code)
        var expert_list = res.data.data.question_list.question_data;
        var pay_success = that.data.pay_success;
        var voice_status = that.data.voice_status;
        var voice_length = that.data.voice_length;
        var voice_time=that.data.voice_time;
        var voice_seconds = that.data.voice_seconds;
        var seconds_now=that.data.seconds_now;
        var voice_src = that.data.voice_src;
        var show_seconds = that.data.show_seconds;
        for (var i = 0; i < expert_list.length; i++){
          voice_status.push(0);
          voice_length.push(0);
          voice_time.push(0);
          // 未回答
          if (expert_list[i].answer==null){
            voice_seconds.push('');
            seconds_now.push('');
            show_seconds.push('');
            voice_src.push('');
          }else{
            voice_seconds.push(expert_list[i].answer.seconds);
            seconds_now.push(expert_list[i].answer.seconds)
            voice_src.push(expert_list[i].answer.content);        
          }
          // 页面显示的语音时间
          if (expert_list[i].answer != null && expert_list[i].answer.seconds <= 60) {
            show_seconds.push(expert_list[i].answer.seconds + '"');
          }
          if (expert_list[i].answer != null && expert_list[i].answer.seconds > 60){
            show_seconds.push(parseInt(expert_list[i].answer.seconds / 60) + '\'' + expert_list[i].answer.seconds % 60 + '"');
          }
          // 支付的状态
          if (expert_list[i].is_need_pay==1){
            pay_success.push(0)
          }else{
            pay_success.push(1)
          }
        }
        that.setData({
          pay_success: pay_success,
          voice_status: voice_status,
          voice_length: voice_length,
          voice_time: voice_time,
          voice_src: voice_src,
          voice_seconds: voice_seconds,
          seconds_now:seconds_now,
          show_seconds: show_seconds,
        })
        var expert_list = res.data.data.question_list.question_data;

        if (that.data.page == 1 && res.data.data.question_list.question_data.length == 0) {
          that.setData({
            expert_status: 1,
            expert_data: expert_list,
          })
          return;
        }
        if (expert_list.length == 0 && that.data.page != 1) {
          that.setData({
            page: page,
            expert_status:0,
            loading_status: false,
            expert_list: expert_list,
          })
          return;
        }
        if(page==1){
          expert_data = expert_list;
        }else{
          expert_data = expert_data.concat(res.data.data.question_list.question_data);
        }
        that.setData({
          page: page,
          expert_status: 0,
          expert_data: expert_data,
          loading_status: true,
          expert_list: expert_list,
        })
        if (expert_data.length < 5) {
          that.setData({
            loading_status: false,
          })
        }
      }
    })
  },
  //收藏
  bindcollect:function(){
    var that=this;
    var user_id_en=util.user_id_en;
    console.log(user_id_en)
    if (util.user_id_en){
      wx.request({
        url: http_host + '/mini_program/applets/index.php/answer/Front_User/favori',
        data: {
          customer_id_en: customer_id_en,
          user_id_en: user_id_en,
          expert_id: that.data.expert_id,
        },
        success: function (res) {
          console.log(res)
          if (res.data.data) {
            that.setData({
              collect_status: 1
            })
            wx.showToast({
              title: '已收藏',
            })
          } else {
            that.setData({
              collect_status: 0
            })
            wx.showToast({
              title: '已取消',
            })
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '查询不到授权，请前往授权',
        showCancel: false,
        success: function () {
          opensetting(function(){
            expert_data=[];
            that.setData({
              expert_data:[],
            })
            that.experts_detail(2);           
          })
        }
      })
    }
  },
  // 搜索
  search:function(e){
    var that=this;
    var search = e.detail.value;
    // setTimeout(function(){
    //   if(that.data.pre_name==search){
        expert_data = [],
          that.setData({
            search: search,
            page: 1,
            expert_data: [],
            expert_status: 0,
            loading_status: true,
          })
        that.experts_detail(2); 
    //   }
    // },400)
    // that.setData({
    //   pre_name:search,
    // })
  },
  // 最新下拉列表
  newest_click:function(){
    var that=this;
    if (that.data.newest_status==0){
      that.setData({
        newest_status:1,
      })
    }else{
      that.setData({
        newest_status:0,
      })
    }
  },
  newest_item:function(e){
    var that=this;
    expert_data = [];
    var index=e.currentTarget.dataset.index;
    that.setData({
      newest_index:index,
      newest_text: that.data.newest_data[index],
      page: 1,
      expert_data: [],
    })
    if (index==0){
      that.experts_detail(2);
    }
    if (index == 1){
      that.experts_detail(1);
    }
  },
  //分享二维码
  share_code:function(){
    var that=this;
    if (that.data.code_status==0){
      that.setData({
        code_status: 1,
        codemask:false,
      })
    } 
  },
  // 二维码遮罩层
  bindmask:function(){
    var that=this;
    that.setData({
      code_status: 0,
      hiddenmask: true,
      phone_status: 0,
      codemask:true,
      see_status: 0,
    })
  },
  // 长按保存二维码
  save_code: function () {
    var that = this;

    // 检查当前设置
    wx.getSetting({
      success(res) {
        console.log(res)
        // if (!res['scope.writePhotosAlbum']) {
        // 设置询问
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success(res) {
            // wx.saveImageToPhotosAlbum()    // 用户已经同意小程序使用功能，后续调用 wx.saveImageToPhotosAlbum 接口不会弹窗询问
            wx.downloadFile({
              url: that.data.qr_code,
              success: function (res) {
                console.log(res)
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function (res) {
                    console.log(res)
                    if (res.errMsg == 'saveImageToPhotosAlbum:ok') {
                      wx.showToast({
                        title: '保存成功',
                      })
                    }
                  },
                  fail: function (res) {
                    console.log(res)
                    if (res.errMsg == 'saveImageToPhotosAlbum:fail system deny') {
                      wx.showModal({
                        title: '提示',
                        content: '请在iPhone的“设置-隐私-照片”选项中，允许微信访问你的手机相册',
                      })
                    }
                  }
                })

              }
            })
          },
          fail(err) {
            console.log(err)
            is_allow=1;
          },
          complete() { }
        })
        // }
      }
    })
    console.log(is_allow) 
    if(is_allow==1){
      wx.openSetting({
        success: function (res) {
          console.log(res)
          if (res.authSetting["scope.writePhotosAlbum"]){
            is_allow = 2;
          }
        }
      })
      console.log(is_allow) 
    }
  },

  // 问题详情
  question_detail:function(e){
    var that=this;
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext.pause();
      clearInterval(time);
    }
    var id=e.currentTarget.dataset.id;
    var index=that.data.index;
    that.setData({
      id: id,
    })
    if(that.data.click_status==0){
      that.setData({
        id: id,
        click_status:1,
      })
      wx.navigateTo({
        url: '../question_details/question_details?question_id='+id,
      })
    }
    console.log(id)
  },
  // 向TA提问按钮
  to_ask:function(){
    var that=this;
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext.pause();
      clearInterval(time);
    }
    var expert_id = this.data.expert_id;
    if(util.user_id_en){
      // 答主是否被冻结 
      if(that.data.is_enable==1){
        // 是否获取过手机号码
        if (that.data.click_status == 0 && (phone_number != '' || that.data.user_have_tel == 1)) {
          that.setData({
            click_status: 1,
          })
          wx.navigateTo({
            url: '../expert_questions/expert_questions?expert_id=' + expert_id,
          })
          return;
        }
        if (that.data.click_status == 0 && phone_number == '') {
          that.setData({
            hiddenmask: false,
            phone_status: 1,
            click_status: 1,
          })
        }
      }else{
        wx.showModal({
          title: '提示',
          content: '抱歉，答主已下线',
        })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '查询不到授权，请前往授权',
        showCancel: false,
        success: function () {
          opensetting(function () {
            expert_data = [];
            that.setData({
              expert_data: [],
            })
            that.experts_detail(2);
          })
        }
      })
    }
  },
  // 获取手机号码
  getPhoneNumber: function (e) {
    console.log(e)
    var that = this;
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext.pause();
      clearInterval(time);
    }
    var expert_id = this.data.expert_id;
    that.setData({
      phone_status: 0,
      hiddenmask: true,
    })
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.login({
        success: function (res) {
          console.log(res.code)
          that.setData({
            code: res.code
          })
          console.log(e)
          var http_host = util.http_host
          var customer_id_en = util.customer_id_en;
          var user_id_en = util.user_id_en;

          var iv = e.detail.iv;
          var encryptedData = e.detail.encryptedData;
          var code = res.code;
          wx.request({
            url: http_host + '/mini_program/applets/index.php/answer/front_page/telphone',
            data: {
              customer_id_en: customer_id_en,
              user_id_en: user_id_en,
              iv: iv,
              encryptedData: encryptedData,
              code: code
            },
            success: function (res) {
              phone_number = res.data.data;
              wx.navigateTo({
                url: '../expert_questions/expert_questions?expert_id=' + expert_id + '&phone_number=' + phone_number,
              })
            },
            fail: function (res) {
              console.log('no')
            }
          });
        }
      })
    }else{
      wx.navigateTo({
        url: '../expert_questions/expert_questions?expert_id=' + expert_id + '&phone_number=' + phone_number,
      })
    }
  },
  // 举报
  report_click:function(){
    var that=this;
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext.pause();
      clearInterval(time);
    }
    var expert_id = this.data.expert_id;
    if(util.user_id_en){
      if (that.data.click_status == 0) {
        wx.navigateTo({
          url: '../report/report?expert_id=' + expert_id,
        })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '查询不到授权，请前往授权',
        showCancel: false,
        success: function () {
          opensetting(function () {
            expert_data = [];
            that.setData({
              expert_data: [],
            })
            that.experts_detail(2);
          })
        }
      })
    }
  },
  // 支付
  answer_pay:function(e){
    var that=this;
    var pay_success=that.data.pay_success;
    var id=e.currentTarget.dataset.id;
    var index=e.currentTarget.dataset.index;
    var pay_status = that.data.pay_status;
    var voice_status = that.data.voice_status;
    var customer_id_en=util.customer_id_en;
    var user_id_en=util.user_id_en;
    var seconds = e.currentTarget.dataset.seconds;
    var to_pay = that.data.to_pay;
    if(to_pay==0){
      if (util.user_id_en) {
        that.setData({
          to_pay: 1,
        })
        var data = {
          customer_id_en: customer_id_en,
          user_id_en: user_id_en,
          question_id: id,
        };
        wx.request({
          url: util.http_host + '/mini_program/applets/index.php/answer/Front_expert/peek_pay',
          data: data,
          success: function (res) {
            console.log(res)
            wx.requestPayment({
              timeStamp: res.data.data.timeStamp,
              nonceStr: res.data.data.nonceStr,
              package: res.data.data.package,
              signType: res.data.data.signType,
              paySign: res.data.data.paySign,
              success: function (res) {
                console.log(res);
                if (res.errMsg == "requestPayment:ok") {
                  pay_success[index] = 1
                  voice_status[index] = 0
                  that.setData({
                    pay_status: voice_status,
                    pay_success: pay_success,
                    index: index,
                    seconds: seconds,
                    is_pay: 1,
                    to_pay: 0,
                  })
                  console.log(that.data.expert_data);
                  var expert_data = that.data.expert_data;
                  expert_data[index].is_need_pay = 0;
                  that.setData({
                    expert_data: expert_data
                  })
                  console.log(that.data.expert_data)
                  that.bindplay()
                } else {
                  wx.showModal({
                    title: '提示',
                    content: res.err_data,
                    showCancel: false
                  })
                }
              },
              fail:function(res){
                that.setData({
                  to_pay: 0,
                })
                wx.showModal({
                  title: '提示',
                  content: res.err_data,
                  showCancel: false
                })
              }
            })
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '查询不到授权，请前往授权',
          showCancel: false,
          success: function () {
            opensetting(function () {
              expert_data = [];
              that.setData({
                expert_data: [],
              })
              that.experts_detail(2);
            })
          }
        })
      }  
    }   
  },
  // 语音播放
  bindplay:function(e){
    if (util.version < 160) {// 小于1.6.0的版本
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        showCancel: false,
      })
      return
    }
    util.innerAudioContext.pause()
    var that=this;
    // 支付成功播放语音
    if(that.data.is_pay==0){
      var index = e.currentTarget.dataset.index;
      // var seconds = e.currentTarget.dataset.seconds;
    }else{
      var index=that.data.index;
      // var seconds = that.data.seconds;
      that.setData({
        is_pay:0,
      })
    }
    // 播放的时长
    var voice_time = that.data.voice_time;
    var voice_length = that.data.voice_length;
    var voice_status=that.data.voice_status;
    var expert_data = that.data.expert_data;
    var voice_src = that.data.voice_src;
    // 语音的原始时长
    var voice_seconds=that.data.voice_seconds;
    // 显示在页面上的时间
    var show_seconds=that.data.show_seconds; 
    var seconds_now = that.data.seconds_now;
    console.log(voice_src[index])
    util.innerAudioContext.src = voice_src[index];
    for (var i = 0; i < expert_data.length; i++) {
      if (i != index) {
        if (voice_time[i] !=0) {
          voice_status[i] = 1
        } 
      }
    }
    that.setData({
      voice_status: voice_status,
      index:index,
    })
    // 点击播放 或 继续
    if (voice_status[index] == 0 || voice_status[index] == 1){
      voice_status[index]=2;
      that.setData({
        voice_status: voice_status,
      })
      console.log(voice_time[index])
      util.innerAudioContext.startTime = voice_time[index];
      util.innerAudioContext.play()
      util.innerAudioContext.onPlay(() => {
        console.log('开始播放')
        clearInterval(time);
        var j = 0;
        time = setInterval(function () {
          if (voice_length[index] == 304) {
            clearInterval(time)
            return;
          }
          voice_time[index] += 0.1;
          voice_length[index] = voice_time[index] / voice_seconds[index] * 304;
          
          // 页面显示的语音时间
          j++;
          // 语音在一分钟以内
          if (voice_seconds[index]<=60){
            if(j%10==0){
              show_seconds[index] = Math.floor(Number(show_seconds[index].split('"')[0]) - 0.1) + '"';
            }
          }else{
            if (j % 10 == 0) {
              if (seconds_now[index]>60){
                show_seconds[index] = parseInt(Math.floor(Number(seconds_now[index]) - 0.1) / 60) + '\'' + Math.floor(Number(seconds_now[index]) - 0.1) % 60 + '"';
                seconds_now[index]--;
              }else{
                show_seconds[index] = Math.floor(Number(seconds_now[index]) - 0.1) % 60 + '"';
                seconds_now[index]--;
              }
              
            }
          }
          console.log(show_seconds[index])
          that.setData({
            voice_time: voice_time,
            voice_length: voice_length,
            show_seconds: show_seconds,
            // seconds_now：seconds_now[index]
          })
        }, 100)
      });
      util.innerAudioContext.onError((res) => {
        clearInterval(time);
        console.log(res.errMsg)
        console.log(res.errCode)
        voice_status[index] = 0;
        that.setData({
          toast_status: false,
          icon: 'warn',
          voice_status: voice_status,
          toast: '语音路径失效'
        });
        // setTimeout(function () {
        //   that.setData({
        //     lenMore: true,
        //   });
        // }, 700)
      })
    }
    // 点击暂停
    else{
      clearInterval(time);
      voice_status[index] = 1;
      show_seconds[index] = show_seconds[index];
      that.setData({
        voice_status: voice_status,
        show_seconds: show_seconds,
      })
    }
    
    util.innerAudioContext.onEnded((res) => {
      console.log('播放结束')
      clearInterval(time);
      var that = this;
      voice_status[index]=0;
      voice_length[index]=0;
      voice_time[index]=0;
      if (voice_seconds[index]<=60){
        show_seconds[index] = voice_seconds[index] + '"';
      }else{
        show_seconds[index] = parseInt(Number(voice_seconds[index]) / 60) + '\'' + Number(voice_seconds[index]) % 60 + '"';
      }
      // show_seconds[index] = voice_seconds[index];
      that.setData({
        voice_status: voice_status,
        voice_length: voice_length,
        voice_time: voice_time,
        show_seconds: show_seconds,
      })
    })
  },
  // 查看全部
  see_all:function(){
    var that=this;
    that.setData({
      hiddenmask: false,
      see_status:1,
    })
  },
  see_all_sure:function(){
    this.setData({
      hiddenmask: true,
      see_status: 0,
    })
  },

  toastChange: function () {
    var that = this;
    that.setData({
      toast_status: true
    })
  },
  // 回到首页
  go_index:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 
  share_del:function(){
    this.setData({
      codemask: true,
      code_status:0,
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
    var that = this;
    if (that.data.expert_list.length < 5 ) {
      that.setData({
        loading_status: false,
      })
      return;
    }
    var page = that.data.page;
    page = Number(page) + 1;
    that.setData({
      page: page,
      loading_status: true,
    })
    that.experts_detail(2);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: that.data.title,
      path: '/pages/experts_detail/experts_detail?id='+that.data.expert_id+'&is_share=1',
      desc: that.data.content,
      imageUrl: that.data.pic,
    }
  },
})