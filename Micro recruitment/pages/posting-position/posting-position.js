// pages/send_box/send_box.js
var release_count=[];
var no_release_count=[];
var util = require("../../utils/util.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabread: true,
        have_publish:true,
        label_id:'',
        page2:1,
        page1: 1,
        page:'',
        release_data:[],
        no_release_data:[],
        loading_state: true,
        toastHidden: true,
        creat_btn:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      release_count = [];
      no_release_count = [];
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
      var that = this;
      that.publish_job();
      that.setData({
        creat_btn: 0,
      })
    },
    // 页面数据
    publish_job:function(){
      var that=this;
      var release_data = that.data.release_data;
      var no_release_data = that.data.no_release_data;
      var data={
        customer_id_en: util.customer_id_en,
        user_id_en:util.user_id_en,
        page:1,
      };
      util.commonRequest(
        data,
        '/mini_program/minvite/back/index.php/home/frontweb/release_job_web',
        function(res){
          console.log(res)
          that.setData({
            is_free: res.data.freeset.is_free,
            try_day: res.data.freeset.try_day,
            is_pay: res.data.freeset.is_pay,
            release_data:res.data.job_info.release,
            no_release_data:res.data.job_info.no_release,
            page1:2,
            page2:2,
            loading_state:false,
            is_allow: res.data.is_allow,
          })
        }
      )   
    },
    // 上拉加载
    publish_job_pull:function(){
      var that=this;
      if (that.data.tabread == true){
        var data = {
          customer_id_en: util.customer_id_en,
          user_id_en: util.user_id_en,
          page: that.data.page2,
        }
      }else{
        var data = {
          customer_id_en: util.customer_id_en,
          user_id_en: util.user_id_en,
          page: that.data.page1,
        }
      }
      console.log(that.data.page2)
      util.commonRequest(
        data,
        '/mini_program/minvite/back/index.php/home/frontweb/release_job_web',
        function(res){
          // that.setData({
          //   is_free: res.data.freeset.is_free,
          //   try_day: res.data.freeset.try_day,
          //   is_pay: res.data.freeset.is_pay,
          //   release_data: res.data.job_info.release,
          //   no_release_data: res.data.job_info.no_release,
          // })
          var release_data = res.data.job_info.release;
          var no_release_data = res.data.job_info.no_release;
          if (that.data.tabread==true){
            var release_count = that.data.release_data
            if (release_data) {
              for (var i = 0; i < release_data.length; i++) {
                release_count.push(release_data[i]);
              }
              if (release_data.length < 8) {
                that.setData({
                  loading_state: false,
                })
              }
              var page2 = that.data.page2;
              page2 = page2 + 1;
              that.setData({
                release_data: release_count,
                no_release_data: no_release_count,
                page2: page2
              })
              console.log(that.data.release_data)
              console.log(that.data.page2)
            } else {
              that.setData({
                loading_state: false,
              })
            }
          }
          if (that.data.tabread == false){
            var no_release_count = that.data.no_release_data
            if (no_release_data) {
              for (var j = 0; j < no_release_data.length; j++) {
                no_release_count.push(no_release_data[j])
              }
              if (no_release_data.length < 8) {
                that.setData({
                  loading_state: false,
                })
              }
              var page1 = that.data.page1;
              page1 = page1 + 1;
              that.setData({
                no_release_data: no_release_count,
                page1: page1
              })
              console.log(that.data.release_data)
              console.log(that.data.page1)
            }
            else {
              that.setData({
                loading_state: false,
              })
            }
          }
          
        }
      )
      console.log(that.data.page2)
    },
    // 未发布
    bindnoposting: function () {
      var that=this;
      that.setData({
          tabread: false,
          have_publish: false,
          no_release_data:[],
      })   
      that.publish_job()   
    },
    // 已发布
    bindposting: function () {
      var that=this
      that.setData({
          tabread: true,
          have_publish: true,
          release_data:[],
      })
      that.publish_job()
    },
    // 取消发布
    cancel_publish:function(e){
      var that=this;
      var data={
        customer_id_en: util.customer_id_en,
        user_id_en: util.user_id_en,
        job_id:e.currentTarget.dataset.id,
        release_type:2,
      };
      util.commonRequest(
        data,
        '/mini_program/minvite/back/index.php/home/frontweb/release_job',
        function(res){
          console.log(res)
          if(res.data.err_code==1000){
            wx.showToast({
              title:'取消成功',
              icon: 'success'
            })
          }else{
            wx.showModal({
              title: '提示',
              content: res.data.data,
              showCancel:false,
            })
          }
          that.publish_job();
        }
      )
     
    },
    // 立即发布
    now_publish:function(e){
      var that = this;
      var data = {
        customer_id_en: util.customer_id_en,
        user_id_en: util.user_id_en,
        job_id: e.currentTarget.dataset.id,
        release_type: 1,
      };
      util.commonRequest(
        data,
        '/mini_program/minvite/back/index.php/home/frontweb/release_job',
        function (res) {
          console.log(res)
          if(res.data.err_code==1000){
            wx.showToast({
              title: '发布成功',
              icon: 'success'
            })
          }else{
            wx.showModal({
              title: '提示',
              content: res.data.data,
              showCancel: false,
            })
          }
          that.publish_job();
        }
      )
      
    },
    // 举报按钮
    bindrenew:function(){
      wx.navigateTo({
          url: '../renew/renew',
      })
    },
    // 创建职位按钮
    bindcreatposition:function(){
      var that=this;
      if(that.data.creat_btn==0){
        that.setData({
          creat_btn:1,
        })
        if (that.data.is_allow == 1) {
          wx.navigateTo({
            url: '../creat-position/creat-position',
          })
        }
        if (that.data.is_allow == 0) {
          that.setData({
            toastHidden: false,
            toastcontent: "您的企业已被禁用",
            creat_btn: 0,
          })
        }
      }
      
    },
    toastChange: function () {
      var that = this;
      that.setData({
        toastHidden: true
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
      this.publish_job_pull()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})