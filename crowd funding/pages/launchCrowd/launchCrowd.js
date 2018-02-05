// launchCrowd.js
var customer_id_en = "";
var activity_id = "";
var id = "";//商品id
var user_id_en = "";
var apply_message="";
var is_protocol=0;
var user_id="";//解码后user_id
var apply_id="";
var util = require('../../utils/util.js');
var property_id="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    launchCrowdData:"",
    isuccess:"",
    hiddenToast:true,
    ToastContent:"",
    maskflag:true,
    icon:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    apply_message="";
    is_protocol=0;
    //加载开始
    util.showLoading();
    var that=this;
     id=options.id;
     activity_id = options.activity_id;
     user_id_en=options.user_id_en;
     customer_id_en = options.customer_id_en;
     user_id = options.user_id;
     property_id = options.pors_id;
     
     var data={
       id, 
       user_id_en,
       activity_id,
       customer_id_en,
       property_id
     }
     util.commonRequest(
       data,
       'index.php/home/front/get_apply_info',
       function(res){
         that.setData({
           launchCrowdData: res.data.data
         })
                 //加载结束
        util.hideToast();
       }
     )

  },
  radioChange:function(e){//默认留言
    if(e.detail.value !=''){
      apply_message = e.detail.value;
    };
  },
  inputblur:function(e){//失去焦点获取自己留言
    if(e.detail.value !=''){
      apply_message = e.detail.value;
    };
  },
  inputconfirm:function(e){//点击键盘右下角完成
    if (e.detail.value != '') {
      apply_message = e.detail.value;
    };
  },
  issuccess: function () {//是否同意协议
    var that = this;
    if (is_protocol == 0) {
      is_protocol = 1;
      that.setData({
        isuccess: "success"
      })
    } else if (is_protocol == 1) {
      is_protocol = 0;
      that.setData({
        isuccess: ""
      })
    }
  },
  tapdetails: function (e) {
    var that=this;
    if (apply_message==''){ 
      that.setData({
        icon:"warn",
        hiddenToast: false,
        ToastContent: "留言不能为空"
      })
      return console.log("msg不能为空");
    }
    var data ={}
    if (e.currentTarget.dataset.protocolstatus==1){
      console.log(is_protocol);
      data={
        customer_id_en,
        user_id_en,
        activity_id,
        id,  
        is_protocol,
        apply_message,
        property_id
      };
    }else{
      data = {
        customer_id_en,
        user_id_en,
        activity_id,
        id,
        apply_message,
        property_id
      };
    }
  
    util.commonRequest(
      data,
      'index.php/home/front/apply_goods',
      function (res) {
        console.log("确认发起众筹：" + res.data.err_code)
        if (res.data.err_code == 1) {
          apply_id = res.data.apply_id;
          that.setData({
            icon:'success',
            hiddenToast: false,
            ToastContent: res.data.data
          })
          setTimeout(function(){
            wx.navigateTo({
              url: '../details/details?user_id_en=' + user_id_en + '&apply_id=' + apply_id + '&customer_id_en=' + customer_id_en + '&user_id=' + user_id + '&activity_id=' + activity_id + '',
            })
          },1000);  
        } else if (res.data.err_code == 0) {
          // wx.showToast({
          //   title: "*"+res.data.data,
          // })
          that.setData({
            icon:"warn",
            hiddenToast: false,
            ToastContent: res.data.data
          })
          console.log("发起众筹失败");
        }
      }
    )

  },
  tabprol:function(){
      this.setData({
        maskflag:false
      })
  },
  tabhiddentoprol:function(){
      this.setData({
        maskflag: true
      })
  },
  /**
 *    toast显示时间到时处理业务 
 */
  toastHidden: function () {
    
    this.setData({
      hiddenToast: true
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
  // onShareAppMessage: function () {
  
  // }
})
