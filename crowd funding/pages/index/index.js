//index.js
var customer_id_en = "";
var activity_id="";
var user_id_en = " ";
var user_id="";//解码后
var daotime="";
var time="";
var activity_expire_code="";
//获取应用实例
var app = getApp();
var util=require('../../utils/util.js');
Page({

  data: {
    list_activity:"",  
    list_goods:"",
    list_goods_ed: "",
    isblock:"block",
    isnone:"none",
    tabflag:true,//众筹商品&&已发起众筹tab切换
    tabflag1:false,
    tabpersonalflag:"none",//个人中心显隐
    maskflag:true,
    activity_expire_code:"",
    day: "",
    hours: "",
    min: "",
    second: "",
    indexflag:true,//底部导航
    myCrowdflag:false,
    personalflag:false
  },
  
  onLoad: function () {
    var that = this;
    activity_id = util.activity_id;
    customer_id_en = util.customer_id_en;
  	//调用应用实例的方法获取全局用户登录数据 
    //加载开始
    util.showLoading();
    app.getUserInfo(function(res){
      // 获取user_id_en
      user_id_en=res.user_id_en;
      user_id=res.user_id;
        // 请求轮播图、众筹商品数据
        that.tabcorwdGet();   
        //加载结束
        util.hideToast();
    })
    
    // 渲染时间
    that.time(); 
  },
  time:function(){
    var that=this;
    // 渲染时间
    var timeValue = {
      customer_id_en,
      activity_id
    };
    util.commonRequest(
      timeValue,
      'index.php/home/front/getinfo_realtime',
      function (res) {
        console.log("倒计时：" + JSON.stringify(res));

        var timeData = res.data.data;
        console.log(timeData)

        if (timeData.activity_expire_code == 1) {
          console.log("活动未开始");
          var starttime = (new Date(timeData.activity_start_time)).getTime();
          var nowtime = (new Date(timeData.nowtime)).getTime();
          //剩余时间
          time = starttime - nowtime - 1000;
          //天
          var day = parseInt(time / 86400000);
          console.log("天：" + day);
          //小时
          var hours = parseInt((time % 86400000) / 3600000);
          console.log("小时：" + hours);
          //分钟
          var min = parseInt((time % 86400000 % 3600000) / 60000);
          console.log("分钟：" + min);
          //秒
          var second = parseInt((time % 86400000 % 3600000 % 60000) / 1000);
          console.log("秒：" + second);
          activity_expire_code = 1;
          that.setData({
            activity_expire_code: activity_expire_code,
            day: day,
            hours: hours,
            min: min,
            second: second
          })
          that.update();

        }
        else if (timeData.activity_expire_code == 2) {
          console.log("活动进行中");
          var nowtime = (new Date(timeData.nowtime)).getTime();
          var endtime = (new Date(timeData.activity_end_time)).getTime();
          //剩余时间

          time = endtime - nowtime-1000;
          console.log((time % 86400000));
          //天
          var day = parseInt(time / 86400000);
          console.log("天：" + day);
          //小时
          var hours = parseInt((time % 86400000) / 3600000);
          console.log("小时：" + hours);
          //分钟
          var min = parseInt((time % 86400000 % 3600000) / 60000);
          console.log("分钟：" + min);
          //秒
          var second = parseInt((time % 86400000 % 3600000 % 60000) / 1000);
          console.log("秒：" + second);
          activity_expire_code = 2;
          that.setData({
            activity_expire_code: activity_expire_code,
            day: day,
            hours: hours,
            min: min,
            second: second
          })
          that.update();
        }
        else if (timeData.activity_expire_code == 3) {
          console.log("活动已经结束");
          activity_expire_code = 3;
          that.setData({
            activity_expire_code: activity_expire_code
          })
        }
        else if (timeData.activity_expire_code == 4) {
          console.log("活动已终止");
          activity_expire_code = 4
          that.setData({
            activity_expire_code: activity_expire_code
          })
        }
      }
    );

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    console.log("onShow");
    var that = this;
    that.setData({
      indexflag: true,//底部导航
      myCrowdflag: false,
      personalflag: false
    })
    // 请求轮播图、众筹商品数据
    that.tabcorwdGet();
    that.time();
    daotime=setInterval(function () {
      time = time - 1000;
      if (that.data.activity_expire_code == 3) {
        return;
      }
      if (time < 0) {
        that.time();
        return;
      }

      console.log(time);
      //天
      var day = parseInt(time / 86400000);
      console.log("天：" + day);
      //小时

      var hours = parseInt((time % 86400000) / 3600000);
      console.log("小时：" + hours);
      //分钟
      var min = parseInt((time % 86400000 % 3600000) / 60000);
      console.log("分钟：" + min);
      //秒
      var second = parseInt((time % 86400000 % 3600000 % 60000) / 1000);
      console.log("秒：" + second);

      that.setData({
        activity_expire_code: activity_expire_code,
        day: day,
        hours: hours,
        min: min,
        second: second
      })
      that.update();
    }, 1000);

  },
  // 下拉刷新
  onPullDownRefresh:function() {
    var that=this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    // 请求轮播图、众筹商品数据
    that.tabcorwdGet();
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    // wx.showToast({
    //   title: '触底了！',
    // })
  },
  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {
    console.log("首页页面隐藏:");
    clearInterval(daotime);
  },
  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {
    console.log("首页页面结束:");
    clearInterval(daotime);
  },

  //事件处理函数
  // 搜索功能
  inputfocus:function(e){//触发执行
    console.log(e.detail );
    var that=this;
    console.log(this);
    that.setData({
      maskflag: false      
    });
  },
  inputblur:function(e){
    var that = this;
    that.setData({
      maskflag: true
    });
  },
  inputvalue:function(e){//键盘内容替换input内容
    console.log(e);

  },
  inputconfirm:function(e){//点击键盘右下角搜索触发
    //加载开始
    util.showLoading();
    console.log(e);
    var that=this;
    var search_keyword=e.detail.value;
    
    //搜索数据更新
    var searchvalue={
      user_id_en,
      customer_id_en,
      activity_id,
      search_keyword
    };

    util.commonRequest(
      searchvalue,
      'index.php/home/front/index',
      function(res){
         console.log("搜索数据："+JSON.stringify(res));
         that.setData({
           maskflag: true,
           list_activity: res.data.data.list_activity,
           list_goods: res.data.data.list_goods
         })
         //加载结束
         util.hideToast();
      }
    );           
  },
  
  tabcorwdGet:function(){

    var that = this;
    // 请求轮播图、众筹商品数据
    var corwdValue = {
      user_id_en,
      customer_id_en,
      activity_id
    }
    util.commonRequest(
      corwdValue,
      'index.php/home/front/index',
      function (res) {
        that.setData({
          list_activity: res.data.data.list_activity,
          list_goods: res.data.data.list_goods,
          isblock: "block",
          isnone: "none",
          tabflag: true,
          tabflag1: false
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      })
  },
  tabcrowedGet:function(){
    //加载开始
    util.showLoading();
    var that = this;
    // 请求已发起众筹数据
    var corwdValue = {
      customer_id_en,
      activity_id
    }
    util.commonRequest(
      corwdValue,
      'index.php/home/front/getinfo_applyed',
      function (res) {
        that.setData({
          list_goods_ed: res.data.data,
          isblock: "none",
          isnone: "block",
          tabflag: false,
          tabflag1: true
        })
        //加载结束
        util.hideToast();
      })
  },
  // 跳转到商品详情页
  crowdfundingDetails: function (event) {
    console.log(event);
    //加载开始
    util.showLoading(); 
   var id=event.currentTarget.dataset.id;//商品id
   console.log("跳转商品详情页user_id_en:" + user_id_en);
    wx.navigateTo({
      url: '../crowdfundingDetails/crowdfundingDetails?id=' + id + '&user_id_en=' + user_id_en + '&customer_id_en=' + customer_id_en + '&activity_id=' + activity_id +'&user_id='+user_id+''
    })
    //加载结束
    util.hideToast();
  },
  details:function(e){
    var apply_id = e.currentTarget.dataset.applyid;
    //加载开始
    util.showLoading(); 
    wx.navigateTo({
      url: '../details/details?user_id_en=' + user_id_en + '&apply_id=' + apply_id + '&customer_id_en=' + customer_id_en + '&user_id=' + user_id + '&activity_id=' + activity_id + '',
    })  
    //加载结束
    util.hideToast();
  },
  // 跳转到我的众筹
  myCrowdfunding: function () {
    this.setData({
      indexflag: false,//底部导航
      myCrowdflag: true,
      personalflag: false
    })
    //加载开始
    util.showLoading();
    wx.navigateTo({
      url: '../mycrowdfunding/mycrowdfunding?customer_id_en=' + customer_id_en + '&user_id_en=' + user_id_en + '&activity_id=' + activity_id + '&user_id=' + user_id +''
    })
    //加载结束
    util.hideToast();
  },
  tabpersoanl:function(){
    this.setData({
      indexflag: false,//底部导航
      myCrowdflag: false,
      personalflag: true
    })
    wx.redirectTo({
      url: '../mypersonal/mypersonal?user_id_en=' + user_id_en +'&user_id='+user_id+'',
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
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: '众筹首页-chq',
      imageUrl:'../img/share08.jpg'
    }
  }
})

