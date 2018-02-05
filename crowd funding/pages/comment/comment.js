// comment.js
var user_id_en="";
var user_id="";
var apply_id="";//发起id
var activity_id="";
var customer_id_en="";//商家id
var support_id="";//支持者ID
var message_content="";//回复内容
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:"",
    replyflag: "none",
    isfocus: false,
    indexflag: true,//底部导航
    myCrowdflag: false,
    personalflag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载开始
    util.showLoading();
    user_id_en = options.user_id_en;
    apply_id=options.apply_id;
    customer_id_en=options.customer_id_en;
    user_id=options.user_id;
    activity_id = options.activity_id;
    var that=this;

    // 获取初始页面数据
  // 留言列表
  that.commentdata();
   
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // 留言列表
    that.commentdata();
  },
  commentdata:function(){
    var that=this;
    var messagevalue = {
      customer_id_en,
      apply_id,
      user_id_en
    }
    util.commonRequest(
      messagevalue,
      'index.php/home/Crowdfund/message_list',
      function (res) {
        console.log("留言区-页面：" + JSON.stringify(res))
        that.setData({
          comment: res.data.data
        })
        //加载结束
        util.hideToast();
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
      })
  },
  tabreply: function (e) {//点击触发回复软键盘
    var that = this;
    support_id = e.currentTarget.dataset.supportid;
    that.setData({
      replyflag: "block",
      isfocus: true
    })
  },
  inputblur: function (e) {//回复失去焦点获取value 
    message_content = e.detail.value;
    console.log(message_content);
  },
  inputconfirm: function (e) {//点击键盘右下角完成触发
    console.log("完成键盘：" + e);
    var that = this;
    message_content = e.detail.value;

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
          var messagevalue = {
            customer_id_en,
            apply_id,
            user_id_en
          }
        util.commonRequest(
            messagevalue,
            'index.php/home/Crowdfund/message_list',
            function (res) {
              console.log("回复刷新-留言区-页面：" + JSON.stringify(res))
              that.setData({
                replyflag: 'none',
                comment: res.data.data
              })
            })

        } else {
          console.log("回复失败")
        }
      }
    )

  },
  tabsendreply: function (e) {//点击发送一样可以回复
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
          var messagevalue = {
            customer_id_en,
            apply_id,
            user_id_en
          }
        util.commonRequest(
            messagevalue,
            'index.php/home/Crowdfund/message_list',
            function (res) {
              console.log("刷新-留言区-页面：" + JSON.stringify(res))
              that.setData({
                replyflag: 'none',
                comment: res.data.data
              })
            })
        } else {
          console.log("回复失败")
        }
      }
    )
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
  },
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
    // 留言列表
    that.commentdata();

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
  // onShareAppMessage: function () {
  
  // }
})
