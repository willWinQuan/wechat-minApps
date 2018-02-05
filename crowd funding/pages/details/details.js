// details.js
var customer_id_en = "";
var id = "";//商品id
var user_id_en = "";//上个页面的解码前user_id_en
var apply_id="";
var support_id="";
var message_content="";//回复内容
var user_id="";//上个页面解码后user_id
var activity_id="";
var user_id2="";//这个页面user_id
var app = getApp();
var util = require('../../utils/util.js');
Page({ 
  /**
   * 页面的初始数据
   */
  data: {
    detail:"",
    guess:"",
    tabflag:true,
    zhuandata:"",
    replyflag:"none",
    isfocus:false,
    isme: true,
    maskflag: true,
    corwdfundstatus:"",//改发起商品的状态
    issilde:false,//详情滑动框显隐
    hiddenToast:true,
    ToastContent:"",
    failpay:"",//已支付、活动已经过期按钮状态
    indexflag: true,//底部导航
    myCrowdflag: false,
    personalflag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    user_id_en = options.user_id_en;
    apply_id = options.apply_id;
    customer_id_en = options.customer_id_en;
    user_id=options.user_id;
    activity_id = options.activity_id;
    var that = this;

    console.log(options);
    console.log("详情-user_id_en:" + user_id_en);
    console.log("详情-customer_id_en:" + customer_id_en);
    console.log("详情-activity_id:" + activity_id);

    //调用应用实例的方法获取全局用户登录数据 
    app.getUserInfo(function (res) {
      // 获取user_id_en
      user_id2=res.user_id;
      if (user_id == res.user_id){
        user_id_en = res.user_id_en;
        user_id = res.user_id;
      }else{
        user_id_en = res.user_id_en;
        that.setData({
          isme:false
        })
      }
      //加载结束
      util.hideToast();
    })
   console.log(user_id);
    // 获取众筹详情
    that.getdetails();
  },
  tabindex: function () {
    wx.redirectTo({
      url: '../index/index',
    });
  },
  // 跳转到我的众筹
  tabmyCrowdfunding: function () {
    this.setData({
      indexflag: false,//底部导航
      myCrowdflag: true,
      personalflag: false
    })
    //加载开始
    util.showLoading();
    wx.redirectTo({
      url: '../mycrowdfunding/mycrowdfunding?customer_id_en=' + customer_id_en + '&user_id_en=' + user_id_en + '&activity_id=' + activity_id + '&user_id=' + user_id + ''
    })
    //加载结束
    util.hideToast();
  },
  tabpersoanl: function () {
    this.setData({
      indexflag: false,//底部导航
      myCrowdflag: false,
      personalflag: true
    })
    wx.redirectTo({
      url: '../mypersonal/mypersonal?user_id_en=' + user_id_en + '&user_id=' + user_id + '',
    })
    // wx.redirectTo({
    //   url: '../test/test',
    // })
  },
  getdetails:function(){
    var that=this;
    var detailVaule = {
      user_id_en,
      apply_id,
      customer_id_en
    }
    util.commonRequest(
      detailVaule,
      'index.php/home/Crowdfund/crowdfund_detail',
      function (res) {
        console.log("众筹详情：" + JSON.stringify(res));
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
        switch (res.data.pay_status) {
          case 1:
            that.setData({
              detail: res.data,
              corwdfundstatus: res.data.apply_data.crowdfund_status
            });
            break;
          case 2:
            that.setData({
              detail: res.data,
              corwdfundstatus: res.data.apply_data.crowdfund_status
            });
            break;
          case 3:
            that.setData({
              failpay: true,
              detail: res.data,
              corwdfundstatus: res.data.apply_data.crowdfund_status
            });
            break;
          case 4:
            that.setData({
              failpay: false,
              detail: res.data,
              corwdfundstatus: res.data.apply_data.crowdfund_status
            });
            break;
          default: return; break;  
        };
      }
    );
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // 请求轮播图、众筹商品数据
    that.getdetails();
  },
  tabshowside:function(){
    this.setData({
      issilde:true
    })
  },
  tabhiddenside:function(){
    this.setData({
      issilde: false
    })
  },
  tabshare:function(){
    var that=this;
    that.setData({
      maskflag:false
    })
  },
  shareImgHidden:function(){
    var that = this;
    that.setData({
      maskflag: true
    })
  },
  tabsumlist: function () {
    wx.navigateTo({
      url: '../sumlist/sumlist?customer_id_en=' + customer_id_en + '&apply_id=' + apply_id + '&user_id_en=' + user_id_en + '&user_id=' + user_id + '&activity_id=' + activity_id +'',
    })
  },
  tabcomment: function () {
    wx.navigateTo({
      url: '../comment/comment?customer_id_en=' + customer_id_en + '&apply_id=' + apply_id + '&user_id_en=' + user_id_en + '&user_id=' + user_id +'&activity_id='+activity_id+'',
    })
  },
  tabcompletepay: function (e) {
    var whome=e.currentTarget.dataset.isme;
    var that=this;
    if(whome==false){
      wx.navigateTo({
        url: '../completepay/completePay?user_id_en=' + user_id_en + '&customer_id_en=' + customer_id_en + '&activity_id=' + activity_id + '&apply_id=' + apply_id + '&user_id=' + user_id2 +'',
      })
    }else if(whome==true){
      console.log("跳转到发起者支付订单页面");

      // wx.navigateTo({
      //   url: '../completepay/completePay?user_id_en=' + user_id_en + '&customer_id_en=' + customer_id_en + '&activity_id=' + activity_id + '&apply_id=' + apply_id + '&user_id='+user_id2+'',
      // })
      var corwdfundstatus = that.data.corwdfundstatus;
      console.log(corwdfundstatus);
      switch (corwdfundstatus){
        case "进行中":

          util.showModal(//提示模态框
            '温馨提示',//标题
            '您确定现在就去往支付吗?',//内容
            true,//是否带取消按钮
            function(res){
              if (res.confirm) {
                wx.navigateTo({
                  url: '../launchPay/launchPay?user_id_en=' + user_id_en + '&customer_id_en=' + customer_id_en + '&activity_id=' + activity_id + '&apply_id=' + apply_id + '&user_id=' + user_id + '',
                })
              }
            });

            break;
        case "已完成":
            wx.showToast({
              title: '已支付',
            })
            break; 
        case "已过期":
             that.setData({
               hiddenToast:false,
               ToastContent:'活动已过期'
             })  
             break;
        case "已终止":
            that.setData({
              hiddenToast:true,
              ToastContent:'活动已终止'
            })
            break; 
        default: return wx.showModal({
          title: '出现问题',
          content: 'write by chq',
        }); 
        break;        
      }

    }
    
  },
  tabcomment1: function () {//切换留言
    var that=this;
    that.setData({
      tabflag:true
    })
  },
  tabreply:function(e){//点击触发回复软键盘
    var that=this;
    support_id = e.currentTarget.dataset.supportid;
    that.setData({
      replyflag:"block",
      isfocus:true
    })
  },
  inputblur:function(e){//回复失去焦点获取value 
    message_content = e.detail.value;
    console.log(message_content);
  },
  inputconfirm: function (e) {//点击键盘右下角完成触发
    console.log("完成键盘："+e);
    var that = this;
    message_content = e.detail.value;
     
     //回复
     var replyvalue={
       support_id,
       customer_id_en,
       user_id_en,
       message_content
     };
     util.commonRequest(
       replyvalue,
       'index.php/home/Crowdfund/message',
       function(res){
         console.log("回复操作返回："+JSON.stringify(res));
         if(res.data.data=='添加成功'){
            // 刷新留言
           var detailVaule = {
             user_id_en,
             apply_id,
             customer_id_en
           }
           util.commonRequest(
             detailVaule,
             'index.php/home/Crowdfund/crowdfund_detail',
             function (res) {
               console.log("回复刷新-众筹详情：" + JSON.stringify(res));
               that.setData({
                 replyflag: 'none',
                 detail: res.data
               })
             }
           )
         }else{
           console.log("回复失败")
         }
       }
     )
     
  },
  tabsendreply:function(e){//点击发送一样可以回复
    var that = this;

    //回复
    var replyvalue = {
      support_id,
      customer_id_en,
      user_id_en,
      message_content
    };
    util.commonRequest(
      replyvalue,
      'index.php/home/Crowdfund/message',
      function (res) {
        console.log("回复操作返回：" + JSON.stringify(res));
        if (res.data.data == '添加成功') {
          // 刷新留言
          var detailVaule = {
            user_id_en,
            apply_id,
            customer_id_en
          }
          util.commonRequest(
            detailVaule,
            'index.php/home/Crowdfund/crowdfund_detail',
            function (res) {
              console.log("回复刷新-众筹详情：" + JSON.stringify(res));
              that.setData({
                replyflag: 'none',
                detail: res.data,
                isfocus: false
              })
            }
          )
        } else {
          console.log("回复失败")
        }
      }
    )
  },
  tabsumlist1: function () {//切换排行榜
    var that = this;
    that.setData({
      tabflag: false
    })
  },
  tabindex:function(){
    wx.navigateTo({
      url: '../index/index',
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
    // 获取众筹详情
    that.getdetails();
    that.setData({
      indexflag: true,//底部导航
      myCrowdflag: false,
      personalflag: false
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '众筹详情页-chq',
      imageUrl: '../img/share08.jpg',
    }
  }
})