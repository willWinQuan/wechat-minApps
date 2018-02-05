// 
var app = getApp();
var http_host = '';
var util = require("../../utils/util.js");
var Arr=[]
Page({
  data: {
    customer_id_en:'',
    user_id_en:'',
    weixin_headimgurl:'',
    weixin_name:'游客',
    is_pay:0,//是否已经支付申请费用0否1是
    info_status: 0,//是否已经填写提交申请信息0否1是
    status: 0,//是否已经审核通过0审核中0未审核1审核通过2审核未通过
    apply_status:0,//是否已经申请过0否1是
    apply_fee_sw:1,//申请费用开关开启 0关闭，1开启
    apply_sw:0,
    role_type:1,
    is_enable: 0,
    is_select_apply_protocol: 0
  },
  onLoad: function (options) {
    var that=this;
    that.getdetail()
    that.getPerson() 
  },
  onShow:function(){
    // 只支持1.6.0以上的版本
    if (util.version >= 160) {
      util.innerAudioContext.stop();
    }
    this.getdetail()
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: util.color,
      animation: {
        timingFunc: 'easeIn'
      }
    })
    this.setData({
      bgColor: util.color,
    })
  },
  getdetail(){
    let that = this
    var customer_id_en = util.customer_id_en
    var user_id_en = util.user_id_en
    var http_host = util.http_host;
    
    var data = {}
    if (util.user_id_en == '' || util.user_id_en == undefined) {
      data = {
        customer_id_en: customer_id_en,
      };
    } else {
      data = {
        customer_id_en: customer_id_en,
        user_id_en: user_id_en,
      };
    }
    wx.request({
      url: util.http_host + '/mini_program/applets/index.php/answer/Front_User/user_center',
      data: data,
      success: function (res) {
          if (res.data.err_code !=1000){
               wx.showModal({
                   title: '提示',
                   content: res.data.data,
               })
               return;
          }
        console.log(res)
        console.log('这是个人中心后台数据')
        console.log(res.data.data)
        that.setData({
          weixin_name: res.data.data.weixin_name,
          weixin_headimgurl: res.data.data.weixin_headimgurl,
          id: res.data.data.id,
          apply_sw: res.data.data.base.apply_sw,
          is_pay: res.data.data.e_rs.is_pay,//是否已经支付申请费用0否1是
          info_status: res.data.data.e_rs.info_status,//是否已经填写提交申请信息0否1是
          status: res.data.data.e_rs.status,//是否已经审核通过0审核中0未审核1审核通过2审核未通过
          apply_status: res.data.data.e_rs.apply_status,
          role_type: res.data.data.role_type,
          apply_fee_sw: res.data.data.base.apply_fee_sw,
          is_enable: res.data.data.e_rs.is_enable,
          is_select_apply_protocol: res.data.data.is_select_apply_protocol//是否同意了协议
        })
      }
    })
  },
  // 获取后端跳转状态
  getPerson() {
    let that = this
    console.log('getPerson的数据')
    wx.request({
      url: util.http_host + '/mini_program/applets/index.php/answer/front_page/center',
      data: { customer_id_en: util.customer_id_en },
      method: 'POST',
      success: function (res) {
        console.log(res)
        let getArr = res.data
        let getArr1 = getArr[0]
        let getArr2 = getArr[1]
        let getArr3 = getArr[2]
        that.setData({
          navigateArr: res.data,
          getArr1: getArr1,
          getArr2: getArr2,
          getArr3: getArr3,
        })
      }
    })
  },
  myanswer(){
    wx.navigateTo({
      url: '../questions_send_txt/questions_send_txt',
    })
  },
  // 我的收藏
  bindmyresume() {
    let that = this
    let getArr1 = that.data.getArr1
    console.log(getArr1)
    if (getArr1 == 1) {
      wx.switchTab({
        url: '../my-collection/my-collection',
      })
    }
    if (getArr1 == 0) {
      wx.navigateTo({
        url: '../my-collection/my-collection',
      })
    }
  },
  // 我的提问
  myQuiz() {
    let that = this
    let getArr2 = that.data.getArr2
    console.log(getArr2)
    if (getArr2 == 1) {
      wx.switchTab({
        url: '../my-quiz/my-quiz',
      })
    }
    if (getArr2 == 0) {
      wx.navigateTo({
        url: '../my-quiz/my-quiz',
      })
    }
  },
  // 向我提问
  ask_me:function(){
    wx.navigateTo({
      url: '../ask_me/ask_me',
    })
  },
  // 申请认证
  bindapprove:function(){
    let that = this
    let {
        is_pay:is_pay,//是否已经支付申请费用0否1是
        info_status:info_status,//是否已经填写提交申请信息0否1是
        status:status,//是否已经审核通过0审核中0未审核1审核通过2审核未通过
        apply_fee_sw: apply_fee_sw,
        is_select_apply_protocol: is_select_apply_protocol
    }=that.data;
    console.log(is_pay);
    console.log(info_status);
    console.log(status)
  if (apply_fee_sw==1){//需要付费
    if (status == 2) {
      wx.navigateTo({
        url: '../approve/approve',
      })
      return;
    }
    if (is_pay==0){//没有支付直接到支付申请费用页面，审核不通过is_pay=0
        wx.navigateTo({
            url: '../approve/approve',
        }) 
    }
    else if (is_pay==1){//支付了申请费用处理
        if (info_status == 1) { 
            //1.已经填写提交申请信息，跳转到审核中页面
            wx.navigateTo({
                url: '../set-apply/set-apply',
            })
            return;
        }
        //2.没有填写提交申请信息,跳转到填写申请信息页面
        wx.navigateTo({
            url: '../setting/setting?type=1',
        }) 
    }
  }
  else if (apply_fee_sw==0){//免费
   if (status == 2) {
    if (is_select_apply_protocol == 0) {//还没同意协议
      wx.navigateTo({
        url: '../approve/approve',
      })
      return;
    }
    wx.navigateTo({
        url: '../setting/setting?type=1',
    }) 
    }
   else if (status==0){
       if (is_select_apply_protocol == 0) {
           wx.navigateTo({
               url: '../approve/approve',
           })
           return;
       };
      if (info_status == 1) {
          //1.已经填写提交申请信息，跳转到审核中页面
          wx.navigateTo({
              url: '../set-apply/set-apply',
          })
          return;
      }
      //2.没有填写提交申请信息,跳转到填写申请信息页面
      else if (info_status==0){
          wx.navigateTo({
              url: '../setting/setting?type=1',
          }) 
          return;
      };
   }
  }
},
  // 我的钱包
  my_wallet: function () {
    let that = this
    let getArr3 = that.data.getArr3
    console.log(getArr3)
    if (getArr3 == 1) {
      wx.switchTab({
        url: '../my-wallet/my-wallet',
      })
    }
    if (getArr3 == 0) {
      wx.navigateTo({
        url: '../my-wallet/my-wallet',
      })
    }
  },
  // 设置
  bindsetting: function () {
    let that = this
    let is_enable = that.data.is_enable
    console.log(is_enable)
    if (is_enable == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '您已被冻结',
        showCancel:false,
      })
    } else {
      wx.navigateTo({
        url: '../setting/setting?type=0',
      })
    }
  },
})