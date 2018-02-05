// mycrowdfunding.js
var customer_id_en="";
var user_id_en="";
var activity_id="";
var user_id="";
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     mycrowd:"",
     crowdstauts:true,//判断我发起的?我支持的
     alltabstauts:true,
     successtabstauts:false,
     ingtabstauts:false,
     failtabstauts:false,
     ismyapply:true,
     maskflag:true,
     indexflag: false,//底部导航
     myCrowdflag: true,
     personalflag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     user_id_en=options.user_id_en;
     customer_id_en=options.customer_id_en;
     activity_id = options.activity_id;
     user_id = options.user_id;
     console.log(options)
     var that=this;
     
    // 我发起的-全部众筹
   that.tabisapply();
    
     
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // 我发起的-全部众筹
    that.tabisapply();
  },
  tabisapply:function(){
    var that = this;
    //加载开始
    util.showLoading();
    // 获取我发起的-全部众筹
    var data = {
      customer_id_en,
      user_id_en,
      activity_id,
    }
    util.commonRequest(
       data,
      'index.php/home/Crowdfund/apply',
      function (res) {
        console.log("我发起-全部众筹：" + JSON.stringify(res));
        that.setData({
          ismyapply:true,
          mycrowd: res.data.crowdfund_data,
          alltabstauts: true,
          successtabstauts: false,
          ingtabstauts: false,
          failtabstauts: false,
          crowdstauts: true
        })
        that.update();
        //加载结束
        util.hideToast();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
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
      url: '../mypersonal/mypersonal',
    })
  },
  tabissupport: function () {
    //加载开始
    util.showLoading();
    var that = this;
    // 获取我支持的-全部众筹
    var data={
      customer_id_en,
      user_id_en,
      activity_id
    }
    util.commonRequest(
       data,
      'index.php/home/Crowdfund/support',
      function (res) {
        console.log("我支持的-全部众筹：" + JSON.stringify(res));
        that.setData({
          ismyapply:false,
          mycrowd: res.data.crowdfund_data,
          alltabstauts: true,
          successtabstauts: false,
          ingtabstauts: false,
          failtabstauts: false,
          crowdstauts: false
        })
        that.update();
        //加载结束
        util.hideToast();
      }
    )
  },
  tabapply:function(){
    //加载开始
    util.showLoading();
    var that = this;
    // 获取我发起的-全部众筹
    var data={
      customer_id_en,
      user_id_en,
      activity_id
    }
    util.commonRequest(
      data,
      'index.php/home/Crowdfund/apply',
      function (res) {
        console.log("我发起-全部众筹：" + JSON.stringify(res));
        that.setData({
          mycrowd: res.data.crowdfund_data,
          alltabstauts: true,
          successtabstauts: false,
          ingtabstauts: false,
          failtabstauts: false   
        })
        that.update();
        //加载结束
        util.hideToast();
      }
    )
  },
  tabapply_success: function () {
    //加载开始
    util.showLoading();
    var that = this;
    // 获取我发起的-众筹成功
    var data={
      customer_id_en,
      user_id_en,
      activity_id
    }
    util.commonRequest(
      data,
      'index.php/home/Crowdfund/apply_success',
      function (res) {
        console.log("我发起的-众筹成功：" + JSON.stringify(res));
        that.setData({
          mycrowd: res.data.crowdfund_data,
          alltabstauts: false,
          successtabstauts: true,
          ingtabstauts: false,
          failtabstauts: false   
        })
        that.update();
        //加载结束
        util.hideToast();
      }
    )
  },
  tabapply_playing: function () {
    //加载开始
    util.showLoading();
    var that = this;
    // 获取我发起的-进行中
    var data={
      customer_id_en,
      user_id_en,
      activity_id
    }
    util.commonRequest(
      data,
      'index.php/home/Crowdfund/apply_playing',
      function (res) {
        console.log("我发起的-进行中：" + JSON.stringify(res));
        that.setData({
          mycrowd: res.data.crowdfund_data,
          alltabstauts: false,
          successtabstauts: false,
          ingtabstauts: true,
          failtabstauts: false   
        })
        that.update();
        //加载结束
        util.hideToast();
      }
    )

  },
  tabapply_lose: function () {
    //加载开始
    util.showLoading();
    var that = this;
    // 获取我发起的-众筹失败
    var data={
      customer_id_en,
      user_id_en,
      activity_id
    }
    util.commonRequest(
      data,
      'index.php/home/Crowdfund/apply_lose',
      function (res) {
        console.log("我发起的-众筹失败：" + JSON.stringify(res));
        that.setData({
          mycrowd: res.data.crowdfund_data,
          alltabstauts: false,
          successtabstauts: false,
          ingtabstauts: false,
          failtabstauts: true   
        })
        that.update();
        //加载结束
        util.hideToast();
      }
    )

  },
  tabsupport: function () {
    //加载开始
    util.showLoading();
    var that = this;
    // 获取我支持的-全部众筹
    var data={
      customer_id_en,
      user_id_en,
      activity_id
    }
    util.commonRequest(
      data,
      'index.php/home/Crowdfund/support',
      function (res) {
        console.log("我支持的-全部众筹：" + JSON.stringify(res));
        that.setData({
          mycrowd: res.data.crowdfund_data,
          alltabstauts: true,
          successtabstauts: false,
          ingtabstauts: false,
          failtabstauts: false  
        })
        that.update();
        //加载结束
        util.hideToast();
      }
    )

  },
  tabsupport_success: function () {
    //加载开始
    util.showLoading();
    var that = this;
    // 获取我支持的-众筹成功
    var data={
      customer_id_en,
      user_id_en,
      activity_id
    }
    util.commonRequest(
      data,
      'index.php/home/Crowdfund/support_success',
      function (res) {
        console.log("我支持的-众筹成功：" + JSON.stringify(res));
        that.setData({
          mycrowd: res.data.crowdfund_data,
          alltabstauts: false,
          successtabstauts: true,
          ingtabstauts: false,
          failtabstauts: false  
        })
        that.update();
        //加载结束
        util.hideToast();
      }
    )

  },
  tabsupport_playing: function () {
    //加载开始
    util.showLoading();
    var that = this;
    // 获取我支持的-进行中
    var data={
      customer_id_en,
      user_id_en,
      activity_id
    }
    util.commonRequest(
       data,
      'index.php/home/Crowdfund/support_playing',
      function (res) {
        console.log("我支持的-进行中：" + JSON.stringify(res));
        that.setData({
          mycrowd: res.data.crowdfund_data,
          alltabstauts: false,
          successtabstauts: false,
          ingtabstauts: true,
          failtabstauts: false   
        })
        that.update();
        //加载结束
        util.hideToast();
      }
    )

  },
  tabsupport_lose: function () {
    //加载开始
    util.showLoading();
    var that = this;
    // 获取我支持的-众筹失败
    var data={
      customer_id_en,
      user_id_en,
      activity_id
    }
    util.commonRequest(
      data,
      'index.php/home/Crowdfund/support_lose',
      function (res) {
        console.log("我支持的-众筹失败：" + JSON.stringify(res));
        that.setData({
          mycrowd: res.data.crowdfund_data,
          alltabstauts: false,
          successtabstauts: false,
          ingtabstauts: false,
          failtabstauts: true   
        })
        that.update();
        //加载结束
        util.hideToast();
      }
    )
  },
  mycrwdtab:function(e){
    var that=this;
    var crowdfundstatuscode = e.currentTarget.dataset.crowdfundstatuscode;//众筹状态
    var apply_id = e.currentTarget.dataset.applyid;//发起id
    var id = e.currentTarget.dataset.id;//商品id
    var useriden = e.currentTarget.dataset.useriden;//被我支持的人的user_id解码前
    var userid = e.currentTarget.dataset.userid;//被我支持的人的user_id解码后
    var ismyapply = that.data.ismyapply;//是否是我发起的
    var alltabstauts = that.data.alltabstauts;
    var successtabstauts = that.data.successtabstauts;
    var ingtabstauts = that.data.ingtabstauts;
    var failtabstauts = that.data.failtabstauts;

    if(ismyapply){

       if(alltabstauts){
         console.log(crowdfundstatuscode)
         switch (crowdfundstatuscode){
             case 0:
                wx.navigateTo({//众筹详情页
                  url: '../details/details?user_id_en=' + user_id_en + '&apply_id=' + apply_id + '&customer_id_en=' + customer_id_en + '&user_id=' + user_id + '&activity_id=' + activity_id + '',
                }) 
                break;
              case 1:
                wx.navigateTo({//众筹详情页
                  url: '../details/details?user_id_en=' + user_id_en + '&apply_id=' + apply_id + '&customer_id_en=' + customer_id_en + '&user_id=' + user_id + '&activity_id=' + activity_id + '',
                }) 
                break;
              case 2:
                that.setData({
                  maskflag: false
                })              
           }
       }
       if (successtabstauts || ingtabstauts){
         wx.navigateTo({//众筹详情页
           url: '../details/details?user_id_en=' + user_id_en + '&apply_id=' + apply_id + '&customer_id_en=' + customer_id_en + '&user_id=' + user_id + '&activity_id=' + activity_id + '',
         }) 
       }
       if(failtabstauts){
         that.setData({
           maskflag: false
         })
       }

    }else if(!ismyapply){

      if (alltabstauts) {
        switch (crowdfundstatuscode) {
          case 0:
            wx.navigateTo({//众筹详情页
              url: '../details/details?user_id_en=' + useriden + '&apply_id=' + apply_id + '&customer_id_en=' + customer_id_en + '&user_id=' + userid + '&activity_id=' + activity_id + '',
            })
            break;
          case 1:
            wx.navigateTo({//众筹详情页
              url: '../details/details?user_id_en=' + useriden + '&apply_id=' + apply_id + '&customer_id_en=' + customer_id_en + '&user_id=' + userid + '&activity_id=' + activity_id + '',
            })
            break;
          case 2:
            that.setData({
              maskflag:false
            })
            break;
          default: return wx.showModal({
            title: '出现问题',
            content: 'write by chq',
          });
            break;     
        }
      }
      if (successtabstauts || ingtabstauts) {
        wx.navigateTo({//众筹详情页
          url: '../details/details?user_id_en=' + useriden + '&apply_id=' + apply_id + '&customer_id_en=' + customer_id_en + '&user_id=' + userid + '&activity_id=' + activity_id + '',
        })    
      }
      if (failtabstauts) {
        that.setData({
          maskflag: false
        });
      }

    }
  },
  tabindex:function(){
    var that=this;
    that.setData({
      maskflag: true,
      indexflag: true,//底部导航
      myCrowdflag: false,
      personalflag: false
    })
    wx.redirectTo({
      url: '../index/index',
    });
  },
  tabhidden:function(){
    var that = this;
    that.setData({
      maskflag: true
    });
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
    // 我发起的-全部众筹
    that.tabisapply();
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

